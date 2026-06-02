import { InstagramButton } from "@/components/instagram-button";
import type { HomePage } from "@/lib/sanity/types";

type HeroProps = {
  data: HomePage;
};

export function Hero({ data }: HeroProps) {
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

      <div
        className="pointer-events-none absolute left-8 right-8 top-6 h-px text-terracotta/30 stitch-border"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-6 left-8 right-8 h-px text-terracotta/30 stitch-border"
        aria-hidden
      />

      <div className="relative mx-auto max-w-2xl text-center">
        {data.heroGreeting && (
          <p className="font-hand mb-2 text-2xl text-terracotta sm:text-3xl">
            {data.heroGreeting}
          </p>
        )}
        {data.heroBadge && (
          <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-terracotta-soft/50 bg-white/70 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-cocoa-soft shadow-sm">
            <span className="size-1.5 rounded-full bg-terracotta" />
            {data.heroBadge}
            <span className="size-1.5 rounded-full bg-sage" />
          </p>
        )}
        <h1 className="font-heading text-5xl font-normal leading-[1.05] tracking-tight text-cocoa sm:text-6xl md:text-7xl">
          {data.heroTitleStart}
          {data.heroTitleEmphasis && (
            <>
              {" "}
              <span className="italic text-terracotta">
                {data.heroTitleEmphasis}
              </span>
            </>
          )}
          {data.heroTitleEnd && (
            <>
              <br /> {data.heroTitleEnd}
            </>
          )}
        </h1>
        {data.heroSubtitle && (
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-cocoa-soft sm:text-lg">
            {data.heroSubtitle}
          </p>
        )}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <InstagramButton size="lg" />
        </div>
        {data.heroSignature && (
          <p className="font-hand mt-6 text-xl text-cocoa-soft">
            {data.heroSignature}
          </p>
        )}
      </div>
    </section>
  );
}
