/**
 * Sanity webhook → Next.js revalidation
 *
 * Sanity Studio'da bir belge publish edildiğinde Sanity bu endpoint'e POST atar,
 * ilgili sayfa Vercel/Next önbelleğinden temizlenir ve anında güncellenir.
 *
 * Sanity tarafında kurulum (sanity.io/manage → Project → API → Webhooks):
 *   - URL:    https://SİTEN/api/revalidate?secret=SECRET
 *   - HTTP:   POST
 *   - Trigger: Create, Update, Delete
 *   - Filter:  _type in ["homePage","aboutPage","productsPage","faqPage","siteSettings","product","category"]
 *   - Projection (Body):
 *       {
 *         "_type": _type,
 *         "_id": _id,
 *         "slug": slug.current,
 *         "categorySlug": category->slug.current
 *       }
 *
 * .env: SANITY_WEBHOOK_SECRET=...   (Vercel'de de aynı değişken)
 */

import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

type WebhookPayload = {
  _type?: string;
  _id?: string;
  slug?: string;
  categorySlug?: string;
};

export async function POST(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  const expected = process.env.SANITY_WEBHOOK_SECRET;

  if (!expected) {
    return NextResponse.json(
      { error: "Server SANITY_WEBHOOK_SECRET tanımlı değil." },
      { status: 500 }
    );
  }
  if (secret !== expected) {
    return NextResponse.json({ error: "Geçersiz secret." }, { status: 401 });
  }

  let body: WebhookPayload;
  try {
    body = (await request.json()) as WebhookPayload;
  } catch {
    return NextResponse.json({ error: "Geçersiz JSON." }, { status: 400 });
  }

  const type = body._type;
  if (!type) {
    return NextResponse.json({ error: "_type yok." }, { status: 400 });
  }

  const pathsToRevalidate = new Set<string>();

  // Singleton sayfalar
  switch (type) {
    case "homePage":
      pathsToRevalidate.add("/");
      break;
    case "aboutPage":
      pathsToRevalidate.add("/hakkimizda");
      break;
    case "productsPage":
      pathsToRevalidate.add("/urunler");
      break;
    case "faqPage":
      pathsToRevalidate.add("/sss");
      break;
    case "siteSettings":
      // Header/footer her sayfada — layout'u yenile
      pathsToRevalidate.add("/");
      pathsToRevalidate.add("/urunler");
      pathsToRevalidate.add("/hakkimizda");
      pathsToRevalidate.add("/sss");
      break;
    case "product": {
      // Ürün değişti: ana sayfa (öne çıkanlar), tüm ürünler, ürün detayı, kategori sayfası
      pathsToRevalidate.add("/");
      pathsToRevalidate.add("/urunler");
      if (body.slug) pathsToRevalidate.add(`/urunler/${body.slug}`);
      if (body.categorySlug) {
        pathsToRevalidate.add(`/urunler/kategori/${body.categorySlug}`);
      }
      break;
    }
    case "category":
      pathsToRevalidate.add("/urunler");
      if (body.slug) pathsToRevalidate.add(`/urunler/kategori/${body.slug}`);
      break;
    default:
      return NextResponse.json(
        { skipped: true, reason: `Bilinmeyen tip: ${type}` },
        { status: 200 }
      );
  }

  // Sitemap her zaman güncellensin
  pathsToRevalidate.add("/sitemap.xml");

  const paths = Array.from(pathsToRevalidate);
  for (const p of paths) {
    revalidatePath(p, p === "/" ? "layout" : "page");
  }

  return NextResponse.json({
    revalidated: true,
    type,
    paths,
    now: Date.now(),
  });
}

// Tarayıcıdan açınca anlamlı mesaj — sağlık kontrolü olarak
export async function GET() {
  return NextResponse.json({
    status: "ok",
    info: "Bu endpoint POST kabul eder. Sanity webhook'tan tetiklenir.",
  });
}
