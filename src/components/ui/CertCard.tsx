"use client";

import { motion } from "framer-motion";
import type { Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

interface CertCardProps {
  cert: Certification;
  className?: string;
}

export function CertCard({ cert, className }: CertCardProps) {
  return (
    <motion.div
      className={cn("group h-56 w-72 shrink-0 perspective-[1000px]", className)}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm [backface-visibility:hidden]">
          <div>
            <h3 className="font-display text-lg font-semibold">{cert.name}</h3>
            <p className="mt-2 text-sm text-muted">{cert.organization}</p>
          </div>
          <p className="text-sm text-muted/80">{cert.dateEarned}</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-accent-blue/20 via-accent-purple/20 to-accent-magenta/20 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-accent font-display text-2xl font-bold text-white">
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
