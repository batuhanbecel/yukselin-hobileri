/**
 * Admin: ham çanta fotoğrafından AI görsel üretir.
 *
 * Akış:
 *   1) Nano Banana (Gemini 2.5 Flash Image) ile içerik üretimi
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
import { fal, isFalConfigured } from "@/lib/fal";

export const maxDuration = 60;
export const runtime = "nodejs";

const PRODUCT_PROMPT =
  "Editorial still life photograph featuring this exact handmade product " +
  "as the centerpiece, arranged on a warm rustic wooden table or natural " +
  "linen surface. Surround the item with carefully styled atmospheric props: " +
  "a small bouquet of dried wildflowers, a vintage ceramic coffee cup with " +
  "saucer, a few balls of natural cotton yarn in earthy tones, an open " +
  "linen-bound notebook, a sprig of dried lavender or olive branch. " +
  "Soft afternoon golden hour light streaming from the side, gentle shadows, " +
  "shallow depth of field with the item in sharp focus, warm earthy color " +
  "palette (ivory, terracotta, sage, soft gold), Kinfolk magazine aesthetic, " +
  "natural film grain, intimate atmospheric mood, slightly elevated 3/4 " +
  "overhead angle. Photorealistic, no text, no people. " +
  "CRITICAL: keep the item's exact pattern, color, stitches, handles, knot " +
  "details and shape identical to the input — only build the still life " +
  "composition around it.";

const LIFESTYLE_PROMPT =
  "Editorial lifestyle fashion photograph featuring a young Mediterranean " +
  "woman in her late 20s with natural undone hair, partially visible " +
  "(focus on her hand, shoulder, or silhouette — not the full face), " +
  "holding, wearing or carrying this exact product in a warm natural " +
  "setting (sun-dappled cafe terrace with cobblestone, golden hour " +
  "Mediterranean street with terracotta walls, or a stylish minimal " +
  "Scandinavian interior with linen and wood). Soft natural golden hour " +
  "lighting, warm earthy color palette matching the bag, candid relaxed " +
  "pose, focus on the bag with shallow depth of field, Vogue editorial " +
  "Kinfolk magazine style, subtle natural film grain, sophisticated mood. " +
  "Photorealistic, no text, no logos. " +
  "CRITICAL: keep the bag's exact pattern, color, stitches, handles and " +
  "shape identical to the input photo — do not change the bag in any way.";

type FalImage = { url: string };
type FalEditResult = { data?: { images?: FalImage[] } };
type FalUpscaleResult = { data?: { image?: FalImage } };

async function upscaleImage(imageUrl: string): Promise<string | null> {
  try {
    const result = (await fal.subscribe("fal-ai/clarity-upscaler", {
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
  const skipUpscale = formData.get("skipUpscale") === "1";
  const mode = modeField === "lifestyle" ? "lifestyle" : "product";

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

  const defaultPrompt = mode === "lifestyle" ? LIFESTYLE_PROMPT : PRODUCT_PROMPT;
  const prompt =
    typeof customPrompt === "string" && customPrompt.trim()
      ? customPrompt.trim()
      : defaultPrompt;

  try {
    // 1) Nano Banana ile içerik üret
    const editResult = (await fal.subscribe("fal-ai/nano-banana/edit", {
      input: {
        prompt,
        image_urls: [inputUrl],
        num_images: 1,
        output_format: "jpeg",
      },
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
      inputUrl,
      generatedUrl: finalUrl,
      rawUrl: editedUrl,
      upscaled,
    });
  } catch (err) {
    console.error("[admin/generate] error:", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json(
      { error: `Üretim başarısız: ${message}` },
      { status: 500 }
    );
  }
}
