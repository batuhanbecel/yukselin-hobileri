import { getSanityClient } from "./client";
import { isSanityConfigured } from "./config";
import {
  categoriesQuery,
  featuredProductsQuery,
  productBySlugQuery,
  productSlugsQuery,
  productsByCategoryQuery,
  productsQuery,
  siteSettingsQuery,
} from "./queries";
import type { Category, Product, SiteSettings } from "./types";
import { mockCategories, mockProducts, mockSiteSettings } from "./mock-data";

const revalidate = 60;

function filterMockByCategory(slug?: string): Product[] {
  if (!slug) return mockProducts;
  return mockProducts.filter((p) => p.category?.slug.current === slug);
}

export async function getProducts(categorySlug?: string): Promise<Product[]> {
  if (!isSanityConfigured) return filterMockByCategory(categorySlug);
  const client = getSanityClient();
  if (!client) return filterMockByCategory(categorySlug);
  try {
    if (categorySlug) {
      return await client.fetch<Product[]>(
        productsByCategoryQuery,
        { categorySlug },
        { next: { revalidate } }
      );
    }
    return await client.fetch<Product[]>(productsQuery, {}, { next: { revalidate } });
  } catch {
    return filterMockByCategory(categorySlug);
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  if (!isSanityConfigured) {
    return mockProducts.filter((p) => p.featured).slice(0, 6);
  }
  const client = getSanityClient();
  if (!client) {
    return mockProducts.filter((p) => p.featured).slice(0, 6);
  }
  try {
    const featured = await client.fetch<Product[]>(
      featuredProductsQuery,
      {},
      { next: { revalidate } }
    );
    return featured.length > 0 ? featured : mockProducts.filter((p) => p.featured).slice(0, 6);
  } catch {
    return mockProducts.filter((p) => p.featured).slice(0, 6);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  if (!isSanityConfigured) {
    return mockProducts.find((p) => p.slug.current === slug) ?? null;
  }
  const client = getSanityClient();
  if (!client) {
    return mockProducts.find((p) => p.slug.current === slug) ?? null;
  }
  try {
    return await client.fetch<Product | null>(
      productBySlugQuery,
      { slug },
      { next: { revalidate } }
    );
  } catch {
    return mockProducts.find((p) => p.slug.current === slug) ?? null;
  }
}

export async function getProductSlugs(): Promise<string[]> {
  if (!isSanityConfigured) {
    return mockProducts.map((p) => p.slug.current);
  }
  const client = getSanityClient();
  if (!client) {
    return mockProducts.map((p) => p.slug.current);
  }
  try {
    const slugs = await client.fetch<{ slug: string }[]>(
      productSlugsQuery,
      {},
      { next: { revalidate } }
    );
    return slugs.map((s) => s.slug);
  } catch {
    return mockProducts.map((p) => p.slug.current);
  }
}

export async function getCategories(): Promise<Category[]> {
  if (!isSanityConfigured) return mockCategories;
  const client = getSanityClient();
  if (!client) return mockCategories;
  try {
    const cats = await client.fetch<Category[]>(
      categoriesQuery,
      {},
      { next: { revalidate } }
    );
    return cats.length > 0 ? cats : mockCategories;
  } catch {
    return mockCategories;
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return mockSiteSettings;
  const client = getSanityClient();
  if (!client) return mockSiteSettings;
  try {
    const settings = await client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate } }
    );
    return settings ?? mockSiteSettings;
  } catch {
    return mockSiteSettings;
  }
}
