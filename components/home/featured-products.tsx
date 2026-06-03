import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-grid";
import type { HomePage, Product } from "@/lib/sanity/types";

type FeaturedProductsProps = {
  products: Product[];
  data: HomePage;
};

export function FeaturedProducts({ products, data }: FeaturedProductsProps) {
  return (
    <section className="space-y-12">
      <div className="grid items-end gap-6 border-b border-bordeaux/10 pb-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
              / Vitrin
            </span>
            <span className="h-px flex-1 bg-bordeaux/20" />
          </div>
          {data.featuredHandwritten && (
            <p className="font-hand mt-3 text-2xl text-bordeaux">
              {data.featuredHandwritten}
            </p>
          )}
          {data.featuredTitle && (
            <h2 className="mt-1 font-heading text-4xl font-light leading-[1.05] text-ink sm:text-5xl md:text-6xl">
              {data.featuredTitle}
            </h2>
          )}
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-5">
          <div className="space-y-5">
            {data.featuredSubtitle && (
              <p className="max-w-md text-base leading-relaxed text-ink-soft">
                {data.featuredSubtitle}
              </p>
            )}
            <Link
              href="/urunler"
              className="link-underline inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-ink hover:text-bordeaux"
            >
              {data.featuredLinkLabel || "Tümünü gör"}
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </Reveal>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}
