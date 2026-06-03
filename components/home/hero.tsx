"use client";

import { motion } from "motion/react";
import { InstagramButton } from "@/components/instagram-button";
import type { HomePage } from "@/lib/sanity/types";

type HeroProps = {
  data: HomePage;
};

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero({ data }: HeroProps) {
  return (
    <section className="relative grid gap-10 overflow-hidden pb-12 pt-8 lg:grid-cols-12 lg:gap-8 lg:pb-20 lg:pt-12">
      {/* Editorial side label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease }}
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 -rotate-90 lg:block"
      >
        <p className="text-[10px] font-medium uppercase tracking-[0.4em] text-ink-soft/60">
          Atölye · Est. {new Date().getFullYear()}
        </p>
      </motion.div>

      {/* LEFT — Main content */}
      <div className="relative lg:col-span-7 lg:pl-8">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="font-hand text-3xl text-bordeaux sm:text-4xl"
        >
          {data.heroGreeting}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.25 }}
          className="mt-6 flex items-center gap-3"
        >
          <span className="h-px w-12 bg-bordeaux/40" />
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-ink-soft">
            {data.heroBadge}
          </p>
        </motion.div>

        <h1 className="mt-6 font-heading text-[2.75rem] font-light leading-[1.02] tracking-tight text-ink sm:text-6xl md:text-7xl xl:text-[5.5rem]">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.35 }}
            className="block"
          >
            {data.heroTitleStart}
          </motion.span>
          {data.heroTitleEmphasis && (
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="font-display block italic text-bordeaux"
            >
              {data.heroTitleEmphasis}
            </motion.span>
          )}
          {data.heroTitleEnd && (
            <motion.span
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.65 }}
              className="block"
            >
              {data.heroTitleEnd}
            </motion.span>
          )}
        </h1>

        {data.heroSubtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.85 }}
            className="mt-8 max-w-md text-base leading-relaxed text-ink-soft sm:text-lg"
          >
            {data.heroSubtitle}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 1 }}
          className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center"
        >
          <InstagramButton size="lg" />
          {data.heroSignature && (
            <p className="font-hand text-xl text-ink-soft sm:ml-2">
              {data.heroSignature}
            </p>
          )}
        </motion.div>
      </div>

      {/* RIGHT — Visual composition */}
      <div className="relative lg:col-span-5">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, rotate: 8 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.4 }}
          className="relative mx-auto aspect-[4/5] w-full max-w-md"
        >
          {/* Backdrop card */}
          <div className="absolute inset-0 -rotate-3 rounded-[2rem] bg-gradient-to-br from-clay-soft/40 via-ivory-deep to-gold-soft/30" />
          {/* Front card with yarn illustration */}
          <div className="absolute inset-3 grain overflow-hidden rounded-[1.6rem] border border-bordeaux/15 bg-gradient-to-br from-paper via-ivory to-ivory-deep/50 p-8">
            <div className="flex h-full flex-col justify-between">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-bordeaux/70">
                  N° 01
                </p>
                <p className="mt-1 font-display text-2xl italic text-ink/70">
                  el emeği
                </p>
              </div>

              <svg
                viewBox="0 0 200 200"
                fill="none"
                className="mx-auto h-48 w-48 text-bordeaux"
                aria-hidden
              >
                <motion.circle
                  cx="100"
                  cy="100"
                  r="78"
                  fill="currentColor"
                  fillOpacity="0.12"
                  initial={{ scale: 0.9 }}
                  animate={{ scale: [0.95, 1.02, 0.95] }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                  }}
                />
                <motion.g
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 60,
                    ease: "linear",
                    repeat: Infinity,
                  }}
                  style={{ transformOrigin: "100px 100px" }}
                >
                  <path
                    d="M30 100 Q 100 40, 170 100 M 30 100 Q 100 160, 170 100"
                    stroke="currentColor"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M60 50 Q 100 100, 140 150 M 60 150 Q 100 100, 140 50"
                    stroke="currentColor"
                    strokeOpacity="0.45"
                    strokeWidth="1.5"
                    fill="none"
                  />
                  <path
                    d="M100 22 Q 50 100, 100 178 M 100 22 Q 150 100, 100 178"
                    stroke="currentColor"
                    strokeOpacity="0.3"
                    strokeWidth="1"
                    fill="none"
                  />
                </motion.g>
              </svg>

              <div className="flex items-end justify-between">
                <p className="font-hand text-lg text-bordeaux">
                  her ilmek
                </p>
                <p className="font-hand text-lg text-bordeaux">
                  bir hikaye
                </p>
              </div>
            </div>
          </div>

          {/* Decorative gold dot */}
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease, delay: 1.2 }}
            className="absolute -right-2 -top-2 size-12 rounded-full bg-gold shadow-md ring-4 ring-paper"
            aria-hidden
          />
        </motion.div>
      </div>

      {/* Bottom stitch line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease, delay: 1 }}
        className="pointer-events-none col-span-full mt-6 h-px origin-left bg-bordeaux/20 stitch-border lg:mt-10"
        style={{ color: "currentColor" }}
        aria-hidden
      />
    </section>
  );
}
