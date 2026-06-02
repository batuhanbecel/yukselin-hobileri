import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { InstagramButton } from "@/components/instagram-button";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/sanity/types";
import { ProductImage } from "./product-image";

type ProductCardProps = {
  product: Product;
  priority?: boolean;
};

export function ProductCard({ product, priority }: ProductCardProps) {
  const slug = product.slug.current;

  return (
    <Card className="group overflow-hidden border-pink-100/80 bg-white/90 shadow-sm transition-shadow hover:shadow-lg">
      <Link href={`/urunler/${slug}`} className="block">
        <CardHeader className="p-0">
          <ProductImage
            image={product.images?.[0]}
            title={product.title}
            priority={priority}
            className="rounded-none rounded-t-xl"
          />
        </CardHeader>
        <CardContent className="space-y-2 p-4">
          {product.featured && (
            <Badge
              variant="secondary"
              className="bg-lavender-100 text-violet-700 hover:bg-lavender-100"
            >
              Öne çıkan
            </Badge>
          )}
          <h3 className="font-heading text-lg leading-snug text-foreground">
            {product.title}
          </h3>
          <p className="text-xl font-semibold text-primary">
            {formatPrice(product.price)}
          </p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0">
        <InstagramButton
          productTitle={product.title}
          size="sm"
          className="w-full"
        />
      </CardFooter>
    </Card>
  );
}
