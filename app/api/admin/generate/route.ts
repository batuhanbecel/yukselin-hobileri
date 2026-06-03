/**
 * Admin: ham çanta fotoğrafından AI görsel üretir.
 *
 * POST — işi kuyruğa alır, requestId döner (uzun üretim Vercel timeout'unu önler)
 * GET  — ?requestId=... ile durum / sonuç (client polling)
 */

import { NextResponse } from "next/server";
import { buildEditInput, FAL_EDIT_MODEL } from "@/lib/fal-config";
import { getFalErrorMessage } from "@/lib/fal-errors";
import { extractGeneratedImageUrl } from "@/lib/fal-result";
import { fal, isFalConfigured } from "@/lib/fal";

export const maxDuration = 300;
export const runtime = "nodejs";

const DEFAULT_PRODUCT_NAME = "handmade crochet bag";
const DEFAULT_STILLLIFE_STYLE = "natural · Mediterranean · warm tones";
const DEFAULT_LIFESTYLE_STYLE = "bohemian · summery · natural · Mediterranean";

function buildProductPrompt(productName: string, style: string) {
  return (
    `Create a professional still-life product photograph of the ${productName} ` +
    `shown in the uploaded image. Do not alter the product itself — preserve its ` +
    `shape, color, texture, pattern, material, scale, and every detail exactly. ` +
    `Only change the background, lighting, surface, composition, and styling. ` +
    `Set the scene in a ${style} aesthetic. Keep the product as the main focus. ` +
    `Use minimal props if needed, but do not overpower the product. The result ` +
    `should look realistic, premium, and e-commerce ready. Aspect ratio 3:4.`
  );
}

function buildLifestylePrompt(productName: string, style: string) {
  return (
    `Create a professional lifestyle photograph featuring the ${productName} ` +
    `shown in the uploaded image. Do not alter the product itself — preserve its ` +
    `shape, color, texture, pattern, material, scale, and every detail exactly. ` +
    `Show the product naturally on a model — carried on the shoulder, held in ` +
    `hand, or worn. IMPORTANT: Do not show the model's face. Frame from below ` +
    `the neck, or show only hands, shoulders, waist, or silhouette; face, eyes, ` +
    `and head must stay out of frame. Build a ${style} atmosphere. Background, ` +
    `lighting, styling, and outfit should complement the product. The product ` +
    `must remain clearly visible and the main focus. The result should look ` +
    `realistic, aesthetic, and brand-campaign quality. Aspect ratio 3:4.`
  );
}

async function resolveInputUrl(
  file: FormDataEntryValue | null,
  inputUrlField: FormDataEntryValue | null
): Promise<{ inputUrl: string } | { error: string; status: number }> {
  if (typeof inputUrlField === "string" && inputUrlField.startsWith("http")) {
    return { inputUrl: inputUrlField };
  }

  if (file instanceof File) {
    if (file.size > 12 * 1024 * 1024) {
      return { error: "Fotoğraf 12 MB'dan büyük.", status: 400 };
    }
    try {
      const inputUrl = await fal.storage.upload(file);
      return { inputUrl };
    } catch (err) {
      console.error("[admin/generate] upload error:", err);
      return { error: "Fotoğraf Fal'a yüklenemedi.", status: 502 };
    }
  }

  return { error: "Fotoğraf veya inputUrl gerekli.", status: 400 };
}

export async function GET(req: Request) {
  if (!isFalConfigured) {
    return NextResponse.json(
      { error: "FAL_KEY env değişkeni tanımlı değil." },
      { status: 500 }
    );
  }

  const requestId = new URL(req.url).searchParams.get("requestId")?.trim();
  const model =
    new URL(req.url).searchParams.get("model")?.trim() || FAL_EDIT_MODEL;

  if (!requestId) {
    return NextResponse.json({ error: "requestId gerekli." }, { status: 400 });
  }

  try {
    const status = await fal.queue.status(model, {
      requestId,
      logs: false,
    });

    const queueStatus =
      typeof status === "object" &&
      status !== null &&
      "status" in status &&
      typeof (status as { status: unknown }).status === "string"
        ? (status as { status: string }).status
        : "UNKNOWN";

    if (queueStatus === "IN_QUEUE" || queueStatus === "IN_PROGRESS") {
      return NextResponse.json({
        status: queueStatus,
        requestId,
      });
    }

    if (queueStatus === "FAILED") {
      const failMsg =
        typeof status === "object" &&
        status !== null &&
        "error" in status &&
        typeof (status as { error: unknown }).error === "string"
          ? (status as { error: string }).error
          : "Fal kuyruğu işi başarısız tamamladı.";
      return NextResponse.json({ error: failMsg, status: "FAILED" }, { status: 502 });
    }

    const result = await fal.queue.result(model, { requestId });
    const generatedUrl = extractGeneratedImageUrl(result);

    if (!generatedUrl) {
      console.error(
        "[admin/generate] result without image URL:",
        JSON.stringify(result).slice(0, 800)
      );
      return NextResponse.json(
        {
          error:
            "Görsel üretildi ama URL okunamadı. Fal yanıt formatı değişmiş olabilir.",
          status: "COMPLETED",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      status: "COMPLETED",
      requestId,
      generatedUrl,
      model,
    });
  } catch (err) {
    console.error("[admin/generate] poll error:", err);
    return NextResponse.json(
      { error: getFalErrorMessage(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  if (!isFalConfigured) {
    return NextResponse.json(
      { error: "FAL_KEY env değişkeni tanımlı değil." },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ error: "Geçersiz form." }, { status: 400 });
  }

  const file = formData.get("image");
  const inputUrlField = formData.get("inputUrl");
  const customPrompt = formData.get("prompt");
  const modeField = formData.get("mode");
  const productNameField = formData.get("productName");
  const styleField = formData.get("style");
  const mode = modeField === "lifestyle" ? "lifestyle" : "product";

  const productName =
    typeof productNameField === "string" && productNameField.trim()
      ? productNameField.trim()
      : DEFAULT_PRODUCT_NAME;

  const style =
    typeof styleField === "string" && styleField.trim()
      ? styleField.trim()
      : mode === "lifestyle"
        ? DEFAULT_LIFESTYLE_STYLE
        : DEFAULT_STILLLIFE_STYLE;

  const resolved = await resolveInputUrl(file, inputUrlField);
  if ("error" in resolved) {
    return NextResponse.json(
      { error: resolved.error },
      { status: resolved.status }
    );
  }
  const { inputUrl } = resolved;

  const defaultPrompt =
    mode === "lifestyle"
      ? buildLifestylePrompt(productName, style)
      : buildProductPrompt(productName, style);
  const prompt =
    typeof customPrompt === "string" && customPrompt.trim()
      ? customPrompt.trim()
      : defaultPrompt;

  try {
    const { request_id: requestId } = await fal.queue.submit(FAL_EDIT_MODEL, {
      input: buildEditInput(FAL_EDIT_MODEL, prompt, inputUrl),
    });

    return NextResponse.json({
      status: "IN_QUEUE",
      mode,
      model: FAL_EDIT_MODEL,
      requestId,
      inputUrl,
    });
  } catch (err) {
    console.error("[admin/generate] submit error:", err);
    return NextResponse.json(
      { error: `Üretim başarısız: ${getFalErrorMessage(err)}` },
      { status: 500 }
    );
  }
}
