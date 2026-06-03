import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gift } from "lucide-react";
import { Breadcrumb } from "@/components/breadcrumb";
import { InstagramButton } from "@/components/instagram-button";
import { Reveal } from "@/components/motion/reveal";
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-8 sm:py-16">
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
        className="mb-8 -ml-2 text-ink-soft hover:text-bordeaux"
      >
        <Link href="/urunler">← Tüm çantalar</Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-7">
          <ProductGallery images={product.images} title={product.title} />
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="flex flex-col space-y-7 lg:sticky lg:top-28">
            <div className="flex flex-wrap items-center gap-2">
              {product.category?.title && (
                <Link
                  href={`/urunler/kategori/${product.category.slug.current}`}
                  className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux hover:text-ink"
                >
                  / {product.category.title}
                </Link>
              )}
              <StatusBadge status={product.status} />
              {!isSold && sale.onSale && saleBadge && (
                <span className="rounded-full bg-bordeaux px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-paper shadow-sm">
                  {saleBadge}
                </span>
              )}
              {product.giftReady && !isSold && (
                <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8a6d2f]">
                  <Gift className="size-3" />
                  Hediye paketli
                </span>
              )}
            </div>

            <div>
              <h1 className="font-heading text-4xl font-light leading-[1.05] text-ink sm:text-5xl">
                {product.title}
              </h1>
              <div className="mt-6 flex items-baseline gap-3 border-y border-bordeaux/15 py-4">
                {sale.onSale && (
                  <span className="text-xl text-ink-soft line-through">
                    {formatPrice(sale.originalPrice!)}
                  </span>
                )}
                <span className="font-heading text-3xl text-bordeaux sm:text-4xl">
                  {formatPrice(sale.effectivePrice)}
                </span>
              </div>
            </div>

            {product.description && (
              <p className="text-base leading-relaxed text-ink-soft">
                {product.description}
              </p>
            )}

            {(product.dimensions || product.material || product.care) && (
              <dl className="space-y-3 text-sm">
                {product.dimensions && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-bordeaux/10 pb-2">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                      Boyut
                    </dt>
                    <dd className="text-ink">{product.dimensions}</dd>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-bordeaux/10 pb-2">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                      Malzeme
                    </dt>
                    <dd className="text-ink">{product.material}</dd>
                  </div>
                )}
                {product.care && (
                  <div className="flex items-baseline justify-between gap-4 border-b border-bordeaux/10 pb-2">
                    <dt className="text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                      Bakım
                    </dt>
                    <dd className="text-right text-ink">{product.care}</dd>
                  </div>
                )}
              </dl>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                  Renk seçenekleri
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((c, i) => (
                    <span
                      key={c._key ?? i}
                      className="inline-flex items-center gap-2 rounded-full border border-bordeaux/20 bg-paper px-3 py-1 text-sm text-ink"
                    >
                      {c.hex && (
                        <span
                          className="inline-block size-4 rounded-full border border-ink/15"
                          style={{
                            backgroundColor: c.hex.startsWith("#")
                              ? c.hex
                              : `#${c.hex}`,
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
              <div className="border-l-2 border-bordeaux/40 pl-4">
                {settings.detailNoteHandwritten && (
                  <p className="font-hand text-lg text-bordeaux">
                    {settings.detailNoteHandwritten}
                  </p>
                )}
                {settings.detailNoteText && (
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">
                    {settings.detailNoteText}
                  </p>
                )}
              </div>
            )}

            {!isSold && (
              <div className="flex flex-col gap-3 pt-2">
                <InstagramButton
                  productTitle={product.title}
                  size="lg"
                  className="w-full"
                />
                {settings.whatsappNumber && (
                  <WhatsappButton
                    phone={settings.whatsappNumber}
                    productTitle={product.title}
                    size="lg"
                    className="w-full"
                  />
                )}
                {shopierUrl && (
                  <ShopierButton
                    url={shopierUrl}
                    size="lg"
                    className="w-full"
                  />
                )}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      <RelatedProducts products={related} />
    </div>
  );
}
