"use client";

import { motion } from "framer-motion";
import { CertCard } from "@/components/ui/CertCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
import { staggerContainer, scrollViewport } from "@/hooks/useScrollAnimation";

/** Newest first for non-flagship list; undated (—) sorts last, then by title. */
function certificationRecencyRank(dateEarned: string): number {
  const s = dateEarned.trim();
  if (!s || s === "—" || s === "–" || s === "-") return Number.MIN_SAFE_INTEGER;

  const monthYear = /^([A-Za-z]{3})\s+(\d{4})$/.exec(s);
  if (monthYear) {
    const t = Date.parse(`${monthYear[1]} 15, ${monthYear[2]}`);
    return Number.isNaN(t) ? Number.MIN_SAFE_INTEGER : t;
  }
  if (/^\d{4}$/.test(s)) {
    const t = Date.parse(`${s}-07-01`);
    return Number.isNaN(t) ? Number.MIN_SAFE_INTEGER : t;
  }
  const parsed = Date.parse(s);
  return Number.isNaN(parsed) ? Number.MIN_SAFE_INTEGER : parsed;
}

export function Certifications() {
  const featured = certifications.filter((c) => c.featured);
  const rest = certifications
    .filter((c) => !c.featured)
    .sort((a, b) => {
      const diff = certificationRecencyRank(b.dateEarned) - certificationRecencyRank(a.dateEarned);
      if (diff !== 0) return diff;
      return a.name.localeCompare(b.name);
    });

  return (
    <section id="certifications" className="border-y-2 border-ink bg-background px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Certifications"
          subtitle="Credentials you can verify — flagship cloud badges plus courses &amp; professional certs"
        />

        {featured.length > 0 && (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={scrollViewport}
            variants={staggerContainer}
            className="mb-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          >
            {featured.map((cert) => (
              <motion.div
                key={cert.id}
                variants={{
                  hidden: { opacity: 0, y: 24 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <CertCard cert={cert} />
              </motion.div>
            ))}
          </motion.div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {rest.map((cert) => (
            <motion.div
              key={cert.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="min-w-0"
            >
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
