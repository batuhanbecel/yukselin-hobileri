import { InstagramButton } from "@/components/instagram-button";
import type { SiteSettings } from "@/lib/sanity/types";

type HeroProps = {
  settings: SiteSettings;
};

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] border border-terracotta-soft/40 bg-gradient-to-b from-cream-deep/60 via-cream to-cream px-6 py-16 sm:px-12 sm:py-24">
      {/* Decorative yarn ball - top right */}
      <svg
        className="pointer-events-none absolute -right-10 -top-12 size-56 text-terracotta-soft/40 sm:size-72"
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden
      >
        <circle cx="100" cy="100" r="80" fill="currentColor" />
        <path
          d="M30 100 Q 100 40, 170 100 M 30 100 Q 100 160, 170 100 M 60 50 Q 100 100, 140 150 M 60 150 Q 100 100, 140 50"
          stroke="#c4756c"
          strokeOpacity="0.35"
          strokeWidth="2"
          fill="none"
        />
      </svg>

      {/* Decorative leaves - bottom left */}
      <svg
        className="pointer-events-none absolute -bottom-8 -left-6 size-40 text-sage-soft/60"
        viewBox="0 0 100 100"
        fill="currentColor"
        aria-hidden
      >
        <path d="M50 10 C30 30, 30 60, 50 90 C70 60, 70 30, 50 10 Z" opacity="0.6" />
        <path d="M20 50 C30 40, 50 40, 70 50 C50 60, 30 60, 20 50 Z" opacity="0.4" />
      </svg>

      {/* Stitch line decoration */}
      <div
        className="pointer-events-none absolute left-8 right-8 top-6 h-px text-terracotta/30 stitch-border"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 left-8 right-8 h-px text-terracotta/30 stitch-border"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl text-center">
        <p className="font-hand mb-2 text-2xl text-terracotta sm:text-3xl">
          merhaba, hoş geldin
        </p>
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-terracotta-soft/50 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cocoa-soft shadow-sm">
          <span className="size-1.5 rounded-full bg-terracotta" />
          El emeği · Tek tek örüldü
          <span className="size-1.5 rounded-full bg-sage" />
        </p>
        <h1 className="font-heading text-5xl font-normal leading-[1.05] tracking-tight text-cocoa sm:text-6xl md:text-7xl">
          {settings.heroTitle || (
            <>
              Annemin{" "}
              <span className="italic text-terracotta">sevgiyle</span>
              <br /> ördüğü çantalar
            </>
          )}
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cocoa-soft sm:text-lg">
          {settings.heroSubtitle ||
            "Her ilmek bir hikaye, her çanta tek parça. Yılların deneyimi ve sıcacık bir kalple hazırlandı."}
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <InstagramButton size="lg" />
        </div>
        <p className="font-hand mt-6 text-xl text-cocoa-soft">
          — sevgilerimle, Yüksel
        </p>
      </div>
    </section>
  );
}
