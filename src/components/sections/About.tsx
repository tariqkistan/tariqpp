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
    { value: siteConfig.stats.yearsExperience, label: "Years of Experience", suffix: "+" },
    { value: siteConfig.stats.projectsShipped, label: "Projects Shipped", suffix: "+" },
    { value: siteConfig.stats.certifications, label: "Certifications" },
    {
      value: siteConfig.stats.supportQueriesAutomated,
      label: "Support Queries Automated",
      suffix: "%",
    },
  ];

  return (
    <section id="about" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="About Me"
          subtitle="From robotics finals to production systems that move metrics"
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
              I&apos;m Tariq — a software engineer from Johannesburg who&apos;s been obsessed with
              figuring out how things connect since I was 12, when I built a robotics solution that
              took me from a classroom in South Africa to the World Robot Olympiad finals in Costa
              Rica. That curiosity never stopped.
            </p>
            <p>
              Today, I build full-stack applications, AI-driven automation systems, and
              cloud-native architectures that solve real business problems. At Perfect Laser
              Technologies, I&apos;ve architected CRMs that cut maintenance turnaround by 30%, built
              custom LLM systems that automated 60% of support queries, and shipped distributed
              inventory systems across multiple branches. I don&apos;t just write code — I ship
              solutions that move metrics.
            </p>
            <p>
              I learn fast, build faster, and I&apos;m always chasing the next problem worth solving.
              Whether it&apos;s a serverless fraud detection pipeline on AWS or a polished React
              dashboard, I care about the craft at every layer of the stack.
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
            <pre className="relative z-10 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 font-mono text-xs leading-relaxed text-accent/90 md:text-sm">
              <code>{`const tariq = {
  role: "Software Engineer",
  stack: ["React", "Python", "AWS"],
  focus: "AI, cloud, full-stack",
  based: "Johannesburg"
};

export default tariq;`}</code>
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
