import dynamic from "next/dynamic";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Certifications } from "@/components/sections/Certifications";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

const Skills = dynamic(
  () => import("@/components/sections/Skills").then((m) => m.Skills),
  {
    ssr: false,
    loading: () => (
      <section id="skills" className="flex min-h-[400px] items-center justify-center px-6 py-24">
        <p className="text-muted">Loading skill galaxy...</p>
      </section>
    ),
  }
);

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
