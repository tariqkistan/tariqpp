"use client";

import { motion } from "framer-motion";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { siteConfig } from "@/data/site";
import {
  slideInLeft,
  slideInRight,
  staggerContainer,
  scrollViewport,
  defaultTransition,
  fadeUp,
} from "@/hooks/useScrollAnimation";

function Highlight({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "yellow" | "green" | "blue" | "ink";
}) {
  const styles = {
    yellow:
      "underline decoration-accent decoration-[3px] underline-offset-[5px] decoration-skip-ink-none",
    green:
      "underline decoration-emerald-500 decoration-[3px] underline-offset-[5px] text-emerald-800",
    blue: "underline decoration-sky-500 decoration-[3px] underline-offset-[5px] text-sky-900",
    ink: "font-black text-ink",
  } as const;

  return <span className={styles[color]}>{children}</span>;
}

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
    <section id="about" className="border-y-2 border-ink bg-surface px-6 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Statement header — Leapcell-style scale + yellow underline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUp}
          transition={defaultTransition}
          className="relative mb-16 md:mb-24"
        >
          <span
            className="pointer-events-none absolute -left-1 -top-6 select-none font-serif text-[clamp(5rem,18vw,11rem)] font-black leading-none text-accent/35 md:-left-4 md:-top-10"
            aria-hidden
          >
            &ldquo;
          </span>
          <span
            className="pointer-events-none absolute -bottom-8 right-0 select-none font-serif text-[clamp(4rem,14vw,9rem)] font-black leading-none text-accent/25 md:-bottom-12"
            aria-hidden
          >
            &rdquo;
          </span>

          <div className="relative z-10 max-w-5xl">
            <div className="mb-6 inline-flex h-14 w-14 items-center justify-center border-2 border-ink bg-accent font-display text-lg font-black text-accent-on shadow-leap-sm md:h-16 md:w-16 md:text-xl">
              TM
            </div>
            <h2 className="font-display text-[clamp(2.25rem,6vw,4.25rem)] font-black leading-[1.05] tracking-tight text-ink md:leading-[1.02]">
              I turn ideas into software that{" "}
              <Highlight color="yellow">ships in production</Highlight>
              {" — "}not slides.
            </h2>
            <p className="mt-8 max-w-3xl text-xl font-medium leading-relaxed text-muted md:text-2xl md:leading-relaxed">
              From robotics finals to{" "}
              <Highlight color="green">real metrics</Highlight> at work: CRMs, LLM pipelines, and
              cloud systems people actually use.
            </p>
          </div>
        </motion.div>

        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideInLeft}
            transition={defaultTransition}
            className="space-y-10"
          >
            <p className="text-2xl font-bold leading-snug text-ink md:text-3xl md:leading-tight">
              I&apos;m Tariq — a software engineer from{" "}
              <Highlight color="blue">Johannesburg</Highlight> obsessed with how things connect. At
              16, a <Highlight color="green">robotics</Highlight> build took me from a classroom in
              South Africa to the <Highlight color="ink">World Robot Olympiad</Highlight> finals in
              Costa Rica. That curiosity never stopped.
            </p>
            <p className="text-xl leading-relaxed text-ink/90 md:text-2xl md:leading-relaxed">
              Today I build <Highlight color="yellow">full-stack</Highlight> apps,{" "}
              <Highlight color="green">AI automation</Highlight>, and{" "}
              <Highlight color="blue">cloud-native</Highlight> architectures. At Perfect Laser
              Technologies: CRMs that cut maintenance turnaround by{" "}
              <span className="relative inline-block px-1.5 font-black">
                <span
                  className="pointer-events-none absolute inset-[-4px] -rotate-6 rounded-full border-2 border-dashed border-red-500"
                  aria-hidden
                />
                30%
              </span>
              , LLM systems handling{" "}
              <Highlight color="yellow">60%</Highlight> of support load, and inventory across
              branches — I don&apos;t just write code, I ship outcomes.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={slideInRight}
            transition={defaultTransition}
            className="relative hidden min-h-[280px] items-center justify-center lg:flex lg:min-h-[360px]"
          >
            <div className="absolute inset-0 rounded-leap border-2 border-ink bg-card shadow-leap" />
            <motion.div
              className="absolute h-40 w-40 rounded-full bg-accent/30 blur-3xl md:h-56 md:w-56"
              aria-hidden
            />
            <pre className="relative z-10 max-w-full overflow-x-auto rounded-leap border-2 border-zinc-600 bg-black p-6 font-mono text-[11px] leading-relaxed text-zinc-200 shadow-leap-sm sm:text-sm md:p-8 md:text-base md:leading-relaxed">
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
          className="mt-20 grid grid-cols-2 gap-8 border-t-2 border-ink/10 pt-16 md:grid-cols-4 md:gap-12 md:pt-20"
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
