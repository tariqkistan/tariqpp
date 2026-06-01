export interface Certification {
  id: string;
  name: string;
  organization: string;
  dateEarned: string;
  verifyUrl: string;
  badgeLabel: string;
  /** Shown larger with emphasis — use for flagship credentials */
  featured?: boolean;
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
  },
  {
    id: "aws-saa",
    name: "AWS Certified Solutions Architect — Associate",
    organization: "Amazon Web Services",
    dateEarned: "2025",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeLabel: "AWS",
    featured: true,
  },
  {
    id: "azure-de",
    name: "Data Engineering on Microsoft Azure",
    organization: "Microsoft",
    dateEarned: "—",
    verifyUrl: "https://learn.microsoft.com/credentials/",
    badgeLabel: "AZ",
  },
  {
    id: "udemy-js",
    name: "The Complete JavaScript Course 2025: From Zero to Expert",
    organization: "Udemy",
    dateEarned: "2025",
    verifyUrl: "https://www.udemy.com/",
    badgeLabel: "JS",
  },
  {
    id: "lf-node",
    name: "Certified Introduction to Node.js (LFW111)",
    organization: "The Linux Foundation",
    dateEarned: "—",
    verifyUrl: "https://training.linuxfoundation.org/",
    badgeLabel: "LF",
  },
  {
    id: "rest-php",
    name: "REST API Design & Management / APIs in PHP",
    organization: "Professional development",
    dateEarned: "—",
    verifyUrl: "https://www.coursera.org/",
    badgeLabel: "API",
  },
  {
    id: "restful-intro",
    name: "Introduction to RESTful APIs",
    organization: "Professional development",
    dateEarned: "—",
    verifyUrl: "https://www.coursera.org/",
    badgeLabel: "REST",
  },
];
