import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { InstagramButton } from "@/components/instagram-button";
import { getSiteSettings } from "@/lib/sanity/fetch";
import { mockSiteSettings } from "@/lib/sanity/mock-data";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description:
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü çantaların hikayesi.",
};

const defaultAboutBlocks = mockSiteSettings.aboutText ?? [];

export default async function AboutPage() {
  const settings = await getSiteSettings();
  const aboutBlocks =
    settings.aboutText && settings.aboutText.length > 0
      ? settings.aboutText
      : defaultAboutBlocks;

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        <p className="font-hand text-2xl text-terracotta">küçük hikayemiz</p>
        <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
          Hakkımda
        </h1>
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
      </div>

      {/* Decorative quote card */}
      <div className="relative my-12 overflow-hidden rounded-[2rem] border border-terracotta-soft/40 bg-gradient-to-br from-cream-deep/60 to-cream p-8 sm:p-12">
        <svg
          className="pointer-events-none absolute -right-6 -top-6 size-32 text-terracotta-soft/40"
          viewBox="0 0 100 100"
          fill="none"
          aria-hidden
        >
          <circle cx="50" cy="50" r="36" fill="currentColor" />
          <path
            d="M14 50 Q 50 14, 86 50 M 14 50 Q 50 86, 86 50 M 30 18 Q 50 50, 70 82 M 30 82 Q 50 50, 70 18"
            stroke="#c4756c"
            strokeOpacity="0.4"
            strokeWidth="1.5"
          />
        </svg>

        <div className="relative space-y-5 text-base leading-relaxed text-cocoa sm:text-lg">
          <PortableText
            value={aboutBlocks}
            components={{
              block: {
                normal: ({ children }) => (
                  <p className="leading-relaxed text-cocoa/90">{children}</p>
                ),
              },
            }}
          />
        </div>

        <p className="font-hand mt-8 text-right text-2xl text-terracotta">
          — Yüksel
        </p>
      </div>

      {/* Values */}
      <div className="my-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            title: "El yapımı",
            text: "Her ilmek tek tek elden geçer; makineye uğramaz.",
          },
          {
            title: "Doğal malzeme",
            text: "Cilde dost, nefes alan ipliklerle örülür.",
          },
          {
            title: "Hafif & kullanışlı",
            text: "Omuzda yormaz, içine ihtiyacın olanı rahat alır.",
          },
          {
            title: "Günlük kullanıma uygun",
            text: "Sabah pazara, akşam buluşmaya — her yere yakışır.",
          },
        ].map((v) => (
          <div
            key={v.title}
            className="rounded-2xl border border-sage-soft/60 bg-white/60 p-5 text-center"
          >
            <p className="font-hand text-xl text-terracotta">{v.title}</p>
            <p className="mt-1 text-sm text-cocoa-soft">{v.text}</p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-12 rounded-[2rem] border border-terracotta-soft/40 bg-gradient-to-br from-rose-dust/20 via-cream to-honey/20 px-6 py-10 text-center">
        <p className="font-hand text-2xl text-terracotta">bana ulaşabilirsiniz</p>
        <p className="font-heading mt-1 text-2xl text-cocoa">
          Bir kahve eşliğinde konuşalım
        </p>
        <p className="mx-auto mt-3 max-w-md text-cocoa-soft">
          Sorularını, özel taleplerinizi bana iletebilirsiniz.
        </p>
        <div className="mt-6 flex justify-center">
          <InstagramButton size="lg" />
        </div>
      </div>
    </div>
  );
}
