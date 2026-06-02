import type { Product } from "@/lib/sanity/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-terracotta/40 bg-white/60 px-6 py-16 text-center">
        <p className="font-hand text-2xl text-terracotta">yakında burada...</p>
        <p className="mt-2 text-cocoa-soft">
          Yeni çantalar şu an tezgahta. Çok yakında paylaşacağım.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < 3}
          index={index}
        />
      ))}
    </div>
  );
}
