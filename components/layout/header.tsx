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

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-pink-100/60 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="font-heading text-xl tracking-tight text-foreground sm:text-2xl"
        >
          {SITE_NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
          <Button
            asChild
            size="sm"
            className="border-0 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white"
          >
            <Link href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
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
              <SheetTitle className="font-heading text-left">
                {SITE_NAME}
              </SheetTitle>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "text-lg font-medium text-foreground transition-colors hover:text-primary"
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                asChild
                className="mt-4 border-0 bg-gradient-to-r from-[#f09433] via-[#e6683c] to-[#bc1888] text-white"
              >
                <Link
                  href={INSTAGRAM_URL}
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
