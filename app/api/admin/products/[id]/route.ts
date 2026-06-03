/**
 * Admin: tek bir ürünün GET + PATCH + DELETE
 *
 * GET    — düzenleme formunu doldurmak için tam veriyi döner
 * PATCH  — sadece gönderilen alanları günceller, görsellere dokunmaz
 * DELETE — ürünü kalıcı siler
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

export const runtime = "nodejs";

const PRODUCT_QUERY = `*[_id == $id][0]{
  _id,
  title,
  "slug": slug.current,
  price,
  salePrice,
  saleBadge,
  description,
  dimensions,
  material,
  care,
  colors,
  status,
  giftReady,
  shopierUrl,
  featured,
  order,
  "categoryId": category._ref,
  images[]{
    _key,
    "url": asset->url,
    alt
  }
}`;

type Params = { params: Promise<{ id: string }> };

type ColorInput = { _key?: string; name: string; hex?: string };

type PatchBody = {
  title?: string;
  slug?: string;
  price?: number;
  salePrice?: number | null;
  saleBadge?: string | null;
  description?: string | null;
  categoryId?: string | null;
  status?: "available" | "made-to-order" | "sold";
  dimensions?: string | null;
  material?: string | null;
  care?: string | null;
  colors?: ColorInput[] | null;
  shopierUrl?: string | null;
  featured?: boolean;
  giftReady?: boolean;
  order?: number;
};

function randomKey() {
  return Math.random().toString(36).slice(2, 12);
}

export async function GET(_: Request, { params }: Params) {
  const { id } = await params;
  let client: ReturnType<typeof getSanityWriteClient>;
  try {
    client = getSanityWriteClient();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sanity client hatası.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    const product = await client.fetch(PRODUCT_QUERY, { id });
    if (!product) {
      return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch (err) {
    console.error("[admin/products/:id GET]", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  let client: ReturnType<typeof getSanityWriteClient>;
  try {
    client = getSanityWriteClient();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sanity client hatası.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Set/unset patch — null gelirse alan silinir
  const set: Record<string, unknown> = {};
  const unset: string[] = [];

  const stringField = (
    key: keyof PatchBody,
    fieldName: string
  ) => {
    const v = body[key];
    if (v === undefined) return;
    if (v === null || (typeof v === "string" && !v.trim())) {
      unset.push(fieldName);
    } else if (typeof v === "string") {
      set[fieldName] = v.trim();
    }
  };

  if (body.title !== undefined && body.title.trim()) {
    set.title = body.title.trim();
  }
  if (body.slug !== undefined && body.slug.trim()) {
    set.slug = { _type: "slug", current: body.slug.trim() };
  }
  if (typeof body.price === "number" && body.price >= 0) {
    set.price = body.price;
  }
  if (body.salePrice === null) {
    unset.push("salePrice");
  } else if (typeof body.salePrice === "number" && body.salePrice > 0) {
    set.salePrice = body.salePrice;
  }
  stringField("saleBadge", "saleBadge");
  stringField("description", "description");
  stringField("dimensions", "dimensions");
  stringField("material", "material");
  stringField("care", "care");
  stringField("shopierUrl", "shopierUrl");

  if (body.categoryId !== undefined) {
    if (body.categoryId === null || body.categoryId === "") {
      unset.push("category");
    } else {
      set.category = { _type: "reference", _ref: body.categoryId };
    }
  }

  if (body.status) set.status = body.status;
  if (typeof body.featured === "boolean") set.featured = body.featured;
  if (typeof body.giftReady === "boolean") set.giftReady = body.giftReady;
  if (typeof body.order === "number") set.order = body.order;

  if (body.colors !== undefined) {
    if (body.colors === null || body.colors.length === 0) {
      unset.push("colors");
    } else {
      set.colors = body.colors
        .filter((c) => c?.name?.trim())
        .map((c) => ({
          _type: "object",
          _key: c._key || randomKey(),
          name: c.name.trim(),
          ...(c.hex?.trim() ? { hex: c.hex.trim() } : {}),
        }));
    }
  }

  try {
    let patcher = client.patch(id);
    if (Object.keys(set).length > 0) patcher = patcher.set(set);
    if (unset.length > 0) patcher = patcher.unset(unset);
    const updated = await patcher.commit();

    // Slug değişmiş olabilir — yeniden okuyup canlı path'i revalidate edelim
    const slug =
      (set.slug as { current?: string } | undefined)?.current ||
      (updated as { slug?: { current?: string } }).slug?.current;

    revalidatePath("/", "layout");
    revalidatePath("/urunler");
    if (slug) revalidatePath(`/urunler/${slug}`);

    return NextResponse.json({ ok: true, id: updated._id });
  } catch (err) {
    console.error("[admin/products/:id PATCH]", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json(
      { error: `Güncelleme başarısız: ${message}` },
      { status: 500 }
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;
  let client: ReturnType<typeof getSanityWriteClient>;
  try {
    client = getSanityWriteClient();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sanity client hatası.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    // slug'ı önce alalım ki revalidate edebilelim
    const existing = await client.fetch<{ slug?: { current?: string } } | null>(
      `*[_id == $id][0]{ slug }`,
      { id }
    );
    await client.delete(id);

    revalidatePath("/", "layout");
    revalidatePath("/urunler");
    if (existing?.slug?.current) {
      revalidatePath(`/urunler/${existing.slug.current}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/products/:id DELETE]", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json(
      { error: `Silme başarısız: ${message}` },
      { status: 500 }
    );
  }
}
