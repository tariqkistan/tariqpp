export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  /** If omitted, the Live Demo button is hidden. Use a same-page hash (e.g. #hero) for this site. */
  demoUrl?: string;
  /** If omitted, the Source Code button is hidden. */
  repoUrl?: string;
  previewImage?: string;
  embedUrl?: string;
}

export const projects: Project[] = [
  {
    id: "smart-laser",
    title: "Smart Laser — Full-Stack Maintenance CRM",
    tagline: "End-to-end technician workflows",
    description:
      "Built a complete maintenance CRM for Perfect Laser Technologies that streamlined technician workflows end-to-end. Reduced maintenance turnaround time by 30% across the organization.",
    tags: ["React", "PostgreSQL", "Node.js", "REST APIs"],
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "ai-support",
    title: "AI Support Ecosystem — Custom LLM-Powered Support",
    tagline: "Automated technical support at scale",
    description:
      "Engineered an AI-driven support system using a custom LLM and NLP pipeline that automated 60% of technical support queries — dramatically cutting operational overhead and response times.",
    tags: ["Python", "Custom LLM", "NLP", "TensorFlow"],
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "aurora-detect",
    title: "Aurora Detect — Real-Time Fraud Detection System",
    tagline: "Serverless, event-driven transaction monitoring",
    description:
      "Serverless, event-driven architecture that monitors financial transactions in real-time. Uses AWS Lambda and Kinesis to flag fraudulent activity, with DynamoDB for high-throughput storage and SNS for instant fraud alerts.",
    tags: ["AWS Lambda", "Kinesis", "DynamoDB", "SNS", "Python"],
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "dashora",
    title: "Dashora — Multi-Site Analytics Dashboard",
    tagline: "WooCommerce + GA4 in one view",
    description:
      "Aggregation engine that fetches and normalizes metrics from multiple WooCommerce stores and Google Analytics v4 accounts. Secure API layer with API Gateway and Secrets Manager for multi-client credential management.",
    tags: ["AWS Lambda", "API Gateway", "Secrets Manager", "Google Analytics v4", "WooCommerce"],
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "inventory",
    title: "Distributed Inventory System — Multi-Branch Stock Sync",
    tagline: "Real-time stock across branches",
    description:
      "Real-time inventory synchronization system across multiple retail branches. Enhanced data integrity and supply chain transparency for a national laser equipment supplier.",
    tags: ["PHP", "PostgreSQL", "REST APIs", "Webhooks"],
    previewImage: "/projects/placeholder.svg",
  },
  {
    id: "portfolio",
    title: "This Portfolio — You're Looking At It",
    tagline: "Proof in the pixels",
    description:
      "Designed and built from scratch with Next.js, Framer Motion, and TypeScript. Because the portfolio itself should be proof of what I can do.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    demoUrl: "#hero",
    repoUrl: "https://github.com/tariqkistan/tariqpp",
    previewImage: "/projects/placeholder.svg",
  },
];
