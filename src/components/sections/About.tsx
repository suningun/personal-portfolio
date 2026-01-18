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
              I’m {portfolio.personal.name}, a {portfolio.personal.role}
            </p>

            <p className="text-[var(--muted)] leading-relaxed">
              I enjoy building clean, fast, and user-focused web applications.
              I care deeply about design details, performance, and writing
              maintainable code that actually scales.
            </p>

            <p className="text-[var(--muted)] leading-relaxed">
              Currently based in {portfolio.personal.location}, I’m focused on
              improving my skills in modern frontend technologies while
              exploring backend systems and real-world product development.
            </p>
            </div>
            {/* 👉 STATS (NEW — inserted here) */}
          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard
              icon={<Code2 />}
              value="1+"
              title="Years"
              subtitle="Coding Experience"
            />
            <StatCard
              icon={<Sparkles />}
              value="2+"
              title="Projects"
              subtitle="Completed"
            />
            <StatCard
              icon={<Zap />}
              value="Fast"
              title="Learner"
              subtitle="Always Adapting"
            />
          </div>
          </div>

          {/* EXISTING mindset / value / focus / goal cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <AboutCard
              title="Focus"
              text="Frontend engineering, UI design, and performance-driven development."
            />
            <AboutCard
              title="Mindset"
              text="Always learning, experimenting, and improving through practice."
            />
            <AboutCard
              title="Values"
              text="Clean code, clarity, consistency, and attention to detail."
            />
            <AboutCard
              title="Goal"
              text="Build meaningful products and grow into a strong full-stack developer."
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
