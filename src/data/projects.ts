export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  demoUrl: string;
  repoUrl: string;
  previewImage?: string;
  embedUrl?: string;
}

export const projects: Project[] = [
  {
    id: "pipeline-dashboard",
    title: "Real-Time Data Pipeline Dashboard",
    tagline: "Streaming pipeline visualization in real-time",
    description:
      "End-to-end streaming pipeline with Kafka and Spark, visualized in real-time. Monitors throughput, lag, and error rates across distributed workers with interactive D3 charts.",
    tags: ["Kafka", "Spark", "Python", "React", "D3.js"],
    demoUrl: "https://example.com/pipeline-dashboard",
    repoUrl: "https://github.com/[REPLACE: username]/pipeline-dashboard",
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "etl-monitor",
    title: "ETL Orchestration Monitor",
    tagline: "Live Airflow DAG status tracking",
    description:
      "Airflow DAG monitoring dashboard with live status tracking. Surfaces task failures, retry patterns, and SLA breaches with drill-down views per DAG run.",
    tags: ["Airflow", "Python", "PostgreSQL", "Next.js"],
    demoUrl: "https://example.com/etl-monitor",
    repoUrl: "https://github.com/[REPLACE: username]/etl-monitor",
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "data-explorer",
    title: "Interactive Data Explorer",
    tagline: "Drag-and-drop SQL with instant charts",
    description:
      "Drag-and-drop SQL query builder with instant chart generation. Connects to warehouses, suggests optimizations, and exports visualizations as PNG or SVG.",
    tags: ["SQL", "React", "TypeScript", "Recharts"],
    demoUrl: "https://example.com/data-explorer",
    repoUrl: "https://github.com/[REPLACE: username]/data-explorer",
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "design-system",
    title: "Component Library / Design System",
    tagline: "Production-ready UI with Storybook",
    description:
      "Production-ready UI component library with Storybook docs. Accessible primitives, theming tokens, and composable patterns used across multiple product teams.",
    tags: ["React", "TypeScript", "Tailwind", "Storybook"],
    demoUrl: "https://example.com/design-system",
    repoUrl: "https://github.com/[REPLACE: username]/design-system",
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    tagline: "This site — built with love",
    description:
      "This site! Built with Next.js, Framer Motion, and D3. Features an interactive skill galaxy, scroll animations, and a bold dark aesthetic.",
    tags: ["Next.js", "TypeScript", "Tailwind", "Framer Motion"],
    demoUrl: "#hero",
    repoUrl: "https://github.com/[REPLACE: username]/portfolio",
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "custom",
    title: "[REPLACE: Your Project Title]",
    tagline: "[REPLACE: Short tagline]",
    description:
      "[REPLACE: 2-3 sentences describing what the project does and why it matters]",
    tags: ["[REPLACE: Tech]", "Tag 2"],
    demoUrl: "https://example.com",
    repoUrl: "https://github.com/[REPLACE: username]/project",
    previewImage: "/projects/placeholder.svg",
  },
];
