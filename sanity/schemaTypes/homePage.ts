import { defineField, defineType } from "sanity";

const ICON_OPTIONS = [
  { title: "İplik yumağı", value: "yarn" },
  { title: "Yaprak", value: "leaf" },
  { title: "Rüzgar / hafif", value: "wind" },
  { title: "Çanta", value: "bag" },
  { title: "Kalp", value: "heart" },
  { title: "Yıldız", value: "star" },
  { title: "Yok", value: "none" },
];

export const homePage = defineType({
  name: "homePage",
  title: "Ana Sayfa",
  type: "document",
  groups: [
    { name: "hero", title: "Hero" },
    { name: "featured", title: "Öne Çıkanlar" },
    { name: "highlights", title: "Vurgular" },
    { name: "steps", title: "Sipariş Adımları" },
    { name: "quote", title: "Alıntı" },
  ],
  fields: [
    // HERO
    defineField({
      name: "heroGreeting",
      title: "Karşılama (el yazısı)",
      type: "string",
      description: "Hero başlığının üstünde küçük el yazısı.",
      initialValue: "merhaba, hoş geldin",
      group: "hero",
    }),
    defineField({
      name: "heroBadge",
      title: "Rozet metni",
      type: "string",
      description: "Karşılamanın altındaki küçük rozet.",
      initialValue: "El emeği · Tek tek örüldü",
      group: "hero",
    }),
    defineField({
      name: "heroTitleStart",
      title: "Başlık — başlangıç",
      type: "string",
      description: "Vurgu kelimesinden öncesi.",
      initialValue: "Annemin",
      group: "hero",
    }),
    defineField({
      name: "heroTitleEmphasis",
      title: "Başlık — vurgulu kelime",
      type: "string",
      description: "Italic ve terracotta renkte çıkar.",
      initialValue: "sevgiyle",
      group: "hero",
    }),
    defineField({
      name: "heroTitleEnd",
      title: "Başlık — son",
      type: "string",
      description: "Vurgu kelimesinden sonrası.",
      initialValue: "ördüğü çantalar",
      group: "hero",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero alt metin",
      type: "text",
      rows: 3,
      initialValue:
        "Her ilmek bir hikaye, her çanta tek parça. Yılların deneyimi ve sıcacık bir kalple hazırlandı.",
      group: "hero",
    }),
    defineField({
      name: "heroSignature",
      title: "İmza (el yazısı)",
      type: "string",
      initialValue: "— sevgilerimle, Yüksel",
      group: "hero",
    }),
    defineField({
      name: "heroCardNumber",
      title: "Hero kart — numara",
      type: "string",
      initialValue: "N° 01",
      group: "hero",
    }),
    defineField({
      name: "heroCardTitle",
      title: "Hero kart — başlık (italic)",
      type: "string",
      initialValue: "el emeği",
      group: "hero",
    }),
    defineField({
      name: "heroCardLineStart",
      title: "Hero kart — sol alt metin",
      type: "string",
      initialValue: "her ilmek",
      group: "hero",
    }),
    defineField({
      name: "heroCardLineEnd",
      title: "Hero kart — sağ alt metin",
      type: "string",
      initialValue: "bir hikaye",
      group: "hero",
    }),

    // FEATURED
    defineField({
      name: "featuredHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "seçtiklerim",
      group: "featured",
    }),
    defineField({
      name: "featuredTitle",
      title: "Başlık",
      type: "string",
      initialValue: "Öne çıkan çantalar",
      group: "featured",
    }),
    defineField({
      name: "featuredSubtitle",
      title: "Alt metin",
      type: "string",
      initialValue: "En çok sevilen, en çok sorulan parçalar.",
      group: "featured",
    }),
    defineField({
      name: "featuredLinkLabel",
      title: "“Tümünü gör” buton metni",
      type: "string",
      initialValue: "Tümünü gör →",
      group: "featured",
    }),
    defineField({
      name: "featuredSectionLabel",
      title: "Bölüm etiketi",
      type: "string",
      initialValue: "/ Vitrin",
      group: "featured",
    }),

    // HIGHLIGHTS
    defineField({
      name: "highlightsHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "neden bu çantalar",
      group: "highlights",
    }),
    defineField({
      name: "highlightsTitle",
      title: "Başlık",
      type: "string",
      initialValue: "Her detay özenle",
      group: "highlights",
    }),
    defineField({
      name: "highlightsSectionLabel",
      title: "Bölüm etiketi",
      type: "string",
      initialValue: "/ Felsefe",
      group: "highlights",
    }),
    defineField({
      name: "highlights",
      title: "Vurgular",
      type: "array",
      group: "highlights",
      of: [
        {
          type: "object",
          name: "highlight",
          fields: [
            { name: "title", title: "Başlık", type: "string" },
            { name: "text", title: "Metin", type: "text", rows: 2 },
            {
              name: "iconKey",
              title: "İkon",
              type: "string",
              options: { list: ICON_OPTIONS, layout: "dropdown" },
              initialValue: "yarn",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
          },
        },
      ],
      initialValue: [
        {
          _key: "h1",
          title: "El yapımı",
          text: "Her ilmek elden geçer, makineye uğramaz.",
          iconKey: "yarn",
        },
        {
          _key: "h2",
          title: "Doğal malzeme",
          text: "Cilde dost, nefes alan iplikler.",
          iconKey: "leaf",
        },
        {
          _key: "h3",
          title: "Hafif & kullanışlı",
          text: "Omuzda yormaz, içine ihtiyacın olanı alır.",
          iconKey: "wind",
        },
        {
          _key: "h4",
          title: "Günlük kullanıma uygun",
          text: "Sabah pazara, akşam buluşmaya yakışır.",
          iconKey: "bag",
        },
      ],
    }),

    // STEPS
    defineField({
      name: "stepsHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "nasıl olur",
      group: "steps",
    }),
    defineField({
      name: "stepsTitle",
      title: "Başlık",
      type: "string",
      initialValue: "Nasıl sipariş verilir?",
      group: "steps",
    }),
    defineField({
      name: "stepsSubtitle",
      title: "Alt metin",
      type: "text",
      rows: 2,
      initialValue:
        "Burada vitrin var, sohbet Instagram'da. Üç basit adımda yanındayız.",
      group: "steps",
    }),
    defineField({
      name: "stepsSectionLabel",
      title: "Bölüm etiketi",
      type: "string",
      initialValue: "/ Süreç",
      group: "steps",
    }),
    defineField({
      name: "steps",
      title: "Adımlar",
      type: "array",
      group: "steps",
      of: [
        {
          type: "object",
          name: "step",
          fields: [
            { name: "number", title: "Numara", type: "string" },
            { name: "title", title: "Başlık", type: "string" },
            { name: "text", title: "Metin", type: "text", rows: 2 },
          ],
          preview: {
            select: { title: "title", subtitle: "number" },
          },
        },
      ],
      initialValue: [
        {
          _key: "s1",
          number: "01",
          title: "Beğen",
          text: "Sitede gezin, gönlüne düşen çantayı seç.",
        },
        {
          _key: "s2",
          number: "02",
          title: "Yaz",
          text: "Instagram'dan bana mesaj at, sohbet edelim.",
        },
        {
          _key: "s3",
          number: "03",
          title: "Buluş",
          text: "Renk, model, detay — istediğin gibi konuşalım.",
        },
      ],
    }),
    defineField({
      name: "stepsCtaLabel",
      title: "Adımların altındaki “tüm çantalar” buton metni",
      type: "string",
      initialValue: "Tüm Çantaları İncele",
      group: "steps",
    }),

    // QUOTE
    defineField({
      name: "quoteHandwritten",
      title: "El yazısı üst etiket",
      type: "string",
      initialValue: "benden sana",
      group: "quote",
    }),
    defineField({
      name: "quoteText",
      title: "Alıntı metni",
      type: "text",
      rows: 4,
      initialValue:
        "Her çantayı evimin sessizliğinde, bir çay demlerken, veya kahvemi yudumlarken örüyorum. Senin de hayatına ufak bir sıcaklık katsın isterim.",
      group: "quote",
    }),
    defineField({
      name: "quoteAuthor",
      title: "İmza (el yazısı)",
      type: "string",
      initialValue: "— Yüksel",
      group: "quote",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Ana Sayfa" };
    },
  },
});
