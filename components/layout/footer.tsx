import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { NAV_LINKS, SITE_NAME, INSTAGRAM_URL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-terracotta-soft/30 bg-cream-deep/40">
      {/* Stitch line at top */}
      <div
        className="absolute left-8 right-8 top-3 h-px text-terracotta/30 stitch-border"
        aria-hidden
      />

      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <p className="font-heading text-2xl text-cocoa">{SITE_NAME}</p>
            <p className="font-hand mt-1 text-xl text-terracotta">
              her ilmek bir hikaye
            </p>
            <p className="mt-4 text-sm leading-relaxed text-cocoa-soft">
              Bu sitedeki ürünler sadece paylaşım içindir. Beğendiğiniz bir
              çanta varsa Instagram&apos;dan bana yazabilirsiniz.
            </p>
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-terracotta/30 bg-white/60 px-4 py-2 text-sm font-medium text-terracotta transition-colors hover:bg-terracotta hover:text-white"
            >
              <InstagramIcon />
              @ykslbcl
            </Link>
          </div>

          <nav className="flex flex-col gap-3">
            <p className="font-hand text-lg text-terracotta">sayfalar</p>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-cocoa-soft transition-colors hover:text-terracotta"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-2 border-t border-dashed border-terracotta/20 pt-6 text-center text-sm text-cocoa-soft sm:flex-row sm:text-left">
          <p>© {year} {SITE_NAME}</p>
          <p className="font-hand inline-flex items-center gap-2 text-base">
            sevgiyle örüldü
            <Heart className="size-4 fill-terracotta text-terracotta" />
          </p>
        </div>
      </div>
    </footer>
  );
}
