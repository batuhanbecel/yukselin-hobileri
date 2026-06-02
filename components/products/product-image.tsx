import Image from "next/image";
import { urlFor } from "@/lib/sanity/image";
import type { SanityImage } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";

type ProductImageProps = {
  image?: SanityImage;
  title: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
};

const PLACEHOLDER_GRADIENTS = [
  "from-terracotta-soft/50 via-cream-deep to-rose-dust/40",
  "from-sage-soft/60 via-cream-deep to-sage/30",
  "from-cream-deep via-honey/30 to-terracotta-soft/40",
  "from-rose-dust/40 via-cream to-terracotta-soft/50",
];

function placeholderGradient(title: string) {
  const index =
    title.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    PLACEHOLDER_GRADIENTS.length;
  return PLACEHOLDER_GRADIENTS[index];
}

export function ProductImage({
  image,
  title,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: ProductImageProps) {
  const hasImage = image?.asset?._ref;

  if (!hasImage) {
    return (
      <div
        className={cn(
          "relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-sm bg-gradient-to-br",
          placeholderGradient(title),
          className
        )}
        aria-label={title}
      >
        <div className="text-center px-6">
          <svg
            className="mx-auto size-14 text-terracotta/60"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden
          >
            <circle cx="50" cy="50" r="32" fill="currentColor" opacity="0.4" />
            <path
              d="M20 50 Q 50 20, 80 50 M 20 50 Q 50 80, 80 50 M 35 25 Q 50 50, 65 75 M 35 75 Q 50 50, 65 25"
              stroke="currentColor"
              strokeWidth="1.5"
              opacity="0.7"
            />
          </svg>
          <p className="font-hand mt-2 text-xl text-terracotta/80">
            fotoğraf yakında
          </p>
        </div>
      </div>
    );
  }

  const src = urlFor(image).width(800).height(1000).fit("crop").url();

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-muted",
        className
      )}
    >
      <Image
        src={src}
        alt={image.alt || title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
