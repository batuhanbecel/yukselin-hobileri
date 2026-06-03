const PRODUCT_PROJECTION = `{
  _id,
  title,
  slug,
  price,
  salePrice,
  saleBadge,
  images,
  description,
  dimensions,
  material,
  care,
  colors,
  status,
  giftReady,
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

export const relatedProductsQuery = `*[
  _type == "product"
  && _id != $excludeId
  && (
    category._ref == $categoryRef
    || count(*[_type == "product" && _id == $excludeId][0].category._ref) == 0
  )
] | order(order asc, _createdAt desc) [0...4] ${PRODUCT_PROJECTION}`;

export const categoriesQuery = `*[_type == "category"] | order(order asc, title asc) {
  _id,
  title,
  slug,
  order
}`;

/**
 * NOT: Aşağıdaki singleton sorguları belgenin SABİT ID'sini hedefler
 * (structure.ts → S.document().documentId("homePage") ile yazılan ID).
 * Bu sayede yanlışlıkla oluşmuş ikinci bir belge varsa karışıklık olmaz.
 */
export const siteSettingsQuery = `*[_id == "siteSettings"][0] {
  siteTitle,
  navLinks,
  instagramUrl,
  instagramHandle,
  whatsappNumber,
  shopierStoreUrl,
  headerTagline,
  footerStudioLabel,
  footerTagline,
  footerDescription,
  footerContactTitle,
  footerContactLine1,
  footerContactLine2,
  footerSignature,
  footerNavTitle,
  instagramHeaderLabel,
  instagramButtonLabel,
  instagramProductButtonLabel,
  instagramDmTemplate,
  shopierButtonLabel,
  whatsappButtonLabel,
  breadcrumbHomeLabel,
  breadcrumbProductsLabel,
  backToProductsLabel,
  allCategoriesLabel,
  giftReadyLabel,
  saleBadgeTemplate,
  statusAvailableLabel,
  statusMadeToOrderLabel,
  statusSoldLabel,
  imagePlaceholderLabel,
  relatedProductsHandwritten,
  relatedProductsTitle,
  productNotFoundTitle,
  productMetaDescriptionSuffix,
  labelDimensions,
  labelMaterial,
  labelCare,
  labelColors,
  detailNoteHandwritten,
  detailNoteText,
  seoTitleSuffix,
  seoDescription,
  seoKeywords,
  ogDescription,
  errorHandwritten,
  errorTitle,
  errorText,
  errorRetryLabel,
  errorHomeLabel,
  notFoundHandwritten,
  notFoundTitle,
  notFoundText,
  notFoundHomeLabel,
  loadingHandwritten,
  loadingText
}`;

export const homePageQuery = `*[_id == "homePage"][0]{
  heroGreeting,
  heroBadge,
  heroTitleStart,
  heroTitleEmphasis,
  heroTitleEnd,
  heroSubtitle,
  heroSignature,
  heroCardNumber,
  heroCardTitle,
  heroCardLineStart,
  heroCardLineEnd,
  featuredHandwritten,
  featuredTitle,
  featuredSubtitle,
  featuredLinkLabel,
  featuredSectionLabel,
  highlightsHandwritten,
  highlightsTitle,
  highlightsSectionLabel,
  highlights,
  stepsHandwritten,
  stepsTitle,
  stepsSubtitle,
  stepsSectionLabel,
  steps,
  stepsCtaLabel,
  quoteHandwritten,
  quoteText,
  quoteAuthor
}`;

export const aboutPageQuery = `*[_id == "aboutPage"][0]{
  pageHandwritten,
  pageTitle,
  metaTitle,
  metaDescription,
  storySectionLabel,
  dropCapLetter,
  story,
  storySignature,
  valuesSectionLabel,
  values,
  ctaHandwritten,
  ctaTitle,
  ctaText
}`;

export const productsPageQuery = `*[_id == "productsPage"][0]{
  pageHandwritten,
  pageTitle,
  pageDescription,
  collectionSectionLabel,
  categorySectionLabel,
  metaTitle,
  metaDescription,
  emptyMessage,
  emptyDescription
}`;

export const faqPageQuery = `*[_id == "faqPage"][0]{
  pageHandwritten,
  pageTitle,
  pageDescription,
  sectionLabel,
  metaTitle,
  metaDescription,
  emptyMessage,
  ctaHandwritten,
  ctaTitle,
  items
}`;
