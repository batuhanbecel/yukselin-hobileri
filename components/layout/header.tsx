"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useState } from "react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NAV_LINKS, SITE_NAME, INSTAGRAM_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

type HeaderProps = {
  siteTitle?: string;
  tagline?: string;
  instagramUrl?: string;
};

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header({ siteTitle, tagline, instagramUrl }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const title = siteTitle || SITE_NAME;
  const igUrl = instagramUrl || INSTAGRAM_URL;

  const { scrollY } = useScroll();
  const blur = useTransform(scrollY, [0, 80], [0, 12]);
  const bg = useTransform(
    scrollY,
    [0, 80],
    ["rgba(247, 239, 225, 0.7)", "rgba(247, 239, 225, 0.92)"]
  );
  const borderOpacity = useTransform(scrollY, [0, 80], [0, 0.15]);

  return (
    <motion.header
      style={{
        backgroundColor: bg,
        backdropFilter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className="sticky top-0 z-50"
    >
      <motion.div
        style={{
          borderBottomColor: useTransform(
            borderOpacity,
            (o) => `rgba(168, 88, 77, ${o})`
          ),
        }}
        className="border-b"
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-6 px-4 sm:px-8">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <motion.span
              whileHover={{ rotate: 18 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative inline-flex size-10 items-center justify-center rounded-full bg-bordeaux/15"
            >
              <svg viewBox="0 0 32 32" className="size-7 text-bordeaux" fill="none">
                <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.5" />
                <path
                  d="M6 16 Q 16 6, 26 16 M 6 16 Q 16 26, 26 16 M 10 8 Q 16 16, 22 24 M 10 24 Q 16 16, 22 8"
                  stroke="currentColor"
                  strokeWidth="1.2"
                />
              </svg>
            </motion.span>
            <span className="flex flex-col leading-tight">
              <span className="font-heading text-lg tracking-tight text-ink sm:text-xl">
                {title}
              </span>
              {tagline && (
                <span className="font-hand text-sm text-bordeaux">
                  {tagline}
                </span>
              )}
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium uppercase tracking-[0.16em] transition-colors",
                    active ? "text-bordeaux" : "text-ink-soft hover:text-ink"
                  )}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute -bottom-px left-3 right-3 h-px bg-bordeaux"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Button
              asChild
              size="sm"
              className="ml-3 rounded-full border-0 bg-ink text-paper shadow-sm hover:bg-bordeaux"
            >
              <Link href={igUrl} target="_blank" rel="noopener noreferrer">
                <InstagramIcon />
                Instagram
              </Link>
            </Button>
          </nav>

          {/* Mobile */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Menüyü aç">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <AnimatePresence>
              {open && (
                <SheetContent side="right" className="bg-ivory">
                  <SheetHeader>
                    <SheetTitle className="font-heading text-left text-2xl">
                      {title}
                    </SheetTitle>
                    {tagline && (
                      <p className="font-hand text-left text-lg text-bordeaux">
                        {tagline}
                      </p>
                    )}
                  </SheetHeader>
                  <nav className="mt-10 flex flex-col gap-1 px-4">
                    {NAV_LINKS.map((link, i) => {
                      const active = isActive(pathname, link.href);
                      return (
                        <motion.div
                          key={link.href}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.05 * i }}
                        >
                          <Link
                            href={link.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "font-heading block py-2 text-3xl transition-colors",
                              active
                                ? "text-bordeaux"
                                : "text-ink hover:text-bordeaux"
                            )}
                          >
                            {link.label}
                          </Link>
                        </motion.div>
                      );
                    })}
                    <Button
                      asChild
                      className="mt-8 rounded-full border-0 bg-ink text-paper hover:bg-bordeaux"
                    >
                      <Link
                        href={igUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                      >
                        <InstagramIcon />
                        Instagram
                      </Link>
                    </Button>
                  </nav>
                </SheetContent>
              )}
            </AnimatePresence>
          </Sheet>
        </div>
      </motion.div>
    </motion.header>
  );
}
