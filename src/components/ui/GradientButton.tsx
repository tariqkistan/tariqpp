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
          "bg-gradient-accent text-[#0a0a0e] shadow-lg shadow-accent/25 hover:shadow-accent/35",
        variant === "secondary" &&
          "border border-accent/25 bg-white/[0.04] text-foreground backdrop-blur-sm hover:border-accent/45 hover:bg-accent/5",
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
