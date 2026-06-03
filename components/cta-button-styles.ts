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
