import { getCategories } from "@/lib/sanity/fetch";
import { EditProductForm } from "./edit-product-form";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: PageProps) {
  const { id } = await params;
  const categories = await getCategories();
  return <EditProductForm id={id} categories={categories} />;
}
