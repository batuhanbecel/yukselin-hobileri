import type { Metadata } from "next";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import { getCategories, getProducts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Çantalar",
  description:
    "Annemin el emeğiyle ördüğü tüm çantalar. Sipariş için Instagram.",
};

type PageProps = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const { kategori } = await searchParams;
  const [products, categories] = await Promise.all([
    getProducts(kategori),
    getCategories(),
  ]);

  const activeCategory = categories.find((c) => c.slug.current === kategori);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mb-10 text-center">
        <p className="font-hand text-2xl text-terracotta">tüm koleksiyon</p>
        <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
          {activeCategory ? activeCategory.title : "Ürünler"}
        </h1>
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
        <p className="mx-auto mt-6 max-w-xl text-cocoa-soft">
          Her biri tek tek, sevgiyle örüldü. Beğendiğin ürünün altındaki
          Instagram butonuna dokun, gerisini birlikte halledelim.
        </p>
      </div>

      <CategoryFilter categories={categories} activeSlug={kategori} />

      <ProductGrid products={products} />
    </div>
  );
}
