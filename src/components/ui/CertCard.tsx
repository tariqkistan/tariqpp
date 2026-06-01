"use client";

import { motion } from "framer-motion";
import type { Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

interface CertCardProps {
  cert: Certification;
  className?: string;
}

export function CertCard({ cert, className }: CertCardProps) {
  const featured = cert.featured === true;

  return (
    <motion.div
      className={cn(
        "group perspective-[1000px]",
        featured ? "h-64 w-full max-w-md shrink-0 md:max-w-none" : "h-56 w-72 shrink-0",
        featured &&
          "ring-2 ring-amber-400/40 shadow-[0_0_40px_-8px_rgba(251,191,36,0.35)] rounded-2xl",
        className
      )}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm [backface-visibility:hidden]">
          {featured && (
            <span className="w-fit rounded-full border border-amber-400/40 bg-amber-400/10 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-200/95">
              Flagship credential
            </span>
          )}
          <div className={featured ? "mt-1" : ""}>
            <h3 className="font-display text-lg font-semibold leading-snug">{cert.name}</h3>
            <p className="mt-2 text-sm text-muted">{cert.organization}</p>
          </div>
          <p className="text-sm text-muted/80">{cert.dateEarned}</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-amber-500/20 via-accent/15 to-accent-dim/25 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div
            className={cn(
              "flex items-center justify-center rounded-full bg-gradient-accent font-display font-bold text-[#0a0a0e]",
              featured ? "h-24 w-24 text-3xl" : "h-20 w-20 text-2xl"
            )}
          >
            {cert.badgeLabel}
          </div>
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-medium text-gradient underline-offset-4 hover:underline"
          >
            Verify Credential
          </a>
        </div>
      </div>
    </motion.div>
  );
}
