import { InstagramButton } from "@/components/instagram-button";
import type { SiteSettings } from "@/lib/sanity/types";

type HeroProps = {
  settings: SiteSettings;
};

export function Hero({ settings }: HeroProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-pink-100/80 bg-gradient-to-br from-cream via-pink-50/50 to-lavender-50 px-6 py-16 sm:px-12 sm:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a5a5' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-2xl text-center">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-1.5 text-sm font-medium text-violet-700 shadow-sm">
          <span aria-hidden>🧶</span> El emeği · Tek parça
        </p>
        <h1 className="font-heading text-4xl font-normal tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {settings.heroTitle || "El emeği örgü çantalar"}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
          {settings.heroSubtitle ||
            "Her biri sevgiyle örülmüş, benzersiz çantalar."}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <InstagramButton size="lg" />
        </div>
      </div>
      <div
        className="pointer-events-none absolute -right-8 -top-8 size-32 rounded-full bg-pink-200/40 blur-2xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-8 -left-8 size-40 rounded-full bg-violet-200/30 blur-2xl"
        aria-hidden
      />
    </section>
  );
}
