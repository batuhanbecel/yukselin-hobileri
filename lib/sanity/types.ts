import type { PortableTextBlock } from "@portabletext/types";

export type SanityImage = {
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
};

export type Category = {
  _id: string;
  title: string;
  slug: { current: string };
  order?: number;
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
  featured?: boolean;
  order?: number;
  category?: Pick<Category, "_id" | "title"> & { slug: { current: string } };
  shopierUrl?: string;
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
  featuredHandwritten?: string;
  featuredTitle?: string;
  featuredSubtitle?: string;
  featuredLinkLabel?: string;
  highlightsHandwritten?: string;
  highlightsTitle?: string;
  highlights?: Highlight[];
  stepsHandwritten?: string;
  stepsTitle?: string;
  stepsSubtitle?: string;
  steps?: Step[];
  stepsCtaLabel?: string;
  quoteHandwritten?: string;
  quoteText?: string;
  quoteAuthor?: string;
};

export type AboutPage = {
  pageHandwritten?: string;
  pageTitle?: string;
  story?: PortableTextBlock[];
  storySignature?: string;
  values?: Value[];
  ctaHandwritten?: string;
  ctaTitle?: string;
  ctaText?: string;
};

export type ProductsPage = {
  pageHandwritten?: string;
  pageTitle?: string;
  pageDescription?: string;
  emptyMessage?: string;
  emptyDescription?: string;
};

export type SiteSettings = {
  siteTitle?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  whatsappNumber?: string;
  shopierStoreUrl?: string;
  headerTagline?: string;
  footerTagline?: string;
  footerDescription?: string;
  footerSignature?: string;
  footerNavTitle?: string;
  detailNoteHandwritten?: string;
  detailNoteText?: string;
  // legacy — eski hakkımda metni siteSettings'te tutuluyordu, geriye dönük olarak korunsun
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: PortableTextBlock[];
};
