import type { Category, Product, SiteSettings } from "./types";

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

/** Placeholder ürünler — Sanity henüz yapılandırılmamışsa */
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
    description:
      "Sıcacık bej yün kazak; soğuk günlerin vazgeçilmezi.",
    featured: false,
    order: 4,
    category: kazakRef,
  },
];

export const mockSiteSettings: SiteSettings = {
  siteTitle: "Yüksel'in Hobileri",
  instagramUrl: "https://www.instagram.com/ykslbcl/",
  heroTitle: "El emeği örgü çantalar",
  heroSubtitle:
    "Her biri sevgiyle örülmüş, benzersiz çantalar. Sipariş ve bilgi için Instagram sayfamızdan iletişime geçebilirsiniz.",
  aboutText: [
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
};
