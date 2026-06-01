/** Simple Icons slugs — https://simpleicons.org */
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
  kinesis: "amazonkinesis",
  apigateway: "amazonapigateway",
  sns: "amazonaws",
  secretsmanager: "amazonaws",
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
  "secrets manager": "amazonaws",
  "google analytics v4": "googleanalytics",
  "custom llm": "openai",
  "node.js": "nodedotjs",
  "tailwind css": "tailwindcss",
  "ci/cd": "githubactions",
  "google cloud": "googlecloud",
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
  return `https://cdn.simpleicons.org/${slug}/${color.replace("#", "")}`;
}
