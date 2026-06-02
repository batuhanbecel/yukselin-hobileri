import Link from "next/link";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Button } from "@/components/ui/button";
import { instagramDmUrl } from "@/lib/format";
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
  const href = instagramDmUrl(productTitle);
  const label = productTitle
    ? "Instagram'dan sipariş ver"
    : "Instagram'dan yaz";

  return (
    <Button
      asChild
      size={size}
      className={cn(
        variant === "gradient" &&
          "rounded-full border-0 bg-terracotta text-white shadow-sm transition-all hover:bg-terracotta/90 hover:shadow-md",
        variant === "outline" &&
          "rounded-full border-terracotta/30 bg-white/70 text-cocoa hover:bg-terracotta-soft/30",
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
