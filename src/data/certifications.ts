export interface Certification {
  id: string;
  name: string;
  organization: string;
  dateEarned: string;
  verifyUrl: string;
  badgeLabel: string;
}

export const certifications: Certification[] = [
  {
    id: "aws-saa",
    name: "AWS Solutions Architect — Associate",
    organization: "Amazon Web Services",
    dateEarned: "[REPLACE: Date]",
    verifyUrl: "https://aws.amazon.com/verification",
    badgeLabel: "AWS",
  },
  {
    id: "gcp-pde",
    name: "Google Professional Data Engineer",
    organization: "Google Cloud",
    dateEarned: "[REPLACE: Date]",
    verifyUrl: "https://cloud.google.com/certification",
    badgeLabel: "GCP",
  },
  {
    id: "databricks",
    name: "Databricks Certified Spark Developer",
    organization: "Databricks",
    dateEarned: "[REPLACE: Date]",
    verifyUrl: "https://credentials.databricks.com",
    badgeLabel: "DB",
  },
  {
    id: "custom-cert",
    name: "[REPLACE: Certification Name]",
    organization: "[REPLACE: Issuing Organization]",
    dateEarned: "[REPLACE: Date]",
    verifyUrl: "https://example.com/verify",
    badgeLabel: "CERT",
  },
];
