import type { Metadata } from "next";
import Script from "next/script";
import { Caveat, Fraunces, Inter, Italiana } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { getSiteSettings } from "@/lib/sanity/fetch";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin", "latin-ext"],
  weight: "variable",
  axes: ["SOFT", "opsz"],
});

const italiana = Italiana({
  variable: "--font-italiana",
  subsets: ["latin"],
  weight: "400",
});

const hand = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  const siteTitle = settings.siteTitle || SITE_NAME;
  const suffix = settings.seoTitleSuffix || "El Emeği Örgü Çantalar";
  const description =
    settings.seoDescription ||
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü el emeği çantalar. Sipariş ve bilgi için Instagram @ykslbcl.";
  const ogDescription =
    settings.ogDescription || "Annemin sevgiyle ördüğü el emeği çantalar.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${siteTitle} | ${suffix}`,
      template: `%s | ${siteTitle}`,
    },
    description,
    keywords: settings.seoKeywords || [
      "örgü çanta",
      "el örgüsü",
      "el emeği",
      "Yüksel'in Hobileri",
    ],
    openGraph: {
      siteName: siteTitle,
      title: siteTitle,
      description: ogDescription,
      locale: "tr_TR",
      type: "website",
      url: SITE_URL,
    },
    twitter: {
      card: "summary_large_image",
      title: siteTitle,
      description: ogDescription,
    },
    robots: { index: true, follow: true },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getSiteSettings();
  const siteTitle = settings.siteTitle || SITE_NAME;
  const instagramUrl =
    settings.instagramUrl || "https://www.instagram.com/ykslbcl/";

  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteTitle,
    url: SITE_URL,
    logo: `${SITE_URL}/icon`,
    sameAs: [instagramUrl],
  };

  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const plausibleSrc =
    process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || "https://plausible.io/js/script.js";

  return (
    <html
      lang="tr"
      className={`${fraunces.variable} ${italiana.variable} ${hand.variable} ${inter.variable} h-full`}
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
