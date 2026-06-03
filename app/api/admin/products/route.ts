/**
 * Admin: tüm ürünleri listele (admin liste sayfası için).
 * Sanity write client kullanır (draft + published görünür olsun diye).
 */

import { NextResponse } from "next/server";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

export const runtime = "nodejs";

const LIST_QUERY = `*[_type == "product"] | order(order asc, _createdAt desc) {
  _id,
  title,
  "slug": slug.current,
  price,
  salePrice,
  status,
  featured,
  order,
  "categoryTitle": category->title,
  "thumb": images[0].asset->url,
  _updatedAt
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
    const products = await client.fetch(LIST_QUERY);
    return NextResponse.json({ products });
  } catch (err) {
    console.error("[admin/products] error:", err);
    const message = err instanceof Error ? err.message : "Bilinmeyen hata.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
