import type { Metadata } from "next";
import { Breadcrumb } from "@/components/breadcrumb";
import { InstagramButton } from "@/components/instagram-button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
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
      acceptedAnswer: { "@type": "Answer", text: it.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-8 sm:py-20">
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

      <Reveal>
        <div className="mb-14 grid items-end gap-6 border-b border-bordeaux/10 pb-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                / Soru-Cevap
              </span>
              <span className="h-px flex-1 bg-bordeaux/20" />
            </div>
            {faq.pageHandwritten && (
              <p className="font-hand mt-3 text-2xl text-bordeaux">
                {faq.pageHandwritten}
              </p>
            )}
            {faq.pageTitle && (
              <h1 className="font-heading mt-1 text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
                {faq.pageTitle}
              </h1>
            )}
          </div>
          {faq.pageDescription && (
            <p className="text-base leading-relaxed text-ink-soft lg:col-span-5">
              {faq.pageDescription}
            </p>
          )}
        </div>
      </Reveal>

      {items.length > 0 ? (
        <Stagger className="space-y-3" staggerChildren={0.06}>
          {items.map((item, i) => (
            <StaggerItem key={item._key ?? i}>
              <details className="group rounded-2xl border border-bordeaux/15 bg-paper/60 p-6 transition-colors hover:border-bordeaux/30 open:border-bordeaux/40 open:bg-paper">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-4">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-2xl text-bordeaux/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-heading text-lg text-ink sm:text-xl">
                      {item.question}
                    </span>
                  </div>
                  <span className="shrink-0 text-2xl text-bordeaux transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 whitespace-pre-line pl-10 text-base leading-relaxed text-ink-soft">
                  {item.answer}
                </p>
              </details>
            </StaggerItem>
          ))}
        </Stagger>
      ) : (
        <p className="text-center text-ink-soft">Henüz soru eklenmemiş.</p>
      )}

      <Reveal>
        <div className="mt-20 grid items-center gap-6 rounded-[2rem] border border-bordeaux/15 bg-gradient-to-br from-ivory-deep via-paper to-gold-soft/30 p-10 lg:grid-cols-12 lg:p-14">
          <div className="lg:col-span-8">
            <p className="font-hand text-2xl text-bordeaux">
              başka bir sorun mu var?
            </p>
            <p className="font-heading mt-1 text-3xl font-light text-ink sm:text-4xl">
              Bana doğrudan yazabilirsin
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <InstagramButton size="lg" />
          </div>
        </div>
      </Reveal>
    </div>
  );
}
