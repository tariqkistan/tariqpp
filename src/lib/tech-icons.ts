/** Simple Icons slugs — https://simpleicons.org */
const SLUG_BY_KEY: Record<string, string> = {
  // Skill ids
  spark: "apachespark",
  airflow: "apacheairflow",
  dbt: "getdbt",
  kafka: "apachekafka",
  sql: "postgresql",
  snowflake: "snowflake",
  bigquery: "googlebigquery",
  python: "python",
  react: "react",
  nextjs: "nextdotjs",
  typescript: "typescript",
  tailwind: "tailwindcss",
  framer: "framer",
  aws: "amazonaws",
  gcp: "googlecloud",
  docker: "docker",
  k8s: "kubernetes",
  terraform: "terraform",
  cicd: "githubactions",
  postgres: "postgresql",
  mongo: "mongodb",
  redis: "redis",
  dynamo: "amazondynamodb",

  // Tag / label aliases (normalized keys)
  "next.js": "nextdotjs",
  "d3.js": "d3",
  "framer motion": "framer",
  postgresql: "postgresql",
  dynamodb: "amazondynamodb",
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
