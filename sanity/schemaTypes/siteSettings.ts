import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Ayarları",
  type: "document",
  fields: [
    defineField({
      name: "siteTitle",
      title: "Site Başlığı",
      type: "string",
      initialValue: "Yükselin Hobileri",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      initialValue: "https://www.instagram.com/ykslbcl/",
    }),
    defineField({
      name: "heroTitle",
      title: "Ana Sayfa Başlık",
      type: "string",
      initialValue: "El emeği örgü çantalar",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Ana Sayfa Alt Başlık",
      type: "text",
      rows: 3,
      initialValue:
        "Her biri sevgiyle örülmüş, benzersiz çantalar. Sipariş ve bilgi için Instagram'dan bize ulaşın.",
    }),
    defineField({
      name: "aboutText",
      title: "Hakkımızda Metni",
      type: "array",
      of: [{ type: "block" }],
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Numarası (opsiyonel)",
      type: "string",
      description: "Örnek: 905551234567",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Ayarları" };
    },
  },
});
