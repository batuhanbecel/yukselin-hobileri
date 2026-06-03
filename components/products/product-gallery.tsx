"use client";

import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";

type ProductGalleryProps = {
  images: SanityImage[];
  title: string;
  placeholderLabel?: string;
};

export function ProductGallery({
  images,
  title,
  placeholderLabel,
}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const displayImages =
    images.length > 0 ? images : [undefined as unknown as SanityImage];
  const hasRealImages = displayImages[0]?.asset?._ref;

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + displayImages.length) % displayImages.length);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % displayImages.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, displayImages.length]);

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => hasRealImages && setLightboxOpen(true)}
        className={cn(
          "polaroid group relative block w-full rounded-sm p-3 pb-6 text-left",
          hasRealImages && "cursor-zoom-in"
        )}
        aria-label={hasRealImages ? "Fotoğrafı büyüt" : title}
      >
        <span
          className="tape -top-2 left-1/2 h-5 w-20 -translate-x-1/2 -rotate-2 rounded-sm opacity-80"
          aria-hidden
        />
        <ProductImage
          image={displayImages[activeIndex]}
          title={title}
          priority
          placeholderLabel={placeholderLabel}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {hasRealImages && (
          <span className="pointer-events-none absolute bottom-8 right-5 rounded-full bg-cocoa/70 px-3 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
            Büyüt
          </span>
        )}
      </button>

      {displayImages.length > 1 && hasRealImages && (
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
                placeholderLabel={placeholderLabel}
                className="!aspect-square !h-full !rounded-sm"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && hasRealImages && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Fotoğraf görüntüleyici"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cocoa/90 backdrop-blur-sm"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLightboxOpen(false);
            }}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 text-cocoa shadow-md hover:bg-white"
            aria-label="Kapat"
          >
            <X className="size-5" />
          </button>

          {displayImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex(
                    (i) => (i - 1 + displayImages.length) % displayImages.length
                  );
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-cocoa shadow-md hover:bg-white"
                aria-label="Önceki"
              >
                <ChevronLeft className="size-6" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((i) => (i + 1) % displayImages.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-cocoa shadow-md hover:bg-white"
                aria-label="Sonraki"
              >
                <ChevronRight className="size-6" />
              </button>
            </>
          )}

          <div
            className="max-h-[85vh] w-full max-w-4xl px-12"
            onClick={(e) => e.stopPropagation()}
          >
            <ProductImage
              image={displayImages[activeIndex]}
              title={title}
              priority
              placeholderLabel={placeholderLabel}
              sizes="(max-width: 1024px) 100vw, 800px"
            />
            {displayImages.length > 1 && (
              <p className="mt-3 text-center text-sm text-white/70">
                {activeIndex + 1} / {displayImages.length}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
