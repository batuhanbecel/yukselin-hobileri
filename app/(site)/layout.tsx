import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await getSiteSettings();

  return (
    <div className="flex min-h-full flex-col">
      <Header
        siteTitle={settings.siteTitle}
        tagline={settings.headerTagline}
        instagramUrl={settings.instagramUrl}
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
      />
    </div>
  );
}
