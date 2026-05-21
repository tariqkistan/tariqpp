"use client";

import { useEffect, useState } from "react";
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
      whileHover={{ scale: 1.15, y: -2 }}
      className="text-muted transition-colors hover:text-foreground"
    >
      {children}
    </motion.a>
  );
}

export function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 md:px-8"
    >
      <div className="pointer-events-none absolute inset-0 mesh-bg" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 dot-grid opacity-40 animate-dot-drift"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full glow-orb animate-float"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-24 bottom-1/4 h-80 w-80 rounded-full glow-orb animate-float"
        style={{ animationDelay: "2s" }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={defaultTransition}
          className="mb-4 text-sm font-medium uppercase tracking-widest text-muted md:text-base"
        >
          Data Engineer & Frontend Developer
        </motion.p>

        <motion.h1
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.1 }}
          className="font-display text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span className="text-gradient">{siteConfig.name}</span>
        </motion.h1>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-baseline justify-center gap-x-2 text-xl md:text-2xl"
        >
          <span className="text-muted">I build as a</span>
          <span className="inline-grid min-w-[14ch] text-left font-display font-semibold sm:min-w-[18ch]">
            <AnimatePresence mode="wait">
              <motion.span
                key={taglineIndex}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.35 }}
                className="col-start-1 row-start-1 text-gradient"
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
          transition={{ ...defaultTransition, delay: 0.3 }}
          className="mx-auto mt-8 max-w-2xl text-lg text-muted md:text-xl"
        >
          Crafting beautiful interfaces and robust data pipelines that scale.
        </motion.p>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.4 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <GradientButton href="#projects">View My Work</GradientButton>
          <GradientButton href="/cv.pdf" variant="secondary" external>
            Download CV
          </GradientButton>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.5 }}
          className="mt-12 flex items-center justify-center gap-8"
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        aria-hidden
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="h-10 w-6 rounded-full border-2 border-white/30 p-1"
        >
          <div className="mx-auto h-2 w-1 rounded-full bg-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
