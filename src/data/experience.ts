export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  dateRange: string;
  bullets: string[];
}

export const experience: ExperienceEntry[] = [
  {
    id: "perfect-laser",
    role: "Software Engineer",
    company: "Perfect Laser Technologies",
    dateRange: "January 2024 – Present · Johannesburg, South Africa",
    bullets: [
      'Architected "Smart Laser," a full-stack maintenance CRM (React + PostgreSQL) that reduced maintenance turnaround by 30%.',
      "Engineered an AI-driven support ecosystem with a custom LLM and NLP — automated 60% of support queries.",
      "Built a distributed inventory system in PHP syncing real-time stock across multiple branches.",
      "Implemented automated customer touchpoints via Meta API and webhooks, driving a 25% boost in user engagement.",
      "Optimized high-traffic e-commerce platforms by integrating courier APIs and SEO pipelines to scale digital revenue.",
    ],
  },
  {
    id: "tranquility",
    role: "Front-End Software Developer",
    company: "Tranquility Clinic",
    dateRange: "January 2023 – December 2023 · Johannesburg, South Africa",
    bullets: [
      "Designed and deployed responsive UI components for a digital health consultation platform, prioritizing accessibility and modern UX.",
      "Produced data-driven market research and technical visualizations for successful investor pitch decks.",
    ],
  },
];

export interface EducationEntry {
  id: string;
  degree: string;
  school: string;
  detail: string;
  /** Raster logo under /public (opaque backgrounds avoided when possible) */
  logo?: string;
  /** Built-in vector mark — no black box on the card */
  logoBrand?: "eduvos";
}

export const education: EducationEntry[] = [
  {
    id: "eduvos",
    degree: "BSc Computer Science",
    school: "Eduvos",
    detail: "",
    logoBrand: "eduvos",
  },
];

export interface AwardEntry {
  id: string;
  title: string;
  year: string;
  description: string;
  /** Optional photo under /public */
  image?: string;
  /** Alt text when `image` is set */
  imageAlt?: string;
}

export const awards: AwardEntry[] = [
  {
    id: "wro",
    title: "World Robot Olympiad — 1st Place South Africa, International Finalist",
    year: "2017",
    description:
      "At 16 years old, built a robotics solution addressing a real-world problem. Won 1st place at South African Nationals and represented South Africa at the World Robot Olympiad Finals in Costa Rica, competing against teams from 20+ countries.",
    image: "/awards/wro-international-stage.jpg",
    imageAlt:
      "International World Robot Olympiad stage with teams, national flags, and a WE ARE THE FUTURE headline on screen.",
  },
];
