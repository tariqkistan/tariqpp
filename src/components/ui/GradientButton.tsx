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
    "inline-flex items-center justify-center rounded-leap border-2 border-ink px-8 py-3 text-sm font-bold transition-all md:text-base";

  const content = (
    <motion.span
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        base,
        variant === "primary" &&
          "bg-ink text-[var(--on-ink)] shadow-[6px_6px_0_0_var(--shadow-edge)] hover:opacity-90 hover:shadow-[4px_4px_0_0_var(--shadow-edge)] hover:translate-x-0.5 hover:translate-y-0.5",
        variant === "secondary" &&
          "bg-accent text-accent-on shadow-leap-sm hover:bg-accent-dim hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5",
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
