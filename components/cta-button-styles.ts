import { cn } from "@/lib/utils";

export const ctaButtonSizes = {
  sm: "h-10 gap-2 px-5 text-xs font-medium uppercase tracking-[0.18em] [&_svg:not([class*='size-'])]:size-3.5",
  default:
    "h-11 gap-2.5 px-6 text-[11px] font-medium uppercase tracking-[0.22em] [&_svg:not([class*='size-'])]:size-3.5",
  lg: "h-12 gap-3 px-7 text-xs font-medium uppercase tracking-[0.24em] [&_svg:not([class*='size-'])]:size-4",
} as const;

export const ctaButtonBase = cn(
  "rounded-full border-0",
  "transition-[background-color,color,box-shadow,transform] duration-300 ease-out",
  "active:translate-y-px"
);

export const ctaButtonOutline = cn(
  "bg-transparent text-ink shadow-none ring-1 ring-ink/25",
  "hover:bg-ink hover:text-paper hover:ring-ink",
  "hover:shadow-[0_4px_16px_rgba(45,31,23,0.12)]"
);
