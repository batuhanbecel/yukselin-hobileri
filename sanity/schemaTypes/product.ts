import { defineField, defineType } from "sanity";

const STATUS_OPTIONS = [
  { title: "Stokta", value: "available" },
  { title: "Sipariş üzerine", value: "made-to-order" },
  { title: "Satıldı", value: "sold" },
];

export const product = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  groups: [
    { name: "main", title: "Temel" },
    { name: "details", title: "Ürün Detayları" },
    { name: "commerce", title: "Satış & İndirim" },
    { name: "meta", title: "Görünürlük" },
  ],
  fields: [
    // MAIN
    defineField({
      name: "title",
      title: "Ürün Adı",
      type: "string",
      validation: (Rule) => Rule.required(),
      group: "main",
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
      group: "main",
    }),
    defineField({
      name: "images",
      title: "Fotoğraflar",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alternatif metin" },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
      group: "main",
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      description: "Çanta, kazak, hırka vb.",
      group: "main",
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
      group: "main",
    }),

    // DETAILS
    defineField({
      name: "dimensions",
      title: "Boyut",
      type: "string",
      description: "Örn: 28 × 32 cm",
      group: "details",
    }),
    defineField({
      name: "material",
      title: "Malzeme",
      type: "string",
      description: "Örn: %100 pamuk ipi, akrilik, jüt",
      group: "details",
    }),
    defineField({
      name: "care",
      title: "Bakım",
      type: "string",
      description: "Örn: 30°C'de elde yıkanır",
      group: "details",
    }),
    defineField({
      name: "colors",
      title: "Renk Seçenekleri",
      type: "array",
      of: [
        {
          type: "object",
          name: "color",
          fields: [
            {
              name: "name",
              title: "Renk Adı",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "hex",
              title: "Renk Kodu",
              type: "string",
              description: "Örn: #c4756c (renk yuvarlağı için)",
              validation: (Rule) =>
                Rule.regex(/^#?([0-9a-fA-F]{6}|[0-9a-fA-F]{3})$/, {
                  name: "hex",
                  invert: false,
                }).warning("Geçerli bir hex kodu girin (örn. #c4756c)"),
            },
          ],
          preview: {
            select: { title: "name", subtitle: "hex" },
          },
        },
      ],
      description: "Aynı modelin sunulabilen renkleri.",
      group: "details",
    }),

    // COMMERCE
    defineField({
      name: "price",
      title: "Fiyat (TL)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
      group: "commerce",
    }),
    defineField({
      name: "salePrice",
      title: "İndirimli Fiyat (TL)",
      type: "number",
      description:
        "Doluysa ürün indirimde sayılır. Eski fiyat üstü çizili, indirimli fiyat vurgulu gösterilir.",
      validation: (Rule) =>
        Rule.min(0).custom((value, ctx) => {
          const price = (ctx.document as { price?: number } | undefined)?.price;
          if (value === undefined || value === null) return true;
          if (typeof price === "number" && value >= price) {
            return "İndirimli fiyat, normal fiyattan düşük olmalı.";
          }
          return true;
        }),
      group: "commerce",
    }),
    defineField({
      name: "saleBadge",
      title: "İndirim rozeti metni",
      type: "string",
      description:
        "Boş bırakırsanız otomatik olarak indirim yüzdesi yazılır (örn. %20).",
      group: "commerce",
    }),
    defineField({
      name: "status",
      title: "Durum",
      type: "string",
      options: { list: STATUS_OPTIONS, layout: "radio" },
      initialValue: "available",
      group: "commerce",
    }),
    defineField({
      name: "shopierUrl",
      title: "Shopier Linki",
      type: "url",
      description:
        "İsteğe bağlı. Doluysa ürün altında 'Shopier'dan satın al' butonu çıkar.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
      group: "commerce",
    }),
    defineField({
      name: "giftReady",
      title: "Hediye paketi mevcut",
      type: "boolean",
      description: "Açıksa ürünün üzerinde 'hediye paketi var' rozeti çıkar.",
      initialValue: false,
      group: "commerce",
    }),

    // META
    defineField({
      name: "featured",
      title: "Ana sayfada göster",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      initialValue: 0,
      group: "meta",
    }),
  ],
  orderings: [
    {
      title: "Sıralama",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "images.0",
      price: "price",
      salePrice: "salePrice",
      status: "status",
    },
    prepare({ title, media, price, salePrice, status }) {
      const hasSale =
        typeof salePrice === "number" && salePrice > 0 && salePrice < price;
      const parts: string[] = [];
      if (hasSale) {
        parts.push(`₺${salePrice} (eski: ₺${price}) • İNDİRİMDE`);
      } else if (price) {
        parts.push(`₺${price}`);
      }
      if (status === "sold") parts.push("SATILDI");
      else if (status === "made-to-order") parts.push("Sipariş üzerine");
      return { title, subtitle: parts.join("  •  ") || undefined, media };
    },
  },
});
