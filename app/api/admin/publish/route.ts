/**
 * Admin: yeni ürünü Sanity'e yazar.
 *
 * Body (JSON):
 *   {
 *     imageUrl: string,      // Fal'dan dönen üretilmiş görsel
 *     title, slug, price, salePrice?, description?,
 *     categoryId?, status, dimensions?, material?, care?,
 *     featured?, giftReady?, order?
 *   }
 *
 * 1. Görseli URL'den indirip Sanity asset olarak yükler.
 * 2. Product document'i createOrReplace ile yazar.
 * 3. İlgili sayfaları revalidate eder (anında canlı görünür).
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

export const maxDuration = 60;
export const runtime = "nodejs";

type Body = {
  imageUrl: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number;
  description?: string;
  categoryId?: string;
  status?: "available" | "made-to-order" | "sold";
  dimensions?: string;
  material?: string;
  care?: string;
  featured?: boolean;
  giftReady?: boolean;
  order?: number;
};

function randomKey() {
  return Math.random().toString(36).slice(2, 12);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  if (!body.imageUrl) {
    return NextResponse.json({ error: "Görsel URL'i yok." }, { status: 400 });
  }
  if (!body.title?.trim()) {
    return NextResponse.json({ error: "Başlık zorunlu." }, { status: 400 });
  }
  if (!body.slug?.trim()) {
    return NextResponse.json({ error: "Slug zorunlu." }, { status: 400 });
  }
  if (typeof body.price !== "number" || body.price < 0) {
    return NextResponse.json(
      { error: "Geçerli bir fiyat girin." },
      { status: 400 }
    );
  }

  let client: ReturnType<typeof getSanityWriteClient>;
  try {
    client = getSanityWriteClient();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sanity client hatası.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    // 1) Görseli indir
    const imgRes = await fetch(body.imageUrl);
    if (!imgRes.ok) {
      throw new Error(`Görsel indirilemedi: ${imgRes.status}`);
    }
    const imgBuffer = Buffer.from(await imgRes.arrayBuffer());

    // 2) Sanity'e asset olarak yükle
    const asset = await client.assets.upload("image", imgBuffer, {
      filename: `${body.slug}.jpg`,
      contentType: "image/jpeg",
    });

    // 3) Product document oluştur
    const productDoc = {
      _type: "product",
      title: body.title.trim(),
      slug: { _type: "slug", current: body.slug.trim() },
      price: body.price,
      ...(typeof body.salePrice === "number" && body.salePrice > 0
        ? { salePrice: body.salePrice }
        : {}),
      ...(body.description ? { description: body.description.trim() } : {}),
      ...(body.categoryId
        ? { category: { _type: "reference", _ref: body.categoryId } }
        : {}),
      status: body.status || "available",
      ...(body.dimensions ? { dimensions: body.dimensions.trim() } : {}),
      ...(body.material ? { material: body.material.trim() } : {}),
      ...(body.care ? { care: body.care.trim() } : {}),
      featured: Boolean(body.featured),
      giftReady: Boolean(body.giftReady),
      order: typeof body.order === "number" ? body.order : 0,
      images: [
        {
          _type: "image",
          _key: randomKey(),
          asset: { _type: "reference", _ref: asset._id },
        },
      ],
    };

    const created = await client.create(productDoc);

    // 4) Cache'i temizle (webhook da çalışacak ama biz de tetikleyelim)
    revalidatePath("/", "layout");
    revalidatePath("/urunler");
    revalidatePath(`/urunler/${body.slug}`);

    return NextResponse.json({
      ok: true,
      id: created._id,
      slug: body.slug,
      assetId: asset._id,
    });
  } catch (err) {
    console.error("[admin/publish] error:", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json(
      { error: `Yayınlama başarısız: ${message}` },
      { status: 500 }
    );
  }
}
