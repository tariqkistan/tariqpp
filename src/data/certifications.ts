export interface Certification {
  id: string;
  name: string;
  organization: string;
  dateEarned: string;
  verifyUrl: string;
  badgeLabel: string;
  /** Shown larger with emphasis — use for flagship credentials */
  featured?: boolean;
  /** Optional badge image path under /public (e.g. /certifications/aws-dva.png) */
  badgeImage?: string;
  /** Small mark on compact cards — path under /public */
  issuerLogo?: string;
  /** Renders vector issuer mark; use instead of issuerLogo where supported */
  issuerBrand?: "udemy" | "linux-foundation" | "anthropic";
}

export const certifications: Certification[] = [
  {
    id: "aws-dva",
    name: "AWS Certified Developer — Associate (DVA-C02)",
    organization: "Amazon Web Services",
    dateEarned: "2025",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeLabel: "AWS",
    featured: true,
    badgeImage: "/certifications/aws-developer-associate.png",
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect — Associate",
    organization: "Amazon Web Services",
    dateEarned: "2025",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeLabel: "AWS",
    featured: true,
    badgeImage: "/certifications/aws-solutions-architect-associate.png",
  },
  {
    id: "azure-de",
    name: "Microsoft Certified: Azure Data Engineer Associate",
    organization: "Microsoft",
    dateEarned: "—",
    verifyUrl: "https://learn.microsoft.com/credentials/",
    badgeLabel: "AZ",
    featured: true,
    badgeImage: "/certifications/azure-data-engineer-associate.png",
  },
  /* Non-featured: display order is newest-first (see Certifications.tsx sort) */
  {
    id: "anthropic-ai-fluency",
    name: "Certificate of Completion: AI Fluency for Small Businesses",
    organization: "Anthropic",
    dateEarned: "Jun 2026",
    verifyUrl: "https://www.anthropic.com/",
    badgeLabel: "A",
    issuerBrand: "anthropic",
  },
  {
    id: "anthropic-subagents",
    name: "Certificate of Completion: Introduction to subagents",
    organization: "Anthropic",
    dateEarned: "Jun 2026",
    verifyUrl: "https://www.anthropic.com/",
    badgeLabel: "A",
    issuerBrand: "anthropic",
  },
  {
    id: "udemy-js",
    name: "The Complete JavaScript Course 2025: From Zero to Expert",
    organization: "Udemy",
    dateEarned: "2025",
    verifyUrl: "https://www.udemy.com/",
    badgeLabel: "JS",
    issuerBrand: "udemy",
  },
  {
    id: "lf-node",
    name: "Certified Introduction to Node.js (LFW111)",
    organization: "The Linux Foundation",
    dateEarned: "—",
    verifyUrl: "https://training.linuxfoundation.org/",
    badgeLabel: "LF",
    issuerBrand: "linux-foundation",
  },
  {
    id: "rest-php",
    name: "REST API Design & Management / APIs in PHP",
    organization: "Professional development",
    dateEarned: "—",
    verifyUrl: "https://www.coursera.org/",
    badgeLabel: "API",
    issuerBrand: "udemy",
  },
  {
    id: "restful-intro",
    name: "Introduction to RESTful APIs",
    organization: "Professional development",
    dateEarned: "—",
    verifyUrl: "https://www.coursera.org/",
    badgeLabel: "REST",
    issuerBrand: "udemy",
  },
];
