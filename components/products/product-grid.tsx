import type { Product } from "@/lib/sanity/types";
import { ProductCard } from "./product-card";

type ProductGridProps = {
  products: Product[];
  emptyMessage?: string;
  emptyDescription?: string;
  imagePlaceholderLabel?: string;
};

export function ProductGrid({
  products,
  emptyMessage = "yakında burada...",
  emptyDescription = "Yeni çantalar şu an tezgahta. Çok yakında paylaşacağım.",
  imagePlaceholderLabel,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-bordeaux/30 bg-paper/60 px-6 py-20 text-center">
        <p className="font-hand text-2xl text-bordeaux">{emptyMessage}</p>
        <p className="mt-2 text-ink-soft">{emptyDescription}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product, index) => (
        <ProductCard
          key={product._id}
          product={product}
          priority={index < 3}
          index={index}
          imagePlaceholderLabel={imagePlaceholderLabel}
        />
      ))}
    </div>
  );
}
