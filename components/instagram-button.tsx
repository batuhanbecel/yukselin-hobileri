"use client";

import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { ctaButtonBase, ctaButtonOutline, ctaButtonSizes } from "@/components/cta-button-styles";
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
          "bg-ink text-paper hover:bg-bordeaux",
        variant === "outline" && ctaButtonOutline,
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
