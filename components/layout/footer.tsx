import Link from "next/link";
import { Heart } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { INSTAGRAM_URL, SITE_NAME } from "@/lib/constants";
import { getNavLinks } from "@/lib/nav";
import type { NavLink } from "@/lib/sanity/types";

type FooterProps = {
  siteTitle?: string;
  tagline?: string;
  description?: string;
  signature?: string;
  navTitle?: string;
  instagramUrl?: string;
  instagramHandle?: string;
  navLinks?: NavLink[];
  studioLabel?: string;
  contactTitle?: string;
  contactLine1?: string;
  contactLine2?: string;
};

export function Footer({
  siteTitle,
  tagline,
  description,
  signature,
  navTitle,
  instagramUrl,
  instagramHandle,
  navLinks,
  studioLabel,
  contactTitle,
  contactLine1,
  contactLine2,
}: FooterProps) {
  const year = new Date().getFullYear();
  const title = siteTitle || SITE_NAME;
  const igUrl = instagramUrl || INSTAGRAM_URL;
  const igHandle = instagramHandle || "@ykslbcl";
  const links = getNavLinks({ navLinks });

  return (
    <footer className="relative mt-auto border-t border-bordeaux/15 bg-ivory-deep/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-5">
            <div className="flex items-center gap-3">
              {studioLabel && (
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux">
                  {studioLabel}
                </span>
              )}
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

          <nav className="lg:col-span-3 lg:col-start-7">
            {navTitle && (
              <p className="font-hand mb-3 text-lg text-bordeaux">{navTitle}</p>
            )}
            <ul className="space-y-2">
              {links.map((link) => (
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

          <div className="lg:col-span-3">
            {contactTitle && (
              <p className="font-hand mb-3 text-lg text-bordeaux">{contactTitle}</p>
            )}
            <ul className="space-y-2 text-sm text-ink-soft">
              {contactLine1 && <li>{contactLine1}</li>}
              {contactLine2 && <li>{contactLine2}</li>}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-3 border-t border-dashed border-bordeaux/20 pt-8 text-center text-sm text-ink-soft sm:flex-row sm:text-left">
          <p>
            © {year} {title}
          </p>
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
