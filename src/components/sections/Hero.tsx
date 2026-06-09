"use client";

import Image from "next/image";
import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { siteConfig } from "@/data/site";
import { GradientButton } from "@/components/ui/GradientButton";
import { fadeUp, defaultTransition } from "@/hooks/useScrollAnimation";

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      whileHover={{ scale: 1.12, y: -2 }}
      className="text-current/65 transition-colors hover:text-current"
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  const nameParts = useMemo(() => siteConfig.name.split(" "), []);
  const firstName = nameParts[0] ?? siteConfig.name;
  const lastName = nameParts.slice(1).join(" ");

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    const interval = setInterval(() => {
      setTaglineIndex((i) => (i + 1) % siteConfig.taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden border-b-2 border-ink bg-accent px-6 pb-16 pt-28 text-accent-on md:px-10 md:pb-20 md:pt-32"
    >
      <div className="pointer-events-none absolute inset-0 hero-dot-texture" aria-hidden />
      <div className="pointer-events-none absolute inset-0 mesh-bg opacity-70" aria-hidden />

      <div
        className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-8 [grid-template-areas:'portrait'_'copy'] sm:gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-16 lg:[grid-template-areas:'copy_portrait'] xl:gap-20"
      >
        {/* Copy column — coral accent on navy for high contrast */}
        <div className="[grid-area:copy] text-center lg:text-left">
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={defaultTransition}
            className="mb-5 inline-flex items-center gap-2 rounded-full border-2 border-white/45 bg-white/15 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-leap-sm backdrop-blur-md"
          >
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" aria-hidden />
            {siteConfig.heroEyebrow}
          </motion.p>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.08 }}
            className="font-display text-[clamp(2.75rem,9vw,5.5rem)] font-black leading-[0.95] tracking-tight text-accent-on"
          >
            <span className="block">{firstName}</span>
            {lastName ? (
              <span className="block text-coral">{lastName}</span>
            ) : null}
          </motion.h1>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.16 }}
            className="mt-6 flex min-h-[2.5rem] flex-wrap items-baseline justify-center gap-x-2 text-xl font-bold text-accent-on md:text-2xl lg:justify-start"
          >
            <span className="text-accent-on/75">I&apos;m a</span>
            <span className="inline-grid min-w-[12ch] text-left font-display sm:min-w-[16ch]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={taglineIndex}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.35 }}
                  className="col-start-1 row-start-1 text-coral"
                >
                  {siteConfig.taglines[taglineIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.div>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.24 }}
            className="mx-auto mt-8 max-w-xl text-base font-medium leading-relaxed text-accent-on/85 md:text-lg lg:mx-0"
          >
            {siteConfig.heroSubheadline}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.32 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
          >
            <GradientButton href="#projects">
              <span className="inline-flex items-center gap-2">
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                View my work
              </span>
            </GradientButton>
            <GradientButton href="/cv.pdf" variant="secondary" external>
              Download CV
            </GradientButton>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ ...defaultTransition, delay: 0.4 }}
            className="mt-12 mb-10 flex items-center justify-center gap-8 lg:mb-0 lg:justify-start"
          >
            <SocialLink href={siteConfig.social.github} label="GitHub">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </SocialLink>
            <SocialLink href={siteConfig.social.linkedin} label="LinkedIn">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </SocialLink>
            <SocialLink href={siteConfig.social.email} label="Email">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </SocialLink>
          </motion.div>
        </div>

        {/* Profile — tilted “app window” frame; smaller + first on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 24, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -4 }}
          transition={{ type: "spring", stiffness: 120, damping: 18, delay: 0.05 }}
          className="[grid-area:portrait] relative mx-auto w-full max-w-[min(62vw,236px)] justify-self-center sm:max-w-[288px] lg:mx-0 lg:max-w-none lg:justify-self-end"
        >
          <div
            className="absolute -left-1 top-8 z-20 flex h-12 w-12 items-center justify-center border-2 border-ink bg-accent font-display text-sm font-black text-accent-on shadow-leap-sm sm:-left-2 sm:top-10 sm:h-16 sm:w-16 sm:text-lg lg:-left-4 lg:top-14 lg:h-[4.5rem] lg:w-[4.5rem] lg:text-xl"
            aria-hidden
          >
            TM
          </div>

          <div className="rounded-leap border-[3px] border-ink bg-card shadow-[6px_6px_0_0_var(--shadow-edge)] sm:border-4 sm:shadow-[8px_8px_0_0_var(--shadow-edge)] lg:shadow-[10px_10px_0_0_var(--shadow-edge)]">
            <div className="flex items-center gap-3 border-b-2 border-ink bg-accent px-3 py-2.5 sm:px-4">
              <span className="flex gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-[#ff5f57]" />
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-[#febc2e]" />
                <span className="h-2.5 w-2.5 rounded-full border border-ink bg-[#28c840]" />
              </span>
              <span className="truncate font-mono text-[10px] font-medium text-white sm:text-xs">
                ~/portfolio/profile.png
              </span>
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted sm:aspect-[4/5]">
              <Image
                src="/profile.png"
                alt={`${siteConfig.name}, software engineer`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 236px, (max-width: 1024px) 288px, 420px"
                priority
              />
              {/* subtle “chrome” footer like a status strip */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t-2 border-ink/10 bg-card/90 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-mono text-[9px] font-semibold uppercase tracking-wider text-ink/50 sm:text-[10px]">
                  Live preview
                </span>
                <span className="hidden font-mono text-[9px] text-coral sm:inline sm:text-[10px]">
                  ● Ready to ship
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 sm:bottom-6 lg:bottom-10"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-10 w-6 rounded-full border-2 border-ink bg-card p-1 shadow-leap-sm"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-ink" />
        </motion.div>
      </motion.div>
    </section>
  );
}
