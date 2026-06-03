/**
 * Admin: ham çanta fotoğrafından AI görsel üretir.
 *
 * Akış:
 *   1) Fal edit modeli ile içerik üretimi (varsayılan: openai/gpt-image-2/edit)
 *   2) Clarity Upscaler ile 2x büyütme (kaliteyi artırır)
 *
 * Mode:
 *   - "product"   → still life atmosferik düzenleme
 *   - "lifestyle" → modelin tuttuğu lifestyle pozu
 *
 * Form-data:
 *   - image: File (zorunlu, ilk kez)
 *   - mode: "product" | "lifestyle"
 *   - prompt: string (opsiyonel)
 *   - inputUrl: string (opsiyonel — daha önce upload edilmiş URL)
 *   - skipUpscale: "1" (opsiyonel — hız için upscaler atlanır)
 */

import { NextResponse } from "next/server";
import {
  buildEditInput,
  FAL_EDIT_MODEL,
  FAL_UPSCALE_MODEL,
} from "@/lib/fal-config";
import { fal, isFalConfigured } from "@/lib/fal";
import { getFalErrorMessage } from "@/lib/fal-errors";

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

type FalImage = { url: string };
type FalEditResult = { data?: { images?: FalImage[] } };
type FalUpscaleResult = { data?: { image?: FalImage } };

async function upscaleImage(imageUrl: string): Promise<string | null> {
  try {
    const result = (await fal.subscribe(FAL_UPSCALE_MODEL, {
      input: {
        image_url: imageUrl,
        upscale_factor: 2,
        // pure upscale — overlay creativity'i düşük tut, üretim
        // detayı korunsun, AI ekleme yapmasın
        creativity: 0.1,
        resemblance: 1.5,
        prompt:
          "high quality, sharp focus, detailed product, photorealistic",
        num_inference_steps: 18,
      },
      logs: false,
    })) as FalUpscaleResult;
    return result?.data?.image?.url ?? null;
  } catch (err) {
    console.error("[admin/generate] upscale failed (graceful fallback):", err);
    return null;
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
  const skipUpscaleField = formData.get("skipUpscale");
  // Varsayılan: upscale kapalı (daha hızlı, timeout riski düşük). Açmak için skipUpscale=0
  const skipUpscale =
    skipUpscaleField === null || skipUpscaleField === ""
      ? true
      : skipUpscaleField !== "0";
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

  // Önceden yüklenmiş URL varsa onu kullan
  let inputUrl: string | null = null;
  if (typeof inputUrlField === "string" && inputUrlField.startsWith("http")) {
    inputUrl = inputUrlField;
  } else if (file instanceof File) {
    if (file.size > 12 * 1024 * 1024) {
      return NextResponse.json(
        { error: "Fotoğraf 12 MB'dan büyük." },
        { status: 400 }
      );
    }
    try {
      inputUrl = await fal.storage.upload(file);
    } catch (err) {
      console.error("[admin/generate] upload error:", err);
      return NextResponse.json(
        { error: "Fotoğraf Fal'a yüklenemedi." },
        { status: 502 }
      );
    }
  } else {
    return NextResponse.json(
      { error: "Fotoğraf veya inputUrl gerekli." },
      { status: 400 }
    );
  }

  const defaultPrompt =
    mode === "lifestyle"
      ? buildLifestylePrompt(productName, style)
      : buildProductPrompt(productName, style);
  const prompt =
    typeof customPrompt === "string" && customPrompt.trim()
      ? customPrompt.trim()
      : defaultPrompt;

  try {
    // 1) Edit modeli ile içerik üret (varsayılan: GPT Image 2)
    const editResult = (await fal.subscribe(FAL_EDIT_MODEL, {
      input: buildEditInput(FAL_EDIT_MODEL, prompt, inputUrl),
      logs: false,
    })) as FalEditResult;

    const editedUrl = editResult?.data?.images?.[0]?.url;
    if (!editedUrl) {
      return NextResponse.json(
        { error: "Görsel üretilemedi (boş yanıt)." },
        { status: 502 }
      );
    }

    // 2) Upscale (graceful — başarısız olursa orijinal döner)
    let finalUrl = editedUrl;
    let upscaled = false;
    if (!skipUpscale) {
      const upscaledUrl = await upscaleImage(editedUrl);
      if (upscaledUrl) {
        finalUrl = upscaledUrl;
        upscaled = true;
      }
    }

    return NextResponse.json({
      mode,
      model: FAL_EDIT_MODEL,
      inputUrl,
      generatedUrl: finalUrl,
      rawUrl: editedUrl,
      upscaled,
    });
  } catch (err) {
    console.error("[admin/generate] error:", err);
    const message = getFalErrorMessage(err);
    return NextResponse.json(
      { error: `Üretim başarısız: ${message}` },
      { status: 500 }
    );
  }
}
