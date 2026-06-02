import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
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

export default async function ProductsPage() {
  const [products, categories, page] = await Promise.all([
    getProducts(),
    getCategories(),
    getProductsPage(),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", href: "/" },
          { label: page.pageTitle || "Ürünler" },
        ]}
      />
      <div className="relative mb-10 text-center">
        {page.pageHandwritten && (
          <p className="font-hand text-2xl text-terracotta">
            {page.pageHandwritten}
          </p>
        )}
        {page.pageTitle && (
          <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
            {page.pageTitle}
          </h1>
        )}
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
        {page.pageDescription && (
          <p className="mx-auto mt-6 max-w-xl text-cocoa-soft">
            {page.pageDescription}
          </p>
        )}
      </div>

      <CategoryFilter categories={categories} />

      <ProductGrid
        products={products}
        emptyMessage={page.emptyMessage}
        emptyDescription={page.emptyDescription}
      />
    </div>
  );
}
