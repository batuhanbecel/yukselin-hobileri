import { defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Hakkımda Sayfası",
  type: "document",
  groups: [
    { name: "header", title: "Başlık" },
    { name: "story", title: "Hikaye" },
    { name: "values", title: "Değerler" },
    { name: "cta", title: "İletişim CTA" },
  ],
  fields: [
    // HEADER
    defineField({
      name: "pageHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "küçük hikayemiz",
      group: "header",
    }),
    defineField({
      name: "pageTitle",
      title: "Sayfa başlığı",
      type: "string",
      initialValue: "Hakkımda",
      group: "header",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO başlık",
      type: "string",
      initialValue: "Hakkımda",
      group: "header",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO açıklama",
      type: "text",
      rows: 2,
      initialValue:
        "Yüksel'in Hobileri — annemin sevgiyle ördüğü çantaların hikayesi.",
      group: "header",
    }),
    defineField({
      name: "storySectionLabel",
      title: "Hikaye bölüm etiketi",
      type: "string",
      initialValue: "/ Hikaye",
      group: "header",
    }),
    defineField({
      name: "dropCapLetter",
      title: "Drop cap harfi",
      type: "string",
      initialValue: "Y",
      group: "story",
    }),

    // STORY
    defineField({
      name: "story",
      title: "Hikaye metni",
      type: "array",
      of: [{ type: "block" }],
      group: "story",
    }),
    defineField({
      name: "storySignature",
      title: "Hikaye imzası (el yazısı)",
      type: "string",
      initialValue: "— Yüksel",
      group: "story",
    }),

    // VALUES
    defineField({
      name: "valuesSectionLabel",
      title: "Değerler bölüm etiketi",
      type: "string",
      initialValue: "/ Değerler",
      group: "values",
    }),
    defineField({
      name: "values",
      title: "Değer kartları",
      type: "array",
      group: "values",
      of: [
        {
          type: "object",
          name: "value",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "text", title: "Metin", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        },
      ],
      initialValue: [
        {
          _key: "v1",
          title: "El yapımı",
          text: "Her ilmek tek tek elden geçer; makineye uğramaz.",
        },
        {
          _key: "v2",
          title: "Doğal malzeme",
          text: "Cilde dost, nefes alan ipliklerle örülür.",
        },
        {
          _key: "v3",
          title: "Hafif & kullanışlı",
          text: "Omuzda yormaz, içine ihtiyacın olanı rahat alır.",
        },
        {
          _key: "v4",
          title: "Günlük kullanıma uygun",
          text: "Sabah pazara, akşam buluşmaya — her yere yakışır.",
        },
      ],
    }),

    // CTA
    defineField({
      name: "ctaHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "bana ulaşabilirsiniz",
      group: "cta",
    }),
    defineField({
      name: "ctaTitle",
      title: "CTA başlığı",
      type: "string",
      initialValue: "Bir kahve eşliğinde konuşalım",
      group: "cta",
    }),
    defineField({
      name: "ctaText",
      title: "CTA alt metni",
      type: "text",
      rows: 3,
      initialValue: "Sorularını, özel taleplerinizi bana iletebilirsiniz.",
      group: "cta",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hakkımda Sayfası" };
    },
  },
});
