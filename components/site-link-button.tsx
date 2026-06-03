import Link from "next/link";
import {
  ctaButtonBase,
  ctaButtonOutline,
  ctaButtonSizes,
} from "@/components/cta-button-styles";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type SiteLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: keyof typeof ctaButtonSizes;
};

export function SiteLinkButton({
  href,
  children,
  className,
  size = "lg",
}: SiteLinkButtonProps) {
  return (
    <Button
      asChild
      size={size}
      variant="outline"
      className={cn(ctaButtonBase, ctaButtonSizes[size], ctaButtonOutline, className)}
    >
      <Link href={href}>
        <span>{children}</span>
      </Link>
    </Button>
  );
}
