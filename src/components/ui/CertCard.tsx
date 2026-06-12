"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Certification } from "@/data/certifications";
import { cn } from "@/lib/utils";

/** Udemy brand purple (https://www.udemy.com/) — vector reads at small sizes vs raster */
const UDEMY_PURPLE = "#A435F0";

/** Simple Icons–compatible Udemy mark, single path */
function UdemyIssuerGlyph({ className }: { className?: string }) {
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill={UDEMY_PURPLE}
        d="M12 0L5.81 3.573v3.574l6.189-3.574 6.191 3.574V3.573zM5.81 10.148v8.144c0 1.85.589 3.243 1.741 4.234S10.177 24 11.973 24s3.269-.482 4.448-1.474c1.179-.991 1.768-2.439 1.768-4.314v-8.064h-3.242v7.85c0 2.036-1.509 3.055-2.948 3.055-1.428 0-2.947-.991-2.947-3.027v-7.878z"
      />
    </svg>
  );
}

/** Linux Foundation–style navy for the geometric mark (https://www.linuxfoundation.org/) */
const LF_NAVY = "#003764";
function LinuxFoundationIssuerGlyph({
  className,
  variant = "card",
}: {
  className?: string;
  /** `card` = navy on light UI; `accent` = light cyan on flipped navy panel */
  variant?: "card" | "accent";
}) {
  const fill = variant === "accent" ? "#a5e4ff" : LF_NAVY;
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill={fill}
        d="M4.8 19.2h9.6V24H0V9.6h4.8v9.6zM0 0v7.2h4.8V4.822h14.4V19.2h-2.4V24H24V0H0z"
      />
    </svg>
  );
}

/** Anthropic mark (Simple Icons geometry) — dark on light card, light on flipped accent */
function AnthropicIssuerGlyph({
  className,
  variant = "card",
}: {
  className?: string;
  variant?: "card" | "accent";
}) {
  const fill = variant === "accent" ? "#f4f4f5" : "#141413";
  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path
        fill={fill}
        d="M17.3041 3.541h-3.6718l6.696 16.918H24Zm-10.6082 0L0 20.459h3.7442l1.3693-3.5527h7.0052l1.3693 3.5528h3.7442L10.5363 3.5409Zm-.3712 10.2232 2.2914-5.9456 2.2914 5.9456Z"
      />
    </svg>
  );
}

interface CertCardProps {
  cert: Certification;
  className?: string;
}

