import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Atölye Yönetim",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-bordeaux/15 bg-paper/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
              / Atölye Yönetim
            </p>
            <p className="font-heading text-xl text-ink">İçerik Paneli</p>
          </div>
          <nav className="flex items-center gap-5 text-sm">
            <Link
              href="/admin/yeni-urun"
              className="link-underline text-ink-soft hover:text-bordeaux"
            >
              Yeni Ürün
            </Link>
            <Link
              href="/admin/urunler"
              className="link-underline text-ink-soft hover:text-bordeaux"
            >
              Ürünler
            </Link>
            <Link
              href="/studio"
              className="link-underline text-ink-soft hover:text-bordeaux"
            >
              Sanity Studio
            </Link>
            <Link
              href="/"
              className="link-underline text-ink-soft hover:text-bordeaux"
              target="_blank"
            >
              Siteyi gör ↗
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
