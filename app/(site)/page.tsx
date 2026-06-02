import Link from "next/link";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { HighlightIcon } from "@/components/home/highlight-icon";
import { InstagramButton } from "@/components/instagram-button";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getHomePage } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [home, featuredProducts] = await Promise.all([
    getHomePage(),
    getFeaturedProducts(),
  ]);

  const highlights = home.highlights ?? [];
  const steps = home.steps ?? [];

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-10 sm:px-6 sm:py-14">
      <Hero data={home} />

      <FeaturedProducts products={featuredProducts} data={home} />

      {highlights.length > 0 && (
        <section className="relative">
          <div className="mb-10 text-center">
            {home.highlightsHandwritten && (
              <p className="font-hand text-2xl text-terracotta">
                {home.highlightsHandwritten}
              </p>
            )}
            {home.highlightsTitle && (
              <h2 className="font-heading text-4xl text-cocoa sm:text-5xl">
                {home.highlightsTitle}
              </h2>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {highlights.map((h, i) => (
              <div
                key={h._key ?? i}
                className="relative rounded-3xl border border-sage-soft/60 bg-white/70 p-6 text-center shadow-sm"
              >
                <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-cream-deep/80 text-terracotta">
                  <HighlightIcon iconKey={h.iconKey} />
                </div>
                <p className="font-heading text-xl text-cocoa">{h.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">
                  {h.text}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {steps.length > 0 && (
        <section className="relative">
          <div className="mb-12 text-center">
            {home.stepsHandwritten && (
              <p className="font-hand text-2xl text-terracotta">
                {home.stepsHandwritten}
              </p>
            )}
            {home.stepsTitle && (
              <h2 className="font-heading text-4xl text-cocoa sm:text-5xl">
                {home.stepsTitle}
              </h2>
            )}
            {home.stepsSubtitle && (
              <p className="mx-auto mt-3 max-w-lg text-cocoa-soft">
                {home.stepsSubtitle}
              </p>
            )}
          </div>

          <div className="grid gap-6 sm:grid-cols-3">
            {steps.map((step, i) => (
              <div
                key={step._key ?? i}
                className="relative rounded-3xl border border-terracotta-soft/40 bg-white/70 p-7 shadow-sm"
              >
                <div className="font-hand mb-2 text-5xl text-terracotta/60">
                  {step.number}
                </div>
                <h3 className="font-heading text-2xl text-cocoa">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">
                  {step.text}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <InstagramButton size="lg" />
            <Button
              asChild
              variant="outline"
              className="rounded-full border-terracotta/30 bg-white/60 text-cocoa hover:bg-terracotta-soft/30 hover:text-cocoa"
            >
              <Link href="/urunler">
                {home.stepsCtaLabel || "Tüm Çantaları İncele"}
              </Link>
            </Button>
          </div>
        </section>
      )}

      {home.quoteText && (
        <section className="relative overflow-hidden rounded-[2.5rem] border border-sage-soft/60 bg-gradient-to-br from-sage-soft/30 via-cream to-cream-deep/50 px-6 py-14 sm:px-12 sm:py-20">
          <svg
            className="pointer-events-none absolute right-6 top-6 size-24 text-sage/30"
            viewBox="0 0 100 100"
            fill="currentColor"
            aria-hidden
          >
            <path d="M50 10 C30 30, 30 60, 50 90 C70 60, 70 30, 50 10 Z" />
          </svg>

          <div className="relative mx-auto max-w-2xl text-center">
            {home.quoteHandwritten && (
              <p className="font-hand text-3xl text-terracotta">
                {home.quoteHandwritten}
              </p>
            )}
            <p className="font-heading mt-4 text-2xl leading-relaxed text-cocoa sm:text-3xl">
              “{home.quoteText}”
            </p>
            {home.quoteAuthor && (
              <p className="font-hand mt-6 text-2xl text-cocoa-soft">
                {home.quoteAuthor}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
