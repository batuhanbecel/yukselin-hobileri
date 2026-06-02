import { defineField, defineType } from "sanity";

export const product = defineType({
  name: "product",
  title: "Ürün",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Ürün Adı",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "price",
      title: "Fiyat (TL)",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
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
    }),
    defineField({
      name: "saleBadge",
      title: "İndirim rozeti metni",
      type: "string",
      description:
        "Boş bırakırsanız otomatik olarak indirim yüzdesi yazılır (örn. %20).",
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
            {
              name: "alt",
              type: "string",
              title: "Alternatif metin",
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "reference",
      to: [{ type: "category" }],
      description: "Çanta, kazak, hırka vb.",
    }),
    defineField({
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "shopierUrl",
      title: "Shopier Linki",
      type: "url",
      description:
        "İsteğe bağlı. Doluysa ürün altında 'Shopier'dan satın al' butonu çıkar.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
    }),
    defineField({
      name: "featured",
      title: "Ana sayfada göster",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sıralama",
      type: "number",
      initialValue: 0,
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
    },
    prepare({ title, media, price, salePrice }) {
      const hasSale =
        typeof salePrice === "number" && salePrice > 0 && salePrice < price;
      const subtitle = hasSale
        ? `₺${salePrice}  (eski: ₺${price})  •  İNDİRİMDE`
        : price
        ? `₺${price}`
        : undefined;
      return { title, subtitle, media };
    },
  },
});
