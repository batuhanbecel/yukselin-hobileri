import type { Metadata } from "next";
import { DM_Serif_Display, Nunito } from "next/font/google";
import { SITE_NAME } from "@/lib/constants";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
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
    "Yükselin Hobileri — el emeği örgü çantalar. Fiyatlar ve sipariş için Instagram'dan @ykslbcl hesabına ulaşın.",
  keywords: ["örgü çanta", "el örgüsü", "el emeği", "Yükselin Hobileri"],
  openGraph: {
    title: SITE_NAME,
    description: "El emeği örgü çantalar — Instagram'dan sipariş verin.",
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
    <html lang="tr" className={`${dmSerif.variable} ${nunito.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
