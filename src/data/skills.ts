export type SkillCategory =
  | "Languages & Frameworks"
  | "AI & Data"
  | "Cloud & DevOps"
  | "Databases"
  | "Tools & Platforms";

export interface SkillNode {
  id: string;
  name: string;
  category: SkillCategory;
  proficiency: number;
  years: number;
}

export interface SkillLink {
  source: string;
  target: string;
}

export const skillCategories: SkillCategory[] = [
  "Languages & Frameworks",
  "AI & Data",
  "Cloud & DevOps",
  "Databases",
  "Tools & Platforms",
];

export const categoryColors: Record<SkillCategory, string> = {
  "Languages & Frameworks": "#0f4d92",
  "AI & Data": "#38bdf8",
  "Cloud & DevOps": "#60a5fa",
  Databases: "#fb923c",
  "Tools & Platforms": "#a3e635",
};

export const skills: SkillNode[] = [
  { id: "python", name: "Python", category: "Languages & Frameworks", proficiency: 90, years: 3 },
  { id: "php", name: "PHP", category: "Languages & Frameworks", proficiency: 88, years: 3 },
  { id: "nodejs", name: "Node.js", category: "Languages & Frameworks", proficiency: 88, years: 3 },
  { id: "javascript", name: "JavaScript", category: "Languages & Frameworks", proficiency: 92, years: 3 },
  { id: "typescript", name: "TypeScript", category: "Languages & Frameworks", proficiency: 90, years: 2 },
  { id: "react", name: "React", category: "Languages & Frameworks", proficiency: 92, years: 3 },
  { id: "nextjs", name: "Next.js", category: "Languages & Frameworks", proficiency: 90, years: 2 },
  { id: "vue", name: "Vue", category: "Languages & Frameworks", proficiency: 82, years: 2 },
  { id: "django", name: "Django", category: "Languages & Frameworks", proficiency: 85, years: 2 },
  { id: "tailwind", name: "Tailwind CSS", category: "Languages & Frameworks", proficiency: 90, years: 2 },

  { id: "llm", name: "Custom LLM Integration", category: "AI & Data", proficiency: 86, years: 2 },
  { id: "nlp", name: "NLP", category: "AI & Data", proficiency: 84, years: 2 },
  { id: "tensorflow", name: "TensorFlow", category: "AI & Data", proficiency: 80, years: 2 },
  { id: "ga4", name: "Google Analytics v4", category: "AI & Data", proficiency: 85, years: 2 },
  { id: "looker", name: "Looker Studio", category: "AI & Data", proficiency: 82, years: 2 },

  { id: "lambda", name: "AWS Lambda", category: "Cloud & DevOps", proficiency: 88, years: 2 },
  { id: "kinesis", name: "AWS Kinesis", category: "Cloud & DevOps", proficiency: 82, years: 2 },
  { id: "apigateway", name: "Amazon API Gateway", category: "Cloud & DevOps", proficiency: 86, years: 2 },
  { id: "sns", name: "AWS SNS", category: "Cloud & DevOps", proficiency: 84, years: 2 },
  { id: "secretsmanager", name: "AWS Secrets Manager", category: "Cloud & DevOps", proficiency: 85, years: 2 },
  { id: "azure", name: "Azure", category: "Cloud & DevOps", proficiency: 80, years: 2 },
  { id: "firebase", name: "Google Firebase", category: "Cloud & DevOps", proficiency: 82, years: 2 },
  { id: "restapis", name: "REST APIs", category: "Cloud & DevOps", proficiency: 92, years: 3 },
  { id: "webhooks", name: "Webhooks", category: "Cloud & DevOps", proficiency: 88, years: 3 },

  { id: "postgres", name: "PostgreSQL", category: "Databases", proficiency: 90, years: 3 },
  { id: "dynamodb", name: "DynamoDB", category: "Databases", proficiency: 86, years: 2 },
  { id: "mongo", name: "MongoDB", category: "Databases", proficiency: 78, years: 2 },

  { id: "git", name: "Git", category: "Tools & Platforms", proficiency: 90, years: 3 },
  { id: "metaapi", name: "Meta API", category: "Tools & Platforms", proficiency: 85, years: 2 },
  { id: "woocommerce", name: "WooCommerce", category: "Tools & Platforms", proficiency: 88, years: 3 },
  { id: "wordpress", name: "WordPress", category: "Tools & Platforms", proficiency: 86, years: 3 },
  { id: "seo", name: "SEO Pipelines", category: "Tools & Platforms", proficiency: 82, years: 2 },
  { id: "courier", name: "Courier API Integrations", category: "Tools & Platforms", proficiency: 84, years: 2 },
];

export const skillLinks: SkillLink[] = [
  { source: "python", target: "django" },
  { source: "python", target: "tensorflow" },
  { source: "python", target: "llm" },
  { source: "python", target: "nlp" },
  { source: "python", target: "lambda" },
  { source: "tensorflow", target: "nlp" },
  { source: "llm", target: "nlp" },
  { source: "ga4", target: "looker" },
  { source: "javascript", target: "typescript" },
  { source: "typescript", target: "react" },
  { source: "typescript", target: "nodejs" },
  { source: "react", target: "nextjs" },
  { source: "nextjs", target: "tailwind" },
  { source: "vue", target: "javascript" },
  { source: "django", target: "postgres" },
  { source: "php", target: "wordpress" },
  { source: "wordpress", target: "woocommerce" },
  { source: "nodejs", target: "restapis" },
  { source: "restapis", target: "webhooks" },
  { source: "lambda", target: "kinesis" },
  { source: "lambda", target: "sns" },
  { source: "lambda", target: "dynamodb" },
  { source: "apigateway", target: "secretsmanager" },
  { source: "apigateway", target: "lambda" },
  { source: "firebase", target: "react" },
  { source: "postgres", target: "mongo" },
  { source: "dynamodb", target: "lambda" },
  { source: "git", target: "nodejs" },
  { source: "metaapi", target: "webhooks" },
  { source: "woocommerce", target: "courier" },
  { source: "seo", target: "wordpress" },
];
