"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface GradientButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  external?: boolean;
}

export function GradientButton({
  href,
  children,
  variant = "primary",
  className,
  external,
}: GradientButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition-all md:text-base";

  const content = (
    <motion.span
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        base,
        variant === "primary" &&
          "bg-gradient-accent text-white shadow-lg shadow-accent-purple/25 hover:shadow-accent-magenta/30",
        variant === "secondary" &&
          "border border-white/20 bg-white/5 text-foreground backdrop-blur-sm hover:border-white/40 hover:bg-white/10",
        className
      )}
    >
      {children}
    </motion.span>
  );

  if (
    external ||
    href.startsWith("http") ||
    href.endsWith(".pdf") ||
    href.startsWith("mailto:")
  ) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return <Link href={href}>{content}</Link>;
}
