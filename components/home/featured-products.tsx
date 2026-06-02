import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import type { Product } from "@/lib/sanity/types";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="space-y-10">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div className="relative">
          <p className="font-hand text-2xl text-terracotta">
            seçtiklerim
          </p>
          <h2 className="font-heading text-4xl text-cocoa sm:text-5xl">
            Öne çıkan çantalar
          </h2>
          <p className="mt-3 max-w-md text-cocoa-soft">
            En çok sevilen, en çok sorulan parçalar.
          </p>
        </div>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-terracotta/30 bg-white/60 text-cocoa hover:bg-terracotta-soft/30 hover:text-cocoa"
        >
          <Link href="/urunler">Tümünü gör →</Link>
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
