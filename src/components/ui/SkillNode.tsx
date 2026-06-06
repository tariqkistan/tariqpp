"use client";

import type { SkillNode as SkillNodeType } from "@/data/skills";
import { categoryColors, skills, skillLinks } from "@/data/skills";
import { getTechIconSlug } from "@/lib/tech-icons";
import { TechIcon } from "@/components/ui/TechIcon";

interface SkillDetailPanelProps {
  node: SkillNodeType;
  onClose: () => void;
}

export function SkillDetailPanel({ node, onClose }: SkillDetailPanelProps) {
  const color = categoryColors[node.category];

  const relatedNames = skillLinks
    .filter((l) => l.source === node.id || l.target === node.id)
    .map((l) => (l.source === node.id ? l.target : l.source))
    .filter((id) => id !== node.id)
    .map((id) => skills.find((s) => s.id === id)?.name)
    .filter((name): name is string => Boolean(name));

  return (
    <div
      className="rounded-leap border-2 border-ink bg-card p-4 shadow-leap-sm md:p-5"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-leap border-2 border-ink bg-surface"
            style={{ boxShadow: `0 0 24px ${color}33` }}
          >
            <TechIcon name={node.id} slug={getTechIconSlug(node.id) ?? undefined} size={32} />
          </div>
          <div>
            <p className="font-display text-lg font-bold text-ink md:text-xl">
              {node.name}
            </p>
            <p className="mt-1 text-sm text-muted">{node.category}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full border-2 border-ink/20 px-3 py-1 text-xs text-muted transition-colors hover:border-ink hover:text-foreground"
          aria-label="Clear selection"
        >
          Clear
        </button>
      </div>
      <div className="mt-4">
        <div className="mb-1 flex justify-between text-xs text-muted">
          <span>Proficiency</span>
          <span>{node.proficiency}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-ink/10">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${node.proficiency}%`, background: color }}
          />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{node.years} years of experience</p>
      {relatedNames.length > 0 && (
        <p className="mt-3 border-t-2 border-ink/10 pt-3 text-xs leading-relaxed text-muted">
          <span className="font-bold uppercase tracking-wider text-ink/80">Often used with</span>
          <span className="mt-1 block font-medium text-foreground/90">{relatedNames.join(" · ")}</span>
        </p>
      )}
    </div>
  );
}
