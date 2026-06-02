import { getSanityClient } from "./client";
import { isSanityConfigured } from "./config";
import {
  aboutPageQuery,
  categoriesQuery,
  faqPageQuery,
  featuredProductsQuery,
  homePageQuery,
  productBySlugQuery,
  productSlugsQuery,
  productsByCategoryQuery,
  productsPageQuery,
  productsQuery,
  relatedProductsQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  AboutPage,
  Category,
  FaqPage,
  HomePage,
  Product,
  ProductsPage,
  SiteSettings,
} from "./types";
import {
  mockAboutPage,
  mockCategories,
  mockFaqPage,
  mockHomePage,
  mockProducts,
  mockProductsPage,
  mockSiteSettings,
} from "./mock-data";

// Dev'de Next önbelleğini kapat (anlık yenileme), prod'da 30 saniye.
const revalidate = process.env.NODE_ENV === "production" ? 30 : 0;

function filterMockByCategory(slug?: string): Product[] {
  if (!slug) return mockProducts;
  return mockProducts.filter((p) => p.category?.slug.current === slug);
}

/**
 * Sanity'den gelen verideki undefined alanları mock değerlerle doldur.
 * (Kullanıcı bir alanı boş bıraktıysa default metin görünsün.)
 */
function withDefaults<T extends object>(base: T, fromSanity?: T | null): T {
  if (!fromSanity) return base;
  const result = { ...base } as Record<string, unknown>;
  for (const [key, value] of Object.entries(fromSanity as Record<string, unknown>)) {
    if (value !== undefined && value !== null) {
      // boş array yine de override eder — kullanıcı bilerek temizlemiş demektir
      result[key] = value;
    }
  }
  return result as T;
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
    return featured.length > 0
      ? featured
      : mockProducts.filter((p) => p.featured).slice(0, 6);
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
    return withDefaults(mockSiteSettings, settings);
  } catch {
    return mockSiteSettings;
  }
}

export async function getHomePage(): Promise<HomePage> {
  if (!isSanityConfigured) return mockHomePage;
  const client = getSanityClient();
  if (!client) return mockHomePage;
  try {
    const data = await client.fetch<HomePage | null>(
      homePageQuery,
      {},
      { next: { revalidate } }
    );
    return withDefaults(mockHomePage, data);
  } catch {
    return mockHomePage;
  }
}

export async function getAboutPage(): Promise<AboutPage> {
  if (!isSanityConfigured) return mockAboutPage;
  const client = getSanityClient();
  if (!client) return mockAboutPage;
  try {
    const data = await client.fetch<AboutPage | null>(
      aboutPageQuery,
      {},
      { next: { revalidate } }
    );
    return withDefaults(mockAboutPage, data);
  } catch {
    return mockAboutPage;
  }
}

export async function getRelatedProducts(
  product: Product,
  limit = 4
): Promise<Product[]> {
  const fallback = mockProducts
    .filter(
      (p) =>
        p._id !== product._id &&
        (!product.category ||
          p.category?.slug.current === product.category.slug.current)
    )
    .slice(0, limit);

  if (!isSanityConfigured) return fallback;
  const client = getSanityClient();
  if (!client) return fallback;
  try {
    const items = await client.fetch<Product[]>(
      relatedProductsQuery,
      {
        excludeId: product._id,
        categoryRef: product.category?._id ?? "",
      },
      { next: { revalidate } }
    );
    return items.length > 0 ? items.slice(0, limit) : fallback;
  } catch {
    return fallback;
  }
}

export async function getFaqPage(): Promise<FaqPage> {
  if (!isSanityConfigured) return mockFaqPage;
  const client = getSanityClient();
  if (!client) return mockFaqPage;
  try {
    const data = await client.fetch<FaqPage | null>(
      faqPageQuery,
      {},
      { next: { revalidate } }
    );
    return withDefaults(mockFaqPage, data);
  } catch {
    return mockFaqPage;
  }
}

export async function getProductsPage(): Promise<ProductsPage> {
  if (!isSanityConfigured) return mockProductsPage;
  const client = getSanityClient();
  if (!client) return mockProductsPage;
  try {
    const data = await client.fetch<ProductsPage | null>(
      productsPageQuery,
      {},
      { next: { revalidate } }
    );
    return withDefaults(mockProductsPage, data);
  } catch {
    return mockProductsPage;
  }
}
