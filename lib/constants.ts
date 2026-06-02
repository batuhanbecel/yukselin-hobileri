export const INSTAGRAM_URL = "https://www.instagram.com/ykslbcl/";
export const SITE_NAME = "Yüksel'in Hobileri";

export const NAV_LINKS = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/hakkimizda", label: "Hakkımda" },
  { href: "/sss", label: "SSS" },
] as const;

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://yukselinhobileri.com";
