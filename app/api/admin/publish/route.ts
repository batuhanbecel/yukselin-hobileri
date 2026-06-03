/**
 * Admin: yeni ürünü Sanity'e yazar.
 *
 * Body (JSON):
 *   {
 *     imageUrls: string[],   // Fal'dan dönen üretilmiş görseller
 *     title, slug, price,
 *     salePrice?, saleBadge?,
 *     description?, categoryId?,
 *     status, dimensions?, material?, care?,
 *     colors?: [{name, hex}],
 *     shopierUrl?,
 *     featured?, giftReady?,
 *     order?
 *   }
 *
 * 1. Tüm görselleri URL'den indirip Sanity asset'lerine yükler.
 * 2. Product document'i create ile yazar.
 * 3. İlgili sayfaları revalidate eder.
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

export const maxDuration = 60;
export const runtime = "nodejs";

type ColorInput = { name: string; hex?: string; _key?: string };

type Body = {
  imageUrls?: string[];
  imageUrl?: string;
  title: string;
  slug: string;
  price: number;
  salePrice?: number;
  saleBadge?: string;
  description?: string;
  categoryId?: string;
  status?: "available" | "made-to-order" | "sold";
  dimensions?: string;
  material?: string;
  care?: string;
  colors?: ColorInput[];
  shopierUrl?: string;
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

  const imageUrls = Array.isArray(body.imageUrls)
    ? body.imageUrls.filter(
        (u): u is string => typeof u === "string" && u.startsWith("http")
      )
    : body.imageUrl
      ? [body.imageUrl]
      : [];

  if (imageUrls.length === 0) {
    return NextResponse.json(
      { error: "En az bir görsel URL'i lazım." },
      { status: 400 }
    );
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
    const assets = await Promise.all(
      imageUrls.map(async (url, i) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`Görsel indirilemedi (${i}): ${res.status}`);
        const buffer = Buffer.from(await res.arrayBuffer());
        return client.assets.upload("image", buffer, {
          filename: `${body.slug}-${i + 1}.jpg`,
          contentType: "image/jpeg",
        });
      })
    );

    const cleanedColors = (body.colors ?? [])
      .filter((c) => c?.name?.trim())
      .map((c) => ({
        _type: "object",
        _key: c._key || randomKey(),
        name: c.name.trim(),
        ...(c.hex?.trim() ? { hex: c.hex.trim() } : {}),
      }));

    const productDoc = {
      _type: "product",
      title: body.title.trim(),
      slug: { _type: "slug", current: body.slug.trim() },
      price: body.price,
      ...(typeof body.salePrice === "number" && body.salePrice > 0
        ? { salePrice: body.salePrice }
        : {}),
      ...(body.saleBadge?.trim() ? { saleBadge: body.saleBadge.trim() } : {}),
      ...(body.description?.trim()
        ? { description: body.description.trim() }
        : {}),
      ...(body.categoryId
        ? { category: { _type: "reference", _ref: body.categoryId } }
        : {}),
      status: body.status || "available",
      ...(body.dimensions?.trim()
        ? { dimensions: body.dimensions.trim() }
        : {}),
      ...(body.material?.trim() ? { material: body.material.trim() } : {}),
      ...(body.care?.trim() ? { care: body.care.trim() } : {}),
      ...(cleanedColors.length > 0 ? { colors: cleanedColors } : {}),
      ...(body.shopierUrl?.trim()
        ? { shopierUrl: body.shopierUrl.trim() }
        : {}),
      featured: Boolean(body.featured),
      giftReady: Boolean(body.giftReady),
      order: typeof body.order === "number" ? body.order : 0,
      images: assets.map((asset) => ({
        _type: "image",
        _key: randomKey(),
        asset: { _type: "reference", _ref: asset._id },
      })),
    };

    const created = await client.create(productDoc);

    revalidatePath("/", "layout");
    revalidatePath("/urunler");
    revalidatePath(`/urunler/${body.slug}`);

    return NextResponse.json({
      ok: true,
      id: created._id,
      slug: body.slug,
      assetIds: assets.map((a) => a._id),
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
