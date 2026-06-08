/** Brand marks for AI / search platforms (Simple Icons slugs). Shown on the project card. */
export interface FeaturedPlatform {
  label: string;
  iconSlug: string;
}

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
  /** Optional row of platform logos (e.g. AI engines the product targets). */
  featuredPlatforms?: FeaturedPlatform[];
}

/** Rendered side-by-side in one row (before the portfolio card). */
export const PROJECT_IDS_PAIRED_ROW = ["ai-support", "dashora"] as const;

export const projects: Project[] = [
  {
    id: "aelora",
    title: "Aelora",
    tagline: "AI Visibility Optimization Tool",
    description:
      "Aelora is a SaaS tool that analyzes website content and helps businesses improve their visibility on AI-driven search engines (Answer Engine Optimization or AEO).",
    tags: [
      "TypeScript",
      "Next.js",
      "Tailwind CSS",
      "Framer Motion",
      "Vercel",
      "AWS Lambda",
    ],
    demoUrl: "https://aelora-xi.vercel.app/",
    repoUrl: "https://github.com/tariqkistan/Aelora",
    previewImage: "/projects/aelora-preview.png",
    featuredPlatforms: [
      { label: "ChatGPT", iconSlug: "openai" },
      { label: "Perplexity", iconSlug: "perplexity" },
      { label: "Google AI Overviews", iconSlug: "google" },
      { label: "Claude", iconSlug: "anthropic" },
      { label: "Gemini", iconSlug: "googlegemini" },
    ],
  },
  {
    id: "quantra",
    title: "Quantra",
    tagline: "AI-Powered Shadow Portfolio Advisor",
    description:
      "Quantra is a modern fintech web application that allows users to manually track their investment portfolios, monitor performance against live market data, and receive AI-driven investment insights.",
    tags: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "AWS Lambda",
      "Node.js",
      "DynamoDB",
      "API Gateway",
      "Amazon Cognito",
      "Terraform",
      "Bloomberg API",
      "Yahoo Finance API",
      "AWS Bedrock",
    ],
    repoUrl: "https://github.com/tariqkistan/Quantra",
    previewImage: "/projects/quantra-preview.png",
  },
  {
    id: "auroradetect",
    title: "AuroraDetect",
    tagline: "Fraud Detection System",
    description:
      "AuroraDetect is a real-time fraud detection system that monitors financial transactions and identifies potentially fraudulent activities.",
    tags: ["Next.js", "TypeScript", "AWS Lambda", "Kinesis", "DynamoDB", "SNS"],
    demoUrl: "https://aurora-detect.vercel.app/",
    repoUrl: "https://github.com/tariqkistan/AuroraDetect",
    previewImage: "/projects/auroradetect-preview.png",
  },
  {
    id: "ai-support",
    title: "AI Support Ecosystem — Custom LLM-Powered Support",
    tagline: "Automated technical support at scale",
    description:
      "Engineered an AI-driven support system using a custom LLM and NLP pipeline that automated 60% of technical support queries — dramatically cutting operational overhead and response times.",
    tags: ["Python", "Custom LLM", "NLP", "TensorFlow"],
  },
  {
    id: "dashora",
    title: "Dashora — Multi-Site Analytics Dashboard",
    tagline: "WooCommerce + GA4 in one view",
    description:
      "Aggregation engine that fetches and normalizes metrics from multiple WooCommerce stores and Google Analytics v4 accounts. Secure API layer with API Gateway and Secrets Manager for multi-client credential management.",
    tags: ["AWS Lambda", "API Gateway", "Secrets Manager", "Google Analytics v4", "WooCommerce"],
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
  },
];
