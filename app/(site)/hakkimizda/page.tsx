import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { InstagramButton } from "@/components/instagram-button";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { mockSiteSettings } from "@/lib/sanity/mock-data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Yükselin Hobileri — el emeği örgü çantaların hikayesi. Annenizin özenle ördüğü benzersiz parçalar.",
};

const defaultAboutBlocks = mockSiteSettings.aboutText ?? [];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const aboutBlocks =
    settings.aboutText && settings.aboutText.length > 0
      ? settings.aboutText
      : defaultAboutBlocks;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <h1 className="font-heading text-4xl text-foreground">Hakkımızda</h1>
      <p className="mt-3 text-lg text-muted-foreground">
        {settings.siteTitle || "Yükselin Hobileri"}
      </p>

      <div className="prose-custom mt-10 space-y-4 text-foreground/90 leading-relaxed">
        <PortableText
          value={aboutBlocks}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="mb-4 text-base leading-relaxed">{children}</p>
              ),
            },
          }}
        />
      </div>

      <div className="mt-12 rounded-3xl border border-pink-100 bg-gradient-to-br from-pink-soft/40 to-lavender-50 px-6 py-10 text-center">
        <p className="font-heading text-xl">Bize ulaşın</p>
        <p className="mt-2 text-muted-foreground">
          Sorularınız ve siparişleriniz için Instagram&apos;dan yazın.
        </p>
        <div className="mt-6 flex justify-center">
          <InstagramButton size="lg" />
        </div>
      </div>
    </div>
  );
}
