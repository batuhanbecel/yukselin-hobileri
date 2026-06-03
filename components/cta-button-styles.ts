import { cn } from "@/lib/utils";

export const ctaButtonSizes = {
  sm: "h-11 gap-2.5 px-5 text-sm font-semibold tracking-wide [&_svg:not([class*='size-'])]:size-4",
  default:
    "h-12 gap-2.5 px-6 text-sm font-semibold tracking-wide [&_svg:not([class*='size-'])]:size-4",
  lg: "h-14 gap-3 px-8 text-base font-semibold tracking-wide [&_svg:not([class*='size-'])]:size-5",
} as const;

export const ctaButtonBase = cn(
  "rounded-full border-0 shadow-[0_4px_14px_rgba(45,31,23,0.12)]",
  "transition-all duration-200",
  "hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(45,31,23,0.16)]",
  "active:translate-y-0 active:shadow-[0_2px_8px_rgba(45,31,23,0.12)]"
);

export const ctaButtonOutline = cn(
  "bg-paper/80 text-ink shadow-none ring-1 ring-bordeaux/25",
  "hover:bg-bordeaux hover:text-paper hover:ring-bordeaux/35",
  "hover:shadow-[0_8px_24px_rgba(168,88,77,0.16)]"
);
