import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { HighlightIcon } from "@/components/home/highlight-icon";
import { InstagramButton } from "@/components/instagram-button";
import { SiteLinkButton } from "@/components/site-link-button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getFeaturedProducts, getHomePage } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [home, featuredProducts] = await Promise.all([
    getHomePage(),
    getFeaturedProducts(),
  ]);

  const highlights = home.highlights ?? [];
  const steps = home.steps ?? [];

  return (
    <div className="mx-auto max-w-7xl space-y-28 px-4 py-8 sm:px-8 sm:py-12">
      <Hero data={home} />

      <FeaturedProducts products={featuredProducts} data={home} />

      {highlights.length > 0 && (
        <section className="relative">
          <Reveal className="mb-14 grid items-end gap-6 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-olive">
                  {home.highlightsSectionLabel || "/ Felsefe"}
                </span>
                <span className="h-px flex-1 bg-olive/20" />
              </div>
              {home.highlightsHandwritten && (
                <p className="font-hand mt-3 text-2xl text-bordeaux">
                  {home.highlightsHandwritten}
                </p>
              )}
              {home.highlightsTitle && (
                <h2 className="mt-1 font-heading text-4xl font-light leading-[1.05] text-ink sm:text-5xl md:text-6xl">
                  {home.highlightsTitle}
                </h2>
              )}
            </div>
          </Reveal>

          <Stagger
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
            staggerChildren={0.1}
          >
            {highlights.map((h, i) => (
              <StaggerItem key={h._key ?? i}>
                <article className="group relative h-full overflow-hidden rounded-2xl border border-bordeaux/10 bg-paper/80 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-bordeaux/30 hover:shadow-lg">
                  <span className="editorial-number absolute right-5 top-3 text-6xl text-bordeaux/15 group-hover:text-bordeaux/30">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="relative mb-6 flex size-12 items-center justify-center rounded-full bg-bordeaux/10 text-bordeaux transition-colors group-hover:bg-bordeaux group-hover:text-paper">
                    <HighlightIcon iconKey={h.iconKey} />
                  </div>

                  <h3 className="font-heading text-xl leading-snug text-ink">
                    {h.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {h.text}
                  </p>

                  <div className="mt-6 h-px w-8 bg-bordeaux/30 transition-all duration-500 group-hover:w-16" />
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {steps.length > 0 && (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-ivory-deep via-ivory to-clay-soft/20 px-6 py-16 sm:px-12 sm:py-20">
          <Reveal className="mb-16 text-center">
            <div className="mx-auto flex max-w-sm items-center gap-3">
              <span className="h-px flex-1 bg-bordeaux/30" />
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                {home.stepsSectionLabel || "/ Süreç"}
              </span>
              <span className="h-px flex-1 bg-bordeaux/30" />
            </div>
            {home.stepsHandwritten && (
              <p className="font-hand mt-4 text-2xl text-bordeaux">
                {home.stepsHandwritten}
              </p>
            )}
            {home.stepsTitle && (
              <h2 className="font-heading mt-1 text-4xl font-light leading-[1.05] text-ink sm:text-5xl">
                {home.stepsTitle}
              </h2>
            )}
            {home.stepsSubtitle && (
              <p className="mx-auto mt-5 max-w-lg text-base text-ink-soft">
                {home.stepsSubtitle}
              </p>
            )}
          </Reveal>

          <Stagger
            className="relative grid gap-6 sm:grid-cols-3"
            staggerChildren={0.12}
          >
            {steps.map((step, i) => (
              <StaggerItem key={step._key ?? i}>
                <div className="relative h-full">
                  <div className="font-display text-8xl leading-none text-bordeaux/25 sm:text-9xl">
                    {step.number}
                  </div>
                  <div className="mt-2 border-t border-bordeaux/20 pt-4">
                    <h3 className="font-heading text-2xl text-ink">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                      {step.text}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.2} className="mt-14 text-center">
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <InstagramButton size="lg" />
              <SiteLinkButton href="/urunler" size="lg">
                {home.stepsCtaLabel || "Tüm Çantaları İncele"}
              </SiteLinkButton>
            </div>
          </Reveal>
        </section>
      )}

      {home.quoteText && (
        <section className="relative">
          <Reveal className="relative mx-auto max-w-4xl">
            <span
              className="font-display absolute -left-4 -top-12 select-none text-[10rem] leading-none text-bordeaux/15 sm:-left-8 sm:text-[14rem]"
              aria-hidden
            >
              &ldquo;
            </span>

            <div className="relative grid items-center gap-10 lg:grid-cols-12">
              <div className="lg:col-span-2">
                <div className="h-px w-16 bg-bordeaux/40 lg:h-32 lg:w-px" />
              </div>
              <div className="lg:col-span-10">
                {home.quoteHandwritten && (
                  <p className="font-hand text-2xl text-bordeaux">
                    {home.quoteHandwritten}
                  </p>
                )}
                <p className="font-heading mt-3 text-2xl font-light leading-relaxed text-ink sm:text-3xl md:text-4xl">
                  {home.quoteText}
                </p>
                {home.quoteAuthor && (
                  <p className="font-hand mt-8 text-2xl text-ink-soft">
                    {home.quoteAuthor}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        </section>
      )}
    </div>
  );
}
