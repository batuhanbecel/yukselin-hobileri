import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/motion/reveal";
import { ProductGrid } from "@/components/products/product-grid";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getSiteSettings } from "@/lib/sanity/fetch";

export default async function NotFound() {
  const [settings, featured] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(),
  ]);

  const handwritten = settings.notFoundHandwritten || "aman";
  const title = settings.notFoundTitle || "Sayfa bulunamadı";
  const text =
    settings.notFoundText ||
    "Aradığın sayfa burada değil. Belki bir ilmek kayboldu — gel sana en sevdiklerimi göstereyim.";
  const homeLabel = settings.notFoundHomeLabel || "Ana sayfaya dön";

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8 sm:py-24">
      <Reveal>
        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          {/* Sol: dev "404" italic display */}
          <div className="relative lg:col-span-5">
            <p
              className="font-display select-none text-[10rem] leading-[0.85] text-bordeaux/15 sm:text-[14rem]"
              aria-hidden
            >
              404
            </p>
            <div
              className="absolute inset-x-0 bottom-6 h-px bg-bordeaux/20 stitch-border"
              aria-hidden
            />
          </div>

          {/* Sağ: metin + CTA */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                / Kayıp ilmek
              </span>
              <span className="h-px flex-1 bg-bordeaux/20" />
            </div>

            <p className="font-hand mt-4 text-3xl text-bordeaux sm:text-4xl">
              {handwritten}
            </p>
            <h1 className="font-heading mt-2 text-5xl font-light leading-[1.05] text-ink sm:text-6xl md:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-soft">
              {text}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="rounded-full bg-ink px-6 text-paper hover:bg-bordeaux"
              >
                <Link href="/">{homeLabel}</Link>
              </Button>
              <Link
                href="/urunler"
                className="link-underline inline-flex items-center gap-1.5 text-sm font-medium uppercase tracking-[0.18em] text-ink-soft hover:text-bordeaux"
              >
                Çantalara bak
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Featured products — ziyaretçi kaybolmasın */}
      {featured.length > 0 && (
        <section className="mt-24 border-t border-bordeaux/10 pt-16">
          <Reveal className="mb-10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                / Bunlara ne dersin
              </span>
              <span className="h-px flex-1 bg-bordeaux/20" />
            </div>
            <h2 className="font-heading mt-3 text-3xl font-light text-ink sm:text-4xl">
              Hazırda olan birkaç çanta
            </h2>
          </Reveal>
          <ProductGrid products={featured.slice(0, 3)} />
        </section>
      )}
    </div>
  );
}
