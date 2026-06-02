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
      name: "description",
      title: "Açıklama",
      type: "text",
      rows: 4,
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
    },
    prepare({ title, media, price }) {
      return {
        title,
        subtitle: price ? `₺${price}` : undefined,
        media,
      };
    },
  },
});
