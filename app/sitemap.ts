import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { getCategories, getProductSlugs } from "@/lib/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [productSlugs, categories] = await Promise.all([
    getProductSlugs(),
    getCategories(),
  ]);

  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/urunler`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/hakkimizda`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sss`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${SITE_URL}/urunler/kategori/${c.slug.current}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = productSlugs.map((slug) => ({
    url: `${SITE_URL}/urunler/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
