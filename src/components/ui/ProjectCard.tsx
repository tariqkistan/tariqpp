"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Project } from "@/data/projects";
import { TechLabel } from "@/components/ui/TechIcon";
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
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-sm md:p-8"
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/25 via-accent-teal/15 to-accent-dim/20 p-[1px]">
          <div className="h-full w-full rounded-3xl bg-background" />
        </div>
      </div>

      <div className="relative grid gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-sm font-medium text-accent">{project.tagline}</p>
          <h3 className="mt-2 font-display text-2xl font-bold md:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 text-muted leading-relaxed">{project.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5"
              >
                <TechLabel name={tag} iconSize={16} className="text-xs text-foreground/80" />
              </span>
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
                  className="rounded-full bg-gradient-accent px-6 py-2.5 text-sm font-semibold text-[#0a0a0e] transition-opacity hover:opacity-90"
                >
                  {project.demoUrl.startsWith("#") ? "View on this site" : "Live Demo"}
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold transition-colors hover:border-white/40 hover:bg-white/5"
                >
                  Source Code
                </a>
              )}
            </div>
          )}
        </div>

        <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-white/5">
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
