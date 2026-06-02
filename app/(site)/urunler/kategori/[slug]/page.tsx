import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { CategoryFilter } from "@/components/products/category-filter";
import { ProductGrid } from "@/components/products/product-grid";
import {
  getCategories,
  getProducts,
  getProductsPage,
} from "@/lib/sanity/fetch";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ slug: c.slug.current }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const cat = categories.find((c) => c.slug.current === slug);
  if (!cat) return { title: "Kategori bulunamadı" };
  return {
    title: cat.title,
    description: `${cat.title} kategorisindeki tüm el emeği ürünlerimiz.`,
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [products, categories, page] = await Promise.all([
    getProducts(slug),
    getCategories(),
    getProductsPage(),
  ]);

  const cat = categories.find((c) => c.slug.current === slug);
  if (!cat) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", href: "/" },
          { label: page.pageTitle || "Ürünler", href: "/urunler" },
          { label: cat.title },
        ]}
      />
      <div className="relative mb-10 text-center">
        {page.pageHandwritten && (
          <p className="font-hand text-2xl text-terracotta">
            {page.pageHandwritten}
          </p>
        )}
        <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
          {cat.title}
        </h1>
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
      </div>

      <CategoryFilter categories={categories} activeSlug={slug} />

      <ProductGrid
        products={products}
        emptyMessage={page.emptyMessage}
        emptyDescription={page.emptyDescription}
      />
    </div>
  );
}
