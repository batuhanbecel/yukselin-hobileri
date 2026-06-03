import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { SiteSettingsProvider } from "@/lib/site-context";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <SiteSettingsProvider settings={settings}>
      <div className="flex min-h-full flex-col">
        <Header
          siteTitle={settings.siteTitle}
          tagline={settings.headerTagline}
          instagramUrl={settings.instagramUrl}
          navLinks={settings.navLinks}
          instagramHeaderLabel={settings.instagramHeaderLabel}
        />
        <main className="flex-1">{children}</main>
        <Footer
          siteTitle={settings.siteTitle}
          tagline={settings.footerTagline}
          description={settings.footerDescription}
          signature={settings.footerSignature}
          navTitle={settings.footerNavTitle}
          instagramUrl={settings.instagramUrl}
          instagramHandle={settings.instagramHandle}
          navLinks={settings.navLinks}
          studioLabel={settings.footerStudioLabel}
          contactTitle={settings.footerContactTitle}
          contactLine1={settings.footerContactLine1}
          contactLine2={settings.footerContactLine2}
        />
      </div>
    </SiteSettingsProvider>
  );
}
