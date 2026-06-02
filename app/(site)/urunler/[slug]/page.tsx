import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstagramButton } from "@/components/instagram-button";
import { ProductGallery } from "@/components/products/product-gallery";
import { ShopierButton } from "@/components/shopier-button";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getProductSlugs,
  getSiteSettings,
} from "@/lib/sanity/fetch";

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
  return {
    title: product.title,
    description:
      product.description ||
      `${product.title} — ${formatPrice(product.price)}. Instagram'dan sipariş verin.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const [product, settings] = await Promise.all([
    getProductBySlug(slug),
    getSiteSettings(),
  ]);

  if (!product) notFound();

  const shopierUrl = product.shopierUrl || settings.shopierStoreUrl;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Button
        asChild
        variant="ghost"
        className="mb-8 -ml-2 text-cocoa-soft hover:text-terracotta"
      >
        <Link href="/urunler">← Tüm çantalar</Link>
      </Button>

      <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative">
          <ProductGallery images={product.images} title={product.title} />
        </div>

        <div className="flex flex-col justify-center space-y-6">
          <div className="flex items-center gap-3">
            {product.category?.title && (
              <Link
                href={`/urunler?kategori=${product.category.slug.current}`}
                className="rounded-full border border-terracotta/30 bg-white/60 px-3 py-1 text-xs font-medium text-cocoa hover:bg-terracotta-soft/30"
              >
                {product.category.title}
              </Link>
            )}
            {product.featured && (
              <p className="font-hand text-2xl text-terracotta">özel parça</p>
            )}
          </div>

          <div>
            <h1 className="font-heading text-4xl leading-tight text-cocoa sm:text-5xl">
              {product.title}
            </h1>
            <div className="mt-4 inline-flex items-baseline gap-2">
              <span className="font-hand text-4xl text-terracotta">
                {formatPrice(product.price)}
              </span>
            </div>
          </div>

          {product.description && (
            <p className="text-lg leading-relaxed text-cocoa-soft">
              {product.description}
            </p>
          )}

          <div className="rounded-3xl border border-dashed border-terracotta/40 bg-white/60 p-6">
            <p className="font-hand text-xl text-terracotta">küçük bir not</p>
            <p className="mt-1 text-sm leading-relaxed text-cocoa-soft">
              Bu siteden doğrudan satış yapılmamaktadır. Çanta hoşunuza
              gittiyse Instagram&apos;dan bana yazabilirsiniz; renk, model ve
              detaylarını birlikte konuşalım.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <InstagramButton
              productTitle={product.title}
              size="lg"
              className="w-full sm:w-auto"
            />
            {shopierUrl && (
              <ShopierButton
                url={shopierUrl}
                size="lg"
                className="w-full sm:w-auto"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
