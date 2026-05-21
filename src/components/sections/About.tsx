"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { siteConfig } from "@/data/site";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  scrollViewport,
  defaultTransition,
} from "@/hooks/useScrollAnimation";

export function About() {
  const stats = [
    { value: siteConfig.stats.yearsExperience, label: "Years Experience", suffix: "+" },
    { value: siteConfig.stats.projectsCompleted, label: "Projects Completed", suffix: "+" },
    { value: siteConfig.stats.certifications, label: "Certifications Earned" },
    { value: siteConfig.stats.pipelinesBuilt, label: "Pipelines Built", suffix: "+" },
  ];

  return (
    <section id="about" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="About Me"
          subtitle="The story behind the code and the pipelines"
        />

        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideInLeft}
            transition={defaultTransition}
            className="space-y-6 text-lg leading-relaxed text-foreground/90"
          >
            <p>
              [REPLACE: Your personal story — who you are, what drives you, your
              journey into tech. Share what makes you unique as both a data
              engineer and frontend developer.]
            </p>
            <p>
              I sit at the intersection of data infrastructure and user
              experience — building pipelines that power insights and interfaces
              that make those insights accessible. From Kafka streams to React
              dashboards, I care about systems that are reliable, observable, and
              delightful to use.
            </p>
            <p>
              [REPLACE: Add a third paragraph about your goals, what you are
              looking for next, or what kind of problems excite you most.]
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideInRight}
            transition={defaultTransition}
            className="relative flex min-h-[320px] items-center justify-center"
          >
            <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm" />
            <motion.div
              className="absolute h-48 w-48 rounded-full glow-orb animate-pulse-glow"
              aria-hidden
            />
            <pre className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 font-mono text-xs leading-relaxed text-accent-blue/90 md:text-sm">
              <code>{`const engineer = {
  role: "Data + Frontend",
  stack: ["Spark", "React"],
  passion: "building things
    that scale & shine"
};

export default engineer;`}</code>
            </pre>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
          className="mt-20 grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12"
        >
          {stats.map((stat) => (
            <AnimatedCounter
              key={stat.label}
              value={stat.value}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
