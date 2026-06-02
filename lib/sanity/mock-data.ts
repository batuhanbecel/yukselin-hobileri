import type {
  AboutPage,
  Category,
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
    featured: false,
    order: 4,
    category: kazakRef,
  },
];

export const mockSiteSettings: SiteSettings = {
  siteTitle: "Yüksel'in Hobileri",
  instagramUrl: "https://www.instagram.com/ykslbcl/",
  instagramHandle: "@ykslbcl",
  headerTagline: "el emeği örgü",
  footerTagline: "her ilmek bir hikaye",
  footerDescription:
    "Bu sitedeki ürünler sadece paylaşım içindir. Beğendiğiniz bir çanta varsa Instagram'dan bana yazabilirsiniz.",
  footerSignature: "sevgiyle örüldü",
  footerNavTitle: "sayfalar",
  detailNoteHandwritten: "küçük bir not",
  detailNoteText:
    "Bu siteden doğrudan satış yapılmamaktadır. Çanta hoşunuza gittiyse Instagram'dan bana yazabilirsiniz; renk, model ve detaylarını birlikte konuşalım.",
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

  featuredHandwritten: "seçtiklerim",
  featuredTitle: "Öne çıkan çantalar",
  featuredSubtitle: "En çok sevilen, en çok sorulan parçalar.",
  featuredLinkLabel: "Tümünü gör →",

  highlightsHandwritten: "neden bu çantalar",
  highlightsTitle: "Her detay özenle",
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

export const mockProductsPage: ProductsPage = {
  pageHandwritten: "tüm koleksiyon",
  pageTitle: "Ürünler",
  pageDescription:
    "Her biri tek tek, sevgiyle örüldü. Beğendiğin ürünün altındaki Instagram butonuna dokun, gerisini birlikte halledelim.",
  emptyMessage: "yakında burada...",
  emptyDescription: "Yeni çantalar şu an tezgahta. Çok yakında paylaşacağım.",
};
