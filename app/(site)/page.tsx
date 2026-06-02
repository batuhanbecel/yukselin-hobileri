import Link from "next/link";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { InstagramButton } from "@/components/instagram-button";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getSiteSettings } from "@/lib/sanity/fetch";

const STEPS = [
  {
    n: "01",
    title: "Beğen",
    text: "Sitede gezin, gönlüne düşen çantayı seç.",
  },
  {
    n: "02",
    title: "Yaz",
    text: "Instagram'dan bana mesaj at, sohbet edelim.",
  },
  {
    n: "03",
    title: "Buluş",
    text: "Renk, model, detay — istediğin gibi konuşalım.",
  },
];

const HIGHLIGHTS = [
  {
    title: "El yapımı",
    text: "Her ilmek elden geçer, makineye uğramaz.",
  },
  {
    title: "Doğal malzeme",
    text: "Cilde dost, nefes alan iplikler.",
  },
  {
    title: "Hafif & kullanışlı",
    text: "Omuzda yormaz, içine ihtiyacın olanı alır.",
  },
  {
    title: "Günlük kullanıma uygun",
    text: "Sabah pazara, akşam buluşmaya yakışır.",
  },
];

export default async function HomePage() {
  const [settings, featuredProducts] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-20 px-4 py-10 sm:px-6 sm:py-14">
      <Hero settings={settings} />

      <FeaturedProducts products={featuredProducts} />

      {/* Highlights — what makes each bag special */}
      <section className="relative">
        <div className="mb-10 text-center">
          <p className="font-hand text-2xl text-terracotta">neden bu çantalar</p>
          <h2 className="font-heading text-4xl text-cocoa sm:text-5xl">
            Her detay özenle
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HIGHLIGHTS.map((h, i) => (
            <div
              key={h.title}
              className="relative rounded-3xl border border-sage-soft/60 bg-white/70 p-6 text-center shadow-sm"
            >
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-full bg-cream-deep/80 text-terracotta">
                {i === 0 && (
                  <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
                    <path
                      d="M6 12c2-3 4-4 6-4s4 1 6 4M4 16c2.5-2 5-3 8-3s5.5 1 8 3M8 8c1.5-1.5 3-2 4-2s2.5.5 4 2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {i === 1 && (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
                    <path d="M12 3c-3 4-3 8 0 12 3-4 3-8 0-12zM6 11c1 4 4 6 6 6-1-4-4-6-6-6zm12 0c-1 4-4 6-6 6 1-4 4-6 6-6z" />
                  </svg>
                )}
                {i === 2 && (
                  <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
                    <path
                      d="M4 12c4-5 12-5 16 0M8 7c1.5-1 6.5-1 8 0M2 16h20"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                {i === 3 && (
                  <svg viewBox="0 0 24 24" fill="none" className="size-6" aria-hidden>
                    <path
                      d="M7 8h10l-1 12H8L7 8zm2 0V6a3 3 0 016 0v2"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </div>
              <p className="font-heading text-xl text-cocoa">{h.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-cocoa-soft">
                {h.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works section */}
      <section className="relative">
        <div className="mb-12 text-center">
          <p className="font-hand text-2xl text-terracotta">nasıl olur</p>
          <h2 className="font-heading text-4xl text-cocoa sm:text-5xl">
            Nasıl sipariş verilir?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-cocoa-soft">
            Burada vitrin var, sohbet Instagram&apos;da. Üç basit adımda
            yanındayız.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="relative rounded-3xl border border-terracotta-soft/40 bg-white/70 p-7 shadow-sm"
            >
              <div className="font-hand mb-2 text-5xl text-terracotta/60">
                {step.n}
              </div>
              <h3 className="font-heading text-2xl text-cocoa">{step.title}</h3>
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
            <Link href="/urunler">Tüm Çantaları İncele</Link>
          </Button>
        </div>
      </section>

      {/* Personal note section */}
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
          <p className="font-hand text-3xl text-terracotta">benden sana</p>
          <p className="font-heading mt-4 text-2xl leading-relaxed text-cocoa sm:text-3xl">
            “Her çantayı evimin sessizliğinde, bir çay demlerken, veya kahvemi
            yudumlarken örüyorum. Senin de hayatına ufak bir sıcaklık katsın
            isterim.”
          </p>
          <p className="font-hand mt-6 text-2xl text-cocoa-soft">— Yüksel</p>
        </div>
      </section>
    </div>
  );
}
