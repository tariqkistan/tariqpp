"use client";

import { motion } from "framer-motion";
import type { ExperienceEntry } from "@/data/experience";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface TimelineItemProps {
  entry: ExperienceEntry;
  index: number;
}

export function TimelineItem({ entry, index }: TimelineItemProps) {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, delay: index * 0.1 }}
      className={cn(
        "relative grid w-full gap-4 md:grid-cols-2 md:gap-8",
        isLeft ? "md:text-right" : "md:flex-row-reverse"
      )}
    >
      <div
        className={cn(
          "md:col-start-1",
          !isLeft && "md:col-start-2 md:row-start-1"
        )}
      >
        <div
          className={cn(
            "rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm",
            isLeft ? "md:ml-auto md:max-w-md" : "md:mr-auto md:max-w-md"
          )}
        >
          <p className="text-sm font-medium text-accent-blue">{entry.dateRange}</p>
          <h3 className="mt-2 font-display text-xl font-semibold">{entry.role}</h3>
          <p className="mt-1 text-muted">{entry.company}</p>
          <ul
            className={cn(
              "mt-4 space-y-2 text-sm text-foreground/90",
              isLeft ? "md:text-left" : "md:text-left"
            )}
          >
            {entry.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-2">
                <span className="text-gradient shrink-0">▹</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="hidden md:block" />
    </motion.div>
  );
}
