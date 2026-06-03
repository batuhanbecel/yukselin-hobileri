"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useSiteSettings } from "@/lib/site-context";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const settings = useSiteSettings();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <svg
        className="size-16 text-terracotta/60"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <circle cx="50" cy="50" r="32" fill="currentColor" opacity="0.3" />
        <path
          d="M35 35 L 65 65 M 65 35 L 35 65"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
      {settings.errorHandwritten && (
        <p className="font-hand mt-6 text-2xl text-terracotta">
          {settings.errorHandwritten}
        </p>
      )}
      <h1 className="mt-1 font-heading text-3xl text-cocoa">
        {settings.errorTitle || "Sayfa yüklenemedi"}
      </h1>
      {settings.errorText && (
        <p className="mt-3 text-sm text-cocoa-soft">{settings.errorText}</p>
      )}
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button
          onClick={reset}
          className="rounded-full bg-terracotta text-white hover:bg-terracotta/90"
        >
          {settings.errorRetryLabel || "Tekrar dene"}
        </Button>
        <Button
          asChild
          variant="outline"
          className="rounded-full border-terracotta/30 bg-white/60 text-cocoa hover:bg-terracotta-soft/30"
        >
          <Link href="/">
            {settings.errorHomeLabel || "Ana sayfaya dön"}
          </Link>
        </Button>
      </div>
    </div>
  );
}
