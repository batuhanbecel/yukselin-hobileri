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
    ? "Instagram'dan Sipariş Ver"
    : "Instagram'dan İletişime Geç";

  return (
    <Button
      asChild
      size={size}
      className={cn(
        variant === "gradient" &&
          "border-0 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-md hover:opacity-90",
        variant === "outline" && "border-pink-200 bg-white/80",
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
