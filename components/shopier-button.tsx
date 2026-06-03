"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { ctaButtonBase, ctaButtonSizes } from "@/components/cta-button-styles";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/lib/site-context";
import { cn } from "@/lib/utils";

type ShopierButtonProps = {
  url: string;
  className?: string;
  size?: "default" | "sm" | "lg";
};

export function ShopierButton({ url, className, size = "default" }: ShopierButtonProps) {
  const settings = useSiteSettings();
  const label = settings.shopierButtonLabel || "Shopier'dan satın al";

  return (
    <Button
      asChild
      size={size}
      className={cn(
        ctaButtonBase,
        ctaButtonSizes[size],
        "bg-gradient-to-r from-olive to-olive/85 text-paper ring-1 ring-olive/20 hover:from-olive/95 hover:to-olive/75 hover:ring-olive/35",
        className
      )}
    >
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <ShoppingBag
          className={cn("shrink-0", size === "lg" ? "size-5" : "size-4")}
          strokeWidth={2.25}
        />
        <span>{label}</span>
      </Link>
    </Button>
  );
}
