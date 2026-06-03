"use client";

import type { Product } from "@/lib/sanity/types";
import { useSiteSettings } from "@/lib/site-context";
import { ProductCard } from "./product-card";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  const settings = useSiteSettings();
  if (products.length === 0) return null;

  return (
    <section className="mt-20 border-t border-dashed border-terracotta/20 pt-12">
      <div className="mb-8 text-center">
        {settings.relatedProductsHandwritten && (
          <p className="font-hand text-xl text-terracotta">
            {settings.relatedProductsHandwritten}
          </p>
        )}
        {settings.relatedProductsTitle && (
          <h2 className="font-heading text-3xl text-cocoa sm:text-4xl">
            {settings.relatedProductsTitle}
          </h2>
        )}
      </div>
      <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
        {products.map((product, index) => (
          <ProductCard key={product._id} product={product} index={index} />
        ))}
      </div>
    </section>
  );
}
