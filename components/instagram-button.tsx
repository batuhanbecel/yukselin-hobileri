"use client";

import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { ctaButtonBase, ctaButtonSizes } from "@/components/cta-button-styles";
import { Button } from "@/components/ui/button";
import { instagramDmUrl } from "@/lib/format";
import { useSiteSettings } from "@/lib/site-context";
import { cn } from "@/lib/utils";

type InstagramButtonProps = {
  productTitle?: string;
  className?: string;
  size?: "default" | "sm" | "lg";
  variant?: "default" | "outline" | "gradient";
};

export function InstagramButton({
  productTitle,
  className,
  size = "default",
  variant = "gradient",
}: InstagramButtonProps) {
  const settings = useSiteSettings();
  const href = instagramDmUrl(
    productTitle,
    settings.instagramUrl,
    settings.instagramDmTemplate
  );
  const label = productTitle
    ? settings.instagramProductButtonLabel || "Instagram'dan sipariş ver"
    : settings.instagramButtonLabel || "Instagram'dan yaz";

  return (
    <Button
      asChild
      size={size}
      className={cn(
        ctaButtonBase,
        ctaButtonSizes[size],
        variant === "gradient" &&
          "bg-gradient-to-r from-ink via-ink to-bordeaux/90 text-paper ring-1 ring-ink/10 hover:from-bordeaux hover:via-bordeaux hover:to-bordeaux/90 hover:ring-bordeaux/25",
        variant === "outline" &&
          "bg-paper/80 text-ink shadow-none ring-1 ring-bordeaux/25 hover:-translate-y-0 hover:bg-bordeaux-soft/25 hover:shadow-[0_4px_14px_rgba(168,88,77,0.12)]",
        className
      )}
      variant={variant === "outline" ? "outline" : "default"}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <InstagramIcon
          className={cn("shrink-0", size === "lg" ? "size-5" : "size-4")}
        />
        <span>{label}</span>
      </Link>
    </Button>
  );
}
