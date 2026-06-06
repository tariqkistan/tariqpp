"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
  size?: "default" | "compact";
}

export function AnimatedCounter({ value, label, suffix = "", size = "default" }: AnimatedCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, scrollViewport);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 1500;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setCount(start);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUp}
      transition={defaultTransition}
      className={cn(
        "text-center",
        size === "compact" && "max-w-[10rem] mx-auto"
      )}
    >
      <div
        className={cn(
          "font-display font-black text-ink",
          size === "default" && "text-5xl md:text-6xl lg:text-7xl",
          size === "compact" && "text-3xl md:text-4xl lg:text-5xl"
        )}
      >
        {count}
        {suffix}
      </div>
      <p
        className={cn(
          "mt-2 font-semibold uppercase tracking-wide text-muted md:mt-3",
          size === "default" && "text-sm md:text-base",
          size === "compact" && "text-[11px] md:text-xs"
        )}
      >
        {label}
      </p>
    </motion.div>
  );
}
