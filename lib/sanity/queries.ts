export const productsQuery = `*[_type == "product"] | order(order asc, _createdAt desc) {
  _id,
  title,
  slug,
  price,
  images,
  description,
  featured,
  order
}`;

export const featuredProductsQuery = `*[_type == "product" && featured == true] | order(order asc, _createdAt desc) [0...6] {
  _id,
  title,
  slug,
  price,
  images,
  description,
  featured,
  order
}`;

export const productBySlugQuery = `*[_type == "product" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  price,
  images,
  description,
  featured,
  order
}`;

export const productSlugsQuery = `*[_type == "product" && defined(slug.current)] {
  "slug": slug.current
}`;

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  siteTitle,
  instagramUrl,
  heroTitle,
  heroSubtitle,
  aboutText,
  whatsappNumber
}`;
