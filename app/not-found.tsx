import Link from "next/link";

/**
 * Root-level 404 — /admin/olmayan-url gibi (site) grubunun dışındaki
 * URL'ler için. Header/footer yok, minimal atelier ekranı.
 */
export default function RootNotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-ivory px-6 text-center">
      <p
        className="font-display select-none text-[8rem] leading-[0.85] text-bordeaux/15 sm:text-[12rem]"
        aria-hidden
      >
        404
      </p>
      <div
        className="my-2 h-px w-48 bg-bordeaux/30 stitch-border"
        aria-hidden
      />
      <p className="font-hand mt-6 text-2xl text-bordeaux sm:text-3xl">
        burada bir şey yok
      </p>
      <h1 className="font-heading mt-2 text-4xl font-light text-ink sm:text-5xl">
        Sayfa bulunamadı
      </h1>
      <p className="mt-4 max-w-sm text-sm text-ink-soft">
        Aradığın adres mevcut değil. Hadi ana sayfaya dönelim.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-xs font-medium uppercase tracking-[0.22em] text-paper transition-colors hover:bg-bordeaux"
      >
        Ana sayfa
      </Link>
    </div>
  );
}
