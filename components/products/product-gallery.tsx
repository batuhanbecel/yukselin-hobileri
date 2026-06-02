"use client";

import { useState } from "react";
import { ProductImage } from "./product-image";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: SanityImage[];
  title: string;
};

export function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages =
    images.length > 0 ? images : [undefined as unknown as SanityImage];

  return (
    <div className="space-y-4">
      <div className="polaroid relative rounded-sm p-3 pb-6">
        <span
          className="tape -top-2 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-sm opacity-80"
          aria-hidden
        />
        <ProductImage
          image={displayImages[activeIndex]}
          title={title}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
      {displayImages.length > 1 && displayImages[0]?.asset?._ref && (
        <div className="flex gap-3 overflow-x-auto pb-1">
          {displayImages.map((image, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={cn(
                "relative h-20 w-16 shrink-0 overflow-hidden rounded-sm border-2 transition-colors",
                activeIndex === index
                  ? "border-terracotta"
                  : "border-transparent opacity-70 hover:opacity-100"
              )}
              aria-label={`Fotoğraf ${index + 1}`}
            >
              <ProductImage
                image={image}
                title={`${title} ${index + 1}`}
                className="!aspect-square !h-full !rounded-sm"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
