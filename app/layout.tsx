import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Caveat, Inter, Italiana } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: "variable",
  axes: ["SOFT", "opsz"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | El Emeği Örgü Çantalar`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü el emeği çantalar. Sipariş ve bilgi için Instagram @ykslbcl.",
  keywords: ["örgü çanta", "el örgüsü", "el emeği", "Yüksel'in Hobileri"],
  openGraph: {
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: "Annemin sevgiyle ördüğü el emeği çantalar.",
    locale: "tr_TR",
    type: "website",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: "Annemin sevgiyle ördüğü el emeği çantalar.",
  },
  robots: { index: true, follow: true },
};

const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const plausibleSrc =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/icon`,
  sameAs: ["https://www.instagram.com/ykslbcl/"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${italiana.variable} ${caveat.variable} ${inter.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-full antialiased">
        {children}
        {plausibleDomain && (
          <Script
            defer
            src={plausibleSrc}
            data-domain={plausibleDomain}
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}
