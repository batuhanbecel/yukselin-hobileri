import type { Product } from "@/lib/sanity/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-pink-200 bg-white/60 px-6 py-16 text-center">
        <p className="text-lg text-muted-foreground">
          Henüz ürün eklenmemiş. Yakında burada olacak!
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < 3}
        />
      ))}
    </div>
  );
}
