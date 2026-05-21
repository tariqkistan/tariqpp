"use client";

import { motion } from "framer-motion";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";
import { scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";

export function Experience() {
  return (
    <section id="experience" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title="Experience"
          subtitle="Where I have built, shipped, and scaled"
          align="center"
        />

        <div className="relative">
          <motion.svg
            className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
            width="2"
            height="100%"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={scrollViewport}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <motion.line
              x1="1"
              y1="0"
              x2="1"
              y2="100%"
              stroke="url(#timelineGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={scrollViewport}
              transition={{ duration: 1.5 }}
            />
            <defs>
              <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#ec4899" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-accent-blue via-accent-purple to-accent-magenta md:block"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={scrollViewport}
            transition={defaultTransition}
            style={{ transformOrigin: "top" }}
            aria-hidden
          />

          <div className="relative space-y-12 md:space-y-16">
            {experience.map((entry, index) => (
              <div key={entry.id} className="relative">
                <div
                  className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent-purple bg-background md:block"
                  aria-hidden
                />
                <TimelineItem entry={entry} index={index} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
