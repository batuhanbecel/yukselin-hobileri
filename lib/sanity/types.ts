import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type NavLink = {
  _key?: string;
  label: string;
  href: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  order?: number;
};

export type ProductStatus = "available" | "made-to-order" | "sold";

export type ProductColor = {
  _key?: string;
  name: string;
  hex?: string;
};

export type Product = {
  _id: string;
  title: string;
  slug: { current: string };
  price: number;
  salePrice?: number;
  saleBadge?: string;
  images: SanityImage[];
  description?: string;
  dimensions?: string;
  material?: string;
  care?: string;
  colors?: ProductColor[];
  status?: ProductStatus;
  giftReady?: boolean;
  featured?: boolean;
  order?: number;
  category?: Pick<Category, "_id" | "title"> & { slug: { current: string } };
  shopierUrl?: string;
};

export type FaqItem = {
  _key?: string;
  question: string;
  answer: string;
};

export type FaqPage = {
  pageHandwritten?: string;
  pageTitle?: string;
  pageDescription?: string;
  sectionLabel?: string;
  metaTitle?: string;
  metaDescription?: string;
  emptyMessage?: string;
  ctaHandwritten?: string;
  ctaTitle?: string;
  items?: FaqItem[];
};

export type Highlight = {
  _key?: string;
  title: string;
  text: string;
  iconKey?: "yarn" | "leaf" | "wind" | "bag" | "heart" | "star" | "none";
};

export type Step = {
  _key?: string;
  number: string;
  title: string;
  text: string;
};

export type Value = {
  _key?: string;
  title: string;
  text: string;
};

export type HomePage = {
  heroGreeting?: string;
  heroBadge?: string;
  heroTitleStart?: string;
  heroTitleEmphasis?: string;
  heroTitleEnd?: string;
  heroSubtitle?: string;
  heroSignature?: string;
  heroCardNumber?: string;
  heroCardTitle?: string;
  heroCardLineStart?: string;
  heroCardLineEnd?: string;
  featuredHandwritten?: string;
  featuredTitle?: string;
  featuredSubtitle?: string;
  featuredLinkLabel?: string;
  featuredSectionLabel?: string;
  highlightsHandwritten?: string;
  highlightsTitle?: string;
  highlightsSectionLabel?: string;
  highlights?: Highlight[];
  stepsHandwritten?: string;
  stepsTitle?: string;
  stepsSubtitle?: string;
  stepsSectionLabel?: string;
  steps?: Step[];
  stepsCtaLabel?: string;
  quoteHandwritten?: string;
  quoteText?: string;
  quoteAuthor?: string;
};

export type AboutPage = {
  pageHandwritten?: string;
  pageTitle?: string;
  metaTitle?: string;
  metaDescription?: string;
  storySectionLabel?: string;
  dropCapLetter?: string;
  story?: PortableTextBlock[];
  storySignature?: string;
  valuesSectionLabel?: string;
  values?: Value[];
  ctaHandwritten?: string;
  ctaTitle?: string;
  ctaText?: string;
};

export type ProductsPage = {
  pageHandwritten?: string;
  pageTitle?: string;
  pageDescription?: string;
  collectionSectionLabel?: string;
  categorySectionLabel?: string;
  metaTitle?: string;
  metaDescription?: string;
  emptyMessage?: string;
  emptyDescription?: string;
};

export type SiteSettings = {
  siteTitle?: string;
  navLinks?: NavLink[];
  instagramUrl?: string;
  instagramHandle?: string;
  whatsappNumber?: string;
  shopierStoreUrl?: string;
  headerTagline?: string;
  footerStudioLabel?: string;
  footerTagline?: string;
  footerDescription?: string;
  footerContactTitle?: string;
  footerContactLine1?: string;
  footerContactLine2?: string;
  footerSignature?: string;
  footerNavTitle?: string;
  instagramHeaderLabel?: string;
  instagramButtonLabel?: string;
  instagramProductButtonLabel?: string;
  instagramDmTemplate?: string;
  shopierButtonLabel?: string;
  whatsappButtonLabel?: string;
  breadcrumbHomeLabel?: string;
  breadcrumbProductsLabel?: string;
  backToProductsLabel?: string;
  allCategoriesLabel?: string;
  giftReadyLabel?: string;
  saleBadgeTemplate?: string;
  statusAvailableLabel?: string;
  statusMadeToOrderLabel?: string;
  statusSoldLabel?: string;
  imagePlaceholderLabel?: string;
  relatedProductsHandwritten?: string;
  relatedProductsTitle?: string;
  productNotFoundTitle?: string;
  productMetaDescriptionSuffix?: string;
  labelDimensions?: string;
  labelMaterial?: string;
  labelCare?: string;
  labelColors?: string;
  detailNoteHandwritten?: string;
  detailNoteText?: string;
  seoTitleSuffix?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  ogDescription?: string;
  errorHandwritten?: string;
  errorTitle?: string;
  errorText?: string;
  errorRetryLabel?: string;
  errorHomeLabel?: string;
  notFoundHandwritten?: string;
  notFoundTitle?: string;
  notFoundText?: string;
  notFoundHomeLabel?: string;
  loadingHandwritten?: string;
  loadingText?: string;
};