export function CertCard({ cert, className }: CertCardProps) {
  const featured = cert.featured === true;
  const issuerMark = Boolean(
    cert.issuerLogo ||
      cert.issuerBrand === "udemy" ||
      cert.issuerBrand === "linux-foundation" ||
      cert.issuerBrand === "anthropic"
  );
  const udemyIssuer = cert.issuerBrand === "udemy";
  const linuxFoundationIssuer = cert.issuerBrand === "linux-foundation";
  const anthropicIssuer = cert.issuerBrand === "anthropic";

  return (
    <motion.div
      className={cn(
        "group perspective-[1000px]",
        featured
          ? cn(
              "w-full max-w-md shrink-0 md:max-w-none",
              cert.badgeImage ? "h-80 sm:h-[22rem]" : "h-64"
            )
          : "h-56 w-full min-w-0",
        featured &&
          "rounded-leap border-2 border-ink shadow-leap-sm ring-0",
        className
      )}
      whileHover={{ y: -4 }}
    >
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] group-focus-within:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col justify-between rounded-leap border-2 border-ink bg-card p-6 [backface-visibility:hidden]">
          {featured && (
            <span className="w-fit rounded-full border-2 border-ink bg-accent px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide text-accent-on">
              Flagship credential
            </span>
          )}
          <div
            className={cn(
              "flex min-h-0 flex-1 gap-4",
              cert.badgeImage && featured
                ? "flex-col sm:flex-row sm:items-center"
                : issuerMark && !featured
                  ? "flex-row items-start"
                  : "flex-col"
            )}
          >
            <div className={cn("min-w-0 flex-1", featured && cert.badgeImage && "sm:pr-2")}>
              <h3 className="font-display text-lg font-semibold leading-snug">{cert.name}</h3>
              <p className="mt-2 text-sm text-muted">{cert.organization}</p>
            </div>
            {issuerMark && !featured && (
              <div
                className={cn(
                  "relative flex shrink-0 items-center justify-center overflow-hidden rounded-md border-2 p-1 shadow-leap-sm",
                  udemyIssuer
                    ? "h-11 w-11 border-[#A435F0]/40 bg-[#A435F0]/12"
                    : linuxFoundationIssuer
                      ? "h-11 w-11 border-[#0096d6]/40 bg-[#0096d6]/12"
                      : anthropicIssuer
                        ? "h-11 w-11 border-zinc-400/60 bg-zinc-100"
                        : "h-11 w-[7.25rem] border-ink bg-zinc-950 px-1.5 sm:w-[7.75rem]"
                )}
                aria-hidden
              >
                {udemyIssuer ? (
                  <UdemyIssuerGlyph className="h-7 w-7" />
                ) : linuxFoundationIssuer ? (
                  <LinuxFoundationIssuerGlyph className="h-7 w-7" />
                ) : anthropicIssuer ? (
                  <AnthropicIssuerGlyph className="h-7 w-7" />
                ) : (
                  <Image
                    src={cert.issuerLogo!}
                    alt=""
                    width={112}
                    height={36}
                    className="h-8 w-full max-h-8 object-contain object-center"
                  />
                )}
              </div>
            )}
            {cert.badgeImage && featured && (
              <div className="relative mx-auto shrink-0 sm:mx-0" style={{ width: 140, height: 160 }}>
                <Image
                  src={cert.badgeImage}
                  alt={cert.name}
                  fill
                  className="object-contain drop-shadow-[2px_2px_0_var(--ink)]"
                  sizes="140px"
                />
              </div>
            )}
          </div>
          <p className="text-sm text-muted/80">{cert.dateEarned}</p>
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-leap border-2 border-ink bg-accent/90 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {cert.badgeImage && featured ? (
            <div className="relative mb-4 h-36 w-[140px] shrink-0">
              <Image
                src={cert.badgeImage}
                alt={cert.name}
                fill
                className="object-contain"
                sizes="140px"
              />
            </div>
          ) : issuerMark && !featured ? (
            <div
              className={cn(
                "relative mb-3 flex shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 p-2 shadow-leap-sm",
                udemyIssuer
                  ? "h-16 w-16 border-white/35 bg-white/15"
                  : linuxFoundationIssuer
                    ? "h-16 w-16 border-white/35 bg-white/15"
                    : anthropicIssuer
                      ? "h-16 w-16 border-white/35 bg-white/15"
                      : "h-16 w-[8.75rem] border-accent-on/30 bg-zinc-950 sm:w-[9.25rem]"
              )}
            >
              {udemyIssuer ? (
                <UdemyIssuerGlyph className="h-10 w-10" />
              ) : linuxFoundationIssuer ? (
                <LinuxFoundationIssuerGlyph className="h-10 w-10" variant="accent" />
              ) : anthropicIssuer ? (
                <AnthropicIssuerGlyph className="h-10 w-10" variant="accent" />
              ) : (
                <Image
                  src={cert.issuerLogo!}
                  alt={cert.organization}
                  fill
                  className="object-contain object-center p-0.5"
                  sizes="(max-width: 640px) 140px, 148px"
                />
              )}
            </div>
          ) : (
            <div
              className={cn(
                "flex items-center justify-center rounded-full border-2 border-ink bg-card font-display font-bold text-ink shadow-leap-sm",
                featured ? "h-24 w-24 text-3xl" : "h-20 w-20 text-2xl"
              )}
            >
              {cert.badgeLabel}
            </div>
          )}
          <a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-bold text-accent-on underline decoration-2 underline-offset-4 hover:no-underline"
          >
            Verify Credential
          </a>
        </div>
      </div>
    </motion.div>
  );
}
