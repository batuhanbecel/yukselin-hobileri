import type { Metadata } from "next";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import {
  getCategories,
  getProducts,
  getProductsPage,
} from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "Annemin el emeğiyle ördüğü tüm çantalar. Sipariş için Instagram.",
};

type PageProps = {
  searchParams: Promise<{ kategori?: string }>;
};

export default async function ProductsPage({ searchParams }: PageProps) {
  const { kategori } = await searchParams;
  const [products, categories, page] = await Promise.all([
    getProducts(kategori),
    getCategories(),
    getProductsPage(),
  ]);

  const activeCategory = categories.find((c) => c.slug.current === kategori);
  const heading = activeCategory ? activeCategory.title : page.pageTitle;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="relative mb-10 text-center">
        {page.pageHandwritten && (
          <p className="font-hand text-2xl text-terracotta">
            {page.pageHandwritten}
          </p>
        )}
        {heading && (
          <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
            {heading}
          </h1>
        )}
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
        {page.pageDescription && (
          <p className="mx-auto mt-6 max-w-xl text-cocoa-soft">
            {page.pageDescription}
          </p>
        )}
      </div>

      <CategoryFilter categories={categories} activeSlug={kategori} />

      <ProductGrid
        products={products}
        emptyMessage={page.emptyMessage}
        emptyDescription={page.emptyDescription}
      />
    </div>
  );
}
