import About from "@/components/sections/About";
import ContactSection from "@/components/sections/Contact";
import Experience from "@/components/sections/ExperienceEducation";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";

export default function Home() {
  return (
    <>  
      <Hero />
      <About />
      <Skills
      />
      <Projects />
      <Experience />
      <ContactSection />
    </>
  );
}
