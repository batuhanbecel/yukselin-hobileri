const PRODUCT_PROJECTION = `{
  _id,
  title,
  slug,
  price,
  images,
  description,
  featured,
  order,
  shopierUrl,
  "category": category->{ _id, title, slug }
}`;

export const productsQuery = `*[_type == "product"] | order(order asc, _createdAt desc) ${PRODUCT_PROJECTION}`;

export const productsByCategoryQuery = `*[_type == "product" && category->slug.current == $categorySlug] | order(order asc, _createdAt desc) ${PRODUCT_PROJECTION}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(order asc, _createdAt desc) [0...6] ${PRODUCT_PROJECTION}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] ${PRODUCT_PROJECTION}`;

export const productSlugsQuery = `*[_type == "product" && defined(slug.current)] {
  "slug": slug.current
}`;

export const categoriesQuery = `*[_type == "category"] | order(order asc, title asc) {
  _id,
  title,
  slug,
  order
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteTitle,
  instagramUrl,
  heroTitle,
  heroSubtitle,
  aboutText,
  whatsappNumber,
  shopierStoreUrl
}`;
