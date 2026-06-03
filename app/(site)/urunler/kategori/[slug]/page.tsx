import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/breadcrumb";
import { Reveal } from "@/components/motion/reveal";
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
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-8 sm:py-20">
      <Breadcrumb
        items={[
          { label: "Ana sayfa", href: "/" },
          { label: page.pageTitle || "Ürünler", href: "/urunler" },
          { label: cat.title },
        ]}
      />

      <Reveal>
        <div className="mb-12 grid items-end gap-6 border-b border-bordeaux/10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                / Kategori
              </span>
              <span className="h-px flex-1 bg-bordeaux/20" />
            </div>
            {page.pageHandwritten && (
              <p className="font-hand mt-3 text-2xl text-bordeaux">
                {page.pageHandwritten}
              </p>
            )}
            <h1 className="font-heading mt-1 text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
              {cat.title}
            </h1>
          </div>
        </div>
      </Reveal>

      <CategoryFilter categories={categories} activeSlug={slug} />

      <ProductGrid
        products={products}
        emptyMessage={page.emptyMessage}
        emptyDescription={page.emptyDescription}
      />
    </div>
  );
}
