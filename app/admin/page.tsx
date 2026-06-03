import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <p className="font-hand text-2xl text-bordeaux">hoş geldin</p>
      <h1 className="font-heading mt-1 text-4xl text-ink sm:text-5xl">
        Atölye
      </h1>
      <p className="mt-4 text-ink-soft">
        Annenin çantasının fotoğrafından, yapay zekayla temiz bir ürün vitrini
        üretip Sanity üzerinden siteye yayınla.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <Link
          href="/admin/yeni-urun"
          className="group rounded-2xl border border-bordeaux/20 bg-paper p-6 transition-colors hover:border-bordeaux/40"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-bordeaux">
            / 01 — Yeni
          </p>
          <p className="font-heading mt-3 text-2xl text-ink">Yeni Ürün</p>
          <p className="mt-2 text-sm text-ink-soft">
            Fotoğraf yükle, AI vitrin üretsin, formu doldur, yayınla.
          </p>
        </Link>

        <Link
          href="/studio"
          className="group rounded-2xl border border-bordeaux/20 bg-paper p-6 transition-colors hover:border-bordeaux/40"
        >
          <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-bordeaux">
            / 02 — Düzenle
          </p>
          <p className="font-heading mt-3 text-2xl text-ink">Sanity Studio</p>
          <p className="mt-2 text-sm text-ink-soft">
            Mevcut ürünleri ve sayfa içeriklerini düzenle.
          </p>
        </Link>
      </div>
    </div>
  );
}
