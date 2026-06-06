"use client";

import Image from "next/image";
import {
  contrastOnBrand,
  getTechBrandHex,
  getTechIconSlug,
  getTechIconUrl,
  isLegacySimpleIconSlug,
} from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

interface TechIconProps {
  /** Skill id or technology name (e.g. "react", "Next.js") */
  name: string;
  size?: number;
  className?: string;
  /** Override slug when not in the map */
  slug?: string;
  /**
   * Icon fill for Simple Icons CDN (`/slug/{hex}`). Ignored for legacy jsDelivr SVGs unless
   * `legacyMonochromeInvert` is used.
   */
  iconTintHex?: string;
  /** Legacy SVGs are black; invert to read as white on dark brand backgrounds. */
  legacyMonochromeInvert?: boolean;
}

export function TechIcon({
  name,
  size = 20,
  className,
  slug: slugProp,
  iconTintHex,
  legacyMonochromeInvert,
}: TechIconProps) {
  const slug = slugProp ?? getTechIconSlug(name);

  if (!slug) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-md border border-ink/20 bg-surface font-display text-[10px] font-bold uppercase text-muted",
          className
        )}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    );
  }

  const legacy = isLegacySimpleIconSlug(slug);
  const src = legacy ? getTechIconUrl(slug) : getTechIconUrl(slug, iconTintHex ?? "FFFFFF");

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn("shrink-0", legacy && legacyMonochromeInvert && "brightness-0 invert", className)}
      unoptimized
      aria-hidden
    />
  );
}

/** Square tile with official brand color + contrasting logo (skills grid, etc.). */
export function TechBrandIconTile({
  name,
  slug: slugProp,
  size = 48,
  className,
}: {
  name: string;
  slug?: string;
  size?: number;
  className?: string;
}) {
  const slug = slugProp ?? getTechIconSlug(name);
  const brandHex = slug ? getTechBrandHex(slug) : null;

  if (!slug || !brandHex) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-leap border-2 border-ink bg-surface font-display text-lg font-black text-ink",
          className
        )}
        style={{ width: size, height: size }}
        aria-hidden
      >
        {name.charAt(0)}
      </span>
    );
  }

  const { iconHex } = contrastOnBrand(brandHex);
  const legacy = isLegacySimpleIconSlug(slug);
  const iconPx = Math.max(20, Math.round(size * 0.48));

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-leap border-2 border-ink shadow-leap-sm",
        className
      )}
      style={{ width: size, height: size, backgroundColor: `#${brandHex}` }}
      aria-hidden
    >
      <TechIcon
        name={name}
        slug={slug}
        size={iconPx}
        iconTintHex={legacy ? undefined : iconHex}
        legacyMonochromeInvert={legacy && iconHex === "FFFFFF"}
      />
    </span>
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
        active ? "text-ink" : "text-foreground/90",
        className
      )}
    >
      <TechIcon name={name} slug={slug} size={iconSize} />
      <span className="text-sm font-medium leading-none">{name}</span>
    </span>
  );
}

/** Solid Simple Icons brand chip with tinted logo + title (project tags). */
export function TechBrandPill({ name }: { name: string }) {
  const slug = getTechIconSlug(name);
  const brandHex = slug ? getTechBrandHex(slug) : null;

  if (!slug || !brandHex) {
    return (
      <span className="inline-flex items-center rounded-full border border-ink/20 bg-surface px-3 py-1.5">
        <TechLabel name={name} slug={slug ?? undefined} iconSize={16} className="text-xs text-foreground/80" />
      </span>
    );
  }

  const { iconHex, darkText } = contrastOnBrand(brandHex);
  const legacy = isLegacySimpleIconSlug(slug);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border-2 border-ink/25 px-3 py-1.5 shadow-[2px_2px_0_0_rgba(0,0,0,0.15)] dark:border-ink/30 dark:shadow-[2px_2px_0_0_rgba(255,255,255,0.12)]",
        darkText ? "text-ink" : "text-white"
      )}
      style={{ backgroundColor: `#${brandHex}` }}
    >
      <TechIcon
        name={name}
        slug={slug}
        size={16}
        iconTintHex={legacy ? undefined : iconHex}
        legacyMonochromeInvert={legacy && iconHex === "FFFFFF"}
      />
      <span className="text-xs font-bold leading-none">{name}</span>
    </span>
  );
}
