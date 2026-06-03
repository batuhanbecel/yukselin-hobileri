/**
 * Admin: ham çanta fotoğrafından temiz ürün vitrini üretir.
 * Fal.ai üzerinden Nano Banana (Gemini 2.5 Flash Image) modelini kullanır.
 *
 * Akış:
 *   1. Form-data'da gelen image file'ını al
 *   2. Fal storage'a yükle, geçici URL al
 *   3. Modeli çağır, sonuç URL'lerini döndür
 *
 * Auth: middleware ile Basic Auth korumalı (/api/admin/*).
 */

import { NextResponse } from "next/server";
import { fal, isFalConfigured } from "@/lib/fal";

export const maxDuration = 60;
export const runtime = "nodejs";

const DEFAULT_PROMPT =
  "Professional studio product photograph of this handmade crochet bag, " +
  "centered on a clean soft ivory background (#f7efe1), warm soft natural " +
  "studio lighting from the left, gentle shadow beneath the bag for depth, " +
  "sharp focus on the crochet stitches and texture, editorial fashion magazine " +
  "look, no model, no hands, no props. " +
  "IMPORTANT: keep the bag's exact pattern, color, stitches, handles and " +
  "shape unchanged — only replace the background and improve the lighting.";

type FalImage = { url: string };
type FalResult = { data?: { images?: FalImage[] } };

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
    return NextResponse.json(
      { error: "Geçersiz form verisi." },
      { status: 400 }
    );
  }

  const file = formData.get("image");
  const customPrompt = formData.get("prompt");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "Fotoğraf bulunamadı (image alanı boş)." },
      { status: 400 }
    );
  }

  if (file.size > 12 * 1024 * 1024) {
    return NextResponse.json(
      { error: "Fotoğraf 12 MB'dan büyük." },
      { status: 400 }
    );
  }

  const prompt =
    typeof customPrompt === "string" && customPrompt.trim()
      ? customPrompt.trim()
      : DEFAULT_PROMPT;

  try {
    // 1) Orijinal fotoyu Fal storage'a yükle
    const inputUrl = await fal.storage.upload(file);

    // 2) Nano Banana ile ürün vitrini üret
    const result = (await fal.subscribe("fal-ai/nano-banana/edit", {
      input: {
        prompt,
        image_urls: [inputUrl],
        num_images: 1,
        output_format: "jpeg",
      },
      logs: false,
    })) as FalResult;

    const generated = result?.data?.images?.[0]?.url;
    if (!generated) {
      return NextResponse.json(
        { error: "Görsel üretilemedi (model boş yanıt verdi)." },
        { status: 502 }
      );
    }

    return NextResponse.json({
      originalUrl: inputUrl,
      generatedUrl: generated,
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
