import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gift } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { InstagramButton } from "@/components/instagram-button";
import { ProductGallery } from "@/components/products/product-gallery";
import { RelatedProducts } from "@/components/products/related-products";
import { StatusBadge } from "@/components/products/status-badge";
import { ShopierButton } from "@/components/shopier-button";
import { WhatsappButton } from "@/components/whatsapp-button";
import { Button } from "@/components/ui/button";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { computeSale, formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getProductSlugs,
  getRelatedProducts,
  getSiteSettings,
} from "@/lib/sanity/fetch";
import { urlFor } from "@/lib/sanity/image";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Çanta bulunamadı" };
  const sale = computeSale(product.price, product.salePrice);
  const ogImage = product.images?.[0]?.asset?._ref
    ? urlFor(product.images[0]).width(1200).height(630).fit("crop").url()
    : undefined;
  return {
    title: product.title,
    description:
      product.description ||
      `${product.title} — ${formatPrice(sale.effectivePrice)}. Instagram'dan sipariş verin.`,
    openGraph: {
      title: product.title,
      description: product.description,
      images: ogImage ? [ogImage] : undefined,
      type: "website",
    },
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const shopierUrl = product.shopierUrl || settings.shopierStoreUrl;
  const sale = computeSale(product.price, product.salePrice);
  const saleBadge =
    product.saleBadge?.trim() ||
    (sale.onSale && sale.percentOff ? `%${sale.percentOff} indirim` : null);
  const isSold = product.status === "sold";

  const ogImage = product.images?.[0]?.asset?._ref
    ? urlFor(product.images[0]).width(1200).height(1200).fit("crop").url()
    : undefined;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    image: ogImage ? [ogImage] : undefined,
    sku: product._id,
    brand: { "@type": "Brand", name: SITE_NAME },
    category: product.category?.title,
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/urunler/${product.slug.current}`,
      priceCurrency: "TRY",
      price: sale.effectivePrice,
      availability: isSold
        ? "https://schema.org/SoldOut"
        : product.status === "made-to-order"
        ? "https://schema.org/PreOrder"
        : "https://schema.org/InStock",
    },
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: "Ana sayfa", href: "/" },
          { label: "Ürünler", href: "/urunler" },
          ...(product.category
            ? [
                {
                  label: product.category.title,
                  href: `/urunler/kategori/${product.category.slug.current}`,
                },
              ]
            : []),
          { label: product.title },
        ]}
      />

      <Button
        asChild
        variant="ghost"
        className="mb-6 -ml-2 text-cocoa-soft hover:text-terracotta"
      >
        <Link href="/urunler">← Tüm çantalar</Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            {product.category?.title && (
              <Link
                href={`/urunler/kategori/${product.category.slug.current}`}
                className="rounded-full border border-terracotta/30 bg-white/60 px-3 py-1 text-xs font-medium text-cocoa hover:bg-terracotta-soft/30"
              >
                {product.category.title}
              </Link>
            )}
            <StatusBadge status={product.status} />
            {!isSold && sale.onSale && saleBadge && (
              <span className="rounded-full bg-terracotta px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
                {saleBadge}
              </span>
            )}
            {product.giftReady && !isSold && (
              <span className="inline-flex items-center gap-1 rounded-full border border-honey/40 bg-honey/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#8a5a1f]">
                <Gift className="size-3" />
                Hediye paketli
              </span>
            )}
            {product.featured && !sale.onSale && !isSold && (
              <p className="font-hand text-xl text-terracotta">özel parça</p>
            )}
          </div>

          <div>
            <h1 className="font-heading text-4xl leading-tight text-cocoa sm:text-5xl">
              {product.title}
            </h1>
            {sale.onSale ? (
              <div className="mt-4 flex flex-wrap items-baseline gap-3">
                <span className="text-2xl text-cocoa-soft line-through">
                  {formatPrice(sale.originalPrice!)}
                </span>
                <span className="font-hand text-5xl text-terracotta">
                  {formatPrice(sale.effectivePrice)}
                </span>
              </div>
            ) : (
              <div className="mt-4 inline-flex items-baseline gap-2">
                <span className="font-hand text-4xl text-terracotta">
                  {formatPrice(sale.effectivePrice)}
                </span>
              </div>
            )}
          </div>

          {product.description && (
            <p className="text-lg leading-relaxed text-cocoa-soft">
              {product.description}
            </p>
          )}

          {/* Details grid */}
          {(product.dimensions || product.material || product.care) && (
            <dl className="grid grid-cols-2 gap-3 rounded-2xl border border-terracotta-soft/30 bg-white/60 p-4 text-sm">
              {product.dimensions && (
                <div>
                  <dt className="font-hand text-base text-terracotta">Boyut</dt>
                  <dd className="text-cocoa">{product.dimensions}</dd>
                </div>
              )}
              {product.material && (
                <div>
                  <dt className="font-hand text-base text-terracotta">Malzeme</dt>
                  <dd className="text-cocoa">{product.material}</dd>
                </div>
              )}
              {product.care && (
                <div className="col-span-2">
                  <dt className="font-hand text-base text-terracotta">Bakım</dt>
                  <dd className="text-cocoa">{product.care}</dd>
                </div>
              )}
            </dl>
          )}

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <p className="font-hand mb-2 text-base text-terracotta">
                Renk seçenekleri
              </p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, i) => (
                  <span
                    key={c._key ?? i}
                    className="inline-flex items-center gap-2 rounded-full border border-cocoa-soft/30 bg-white/70 px-3 py-1 text-sm text-cocoa"
                  >
                    {c.hex && (
                      <span
                        className="inline-block size-4 rounded-full border border-cocoa-soft/30"
                        style={{
                          backgroundColor: c.hex.startsWith("#") ? c.hex : `#${c.hex}`,
                        }}
                        aria-hidden
                      />
                    )}
                    {c.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(settings.detailNoteHandwritten || settings.detailNoteText) && (
            <div className="rounded-3xl border border-dashed border-terracotta/40 bg-white/60 p-6">
              {settings.detailNoteHandwritten && (
                <p className="font-hand text-xl text-terracotta">
                  {settings.detailNoteHandwritten}
                </p>
              )}
              {settings.detailNoteText && (
                <p className="mt-1 text-sm leading-relaxed text-cocoa-soft">
                  {settings.detailNoteText}
                </p>
              )}
            </div>
          )}

          {!isSold && (
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <InstagramButton
                productTitle={product.title}
                size="lg"
                className="w-full sm:w-auto"
              />
              {settings.whatsappNumber && (
                <WhatsappButton
                  phone={settings.whatsappNumber}
                  productTitle={product.title}
                  size="lg"
                  className="w-full sm:w-auto"
                />
              )}
              {shopierUrl && (
                <ShopierButton
                  url={shopierUrl}
                  size="lg"
                  className="w-full sm:w-auto"
                />
              )}
            </div>
          )}
        </div>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
