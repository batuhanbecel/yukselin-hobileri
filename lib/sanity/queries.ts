const PRODUCT_PROJECTION = `{
  _id,
  title,
  slug,
  price,
  salePrice,
  saleBadge,
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
  instagramHandle,
  whatsappNumber,
  shopierStoreUrl,
  headerTagline,
  footerTagline,
  footerDescription,
  footerSignature,
  footerNavTitle,
  detailNoteHandwritten,
  detailNoteText,
  heroTitle,
  heroSubtitle,
  aboutText
}`;

export const homePageQuery = `*[_type == "homePage"][0]{
  heroGreeting,
  heroBadge,
  heroTitleStart,
  heroTitleEmphasis,
  heroTitleEnd,
  heroSubtitle,
  heroSignature,
  featuredHandwritten,
  featuredTitle,
  featuredSubtitle,
  featuredLinkLabel,
  highlightsHandwritten,
  highlightsTitle,
  highlights,
  stepsHandwritten,
  stepsTitle,
  stepsSubtitle,
  steps,
  stepsCtaLabel,
  quoteHandwritten,
  quoteText,
  quoteAuthor
}`;

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  pageHandwritten,
  pageTitle,
  story,
  storySignature,
  values,
  ctaHandwritten,
  ctaTitle,
  ctaText
}`;

export const productsPageQuery = `*[_type == "productsPage"][0]{
  pageHandwritten,
  pageTitle,
  pageDescription,
  emptyMessage,
  emptyDescription
}`;
