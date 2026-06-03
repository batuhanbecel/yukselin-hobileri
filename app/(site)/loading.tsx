import { getSiteSettings } from "@/lib/sanity/fetch";

export default async function Loading() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <svg
        className="size-16 animate-spin text-terracotta/70"
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden
      >
        <circle cx="50" cy="50" r="32" fill="currentColor" opacity="0.3" />
        <path
          d="M20 50 Q 50 20, 80 50 M 20 50 Q 50 80, 80 50 M 35 25 Q 50 50, 65 75 M 35 75 Q 50 50, 65 25"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
      {settings.loadingHandwritten && (
        <p className="font-hand mt-6 text-2xl text-terracotta">
          {settings.loadingHandwritten}
        </p>
      )}
      {settings.loadingText && (
        <p className="mt-1 text-sm text-cocoa-soft">{settings.loadingText}</p>
      )}
    </div>
  );
}
