"use client";

import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
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
        variant === "gradient" &&
          "rounded-full border-0 bg-ink text-paper shadow-sm transition-all hover:bg-bordeaux hover:shadow-md",
        variant === "outline" &&
          "rounded-full border-bordeaux/30 bg-paper/70 text-ink hover:bg-bordeaux-soft/30",
        className
      )}
      variant={variant === "outline" ? "outline" : "default"}
    >
      <Link href={href} target="_blank" rel="noopener noreferrer">
        <InstagramIcon className="shrink-0" />
        {label}
      </Link>
    </Button>
  );
}
