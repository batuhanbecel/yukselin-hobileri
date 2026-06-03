"use client";

import { cn } from "@/lib/utils";
import { useSiteSettings } from "@/lib/site-context";
import type { ProductStatus } from "@/lib/sanity/types";

type StatusBadgeProps = {
  status?: ProductStatus;
  className?: string;
};

const STATUS_STYLES: Record<ProductStatus, string> = {
  available: "bg-sage/20 text-[#3f5a3a] border-sage/40",
  "made-to-order": "bg-honey/20 text-[#8a5a1f] border-honey/50",
  sold: "bg-cocoa/15 text-cocoa border-cocoa/30",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const settings = useSiteSettings();
  if (!status) return null;

  const labels: Record<ProductStatus, string> = {
    available: settings.statusAvailableLabel || "Stokta",
    "made-to-order": settings.statusMadeToOrderLabel || "Sipariş üzerine",
    sold: settings.statusSoldLabel || "Satıldı",
  };

  const label = labels[status];
  const style = STATUS_STYLES[status];
  if (!label || !style) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        style,
        className
      )}
    >
      {label}
    </span>
  );
}
