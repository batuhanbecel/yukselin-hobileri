"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { InstagramIcon } from "@/components/icons/instagram-icon";
import { useState } from "react";
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

export function Header({ siteTitle, tagline, instagramUrl }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const title = siteTitle || SITE_NAME;
  const igUrl = instagramUrl || INSTAGRAM_URL;

  return (
    <header className="sticky top-0 z-50 border-b border-terracotta-soft/30 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex size-10 items-center justify-center rounded-full bg-terracotta-soft/50 transition-transform group-hover:rotate-12">
            <svg viewBox="0 0 32 32" className="size-7 text-terracotta" fill="none">
              <circle cx="16" cy="16" r="12" fill="currentColor" opacity="0.5" />
              <path
                d="M6 16 Q 16 6, 26 16 M 6 16 Q 16 26, 26 16 M 10 8 Q 16 16, 22 24 M 10 24 Q 16 16, 22 8"
                stroke="currentColor"
                strokeWidth="1.2"
              />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-heading text-xl tracking-tight text-cocoa sm:text-2xl">
              {title}
            </span>
            {tagline && (
              <span className="font-hand text-sm text-terracotta">
                {tagline}
              </span>
            )}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-cocoa-soft transition-colors hover:text-terracotta"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="rounded-full border-0 bg-terracotta text-white shadow-sm hover:bg-terracotta/90"
          >
            <Link href={igUrl} target="_blank" rel="noopener noreferrer">
              <InstagramIcon />
              Instagram
            </Link>
          </Button>
        </nav>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" aria-label="Menüyü aç">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-cream">
            <SheetHeader>
              <SheetTitle className="font-heading text-left text-2xl">
                {title}
              </SheetTitle>
              {tagline && (
                <p className="font-hand text-left text-lg text-terracotta">
                  {tagline}
                </p>
              )}
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4 px-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-heading text-2xl text-cocoa transition-colors hover:text-terracotta"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-6 rounded-full border-0 bg-terracotta text-white hover:bg-terracotta/90"
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
        </Sheet>
      </div>
    </header>
  );
}
