import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import {
  getCategories,
  getProducts,
  getProductsPage,
  getSiteSettings,
} from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getProductsPage();
  return {
    title: page.metaTitle || page.pageTitle || "Ürünler",
    description:
      page.metaDescription ||
      "Annemin el emeğiyle ördüğü tüm çantalar. Sipariş için Instagram.",
  };
}

export default async function ProductsPage() {
  const [products, categories, page, settings] = await Promise.all([
    getProducts(),
    getCategories(),
    getProductsPage(),
    getSiteSettings(),
  ]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
      <Breadcrumb
        items={[
          {
            label: settings.breadcrumbHomeLabel || "Ana sayfa",
            href: "/",
          },
          { label: page.pageTitle || "Ürünler" },
        ]}
      />

      <Reveal>
        <div className="mb-12 grid items-end gap-6 border-b border-bordeaux/10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                {page.collectionSectionLabel || "/ Koleksiyon"}
              </span>
              <span className="h-px flex-1 bg-bordeaux/20" />
            </div>
            {page.pageHandwritten && (
              <p className="font-hand mt-3 text-2xl text-bordeaux">
                {page.pageHandwritten}
              </p>
            )}
            {page.pageTitle && (
              <h1 className="font-heading mt-1 text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
                {page.pageTitle}
              </h1>
            )}
          </div>
          {page.pageDescription && (
            <p className="text-base leading-relaxed text-ink-soft lg:col-span-5">
              {page.pageDescription}
            </p>
          )}
        </div>
      </Reveal>

      <CategoryFilter
        categories={categories}
        allLabel={settings.allCategoriesLabel}
      />

      <ProductGrid
        products={products}
        emptyMessage={page.emptyMessage}
        emptyDescription={page.emptyDescription}
        imagePlaceholderLabel={settings.imagePlaceholderLabel}
      />
    </div>
  );
}
