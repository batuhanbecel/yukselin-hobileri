import Link from "next/link";

export default function AdminHomePage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <p className="font-hand text-2xl text-bordeaux">hoş geldin</p>
      <h1 className="font-heading mt-1 text-4xl text-ink sm:text-5xl">
        Atölye
      </h1>
      <p className="mt-4 max-w-xl text-ink-soft">
        Annenin çantasının fotoğrafından yapay zekayla temiz vitrin üret,
        mevcut ürünleri yönet, içerikleri Sanity üzerinden düzenle.
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdminCard
          href="/admin/yeni-urun"
          step="01"
          title="Yeni Ürün"
          description="AI ile foto üret, formu doldur, yayınla."
        />
        <AdminCard
          href="/admin/urunler"
          step="02"
          title="Ürünleri Yönet"
          description="Mevcut ürünleri düzenle, sırala, sil."
        />
        <AdminCard
          href="/studio"
          step="03"
          title="Sanity Studio"
          description="Sayfa metinleri, kategoriler, ayarlar."
        />
      </div>
    </div>
  );
}

function AdminCard({
  href,
  step,
  title,
  description,
}: {
  href: string;
  step: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group rounded-2xl border border-bordeaux/20 bg-paper p-6 transition-all hover:-translate-y-0.5 hover:border-bordeaux/40 hover:shadow-md"
    >
      <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-bordeaux">
        / {step}
      </p>
      <p className="font-heading mt-3 text-2xl text-ink group-hover:text-bordeaux">
        {title}
      </p>
      <p className="mt-2 text-sm text-ink-soft">{description}</p>
    </Link>
  );
}
