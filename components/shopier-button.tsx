"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
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
        "rounded-full border-0 bg-olive text-paper shadow-sm transition-all hover:bg-olive/90 hover:shadow-md",
        className
      )}
    >
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <ShoppingBag className="size-4 shrink-0" />
        {label}
      </Link>
    </Button>
  );
}
