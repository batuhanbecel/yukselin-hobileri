import type { Metadata } from "next";
import { Fraunces, Caveat, Nunito } from "next/font/google";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "opsz"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} | El Emeği Örgü Çantalar`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü el emeği çantalar. Sipariş ve bilgi için Instagram @ykslbcl.",
  keywords: ["örgü çanta", "el örgüsü", "el emeği", "Yüksel'in Hobileri"],
  openGraph: {
    title: SITE_NAME,
    description: "Annemin sevgiyle ördüğü el emeği çantalar.",
    locale: "tr_TR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${caveat.variable} ${nunito.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
