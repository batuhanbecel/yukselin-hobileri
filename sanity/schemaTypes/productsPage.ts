import { defineField, defineType } from "sanity";

export const productsPage = defineType({
  name: "productsPage",
  title: "Ürünler Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "tüm koleksiyon",
    }),
    defineField({
      name: "pageTitle",
      title: "Sayfa başlığı",
      type: "string",
      initialValue: "Ürünler",
    }),
    defineField({
      name: "pageDescription",
      title: "Sayfa açıklaması",
      type: "text",
      rows: 3,
      initialValue:
        "Her biri tek tek, sevgiyle örüldü. Beğendiğin ürünün altındaki Instagram butonuna dokun, gerisini birlikte halledelim.",
    }),
    defineField({
      name: "emptyMessage",
      title: "Boş durum mesajı",
      type: "string",
      description: "Hiç ürün yokken gösterilir.",
      initialValue: "yakında burada...",
    }),
    defineField({
      name: "emptyDescription",
      title: "Boş durum açıklaması",
      type: "text",
      rows: 2,
      initialValue: "Yeni çantalar şu an tezgahta. Çok yakında paylaşacağım.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ürünler Sayfası" };
    },
  },
});
