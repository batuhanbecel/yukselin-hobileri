import Link from "next/link";
import { Gift } from "lucide-react";
import { InstagramButton } from "@/components/instagram-button";
import { ShopierButton } from "@/components/shopier-button";
import { computeSale, formatPrice } from "@/lib/format";
import type { Product } from "@/lib/sanity/types";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { StatusBadge } from "./status-badge";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  index?: number;
};

const WOBBLES = ["wobble-1", "wobble-2", "wobble-3", "wobble-4"];

export function ProductCard({ product, priority, index = 0 }: ProductCardProps) {
  const slug = product.slug.current;
  const wobble = WOBBLES[index % WOBBLES.length];
  const sale = computeSale(product.price, product.salePrice);
  const isSold = product.status === "sold";
  const badgeText =
    product.saleBadge?.trim() ||
    (sale.onSale && sale.percentOff ? `%${sale.percentOff} indirim` : null);

  return (
    <div className="group relative pt-3">
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
        {!isSold && sale.onSale && badgeText && (
          <span className="absolute -top-2 -right-2 z-10 rotate-6 rounded-full border-2 border-white bg-terracotta px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            {badgeText}
          </span>
        )}

        {isSold && (
          <span className="absolute -top-2 -right-2 z-10 rotate-6 rounded-full border-2 border-white bg-cocoa px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-md">
            Satıldı
          </span>
        )}

        <Link href={`/urunler/${slug}`} className="block">
          <div className={cn("relative overflow-hidden rounded-sm", isSold && "opacity-70")}>
            <ProductImage
              image={product.images?.[0]}
              title={product.title}
              priority={priority}
              className="rounded-sm"
            />
          </div>

          <div className="space-y-1 px-1 pt-4 pb-1 text-center">
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {product.status && product.status !== "available" && !isSold && (
                <StatusBadge status={product.status} />
              )}
              {product.giftReady && !isSold && (
                <span className="inline-flex items-center gap-1 rounded-full border border-honey/40 bg-honey/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#8a5a1f]">
                  <Gift className="size-3" />
                  Hediye paketli
                </span>
              )}
            </div>

            {product.featured && !sale.onSale && !isSold && (
              <p className="font-hand text-base text-terracotta">
                özel parça
              </p>
            )}
            <h3 className="font-heading text-xl leading-snug text-cocoa">
              {product.title}
            </h3>

            {sale.onSale ? (
              <div className="flex items-center justify-center gap-2">
                <span className="text-base text-cocoa-soft line-through">
                  {formatPrice(sale.originalPrice!)}
                </span>
                <span className="font-hand text-2xl text-terracotta">
                  {formatPrice(sale.effectivePrice)}
                </span>
              </div>
            ) : (
              <p className="font-hand text-2xl text-terracotta">
                {formatPrice(sale.effectivePrice)}
              </p>
            )}
          </div>
        </Link>

        {!isSold && (
          <div className="mt-3 flex flex-col gap-2 px-1">
            <InstagramButton
              productTitle={product.title}
              size="sm"
              className="w-full"
            />
            {product.shopierUrl && (
              <ShopierButton
                url={product.shopierUrl}
                size="sm"
                className="w-full"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
