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

const DEFAULT_PRODUCT_NAME = "el emeği örgü çanta";
const DEFAULT_STILLLIFE_STYLE = "doğal · Akdeniz · sıcak tonlar";
const DEFAULT_LIFESTYLE_STYLE = "bohem · yazlık · doğal · Akdeniz";

function buildProductPrompt(productName: string, style: string) {
  return (
    `Yüklediğim görseldeki ${productName} için profesyonel bir still life ` +
    `ürün fotoğrafı oluştur. Ürünün kendisine kesinlikle dokunma; form, ` +
    `renk, doku, desen, materyal, ölçü hissi ve tüm detaylar birebir korunsun. ` +
    `Sadece arka plan, ışık, zemin, kompozisyon ve styling değişsin. ` +
    `${style} estetikte bir sahne kur. Ürün ana odakta olsun. Gerekirse az ` +
    `sayıda dekor kullan ama ürünü bastırma. Sonuç gerçekçi, premium ve ` +
    `e-ticaret kalitesinde olsun. En-boy oranı 3:4.`
  );
}

function buildLifestylePrompt(productName: string, style: string) {
  return (
    `Yüklediğim görseldeki ${productName} için profesyonel bir lifestyle ` +
    `fotoğraf oluştur. Ürünün kendisine kesinlikle dokunma; form, renk, ` +
    `doku, desen, materyal, ölçü hissi ve tüm detaylar birebir korunsun. ` +
    `Ürün bir model üzerinde doğal şekilde sergilensin. Model ürünü omzunda, ` +
    `elinde veya üzerinde taşısın ya da kullansın. ${style} bir atmosfer ` +
    `kur. Arka plan, ışık, styling ve model kombinasyonu ürüne uygun olsun. ` +
    `Ürün net şekilde görünsün ve ana odak olarak kalsın. Sonuç gerçekçi, ` +
    `estetik ve marka çekimi kalitesinde olsun. En-boy oranı 3:4.`
  );
}

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
  const productNameField = formData.get("productName");
  const styleField = formData.get("style");
  const skipUpscale = formData.get("skipUpscale") === "1";
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
