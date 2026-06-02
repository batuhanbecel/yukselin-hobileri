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
  images: SanityImage[];
  description?: string;
  featured?: boolean;
  order?: number;
  category?: Pick<Category, "_id" | "title"> & { slug: { current: string } };
  shopierUrl?: string;
};

export type SiteSettings = {
  siteTitle?: string;
  instagramUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  aboutText?: PortableTextBlock[];
  whatsappNumber?: string;
  shopierStoreUrl?: string;
};
