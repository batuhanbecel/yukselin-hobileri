import type { Metadata } from "next";
import { ProductGrid } from "@/components/products/product-grid";
import { getProducts } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Ürünler",
  description:
    "El emeği örgü çantalarımızın tamamı. Fiyatlar TL cinsindendir. Sipariş için Instagram.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="mb-10">
        <h1 className="font-heading text-4xl text-foreground">Ürünler</h1>
        <p className="mt-3 max-w-xl text-muted-foreground">
          Her çanta el emeğiyle örülür. Fiyatlar Türk Lirası cinsindendir.
          Sipariş ve bilgi için ürün kartındaki Instagram butonunu kullanın.
        </p>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
