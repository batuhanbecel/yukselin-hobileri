import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function NotFound() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <svg
        className="size-20 text-terracotta/60"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <circle cx="50" cy="50" r="32" fill="currentColor" opacity="0.4" />
        <path
          d="M20 50 Q 50 20, 80 50 M 20 50 Q 50 80, 80 50 M 35 25 Q 50 50, 65 75 M 35 75 Q 50 50, 65 25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      {settings.notFoundHandwritten && (
        <p className="font-hand mt-6 text-2xl text-terracotta">
          {settings.notFoundHandwritten}
        </p>
      )}
      <h1 className="mt-1 font-heading text-4xl text-cocoa">
        {settings.notFoundTitle || "Sayfa bulunamadı"}
      </h1>
      {settings.notFoundText && (
        <p className="mt-3 text-cocoa-soft">{settings.notFoundText}</p>
      )}
      <Button
        asChild
        className="mt-8 rounded-full bg-terracotta text-white hover:bg-terracotta/90"
      >
        <Link href="/">
          {settings.notFoundHomeLabel || "Ana sayfaya dön"}
        </Link>
      </Button>
    </div>
  );
}
