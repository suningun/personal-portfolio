import Section from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";
import { Code2, Sparkles, Zap } from "lucide-react";
import type { ReactNode } from "react";

export default function About() {
  return (
    <section id="about">
      <Section title="About Me">
        <div className="space-y-10 grid gap-6 sm:grid-cols-2">
          
          {/* TEXT */}
          <div className="space-y-4 grid gap-4">
            <div className="max-w-3xl space-y-4">
            <p className="text-[var(--text)] text-lg font-medium">
              I'm {portfolio.personal.name}, a Software Development student.
            </p>

            <p className="text-[var(--muted)] leading-relaxed">
              I enjoy developing web applications and learning how software is designed from frontend interfaces to backend systems. Through coursework and personal projects, I've been building my technical skills while gaining hands-on experience with modern development tools.
            </p>

            <p className="text-[var(--muted)] leading-relaxed">
              Currently based in {portfolio.personal.location}, I'm seeking a Full Stack Developer or Software Developer internship where I can apply what I've learned, gain real-world experience, and continue growing as a developer alongside an experienced team.
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
      </Section>
    </section>
  );
}

function StatCard({
  icon,
  value,
  title,
  subtitle,
}: {
  icon: ReactNode;
  value: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div
      className="
        group rounded-xl p-5 text-center
        bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
        border border-[var(--border)]

      "
    >
      <div
        className="
          mx-auto mb-3 h-12 w-12 rounded-xl
          grid place-items-center
          bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)]
          text-white
          shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_25%,transparent)]
        "
      >
        {icon}
      </div>

      <p className="text-l font-semibold text-[var(--text)]"><span>{value} {title}</span></p>
      <p className="text-xs text-[var(--muted)] mt-1">{subtitle}</p>
    </div>
  );
}

function AboutCard({ title, text }: { title: string; text: string }) {
  return (
    <div
      className="
        rounded-xl p-5
        bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
        border border-[var(--border)]
        transition-all duration-300 ease-out
      "
    >
      <p className="text-[var(--text)] font-semibold">{title}</p>
      <p className="mt-2 text-[var(--muted)] leading-relaxed">{text}</p>
    </div>
  );
}
