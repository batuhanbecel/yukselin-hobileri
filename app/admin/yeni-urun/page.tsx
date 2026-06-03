import { getCategories } from "@/lib/sanity/fetch";
import { NewProductForm } from "./new-product-form";

export const dynamic = "force-dynamic";

export default async function YeniUrunPage() {
  const categories = await getCategories();
  return <NewProductForm categories={categories} />;
}
