import { portfolio } from "@/data/portfolio";
import Reveal from "@/components/ui/Reveal";
import HeroOrbit from "./HeroOrbit";

export default function Hero() {
  return (
    <section
      id="home"
      className="py-20 md:py-28 flex items-center max-w-6xl mx-auto px-6 bg-bg relative z-0"
    >
      <Reveal>
        <div className="grid items-center gap-12 md:grid-cols-[1.1fr_1fr] w-full">
        <div className="text-center md:text-left">
          <p className="font-mono text-sm text-green mb-4">❯ whoami</p>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-text">
            Hi, I&apos;m {portfolio.personal.name}.
          </h1>
          <p className="mt-4 text-4xl md:text-5xl font-semibold text-primary">
            {portfolio.personal.role}
          </p>
          <p className="mt-6 text-base md:text-lg text-muted max-w-xl leading-relaxed mx-auto md:mx-0">
            {portfolio.personal.summary}
          </p>
          <p className="mt-5 font-mono text-sm text-green">
            ● Open to internships
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start items-center gap-3">
            <a
              href="#projects"
              className="font-mono rounded-full h-12 px-6 inline-flex items-center bg-primary text-on-primary"
            >
              View projects
            </a>
            <a
              href="#contact"
              className="font-mono rounded-full h-12 px-6 inline-flex items-center border border-border text-text hover:border-primary"
            >
              Contact
            </a>
            <a
              href="/cv.pdf"
              download
              className="font-mono text-lavender hover:text-primary px-2"
            >
              Download CV ↓
            </a>
          </div>
        </div>

        <div className="order-first md:order-none">
          <HeroOrbit />
        </div>
      </div>
      </Reveal>
    </section>
  );
}
