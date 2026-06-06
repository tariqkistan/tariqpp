"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { TechBrandPill } from "@/components/ui/TechIcon";
import { fadeUp, scrollViewport, defaultTransition } from "@/hooks/useScrollAnimation";
interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const imageX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);

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

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-ink/70">{project.tagline}</p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-muted leading-relaxed">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
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
            <motion.div style={{ x: imageX }} className="h-full w-full">
              <Image
                src={project.previewImage}
                alt={`${project.title} preview`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ) : (
            <div className="flex h-full items-center justify-center mesh-bg">
              <span className="font-display text-lg text-muted">Preview</span>
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}
