import { cn } from "@/lib/utils";
import type { ProductStatus } from "@/lib/sanity/types";

const STATUS_META: Record<
  ProductStatus,
  { label: string; className: string }
> = {
  available: {
    label: "Stokta",
    className: "bg-sage/20 text-[#3f5a3a] border-sage/40",
  },
  "made-to-order": {
    label: "Sipariş üzerine",
    className: "bg-honey/20 text-[#8a5a1f] border-honey/50",
  },
  sold: {
    label: "Satıldı",
    className: "bg-cocoa/15 text-cocoa border-cocoa/30",
  },
};

type StatusBadgeProps = {
  status?: ProductStatus;
  className?: string;
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  if (!status) return null;
  const meta = STATUS_META[status];
  if (!meta) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
        meta.className,
        className
      )}
    >
      {meta.label}
    </span>
  );
}
