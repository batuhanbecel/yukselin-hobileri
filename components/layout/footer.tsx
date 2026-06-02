import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { NAV_LINKS, SITE_NAME, INSTAGRAM_URL } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-pink-100/60 bg-white/50">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="font-heading text-xl">{SITE_NAME}</p>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              El emeği örgü çantalar. Sipariş için Instagram&apos;dan bize
              yazın.
            </p>
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-violet-700 hover:underline"
            >
              <InstagramIcon />
              @ykslbcl
            </Link>
          </div>
          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-2 border-t border-pink-100/60 pt-8 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>© {year} {SITE_NAME}. Tüm hakları saklıdır.</p>
          <p className="inline-flex items-center gap-1">
            Sevgiyle örüldü <Heart className="size-3.5 fill-pink-300 text-pink-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
