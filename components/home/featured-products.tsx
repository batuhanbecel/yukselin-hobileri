import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ProductGrid } from "@/components/products/product-grid";
import type { Product } from "@/lib/sanity/types";

type FeaturedProductsProps = {
  products: Product[];
};

export function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="space-y-8">
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <h2 className="font-heading text-3xl text-foreground">
            Öne Çıkan Çantalar
          </h2>
          <p className="mt-2 text-muted-foreground">
            En sevilen el örgüsü modellerimiz
          </p>
        </div>
        <Button asChild variant="outline" className="border-pink-200">
          <Link href="/urunler">Tümünü Gör</Link>
        </Button>
      </div>
      <ProductGrid products={products} />
    </section>
  );
}
