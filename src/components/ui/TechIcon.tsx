"use client";

import Image from "next/image";
import { getTechIconSlug, getTechIconUrl } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface TechIconProps {
  /** Skill id or technology name (e.g. "react", "Next.js") */
  name: string;
  size?: number;
  className?: string;
  /** Override slug when not in the map */
  slug?: string;
}

export function TechIcon({ name, size = 20, className, slug: slugProp }: TechIconProps) {
  const slug = slugProp ?? getTechIconSlug(name);

  if (!slug) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md bg-white/10 font-display text-[10px] font-bold uppercase text-muted",
          className
        )}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <Image
      src={getTechIconUrl(slug)}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      unoptimized
      aria-hidden
    />
  );
}

interface TechLabelProps {
  name: string;
  slug?: string;
  iconSize?: number;
  className?: string;
  /** Highlight style when selected */
  active?: boolean;
}

export function TechLabel({
  name,
  slug,
  iconSize = 18,
  className,
  active,
}: TechLabelProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2",
        active ? "text-white" : "text-foreground/90",
        className
      )}
    >
      <TechIcon name={name} slug={slug} size={iconSize} />
      <span className="text-sm font-medium leading-none">{name}</span>
    </span>
  );
}
