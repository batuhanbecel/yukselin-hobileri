import type {
  AboutPage,
  Category,
  FaqPage,
  HomePage,
  Product,
  ProductsPage,
  SiteSettings,
} from "./types";

/** Placeholder kategoriler */
export const mockCategories: Category[] = [
  { _id: "cat-canta", title: "Çanta", slug: { current: "canta" }, order: 1 },
  { _id: "cat-kazak", title: "Kazak", slug: { current: "kazak" }, order: 2 },
  { _id: "cat-hirka", title: "Hırka", slug: { current: "hirka" }, order: 3 },
];

const cantaRef = {
  _id: "cat-canta",
  title: "Çanta",
  slug: { current: "canta" },
};
const kazakRef = {
  _id: "cat-kazak",
  title: "Kazak",
  slug: { current: "kazak" },
};

export const mockProducts: Product[] = [
  {
    _id: "mock-1",
    title: "Pembe Örgü Omuz Çantası",
    slug: { current: "pembe-orgu-omuz-cantasi" },
    price: 850,
    images: [],
    description:
      "Yumuşak pembe iplikle örülmüş, günlük kullanıma uygun şirin bir omuz çantası. El emeği, tek parça.",
    dimensions: "28 × 32 cm",
    material: "%100 pamuk ipi",
    care: "30°C'de elde yıkanır",
    colors: [
      { _key: "c1", name: "Pembe", hex: "#e9b8a8" },
      { _key: "c2", name: "Krem", hex: "#f3e8d4" },
    ],
    status: "available",
    giftReady: true,
    featured: true,
    order: 1,
    category: cantaRef,
  },
  {
    _id: "mock-2",
    title: "Lavanta Çapraz Çanta",
    slug: { current: "lavanta-capraz-canta" },
    price: 920,
    salePrice: 690,
    images: [],
    description:
      "Lavanta tonlarında, çapraz askılı zarif bir çanta. Her detayı özenle işlendi.",
    dimensions: "22 × 26 cm",
    material: "Pamuk + akrilik karışım",
    care: "Soğuk suda elde yıkanır",
    colors: [{ _key: "c1", name: "Lavanta", hex: "#c9b3d9" }],
    status: "available",
    giftReady: true,
    featured: true,
    order: 2,
    category: cantaRef,
  },
  {
    _id: "mock-3",
    title: "Krem Mini El Çantası",
    slug: { current: "krem-mini-el-cantasi" },
    price: 650,
    images: [],
    description:
      "Krem rengi mini el çantası; özel günler ve günlük şıklık için ideal.",
    dimensions: "18 × 14 cm",
    material: "Jüt + pamuk",
    care: "Nemli bezle silinir",
    colors: [
      { _key: "c1", name: "Krem", hex: "#f3e8d4" },
      { _key: "c2", name: "Bej", hex: "#d9c4a7" },
    ],
    status: "sold",
    featured: true,
    order: 3,
    category: cantaRef,
  },
  {
    _id: "mock-4",
    title: "Bej Yün Kazak",
    slug: { current: "bej-yun-kazak" },
    price: 1450,
    images: [],
    description: "Sıcacık bej yün kazak; soğuk günlerin vazgeçilmezi.",
    dimensions: "S / M / L",
    material: "%70 yün, %30 akrilik",
    care: "Kuru temizleme önerilir",
    status: "made-to-order",
    featured: false,
    order: 4,
    category: kazakRef,
  },
];

