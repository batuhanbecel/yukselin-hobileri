/**
 * Admin: tek kategori PATCH + DELETE
 *
 * PATCH  → title / order güncelle
 * DELETE → kategoriyi sil (önce kullanılmadığını doğrula)
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";
import { slugify } from "@/lib/slugify";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

type PatchBody = {
  title?: string;
  order?: number;
};

export async function PATCH(req: Request, { params }: Params) {
  const { id } = await params;
  let body: PatchBody;
  try {
    body = (await req.json()) as PatchBody;
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const set: Record<string, unknown> = {};
  if (body.title?.trim()) {
    const title = body.title.trim();
    set.title = title;
    set.slug = { _type: "slug", current: slugify(title).slice(0, 96) };
  }
  if (typeof body.order === "number") set.order = body.order;

  if (Object.keys(set).length === 0) {
    return NextResponse.json(
      { error: "Güncellenecek alan yok." },
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
    const prev = await client.fetch<{ slug?: { current?: string } } | null>(
      `*[_id == $id][0]{ "slug": slug.current }`,
      { id }
    );
    const updated = await client.patch(id).set(set).commit();
    const newSlug = (set.slug as { current?: string } | undefined)?.current;
    revalidatePath("/", "layout");
    revalidatePath("/urunler");
    if (prev?.slug) revalidatePath(`/urunler/kategori/${prev.slug}`);
    if (newSlug) revalidatePath(`/urunler/kategori/${newSlug}`);
    return NextResponse.json({ ok: true, id: updated._id });
  } catch (err) {
    console.error("[admin/categories/:id PATCH]", err);
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
    // Kategori başka ürünlerde kullanılıyor mu?
    const refCount = await client.fetch<number>(
      `count(*[_type == "product" && references($id)])`,
      { id }
    );
    if (refCount > 0) {
      return NextResponse.json(
        {
          error: `Bu kategori ${refCount} üründe kullanılıyor. Önce ürünlerin kategorisini değiştirin.`,
        },
        { status: 409 }
      );
    }

    await client.delete(id);
    revalidatePath("/", "layout");
    revalidatePath("/urunler");
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[admin/categories/:id DELETE]", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json(
      { error: `Silme başarısız: ${message}` },
      { status: 500 }
    );
  }
}
