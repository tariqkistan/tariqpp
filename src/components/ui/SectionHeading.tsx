"use client";

import { motion } from "framer-motion";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  title,
  subtitle,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUp}
      transition={defaultTransition}
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      <h2 className="font-display text-4xl font-black tracking-tight md:text-5xl lg:text-6xl">
        <span className="text-gradient">{title}</span>
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-2xl text-lg text-muted md:text-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
