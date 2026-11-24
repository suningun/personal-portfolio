import Section from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";
import AboutTerminal from "./AboutTerminal";

export default function About() {
  return (
    <section id="about">
      <Section title="About Me" eyebrow="~/about">
        <div className="space-y-10">
          <AboutTerminal />
          <div className="grid gap-6 sm:grid-cols-2">
          
          {/* TEXT */}
          <div className="space-y-4 grid gap-4">
            <div className="max-w-3xl space-y-4">
            <p className="text-base md:text-lg text-text font-medium leading-relaxed">
              I&apos;m {portfolio.personal.name}, a Software Development student.
            </p>

            <p className="text-base md:text-lg text-muted leading-relaxed">
              I enjoy developing web applications and learning how software is designed from frontend interfaces to backend systems. Through coursework and personal projects, I&apos;ve been building my technical skills while gaining hands-on experience with modern development tools.
            </p>

            <p className="text-base md:text-lg text-muted leading-relaxed">
              Currently based in {portfolio.personal.location}, I&apos;m seeking a Full Stack Developer or Software Developer internship where I can apply what I&apos;ve learned, gain real-world experience, and continue growing as a developer alongside an experienced team.
            </p>
            </div>
          </div>

          {/* EXISTING mindset / value / focus / goal cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <AboutCard
              title="Interests"
              text="Full Stack Development and building useful web applications."
            />
            <AboutCard
              title="Approach"
              text="Learning through projects and writing clean, maintainable code."
            />
            <AboutCard
              title="Strengths"
              text="Problem-solving, adaptability, and attention to detail."
            />
            <AboutCard
              title="Goal"
              text="Gain industry experience and grow as a software developer."
            />
          </div>

          
        </div>
        </div>
      </Section>
    </section>
  );
}

function AboutCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="rounded-xl p-5 bg-surface border border-border transition-all duration-300 ease-out"
    >
      <p className="text-text font-semibold">{title}</p>
      <p className="mt-2 text-base md:text-lg text-muted leading-relaxed">{text}</p>
    </div>
  );
}
