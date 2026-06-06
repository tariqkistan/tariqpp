/** Simple Icons slugs — https://simpleicons.org */
/**
 * Pinned npm release for icons removed from cdn.simpleicons.org (AWS v15+, Azure ~v13+).
 * v12.4.0 still ships both AWS product SVGs and microsoftazure.svg.
 */
export const LEGACY_SIMPLE_ICONS_VERSION = "12.4.0";

/** Slugs that load from pinned jsDelivr (missing on live Simple Icons CDN). */
const LEGACY_JSDELIVR_SLUGS = new Set([
  "awslambda",
  "amazonapigateway",
  "amazondynamodb",
  "amazonwebservices",
  "awssecretsmanager",
  "microsoftazure",
]);

export function isLegacySimpleIconSlug(slug: string): boolean {
  return LEGACY_JSDELIVR_SLUGS.has(slug);
}

const SLUG_BY_KEY: Record<string, string> = {
  // Skill ids
  python: "python",
  php: "php",
  nodejs: "nodedotjs",
  javascript: "javascript",
  typescript: "typescript",
  react: "react",
  nextjs: "nextdotjs",
  vue: "vuedotjs",
  django: "django",
  tailwind: "tailwindcss",
  llm: "openai",
  nlp: "python",
  tensorflow: "tensorflow",
  ga4: "googleanalytics",
  looker: "looker",
  lambda: "awslambda",
  /** No Kinesis file in Simple Icons; use AWS mark for the graph + tags. */
  kinesis: "amazonwebservices",
  apigateway: "amazonapigateway",
  sns: "amazonwebservices",
  secretsmanager: "awssecretsmanager",
  azure: "microsoftazure",
  firebase: "firebase",
  restapis: "swagger",
  webhooks: "webhook",
  postgres: "postgresql",
  dynamodb: "amazondynamodb",
  mongo: "mongodb",
  git: "git",
  metaapi: "meta",
  woocommerce: "woocommerce",
  wordpress: "wordpress",
  seo: "googlesearchconsole",

  // Tag / label aliases (normalized keys)
  "next.js": "nextdotjs",
  "d3.js": "d3",
  "framer motion": "framer",
  postgresql: "postgresql",
  "aws lambda": "awslambda",
  "api gateway": "amazonapigateway",
  "secrets manager": "awssecretsmanager",
  "aws secrets manager": "awssecretsmanager",
  "google analytics v4": "googleanalytics",
  "custom llm": "openai",
  "node.js": "nodedotjs",
  "tailwind css": "tailwindcss",
  "ci/cd": "githubactions",
  "google cloud": "googlecloud",
  "microsoft azure": "microsoftazure",
  recharts: "recharts",
  storybook: "storybook",
};

function normalizeKey(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getTechIconSlug(idOrName: string): string | null {
  const key = normalizeKey(idOrName);
  if (SLUG_BY_KEY[key]) return SLUG_BY_KEY[key];

  const compact = key.replace(/[^a-z0-9]/g, "");
  if (SLUG_BY_KEY[compact]) return SLUG_BY_KEY[compact];

  return null;
}

export function getTechIconUrl(slug: string, color = "white"): string {
  if (isLegacySimpleIconSlug(slug)) {
    return `https://cdn.jsdelivr.net/npm/simple-icons@${LEGACY_SIMPLE_ICONS_VERSION}/icons/${slug}.svg`;
  }
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}

/**
 * Official Simple Icons brand hex (no #) for solid tech pills.
 * @see https://simpleicons.org
 */
export const TECH_BRAND_HEX: Record<string, string> = {
  react: "61DAFB",
  nextdotjs: "000000",
  typescript: "3178C6",
  tailwindcss: "06B6D4",
  framer: "0055FF",
  python: "3776AB",
  php: "777BB4",
  postgresql: "4169E1",
  nodedotjs: "339933",
  swagger: "85EA2D",
  openai: "412991",
  tensorflow: "FF6F00",
  awslambda: "FF9900",
  amazonwebservices: "232F3E",
  amazondynamodb: "4053D6",
  amazonapigateway: "FF4F8B",
  awssecretsmanager: "DD344C",
  googlecloud: "4285F4",
  googleanalytics: "E37400",
  woocommerce: "96588A",
  webhook: "C73A63",
  django: "092E20",
  vuedotjs: "4FC08D",
  mongodb: "47A248",
  firebase: "DD2C00",
  git: "F05032",
  meta: "0668E1",
  wordpress: "21759B",
  googlesearchconsole: "458CF5",
  recharts: "FF6384",
  storybook: "FF4785",
  d3: "F9A03C",
  githubactions: "2088FF",
  microsoftazure: "0078D4",
  looker: "4285F4",
};

export function getTechBrandHex(slug: string): string | null {
  return TECH_BRAND_HEX[slug] ?? null;
}

function srgbChannelToLinear(c: number): number {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
}

/** Relative luminance 0–1 (sRGB). */
export function brandBackgroundLuminance(hexNoHash: string): number {
  const h = hexNoHash.replace(/#/g, "").slice(0, 6);
  if (h.length !== 6) return 0;
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const R = srgbChannelToLinear(r);
  const G = srgbChannelToLinear(g);
  const B = srgbChannelToLinear(b);
  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

/** Pick icon + text contrast for a solid brand background. */
export function contrastOnBrand(hexNoHash: string): { iconHex: string; darkText: boolean } {
  const L = brandBackgroundLuminance(hexNoHash);
  if (L > 0.55) return { iconHex: "000000", darkText: true };
  return { iconHex: "FFFFFF", darkText: false };
}
