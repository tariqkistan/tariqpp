export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "exp-1",
    role: "[REPLACE: Senior Data Engineer]",
    company: "[REPLACE: Company Name]",
    dateRange: "2022 — Present",
    bullets: [
      "Designed and operated real-time streaming pipelines processing 2M+ events/day",
      "Reduced data warehouse costs by 35% through query optimization and partitioning",
      "Led migration from batch ETL to event-driven architecture with Kafka and Spark",
    ],
  },
  {
    id: "exp-2",
    role: "[REPLACE: Frontend Developer]",
    company: "[REPLACE: Company Name]",
    dateRange: "2020 — 2022",
    bullets: [
      "Built internal analytics dashboards used by 500+ stakeholders",
      "Shipped a shared component library adopted across 4 product teams",
      "Improved Core Web Vitals scores from 62 to 94 on key product pages",
    ],
  },
  {
    id: "exp-3",
    role: "[REPLACE: Data Analyst / Engineer]",
    company: "[REPLACE: Company Name]",
    dateRange: "2018 — 2020",
    bullets: [
      "Automated reporting pipelines saving 20+ hours per week",
      "Introduced dbt for transformation layer standardization",
      "Collaborated with product teams on A/B test analysis frameworks",
    ],
  },
];