export const mockSiteSettings: SiteSettings = {
  siteTitle: "Yüksel'in Hobileri",
  navLinks: [
    { _key: "n1", label: "Ana Sayfa", href: "/" },
    { _key: "n2", label: "Ürünler", href: "/urunler" },
    { _key: "n3", label: "Hakkımda", href: "/hakkimizda" },
    { _key: "n4", label: "SSS", href: "/sss" },
  ],
  instagramUrl: "https://www.instagram.com/ykslbcl/",
  instagramHandle: "@ykslbcl",
  headerTagline: "el emeği örgü",
  footerStudioLabel: "/ Atölye",
  footerTagline: "her ilmek bir hikaye",
  footerDescription:
    "Bu sitedeki ürünler sadece paylaşım içindir. Beğendiğiniz bir çanta varsa Instagram'dan bana yazabilirsiniz.",
  footerContactTitle: "iletişim",
  footerContactLine1: "Sipariş için Instagram'dan yazın.",
  footerContactLine2: "Türkiye'nin her yerine kargo.",
  footerSignature: "sevgiyle örüldü",
  footerNavTitle: "sayfalar",
  instagramHeaderLabel: "Instagram",
  instagramButtonLabel: "Instagram'dan yaz",
  instagramProductButtonLabel: "Instagram'dan sipariş ver",
  instagramDmTemplate: 'Merhaba, "{title}" hakkında bilgi almak istiyorum.',
  shopierButtonLabel: "Shopier'dan satın al",
  whatsappButtonLabel: "WhatsApp'tan yaz",
  breadcrumbHomeLabel: "Ana sayfa",
  breadcrumbProductsLabel: "Ürünler",
  backToProductsLabel: "← Tüm çantalar",
  allCategoriesLabel: "Hepsi",
  giftReadyLabel: "Hediye paketli",
  saleBadgeTemplate: "%{percent} indirim",
  statusAvailableLabel: "Stokta",
  statusMadeToOrderLabel: "Sipariş üzerine",
  statusSoldLabel: "Satıldı",
  imagePlaceholderLabel: "fotoğraf yakında",
  relatedProductsHandwritten: "bunlar da hoşuna gidebilir",
  relatedProductsTitle: "Benzer çantalar",
  productNotFoundTitle: "Çanta bulunamadı",
  productMetaDescriptionSuffix: "Instagram'dan sipariş verin.",
  labelDimensions: "Boyut",
  labelMaterial: "Malzeme",
  labelCare: "Bakım",
  labelColors: "Renk seçenekleri",
  detailNoteHandwritten: "küçük bir not",
  detailNoteText:
    "Bu siteden doğrudan satış yapılmamaktadır. Çanta hoşunuza gittiyse Instagram'dan bana yazabilirsiniz; renk, model ve detaylarını birlikte konuşalım.",
  seoTitleSuffix: "El Emeği Örgü Çantalar",
  seoDescription:
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü el emeği çantalar. Sipariş ve bilgi için Instagram @ykslbcl.",
  seoKeywords: ["örgü çanta", "el örgüsü", "el emeği", "Yüksel'in Hobileri"],
  ogDescription: "Annemin sevgiyle ördüğü el emeği çantalar.",
  errorHandwritten: "bir aksilik oldu",
  errorTitle: "Sayfa yüklenemedi",
  errorText: "Sanırım bir ilmek kaçtı. Bir dakika sonra tekrar dene.",
  errorRetryLabel: "Tekrar dene",
  errorHomeLabel: "Ana sayfaya dön",
  notFoundHandwritten: "aman",
  notFoundTitle: "Sayfa bulunamadı",
  notFoundText: "Aradığın sayfa burada değil. Belki ipucu kayboldu.",
  notFoundHomeLabel: "Ana sayfaya dön",
  loadingHandwritten: "örülüyor...",
  loadingText: "Sayfa hazırlanıyor",
};

