"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECT_IDS_PAIRED_ROW, projects } from "@/data/projects";

export function Projects() {
  const pairSet = new Set<string>(PROJECT_IDS_PAIRED_ROW);
  const pairProjects = PROJECT_IDS_PAIRED_ROW.map((id) => projects.find((p) => p.id === id)).filter(
    (p): p is NonNullable<typeof p> => p != null
  );
  const portfolioProject = projects.find((p) => p.id === "portfolio");
  const leadProjects = projects.filter((p) => p.id !== "portfolio" && !pairSet.has(p.id));

  let animIndex = 0;

  return (
    <section id="projects" className="border-y-2 border-ink bg-surface px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Projects"
          subtitle="Production systems, AI pipelines, and cloud architecture — shipped for real users"
        />
        <div className="flex flex-col gap-12 md:gap-16">
          {leadProjects.map((project) => (
            <ProjectCard key={project.id} project={project} index={animIndex++} />
          ))}
          <div className="grid gap-12 md:gap-16 lg:grid-cols-2 lg:gap-8">
            {pairProjects.map((project) => (
              <ProjectCard key={project.id} project={project} index={animIndex++} compactLayout />
            ))}
          </div>
          {portfolioProject ? (
            <ProjectCard key={portfolioProject.id} project={portfolioProject} index={animIndex++} />
          ) : null}
        </div>
      </div>
    </section>
  );
}
