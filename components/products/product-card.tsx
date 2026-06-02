import Link from "next/link";
import { InstagramButton } from "@/components/instagram-button";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  index?: number;
};

const WOBBLES = ["wobble-1", "wobble-2", "wobble-3", "wobble-4"];

export function ProductCard({ product, priority, index = 0 }: ProductCardProps) {
  const slug = product.slug.current;
  const wobble = WOBBLES[index % WOBBLES.length];

  return (
    <div className="group relative pt-3">
      {/* washi tape decoration */}
      <span
        className="tape left-1/2 top-0 h-5 w-16 -translate-x-1/2 -rotate-3 rounded-sm opacity-80 transition-transform group-hover:-rotate-6"
        aria-hidden
      />

      <div
        className={cn(
          "polaroid relative rounded-sm p-3 pb-5 transition-all duration-300 group-hover:!rotate-0 group-hover:shadow-xl",
          wobble
        )}
      >
        <Link href={`/urunler/${slug}`} className="block">
          <div className="overflow-hidden rounded-sm">
            <ProductImage
              image={product.images?.[0]}
              title={product.title}
              priority={priority}
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1 px-1 pt-4 pb-1 text-center">
            {product.featured && (
              <p className="font-hand text-base text-terracotta">
                özel parça
              </p>
            )}
            <h3 className="font-heading text-xl leading-snug text-cocoa">
              {product.title}
            </h3>
            <p className="font-hand text-2xl text-terracotta">
              {formatPrice(product.price)}
            </p>
          </div>
        </Link>

        <div className="mt-3 px-1">
          <InstagramButton
            productTitle={product.title}
            size="sm"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
}
