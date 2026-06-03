"use client";

import Link from "next/link";
import { Gift } from "lucide-react";
import { motion } from "motion/react";
import { InstagramButton } from "@/components/instagram-button";
import { ShopierButton } from "@/components/shopier-button";
import {
  computeSale,
  formatPrice,
  formatSaleBadge,
} from "@/lib/format";
import type { Product } from "@/lib/sanity/types";
import { useSiteSettings } from "@/lib/site-context";
import { cn } from "@/lib/utils";
import { ProductImage } from "./product-image";
import { StatusBadge } from "./status-badge";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  index?: number;
  imagePlaceholderLabel?: string;
};

export function ProductCard({
  product,
  priority,
  index = 0,
  imagePlaceholderLabel,
}: ProductCardProps) {
  const settings = useSiteSettings();
  const slug = product.slug.current;
  const sale = computeSale(product.price, product.salePrice);
  const isSold = product.status === "sold";
  const saleTemplate = settings.saleBadgeTemplate || "%{percent} indirim";
  const badgeText =
    product.saleBadge?.trim() ||
    (sale.onSale && sale.percentOff
      ? formatSaleBadge(saleTemplate, sale.percentOff)
      : null);
  const soldLabel = settings.statusSoldLabel || "Satıldı";
  const giftLabel = settings.giftReadyLabel || "Hediye paketli";
  const placeholder =
    imagePlaceholderLabel || settings.imagePlaceholderLabel || "fotoğraf yakında";

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative"
    >
      <Link href={`/urunler/${slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-ivory-deep">
          {!isSold && sale.onSale && badgeText && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-bordeaux px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-paper shadow-sm">
              {badgeText}
            </span>
          )}
          {isSold && (
            <span className="absolute left-4 top-4 z-10 rounded-full bg-ink px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-paper shadow-sm">
              {soldLabel}
            </span>
          )}

          <span className="font-display absolute bottom-3 right-4 z-10 text-3xl text-paper/80 mix-blend-difference">
            N°{String(index + 1).padStart(2, "0")}
          </span>

          <div
            className={cn(
              "transition-all duration-700 ease-out group-hover:scale-[1.04]",
              isSold && "opacity-70 grayscale"
            )}
          >
            <ProductImage
              image={product.images?.[0]}
              title={product.title}
              priority={priority}
              placeholderLabel={placeholder}
              className="!rounded-2xl"
            />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex flex-wrap items-center gap-1.5">
            {product.category?.title && (
              <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-ink-soft">
                / {product.category.title}
              </span>
            )}
            {product.status && product.status !== "available" && !isSold && (
              <StatusBadge status={product.status} />
            )}
            {product.giftReady && !isSold && (
              <span className="inline-flex items-center gap-1 rounded-full border border-gold/40 bg-gold/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-[#8a6d2f]">
                <Gift className="size-3" />
                {giftLabel}
              </span>
            )}
          </div>

          <h3 className="font-heading text-xl leading-tight text-ink transition-colors group-hover:text-bordeaux">
            {product.title}
          </h3>

          {sale.onSale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-ink-soft line-through">
                {formatPrice(sale.originalPrice!)}
              </span>
              <span className="font-heading text-xl text-bordeaux">
                {formatPrice(sale.effectivePrice)}
              </span>
            </div>
          ) : (
            <p className="font-heading text-xl text-bordeaux">
              {formatPrice(sale.effectivePrice)}
            </p>
          )}
        </div>
      </Link>

      {!isSold && (
        <div className="mt-4 flex flex-col gap-2">
          <InstagramButton
            productTitle={product.title}
            size="sm"
            className="w-full"
          />
          {product.shopierUrl && (
            <ShopierButton url={product.shopierUrl} size="sm" className="w-full" />
          )}
        </div>
      )}
    </motion.article>
  );
}
