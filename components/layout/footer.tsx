import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { NAV_LINKS, SITE_NAME, INSTAGRAM_URL } from "@/lib/constants";

type FooterProps = {
  siteTitle?: string;
  tagline?: string;
  description?: string;
  signature?: string;
  navTitle?: string;
  instagramUrl?: string;
  instagramHandle?: string;
};

export function Footer({
  siteTitle,
  tagline,
  description,
  signature,
  navTitle,
  instagramUrl,
  instagramHandle,
}: FooterProps) {
  const year = new Date().getFullYear();
  const title = siteTitle || SITE_NAME;
  const igUrl = instagramUrl || INSTAGRAM_URL;
  const igHandle = instagramHandle || "@ykslbcl";

  return (
    <footer className="relative mt-auto border-t border-bordeaux/15 bg-ivory-deep/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand block */}
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                / Atölye
              </span>
              <span className="h-px w-12 bg-bordeaux/30" />
            </div>
            <p className="font-heading text-3xl text-ink">{title}</p>
            {tagline && (
              <p className="font-hand text-2xl text-bordeaux">{tagline}</p>
            )}
            {description && (
              <p className="max-w-md text-sm leading-relaxed text-ink-soft">
                {description}
              </p>
            )}
            <Link
              href={igUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-bordeaux/30 bg-paper/60 px-4 py-2 text-sm font-medium text-bordeaux transition-colors hover:bg-bordeaux hover:text-paper"
            >
              <InstagramIcon />
              {igHandle}
            </Link>
          </div>

          {/* Nav */}
          <nav className="lg:col-span-3 lg:col-start-7">
            {navTitle && (
              <p className="font-hand mb-3 text-lg text-bordeaux">{navTitle}</p>
            )}
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-underline text-sm text-ink-soft transition-colors hover:text-bordeaux"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Meta */}
          <div className="lg:col-span-3">
            <p className="font-hand mb-3 text-lg text-bordeaux">iletişim</p>
            <ul className="space-y-2 text-sm text-ink-soft">
              <li>Sipariş için Instagram'dan yazın.</li>
              <li>Türkiye'nin her yerine kargo.</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-dashed border-bordeaux/20 pt-8 text-center text-sm text-ink-soft sm:flex-row sm:text-left">
          <p>© {year} {title}</p>
          {signature && (
            <p className="font-hand inline-flex items-center gap-2 text-base">
              {signature}
              <Heart className="size-4 fill-bordeaux text-bordeaux" />
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
