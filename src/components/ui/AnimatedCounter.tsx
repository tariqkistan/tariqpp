"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";

interface AnimatedCounterProps {
  value: number;
  label: string;
  suffix?: string;
}

export function AnimatedCounter({ value, label, suffix = "" }: AnimatedCounterProps) {
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
      className="text-center"
    >
      <div className="font-display text-4xl font-bold text-gradient md:text-5xl">
        {count}
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted md:text-base">{label}</p>
    </motion.div>
  );
}
