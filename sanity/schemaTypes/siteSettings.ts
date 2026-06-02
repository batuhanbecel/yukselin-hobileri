import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Genel Site Ayarları",
  type: "document",
  groups: [
    { name: "general", title: "Genel" },
    { name: "social", title: "Sosyal & İletişim" },
    { name: "header", title: "Header" },
    { name: "footer", title: "Footer" },
    { name: "productDetail", title: "Ürün Detayı" },
  ],
  fields: [
    // GENERAL
    defineField({
      name: "siteTitle",
      title: "Site Başlığı",
      type: "string",
      initialValue: "Yüksel'in Hobileri",
      group: "general",
    }),

    // SOCIAL
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/ykslbcl/",
      group: "social",
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram kullanıcı adı",
      type: "string",
      description: "Footer'da gösterilir, örn: @ykslbcl",
      initialValue: "@ykslbcl",
      group: "social",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Numarası (opsiyonel)",
      type: "string",
      description: "Örnek: 905551234567",
      group: "social",
    }),
    defineField({
      name: "shopierStoreUrl",
      title: "Shopier Mağaza Linki (opsiyonel)",
      type: "url",
      description:
        "Ürün başına ayrı bir Shopier linki tanımlamadıysanız, genel mağaza linki burada kullanılır.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
      group: "social",
    }),

    // HEADER
    defineField({
      name: "headerTagline",
      title: "Logo altı etiket (el yazısı)",
      type: "string",
      description: "Header'da logoya bitişik küçük el yazısı.",
      initialValue: "el emeği örgü",
      group: "header",
    }),

    // FOOTER
    defineField({
      name: "footerTagline",
      title: "Footer slogan (el yazısı)",
      type: "string",
      initialValue: "her ilmek bir hikaye",
      group: "footer",
    }),
    defineField({
      name: "footerDescription",
      title: "Footer açıklama",
      type: "text",
      rows: 3,
      initialValue:
        "Bu sitedeki ürünler sadece paylaşım içindir. Beğendiğiniz bir çanta varsa Instagram'dan bana yazabilirsiniz.",
      group: "footer",
    }),
    defineField({
      name: "footerSignature",
      title: "Footer alt yazı (el yazısı)",
      type: "string",
      initialValue: "sevgiyle örüldü",
      group: "footer",
    }),
    defineField({
      name: "footerNavTitle",
      title: "Footer “sayfalar” başlığı (el yazısı)",
      type: "string",
      initialValue: "sayfalar",
      group: "footer",
    }),

    // PRODUCT DETAIL
    defineField({
      name: "detailNoteHandwritten",
      title: "Ürün detayı not başlığı (el yazısı)",
      type: "string",
      initialValue: "küçük bir not",
      group: "productDetail",
    }),
    defineField({
      name: "detailNoteText",
      title: "Ürün detayı not metni",
      type: "text",
      rows: 3,
      initialValue:
        "Bu siteden doğrudan satış yapılmamaktadır. Çanta hoşunuza gittiyse Instagram'dan bana yazabilirsiniz; renk, model ve detaylarını birlikte konuşalım.",
      group: "productDetail",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Genel Site Ayarları" };
    },
  },
});
