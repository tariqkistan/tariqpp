"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { TimelineItem } from "@/components/ui/TimelineItem";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { EduvosEducationMark } from "@/components/ui/EduvosEducationMark";
import { experience, education, awards } from "@/data/experience";
import { scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";

export function Experience() {
  return (
    <section id="experience" className="border-y-2 border-ink bg-surface px-6 py-24 md:px-8 md:py-32">
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
                <stop offset="0%" stopColor="var(--foreground)" />
                <stop offset="50%" stopColor="var(--muted)" />
                <stop offset="100%" stopColor="var(--foreground)" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.div
            className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-ink via-muted to-ink md:block"
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
                  className="absolute left-1/2 top-8 hidden h-4 w-4 -translate-x-1/2 rounded-full border-2 border-ink bg-accent md:block"
                  aria-hidden
                />
                <TimelineItem entry={entry} index={index} />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={defaultTransition}
          className="mt-24"
        >
          <h3 className="text-center font-display text-2xl font-bold md:text-3xl">Education</h3>
          <ul className="mt-8 space-y-6">
            {education.map((item) => (
              <li
                key={item.id}
                className="flex flex-col items-center gap-5 rounded-leap border-2 border-ink bg-card p-6 text-center shadow-leap-sm md:flex-row md:items-center md:gap-8 md:text-left"
              >
                {item.logoBrand === "eduvos" ? (
                  <EduvosEducationMark className="shrink-0" />
                ) : item.logo ? (
                  <div className="shrink-0">
                    <Image
                      src={item.logo}
                      alt={`${item.school} logo`}
                      width={520}
                      height={192}
                      className="h-auto max-h-16 w-auto max-w-[min(100%,240px)] object-contain object-center md:max-h-[4.5rem] md:max-w-[280px]"
                      sizes="(max-width: 768px) 240px, 280px"
                    />
                  </div>
                ) : null}
                <div className="min-w-0 flex-1">
                  <p className="font-display text-lg font-semibold">{item.degree}</p>
                  <p className="mt-1 text-muted">{item.school}</p>
                  {item.detail ? <p className="mt-2 text-sm text-muted/90">{item.detail}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ ...defaultTransition, delay: 0.08 }}
          className="mt-20"
        >
          <h3 className="text-center font-display text-2xl font-bold md:text-3xl">
            Awards &amp; Recognition
          </h3>
          <ul className="mt-8 space-y-6">
            {awards.map((award) => (
              <li
                key={award.id}
                className="overflow-hidden rounded-leap border-2 border-ink bg-card shadow-leap-sm md:p-8"
              >
                <div
                  className={
                    award.image
                      ? "flex flex-col gap-5 p-6 md:flex-row md:items-stretch md:gap-8 md:p-8"
                      : "p-6 md:p-8"
                  }
                >
                  {award.image ? (
                    <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-leap border-2 border-ink bg-muted md:aspect-[4/3] md:w-[min(100%,420px)]">
                      <Image
                        src={award.image}
                        alt={award.imageAlt ?? award.title}
                        fill
                        className="object-cover object-center"
                        sizes="(max-width: 768px) 100vw, 420px"
                      />
                    </div>
                  ) : null}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-accent">{award.year}</p>
                    <p className="mt-2 font-display text-lg font-semibold md:text-xl">{award.title}</p>
                    <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
                      {award.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
