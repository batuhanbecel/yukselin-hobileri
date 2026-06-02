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
  "from-pink-100 via-rose-50 to-pink-200",
  "from-violet-100 via-purple-50 to-lavender-100",
  "from-amber-50 via-orange-50 to-peach-100",
  "from-emerald-50 via-teal-50 to-sage-100",
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
          "relative flex aspect-[4/5] w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br",
          placeholderGradient(title),
          className
        )}
        aria-label={title}
      >
        <div className="text-center px-6">
          <span className="text-5xl" role="img" aria-hidden>
            🧶
          </span>
          <p className="mt-3 font-heading text-sm text-foreground/60">
            Fotoğraf yakında
          </p>
        </div>
      </div>
    );
  }

  const src = urlFor(image).width(800).height(1000).fit("crop").url();

  return (
    <div
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-muted",
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
