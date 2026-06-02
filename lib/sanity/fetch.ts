import { getSanityClient } from "./client";
import { isSanityConfigured } from "./config";
import {
  featuredProductsQuery,
  productBySlugQuery,
  productSlugsQuery,
  productsQuery,
  siteSettingsQuery,
} from "./queries";
import type { Product, SiteSettings } from "./types";
import { mockProducts, mockSiteSettings } from "./mock-data";

const revalidate = 60;

export async function getProducts(): Promise<Product[]> {
  if (!isSanityConfigured) return mockProducts;
  const client = getSanityClient();
  if (!client) return mockProducts;
  try {
    return await client.fetch<Product[]>(productsQuery, {}, { next: { revalidate } });
  } catch {
    return mockProducts;
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
