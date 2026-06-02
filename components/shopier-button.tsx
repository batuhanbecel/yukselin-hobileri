import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShopierButtonProps = {
  url: string;
  className?: string;
  size?: "default" | "sm" | "lg";
};

export function ShopierButton({ url, className, size = "default" }: ShopierButtonProps) {
  return (
    <Button
      asChild
      size={size}
      className={cn(
        "rounded-full border-0 bg-sage text-white shadow-sm transition-all hover:bg-sage/90 hover:shadow-md",
        className
      )}
    >
      <Link href={url} target="_blank" rel="noopener noreferrer">
        <ShoppingBag className="size-4 shrink-0" />
        Shopier&apos;dan satın al
      </Link>
    </Button>
  );
}
