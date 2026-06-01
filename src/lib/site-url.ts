/**
 * Canonical site URL for metadata and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in Vercel for your final domain; otherwise VERCEL_URL is used on deploy previews/production.
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }

  return "http://localhost:3000";
}
