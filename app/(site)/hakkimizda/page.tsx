import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { Breadcrumb } from "@/components/breadcrumb";
import { InstagramButton } from "@/components/instagram-button";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { getAboutPage, getSiteSettings } from "@/lib/sanity/fetch";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  return {
    title: about.metaTitle || about.pageTitle || "Hakkımda",
    description:
      about.metaDescription ||
      "Yüksel'in Hobileri — annemin sevgiyle ördüğü çantaların hikayesi.",
  };
}

export default async function AboutPage() {
  const [about, settings] = await Promise.all([
    getAboutPage(),
    getSiteSettings(),
  ]);
  const values = about.values ?? [];
  const story = about.story ?? [];

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-8 sm:py-20">
      <Breadcrumb
        items={[
          {
            label: settings.breadcrumbHomeLabel || "Ana sayfa",
            href: "/",
          },
          { label: about.pageTitle || "Hakkımda" },
        ]}
      />

      <Reveal>
        <div className="mb-16 grid items-end gap-6 border-b border-bordeaux/10 pb-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                {about.storySectionLabel || "/ Hikaye"}
              </span>
              <span className="h-px flex-1 bg-bordeaux/20" />
            </div>
            {about.pageHandwritten && (
              <p className="font-hand mt-3 text-2xl text-bordeaux">
                {about.pageHandwritten}
              </p>
            )}
            {about.pageTitle && (
              <h1 className="font-heading mt-1 text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
                {about.pageTitle}
              </h1>
            )}
          </div>
        </div>
      </Reveal>

      {story.length > 0 && (
        <Reveal delay={0.15}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-2">
              <p className="font-display text-7xl text-bordeaux/30 sm:text-8xl">
                {about.dropCapLetter || "Y"}
              </p>
            </div>
            <div className="relative lg:col-span-10">
              <div className="space-y-6 font-heading text-lg leading-relaxed text-ink/90 sm:text-xl">
                <PortableText
                  value={story}
                  components={{
                    block: {
                      normal: ({ children }) => (
                        <p className="leading-relaxed">{children}</p>
                      ),
                    },
                  }}
                />
              </div>
              {about.storySignature && (
                <p className="font-hand mt-10 text-2xl text-bordeaux">
                  {about.storySignature}
                </p>
              )}
            </div>
          </div>
        </Reveal>
      )}

      {values.length > 0 && (
        <section className="mt-24">
          <Reveal className="mb-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-olive">
                {about.valuesSectionLabel || "/ Değerler"}
              </span>
              <span className="h-px flex-1 bg-olive/20" />
            </div>
          </Reveal>
          <Stagger
            className="grid gap-px overflow-hidden rounded-2xl border border-bordeaux/15 bg-bordeaux/15 sm:grid-cols-2 lg:grid-cols-4"
            staggerChildren={0.1}
          >
            {values.map((v, i) => (
              <StaggerItem key={v._key ?? i}>
                <div className="h-full bg-ivory p-6 text-left transition-colors hover:bg-paper">
                  <p className="font-display text-3xl text-bordeaux/40">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-3 font-heading text-xl text-ink">{v.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                    {v.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>
      )}

      {(about.ctaHandwritten || about.ctaTitle || about.ctaText) && (
        <Reveal>
          <div className="mt-24 grid items-center gap-10 rounded-[2rem] border border-bordeaux/15 bg-gradient-to-br from-clay-soft/20 via-ivory to-gold-soft/30 p-10 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-7">
              {about.ctaHandwritten && (
                <p className="font-hand text-2xl text-bordeaux">
                  {about.ctaHandwritten}
                </p>
              )}
              {about.ctaTitle && (
                <p className="font-heading mt-2 text-3xl font-light leading-tight text-ink sm:text-4xl">
                  {about.ctaTitle}
                </p>
              )}
              {about.ctaText && (
                <p className="mt-4 max-w-md text-ink-soft">{about.ctaText}</p>
              )}
            </div>
            <div className="lg:col-span-5 lg:text-right">
              <InstagramButton size="lg" />
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
