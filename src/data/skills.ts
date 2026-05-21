export type SkillCategory =
  | "Data Engineering"
  | "Frontend"
  | "Cloud & DevOps"
  | "Databases";

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
  "Data Engineering",
  "Frontend",
  "Cloud & DevOps",
  "Databases",
];

export const categoryColors: Record<SkillCategory, string> = {
  "Data Engineering": "#3b82f6",
  Frontend: "#8b5cf6",
  "Cloud & DevOps": "#ec4899",
  Databases: "#06b6d4",
};

export const skills: SkillNode[] = [
  { id: "spark", name: "Spark", category: "Data Engineering", proficiency: 85, years: 4 },
  { id: "airflow", name: "Airflow", category: "Data Engineering", proficiency: 88, years: 3 },
  { id: "dbt", name: "dbt", category: "Data Engineering", proficiency: 82, years: 2 },
  { id: "kafka", name: "Kafka", category: "Data Engineering", proficiency: 80, years: 3 },
  { id: "sql", name: "SQL", category: "Data Engineering", proficiency: 92, years: 6 },
  { id: "snowflake", name: "Snowflake", category: "Data Engineering", proficiency: 86, years: 3 },
  { id: "bigquery", name: "BigQuery", category: "Data Engineering", proficiency: 84, years: 3 },
  { id: "python", name: "Python", category: "Data Engineering", proficiency: 90, years: 5 },
  { id: "react", name: "React", category: "Frontend", proficiency: 92, years: 5 },
  { id: "nextjs", name: "Next.js", category: "Frontend", proficiency: 90, years: 3 },
  { id: "typescript", name: "TypeScript", category: "Frontend", proficiency: 91, years: 4 },
  { id: "tailwind", name: "Tailwind", category: "Frontend", proficiency: 88, years: 3 },
  { id: "framer", name: "Framer Motion", category: "Frontend", proficiency: 85, years: 2 },
  { id: "aws", name: "AWS", category: "Cloud & DevOps", proficiency: 86, years: 4 },
  { id: "gcp", name: "GCP", category: "Cloud & DevOps", proficiency: 82, years: 3 },
  { id: "docker", name: "Docker", category: "Cloud & DevOps", proficiency: 84, years: 4 },
  { id: "k8s", name: "Kubernetes", category: "Cloud & DevOps", proficiency: 75, years: 2 },
  { id: "terraform", name: "Terraform", category: "Cloud & DevOps", proficiency: 78, years: 2 },
  { id: "cicd", name: "CI/CD", category: "Cloud & DevOps", proficiency: 85, years: 4 },
  { id: "postgres", name: "PostgreSQL", category: "Databases", proficiency: 90, years: 5 },
  { id: "mongo", name: "MongoDB", category: "Databases", proficiency: 80, years: 3 },
  { id: "redis", name: "Redis", category: "Databases", proficiency: 78, years: 2 },
  { id: "dynamo", name: "DynamoDB", category: "Databases", proficiency: 76, years: 2 },
];

export const skillLinks: SkillLink[] = [
  { source: "python", target: "spark" },
  { source: "python", target: "airflow" },
  { source: "spark", target: "kafka" },
  { source: "airflow", target: "dbt" },
  { source: "sql", target: "snowflake" },
  { source: "sql", target: "bigquery" },
  { source: "dbt", target: "snowflake" },
  { source: "react", target: "nextjs" },
  { source: "react", target: "typescript" },
  { source: "nextjs", target: "tailwind" },
  { source: "nextjs", target: "framer" },
  { source: "aws", target: "docker" },
  { source: "gcp", target: "docker" },
  { source: "docker", target: "k8s" },
  { source: "terraform", target: "aws" },
  { source: "cicd", target: "docker" },
  { source: "postgres", target: "sql" },
  { source: "mongo", target: "python" },
  { source: "redis", target: "postgres" },
  { source: "dynamo", target: "aws" },
];
