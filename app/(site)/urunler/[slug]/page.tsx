import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { InstagramButton } from "@/components/instagram-button";
import { ProductGallery } from "@/components/products/product-gallery";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/format";
import {
  getProductBySlug,
  getProductSlugs,
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
  if (!product) return { title: "Ürün bulunamadı" };
  return {
    title: product.title,
    description:
      product.description ||
      `${product.title} — ${formatPrice(product.price)}. Instagram'dan sipariş verin.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Button asChild variant="ghost" className="mb-6 -ml-2 text-muted-foreground">
        <Link href="/urunler">← Tüm ürünler</Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
        <ProductGallery images={product.images} title={product.title} />

        <div className="flex flex-col justify-center space-y-6">
          <div>
            <h1 className="font-heading text-3xl sm:text-4xl">
              {product.title}
            </h1>
            <p className="mt-4 text-3xl font-semibold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          {product.description && (
            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="rounded-2xl border border-pink-100 bg-pink-soft/30 p-5">
            <p className="text-sm text-foreground/80">
              Bu siteden doğrudan satış yapılmamaktadır. Sipariş ve özel
              talepleriniz için Instagram hesabımızdan bize yazın.
            </p>
          </div>

          <InstagramButton productTitle={product.title} size="lg" className="w-full sm:w-auto" />
        </div>
      </div>
    </div>
  );
}
