import Link from "next/link";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { InstagramButton } from "@/components/instagram-button";
import { Button } from "@/components/ui/button";
import { getFeaturedProducts, getSiteSettings } from "@/lib/sanity/fetch";

export default async function HomePage() {
  const [settings, featuredProducts] = await Promise.all([
    getSiteSettings(),
    getFeaturedProducts(),
  ]);

  return (
    <div className="mx-auto max-w-6xl space-y-16 px-4 py-10 sm:px-6 sm:py-14">
      <Hero settings={settings} />

      <FeaturedProducts products={featuredProducts} />

      <section className="rounded-3xl border border-pink-100/80 bg-white/70 px-6 py-12 text-center sm:px-12">
        <h2 className="font-heading text-2xl sm:text-3xl">
          Nasıl sipariş verilir?
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
          Beğendiğiniz çantanın fotoğrafını Instagram&apos;dan bize gönderin
          veya mesaj atın. Size özel renk ve model taleplerinizi de
          değerlendiriyoruz.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <InstagramButton size="lg" />
          <Button asChild variant="outline" className="border-pink-200">
            <Link href="/urunler">Tüm Çantaları İncele</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