export const mockHomePage: HomePage = {
  heroGreeting: "merhaba, hoş geldin",
  heroBadge: "El emeği · Tek tek örüldü",
  heroTitleStart: "Annemin",
  heroTitleEmphasis: "sevgiyle",
  heroTitleEnd: "ördüğü çantalar",
  heroSubtitle:
    "Her ilmek bir hikaye, her çanta tek parça. Yılların deneyimi ve sıcacık bir kalple hazırlandı.",
  heroSignature: "— sevgilerimle, Yüksel",
  heroCardNumber: "N° 01",
  heroCardTitle: "el emeği",
  heroCardLineStart: "her ilmek",
  heroCardLineEnd: "bir hikaye",

  featuredHandwritten: "seçtiklerim",
  featuredTitle: "Öne çıkan çantalar",
  featuredSubtitle: "En çok sevilen, en çok sorulan parçalar.",
  featuredLinkLabel: "Tümünü gör →",
  featuredSectionLabel: "/ Vitrin",

  highlightsHandwritten: "neden bu çantalar",
  highlightsTitle: "Her detay özenle",
  highlightsSectionLabel: "/ Felsefe",
  highlights: [
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

  stepsHandwritten: "nasıl olur",
  stepsTitle: "Nasıl sipariş verilir?",
  stepsSubtitle:
    "Burada vitrin var, sohbet Instagram'da. Üç basit adımda yanındayız.",
  stepsSectionLabel: "/ Süreç",
  steps: [
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
  stepsCtaLabel: "Tüm Çantaları İncele",

  quoteHandwritten: "benden sana",
  quoteText:
    "Her çantayı evimin sessizliğinde, bir çay demlerken, veya kahvemi yudumlarken örüyorum. Senin de hayatına ufak bir sıcaklık katsın isterim.",
  quoteAuthor: "— Yüksel",
};

export const mockAboutPage: AboutPage = {
  pageHandwritten: "küçük hikayemiz",
  pageTitle: "Hakkımda",
  metaTitle: "Hakkımda",
  metaDescription:
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü çantaların hikayesi.",
  storySectionLabel: "/ Hikaye",
  dropCapLetter: "Y",
  story: [
    {
      _type: "block",
      _key: "about1",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "span1",
          text: "Burada her çanta el emeğiyle, tek tek örülür. Yılların deneyimi ve sevgiyle hazırladığım örgü çantalar; günlük kullanımdan özel günlere kadar hayatınıza sıcak bir dokunuş katar.",
          marks: [],
        },
      ],
    },
    {
      _type: "block",
      _key: "about2",
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: "span2",
          text: "Sipariş vermek veya özel tasarım talepleriniz için Instagram hesabımızdan bana yazmanız yeterli. Her çanta benzersizdir; stoklar sınırlıdır.",
          marks: [],
        },
      ],
    },
  ],
  storySignature: "— Yüksel",
  valuesSectionLabel: "/ Değerler",
  values: [
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
  ctaHandwritten: "bana ulaşabilirsiniz",
  ctaTitle: "Bir kahve eşliğinde konuşalım",
  ctaText: "Sorularını, özel taleplerinizi bana iletebilirsiniz.",
};

export const mockFaqPage: FaqPage = {
  pageHandwritten: "merak ettikleriniz",
  pageTitle: "Sıkça Sorulanlar",
  pageDescription:
    "Sipariş, kargo ve ürünlerle ilgili en sık aldığım soruları burada topladım.",
  sectionLabel: "/ Soru-Cevap",
  metaTitle: "SSS — Sıkça Sorulanlar",
  metaDescription:
    "Sipariş, kargo, bakım gibi sık sorulan soruların cevapları burada.",
  emptyMessage: "Henüz soru eklenmemiş.",
  ctaHandwritten: "başka bir sorun mu var?",
  ctaTitle: "Bana doğrudan yazabilirsin",
  items: [
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
};

export const mockProductsPage: ProductsPage = {
  pageHandwritten: "tüm koleksiyon",
  pageTitle: "Ürünler",
  pageDescription:
    "Her biri tek tek, sevgiyle örüldü. Beğendiğin ürünün altındaki Instagram butonuna dokun, gerisini birlikte halledelim.",
  collectionSectionLabel: "/ Koleksiyon",
  categorySectionLabel: "/ Kategori",
  metaTitle: "Ürünler",
  metaDescription:
    "Annemin el emeğiyle ördüğü tüm çantalar. Sipariş için Instagram.",
  emptyMessage: "yakında burada...",
  emptyDescription: "Yeni çantalar şu an tezgahta. Çok yakında paylaşacağım.",
};
