import { defineField, defineType } from "sanity";

export const faqPage = defineType({
  name: "faqPage",
  title: "SSS Sayfası",
  type: "document",
  fields: [
    defineField({
      name: "pageHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "merak ettikleriniz",
    }),
    defineField({
      name: "pageTitle",
      title: "Sayfa başlığı",
      type: "string",
      initialValue: "Sıkça Sorulanlar",
    }),
    defineField({
      name: "pageDescription",
      title: "Sayfa açıklaması",
      type: "text",
      rows: 3,
      initialValue:
        "Sipariş, kargo ve ürünlerle ilgili en sık aldığım soruları burada topladım.",
    }),
    defineField({
      name: "sectionLabel",
      title: "Bölüm etiketi",
      type: "string",
      initialValue: "/ Soru-Cevap",
    }),
    defineField({
      name: "metaTitle",
      title: "SEO başlık",
      type: "string",
      initialValue: "SSS — Sıkça Sorulanlar",
    }),
    defineField({
      name: "metaDescription",
      title: "SEO açıklama",
      type: "text",
      rows: 2,
      initialValue:
        "Sipariş, kargo, bakım gibi sık sorulan soruların cevapları burada.",
    }),
    defineField({
      name: "emptyMessage",
      title: "Boş liste mesajı",
      type: "string",
      initialValue: "Henüz soru eklenmemiş.",
    }),
    defineField({
      name: "ctaHandwritten",
      title: "Alt CTA — el yazısı",
      type: "string",
      initialValue: "başka bir sorun mu var?",
    }),
    defineField({
      name: "ctaTitle",
      title: "Alt CTA — başlık",
      type: "string",
      initialValue: "Bana doğrudan yazabilirsin",
    }),
    defineField({
      name: "items",
      title: "Sorular",
      type: "array",
      of: [
        {
          type: "object",
          name: "faqItem",
          fields: [
            {
              name: "question",
              title: "Soru",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "answer",
              title: "Cevap",
              type: "text",
              rows: 4,
              validation: (Rule) => Rule.required(),
            },
          ],
          preview: {
            select: { title: "question", subtitle: "answer" },
          },
        },
      ],
      initialValue: [
        {
          _key: "f1",
          question: "Nasıl sipariş veririm?",
          answer:
            "Beğendiğiniz çantanın altındaki Instagram butonuna dokunarak bana yazabilirsiniz. Sohbet sırasında renk, model ve kargo detaylarını konuşuyoruz.",
        },
        {
          _key: "f2",
          question: "Bir çanta ne kadar sürede hazır oluyor?",
          answer:
            "Modeline göre değişir; küçük çantalar 3-5 gün, büyük çantalar 1-2 hafta sürebiliyor.",
        },
        {
          _key: "f3",
          question: "Özel renk veya model isteyebilir miyim?",
          answer:
            "Tabii ki. Aklınızdaki rengi veya modeli yazarsanız beraber karar veririz.",
        },
        {
          _key: "f4",
          question: "Kargo nasıl gönderiliyor?",
          answer:
            "Anlaşmalı kargo firmasıyla kapınıza kadar geliyor. Türkiye'nin her yerine gönderim yapıyorum.",
        },
        {
          _key: "f5",
          question: "Çantamı nasıl korurum?",
          answer:
            "Çantalar elde, 30 derece ılık suda yıkanır. Asılı değil düz şekilde kurutulmalıdır.",
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "SSS Sayfası" };
    },
  },
});
