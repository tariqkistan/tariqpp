"use client";

import type { SkillNode as SkillNodeType, SkillCategory } from "@/data/skills";
import { categoryColors } from "@/data/skills";
import { getTechIconSlug, getTechIconUrl } from "@/lib/tech-icons";
import { TechIcon, TechLabel } from "@/components/ui/TechIcon";
import { cn } from "@/lib/utils";

export interface SimNode extends SkillNodeType {
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

const NODE_BOX = 36;

export function getNodeRadius(): number {
  return NODE_BOX / 2;
}

/** Minimum 44px touch target (radius 22) */
export function getHitRadius(): number {
  return 28;
}

interface SkillDetailPanelProps {
  node: SkillNodeType;
  onClose: () => void;
}

export function SkillDetailPanel({ node, onClose }: SkillDetailPanelProps) {
  const color = categoryColors[node.category];

  return (
    <div
      className="rounded-xl border border-white/15 bg-black/80 p-4 backdrop-blur-md md:p-5"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-4">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5"
            style={{ boxShadow: `0 0 24px ${color}33` }}
          >
            <TechIcon name={node.id} slug={getTechIconSlug(node.id) ?? undefined} size={32} />
          </div>
          <div>
            <p className="font-display text-lg font-semibold text-white md:text-xl">
              {node.name}
            </p>
            <p className="mt-1 text-sm text-muted">{node.category}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-full border border-white/15 px-3 py-1 text-xs text-muted transition-colors hover:border-white/30 hover:text-foreground"
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
        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${node.proficiency}%`, background: color }}
          />
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">{node.years} years of experience</p>
    </div>
  );
}

interface SkillChipProps {
  id: string;
  name: string;
  category: SkillCategory;
  isSelected: boolean;
  onClick: () => void;
}

export function SkillChip({ id, name, category, isSelected, onClick }: SkillChipProps) {
  const color = categoryColors[category];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-2 transition-all",
        isSelected
          ? "border-transparent text-white shadow-md"
          : "border-white/10 bg-white/5 text-muted hover:border-white/25 hover:text-foreground"
      )}
      style={isSelected ? { background: color } : undefined}
      aria-pressed={isSelected}
    >
      <TechLabel name={name} slug={getTechIconSlug(id) ?? undefined} iconSize={18} active={isSelected} />
    </button>
  );
}

interface GraphSkillNodeProps {
  node: SimNode;
  isActive: boolean;
  isHighlighted: boolean;
}

export function GraphSkillNode({ node, isActive, isHighlighted }: GraphSkillNodeProps) {
  const slug = getTechIconSlug(node.id);
  const half = NODE_BOX / 2;
  const color = categoryColors[node.category];
  const iconUrl = slug ? getTechIconUrl(slug) : null;

  return (
    <g opacity={isHighlighted ? 1 : 0.15}>
      <rect
        x={-half}
        y={-half}
        width={NODE_BOX}
        height={NODE_BOX}
        rx={8}
        fill={color}
        fillOpacity={isActive ? 0.45 : 0.2}
        stroke={isActive ? color : "rgba(255,255,255,0.15)"}
        strokeWidth={isActive ? 2 : 1}
        filter={isActive ? "url(#glow)" : undefined}
        style={isActive ? { transform: "scale(1.08)" } : undefined}
      />
      {iconUrl ? (
        <image
          href={iconUrl}
          x={-12}
          y={-12}
          width={24}
          height={24}
          preserveAspectRatio="xMidYMid meet"
        />
      ) : (
        <text
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-white text-[11px] font-bold"
        >
          {node.name.charAt(0)}
        </text>
      )}
      <text
        y={half + 13}
        textAnchor="middle"
        className={cn(
          "fill-white font-medium",
          isActive ? "text-[10px] font-semibold" : "text-[8px] opacity-60"
        )}
      >
        {node.name}
      </text>
    </g>
  );
}
