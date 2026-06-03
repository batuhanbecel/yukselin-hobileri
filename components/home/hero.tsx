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
    <section className="relative overflow-hidden pb-12 pt-8 lg:pb-20 lg:pt-12">
      <div className="relative max-w-3xl lg:pl-8">
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

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.4, ease, delay: 1 }}
        className="pointer-events-none mt-10 h-px origin-left bg-bordeaux/20 stitch-border lg:mt-14"
        style={{ color: "currentColor" }}
        aria-hidden
      />
    </section>
  );
}
