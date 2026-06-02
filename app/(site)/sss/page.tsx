import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { InstagramButton } from "@/components/instagram-button";
import { getFaqPage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "SSS — Sıkça Sorulanlar",
  description:
    "Sipariş, kargo, bakım gibi sık sorulan soruların cevapları burada.",
};

export default async function FaqPageRoute() {
  const faq = await getFaqPage();
  const items = faq.items ?? [];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.answer,
      },
    })),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      {items.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}

      <Breadcrumb
        items={[
          { label: "Ana sayfa", href: "/" },
          { label: faq.pageTitle || "SSS" },
        ]}
      />

      <div className="text-center">
        {faq.pageHandwritten && (
          <p className="font-hand text-2xl text-terracotta">
            {faq.pageHandwritten}
          </p>
        )}
        {faq.pageTitle && (
          <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
            {faq.pageTitle}
          </h1>
        )}
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
        {faq.pageDescription && (
          <p className="mx-auto mt-6 max-w-xl text-cocoa-soft">
            {faq.pageDescription}
          </p>
        )}
      </div>

      {items.length > 0 ? (
        <div className="mt-12 space-y-4">
          {items.map((item, i) => (
            <details
              key={item._key ?? i}
              className="group rounded-2xl border border-terracotta-soft/40 bg-white/70 p-5 transition-colors hover:border-terracotta/40 open:border-terracotta/40"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="font-heading text-lg text-cocoa sm:text-xl">
                  {item.question}
                </span>
                <span className="font-hand shrink-0 text-2xl text-terracotta transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 whitespace-pre-line text-base leading-relaxed text-cocoa-soft">
                {item.answer}
              </p>
            </details>
          ))}
        </div>
      ) : (
        <p className="mt-12 text-center text-cocoa-soft">
          Henüz soru eklenmemiş.
        </p>
      )}

      <div className="mt-14 rounded-[2rem] border border-terracotta-soft/40 bg-gradient-to-br from-cream-deep/60 to-cream px-6 py-10 text-center">
        <p className="font-hand text-2xl text-terracotta">başka bir sorun mu var?</p>
        <p className="font-heading mt-1 text-2xl text-cocoa">
          Bana doğrudan yazabilirsin
        </p>
        <div className="mt-6 flex justify-center">
          <InstagramButton size="lg" />
        </div>
      </div>
    </div>
  );
}
