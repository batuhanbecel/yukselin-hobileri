/**
 * Admin: kategori listesi + ekleme.
 *
 * GET  → kategorileri (kullanım sayısıyla beraber) döner
 * POST → yeni kategori oluşturur { title, order? }
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { slugify } from "@/lib/slugify";

export const runtime = "nodejs";

const LIST_QUERY = `*[_type == "category"] | order(order asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  order,
  "productCount": count(*[_type == "product" && references(^._id)])
}`;

export async function GET() {
  let client: ReturnType<typeof getSanityWriteClient>;
  try {
    client = getSanityWriteClient();
  } catch (err) {
    const message = err instanceof Error ? err.message : "Sanity client hatası.";
    return NextResponse.json({ error: message }, { status: 500 });
  }

  try {
    const categories = await client.fetch(LIST_QUERY);
    return NextResponse.json({ categories });
  } catch (err) {
    console.error("[admin/categories GET]", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

type CreateBody = {
  title: string;
  slug?: string;
  order?: number;
};

export async function POST(req: Request) {
  let body: CreateBody;
  try {
    body = (await req.json()) as CreateBody;
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const title = body.title?.trim();
  if (!title) {
    return NextResponse.json({ error: "Kategori adı zorunlu." }, { status: 400 });
  }

  const slug = (body.slug?.trim() || slugify(title)).slice(0, 96);
  if (!slug) {
    return NextResponse.json(
      { error: "Geçerli bir slug üretilemedi." },
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
    // Aynı slug zaten var mı?
    const existing = await client.fetch<{ _id: string } | null>(
      `*[_type == "category" && slug.current == $slug][0]{ _id }`,
      { slug }
    );
    if (existing) {
      return NextResponse.json(
        { error: `"${slug}" slug'lı kategori zaten var.` },
        { status: 409 }
      );
    }

    const doc = {
      _type: "category",
      title,
      slug: { _type: "slug", current: slug },
      order: typeof body.order === "number" ? body.order : 0,
    };

    const created = await client.create(doc);

    revalidatePath("/", "layout");
    revalidatePath("/urunler");

    return NextResponse.json({ ok: true, id: created._id, slug });
  } catch (err) {
    console.error("[admin/categories POST]", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json(
      { error: `Kategori eklenemedi: ${message}` },
      { status: 500 }
    );
  }
}
