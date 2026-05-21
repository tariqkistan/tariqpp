"use client";

import { motion } from "framer-motion";
import { CertCard } from "@/components/ui/CertCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certifications } from "@/data/certifications";
import { staggerContainer, scrollViewport } from "@/hooks/useScrollAnimation";

export function Certifications() {
  return (
    <section id="certifications" className="px-6 py-24 md:px-8 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="Certifications"
          subtitle="Credentials you can verify — hover to flip"
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={scrollViewport}
          variants={staggerContainer}
          className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4"
        >
          {certifications.map((cert) => (
            <motion.div
              key={cert.id}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0 },
              }}
              className="snap-center"
            >
              <CertCard cert={cert} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
