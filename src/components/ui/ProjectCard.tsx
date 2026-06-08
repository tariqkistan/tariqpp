"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { TechBrandPill, TechIcon } from "@/components/ui/TechIcon";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface ProjectCardProps {
  project: Project;
  index: number;
  /** Single-column body + preview (for cards shown in a narrow half-width column). */
  compactLayout?: boolean;
}

export function ProjectCard({ project, index, compactLayout }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

  const showPreviewColumn = !!(project.embedUrl || project.previewImage);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    mouseX.set(x);
  };

  const handleMouseLeave = () => mouseX.set(0);

  return (
    <motion.article
      ref={cardRef}
      initial="hidden"
      whileInView="visible"
      viewport={scrollViewport}
      variants={fadeUp}
      transition={{ ...defaultTransition, delay: index * 0.08 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-leap border-2 border-ink bg-card p-6 shadow-leap-sm transition-shadow hover:shadow-leap md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 rounded-leap opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-leap bg-accent/15 p-[2px]">
          <div className="h-full w-full rounded-leap bg-background" />
        </div>
      </div>

      <div
        className={cn(
          "relative grid gap-8 lg:gap-12",
          showPreviewColumn && !compactLayout && "lg:grid-cols-2"
        )}
      >
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink/70">{project.tagline}</p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-muted leading-relaxed">{project.description}</p>
          {project.featuredPlatforms && project.featuredPlatforms.length > 0 && (
            <div className="mt-6">
              <p className="text-xs font-bold uppercase tracking-wider text-ink/70">
                Flagship AI platforms
              </p>
              <ul className="mt-3 flex flex-wrap items-center gap-2" role="list">
                {project.featuredPlatforms.map((p) => (
                  <li key={p.label} aria-label={p.label}>
                    <span
                      title={p.label}
                      className="inline-flex h-12 w-12 items-center justify-center rounded-leap border-2 border-ink bg-white shadow-leap-sm dark:border-ink/40 dark:bg-zinc-100"
                    >
                      <TechIcon name={p.label} slug={p.iconSlug} size={24} iconTintHex="0F172A" />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="mt-6 flex flex-wrap gap-2">
            {(project.tags ?? []).map((tag) => (
              <TechBrandPill key={tag} name={tag} />
            ))}
          </div>
          {(project.demoUrl || project.repoUrl) && (
            <div className="mt-8 flex flex-wrap gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  {...(project.demoUrl.startsWith("#")
                    ? {}
                    : { target: "_blank", rel: "noopener noreferrer" })}
                className="rounded-full bg-ink px-6 py-2.5 text-sm font-bold text-[var(--on-ink)] shadow-leap-sm transition hover:opacity-90 hover:shadow-none"
                >
                  {project.demoUrl.startsWith("#") ? "View on this site" : "Live Demo"}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-2 border-ink bg-accent px-6 py-2.5 text-sm font-bold text-accent-on shadow-leap-sm transition hover:bg-accent-dim hover:shadow-none"
                >
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>

        {showPreviewColumn ? (
        <div className="relative aspect-video overflow-hidden rounded-leap border-2 border-ink bg-surface">
          {project.embedUrl ? (
            <iframe
              src={project.embedUrl}
              title={`${project.title} demo`}
              loading="lazy"
              className="h-full w-full"
              sandbox="allow-scripts allow-same-origin"
            />
          ) : project.previewImage ? (
            <motion.div style={{ x: imageX }} className="relative h-full w-full">
              {project.previewImage.toLowerCase().endsWith(".svg") ? (
                // Local SVGs: Next/Image optimizer often returns null; use native img.
                <img
                  src={project.previewImage}
                  alt={`${project.title} preview`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              ) : (
                <Image
                  src={project.previewImage}
                  alt={`${project.title} preview`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={
                    compactLayout
                      ? "(max-width: 1024px) 100vw, 40vw"
                      : "(max-width: 768px) 100vw, 50vw"
                  }
                />
              )}
            </motion.div>
          ) : null}
        </div>
        ) : null}
      </div>
    </motion.article>
  );
}
