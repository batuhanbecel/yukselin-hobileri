import type { Metadata } from "next";
import { PortableText } from "@portabletext/react";
import { InstagramButton } from "@/components/instagram-button";
import { getAboutPage } from "@/lib/sanity/fetch";

export const metadata: Metadata = {
  title: "Hakkımda",
  description:
    "Yüksel'in Hobileri — annemin sevgiyle ördüğü çantaların hikayesi.",
};

export default async function AboutPage() {
  const about = await getAboutPage();
  const values = about.values ?? [];
  const story = about.story ?? [];

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="text-center">
        {about.pageHandwritten && (
          <p className="font-hand text-2xl text-terracotta">
            {about.pageHandwritten}
          </p>
        )}
        {about.pageTitle && (
          <h1 className="font-heading text-5xl text-cocoa sm:text-6xl">
            {about.pageTitle}
          </h1>
        )}
        <div className="mx-auto mt-4 h-px w-24 text-terracotta/40 stitch-border" />
      </div>

      {story.length > 0 && (
        <div className="relative my-12 overflow-hidden rounded-[2rem] border border-terracotta-soft/40 bg-gradient-to-br from-cream-deep/60 to-cream p-8 sm:p-12">
          <svg
            className="pointer-events-none absolute -right-6 -top-6 size-32 text-terracotta-soft/40"
            viewBox="0 0 100 100"
            fill="none"
            aria-hidden
          >
            <circle cx="50" cy="50" r="36" fill="currentColor" />
            <path
              d="M14 50 Q 50 14, 86 50 M 14 50 Q 50 86, 86 50 M 30 18 Q 50 50, 70 82 M 30 82 Q 50 50, 70 18"
              stroke="#c4756c"
              strokeOpacity="0.4"
              strokeWidth="1.5"
            />
          </svg>

          <div className="relative space-y-5 text-base leading-relaxed text-cocoa sm:text-lg">
            <PortableText
              value={story}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="leading-relaxed text-cocoa/90">{children}</p>
                  ),
                },
              }}
            />
          </div>

          {about.storySignature && (
            <p className="font-hand mt-8 text-right text-2xl text-terracotta">
              {about.storySignature}
            </p>
          )}
        </div>
      )}

      {values.length > 0 && (
        <div className="my-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <div
              key={v._key ?? i}
              className="rounded-2xl border border-sage-soft/60 bg-white/60 p-5 text-center"
            >
              <p className="font-hand text-xl text-terracotta">{v.title}</p>
              <p className="mt-1 text-sm text-cocoa-soft">{v.text}</p>
            </div>
          ))}
        </div>
      )}

      {(about.ctaHandwritten || about.ctaTitle || about.ctaText) && (
        <div className="mt-12 rounded-[2rem] border border-terracotta-soft/40 bg-gradient-to-br from-rose-dust/20 via-cream to-honey/20 px-6 py-10 text-center">
          {about.ctaHandwritten && (
            <p className="font-hand text-2xl text-terracotta">
              {about.ctaHandwritten}
            </p>
          )}
          {about.ctaTitle && (
            <p className="font-heading mt-1 text-2xl text-cocoa">
              {about.ctaTitle}
            </p>
          )}
          {about.ctaText && (
            <p className="mx-auto mt-3 max-w-md text-cocoa-soft">
              {about.ctaText}
            </p>
          )}
          <div className="mt-6 flex justify-center">
            <InstagramButton size="lg" />
          </div>
        </div>
      )}
    </div>
  );
}
