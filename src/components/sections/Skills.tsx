"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechBrandIconTile } from "@/components/ui/TechIcon";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { getTechIconSlug } from "@/lib/tech-icons";
import {
  skills,
  skillCategories,
  categoryColors,
  isFlagshipSkill,
  type SkillCategory,
  type SkillNode,
} from "@/data/skills";
import { cn } from "@/lib/utils";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";

/** Initial batch of skill cards; "Load more" reveals the rest (all breakpoints). */
const SKILLS_VISIBLE_INITIAL = 6;
const SKILLS_VISIBLE_STEP = 6;

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | null>(null);
  const [visibleSkillsCount, setVisibleSkillsCount] = useState(SKILLS_VISIBLE_INITIAL);

  const visibleSkills = useMemo(
    () => (selectedCategory ? skills.filter((s) => s.category === selectedCategory) : skills),
    [selectedCategory]
  );

  const sortedSkills = useMemo(
    () => [...visibleSkills].sort((a, b) => b.proficiency - a.proficiency),
    [visibleSkills]
  );

  const featuredIds = useMemo(() => {
    const n = selectedCategory ? 1 : 3;
    return new Set(sortedSkills.slice(0, Math.min(n, sortedSkills.length)).map((s) => s.id));
  }, [sortedSkills, selectedCategory]);

  const stats = useMemo(() => {
    const flagship = skills.filter((s) => isFlagshipSkill(s)).length;
    const maxYears = Math.max(...skills.map((s) => s.years), 0);
    return {
      tools: skills.length,
      domains: skillCategories.length,
      flagship,
      maxYears,
    };
  }, []);

  useEffect(() => {
    setVisibleSkillsCount(SKILLS_VISIBLE_INITIAL);
  }, [selectedCategory]);

  const hiddenBeyondCap = (index: number) =>
    index >= visibleSkillsCount ? "hidden" : undefined;

  const loadMoreRemaining = Math.max(0, sortedSkills.length - visibleSkillsCount);
  const showLoadMore = loadMoreRemaining > 0;

  return (
    <section
      id="skills"
      className="relative overflow-hidden border-y-2 border-ink bg-background px-6 py-24 md:px-8 md:py-32"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.055] dark:opacity-[0.09]"
        aria-hidden
      >
        <div
          className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--ink) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
          }}
        />
        <div className="absolute -right-24 top-1/4 h-72 w-72 rounded-full border-2 border-dashed border-ink/30" />
        <div className="absolute -left-16 bottom-1/4 h-48 w-48 rounded-full border-2 border-dashed border-ink/25" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        <SectionHeading
          title="Skills & Tech Stack"
          subtitle="A recruiter-readable dossier: live counts, verified logos, and depth at a glance across your full stack."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUp}
          transition={defaultTransition}
          className="mb-8 rounded-leap border-2 border-ink bg-ink p-4 text-[var(--on-ink)] shadow-leap sm:p-5"
        >
          <div className="mb-3 flex items-center gap-2 border-b border-white/15 pb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs">
            <span className="flex gap-1.5" aria-hidden>
              <span className="h-2 w-2 rounded-full bg-[#ff5f57]" />
              <span className="h-2 w-2 rounded-full bg-[#febc2e]" />
              <span className="h-2 w-2 rounded-full bg-[#28c840]" />
            </span>
            <span className="truncate">~/tariq/stack-dossier — verified</span>
          </div>
          <p className="font-mono text-sm leading-relaxed sm:text-base">
            <span className="text-accent">$</span> cat inventory.json | jq &apos;.[] | select(.proficiency &gt;= 88)&apos; | wc -l
          </p>
          <p className="mt-2 font-mono text-xs text-white/75 sm:text-sm">
            <span className="mr-2 inline-block h-4 w-2 animate-pulse bg-accent align-middle" aria-hidden />
            → {stats.flagship} flagship tools · {stats.tools} total logged · {stats.maxYears}+ yrs on deepest skills
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={fadeUp}
          transition={{ ...defaultTransition, delay: 0.06 }}
          className="mb-10 grid grid-cols-3 gap-3 rounded-leap border-2 border-ink bg-card p-4 shadow-leap-sm sm:gap-4 sm:p-6"
        >
          <AnimatedCounter value={stats.tools} label="Tools in stack" size="compact" />
          <AnimatedCounter value={stats.domains} label="Domains" size="compact" />
          <AnimatedCounter value={stats.flagship} label="≥88% depth" size="compact" />
        </motion.div>

        <div
          className="mb-8 rounded-leap border-2 border-ink bg-surface p-2 shadow-leap-sm"
          role="group"
          aria-label="Filter skills by category"
        >
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCategory(null)}
              className={cn(
                "rounded-leap px-4 py-2 text-sm font-bold transition-all",
                !selectedCategory
                  ? "border-2 border-ink bg-card text-ink shadow-leap-sm"
                  : "border-2 border-transparent text-muted hover:border-ink/20 hover:text-foreground"
              )}
            >
              All
            </button>
            {skillCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
                className={cn(
                  "rounded-leap px-4 py-2 text-sm font-bold transition-all",
                  selectedCategory === cat
                    ? cn(
                        "border-2 border-ink shadow-leap-sm",
                        cat === "Languages & Frameworks"
                          ? "text-accent-on"
                          : "text-[#0a0a0e]"
                      )
                    : "border-2 border-transparent text-muted hover:border-ink/20 hover:text-foreground"
                )}
                style={
                  selectedCategory === cat ? { background: categoryColors[cat] } : undefined
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "columns-1 gap-x-4 [column-fill:_balance]",
            "sm:columns-2 lg:columns-2 xl:columns-3"
          )}
        >
          {sortedSkills.map((skill, index) => (
            <div
              key={skill.id}
              className={cn("mb-4 break-inside-avoid", hiddenBeyondCap(index))}
            >
              <SkillCard
                skill={skill}
                index={index}
                isFeatured={featuredIds.has(skill.id)}
                isFlagship={isFlagshipSkill(skill)}
              />
            </div>
          ))}
        </div>

        {showLoadMore && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() =>
                setVisibleSkillsCount((c) =>
                  Math.min(c + SKILLS_VISIBLE_STEP, sortedSkills.length)
                )
              }
              className="rounded-leap border-2 border-ink bg-accent px-8 py-3 font-display text-sm font-black uppercase tracking-wide text-accent-on shadow-leap-sm transition hover:bg-accent-dim hover:shadow-none"
            >
              Load more
              <span className="ml-2 font-mono text-xs font-bold normal-case text-ink/80">
                (+{Math.min(SKILLS_VISIBLE_STEP, loadMoreRemaining)} of {loadMoreRemaining})
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function SkillCard({
  skill,
  index,
  isFeatured,
  isFlagship,
}: {
  skill: SkillNode;
  index: number;
  isFeatured: boolean;
  isFlagship: boolean;
}) {
  const accent = categoryColors[skill.category];
  const slug = getTechIconSlug(skill.id);
  const tileSize = isFeatured || isFlagship ? 56 : 44;
  const showFeaturedRing = isFeatured && !isFlagship;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, delay: Math.min(index * 0.04, 0.4) }}
      className={cn(
        "group flex w-full flex-col rounded-leap border-2 border-ink bg-card text-left shadow-leap-sm",
        isFlagship && "border-amber-600/90 bg-gradient-to-br from-card via-card to-amber-500/[0.08]",
        showFeaturedRing && "ring-2 ring-accent ring-offset-2 ring-offset-background",
        isFlagship &&
          "ring-2 ring-amber-500 ring-offset-2 ring-offset-background shadow-[3px_3px_0_0_rgba(245,158,11,0.35)]"
      )}
    >
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          <TechBrandIconTile name={skill.id} slug={slug ?? undefined} size={tileSize} />
          <div className="min-w-0 flex-1">
            <p
              className={cn(
                "font-display font-black leading-tight text-ink",
                isFeatured || isFlagship ? "text-xl sm:text-2xl" : "text-base sm:text-lg"
              )}
            >
              {skill.name}
            </p>
            <div className="mt-1 flex flex-wrap items-center gap-2">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted">
                {skill.category}
              </p>
              {isFlagship && (
                <span className="rounded-full border border-amber-700/40 bg-amber-400/25 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-amber-950 dark:text-amber-100">
                  Flagship · ≥88%
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between gap-2 border-t-2 border-ink/10 pt-4">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
              Time in role
            </p>
            <p className="font-display text-lg font-black text-ink">{skill.years}+ yrs</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-muted">
              Proficiency
            </p>
            <p className="font-display text-2xl font-black tabular-nums text-ink sm:text-3xl">
              {skill.proficiency}
              <span className="text-lg text-muted sm:text-xl">%</span>
            </p>
          </div>
        </div>
        <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full border-2 border-ink/20 bg-surface">
          <div
            className="h-full rounded-full transition-all duration-500 group-hover:brightness-95"
            style={{ width: `${skill.proficiency}%`, background: accent }}
          />
        </div>
      </div>
    </motion.div>
  );
}
