import { Code2, GraduationCap, Sparkles } from "lucide-react";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import AboutTerminal from "./AboutTerminal";

const interests = [
  { title: "Building web apps", icon: Code2, tone: "text-primary bg-primary/10" },
  { title: "AI for good", icon: Sparkles, tone: "text-green bg-green/10" },
  {
    title: "Teaching code",
    icon: GraduationCap,
    tone: "text-lavender bg-lavender/10",
  },
];

export default function About() {
  return (
    <section id="about" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <Card className="p-6 md:p-12">
            <SectionHeader command="cat about.md" title="About me" />
            <AboutTerminal />

            <p className="mb-5 mt-10 font-mono text-lg text-muted">
              things I&apos;m into
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              {interests.map(({ title, icon: Icon, tone }) => (
                <Card
                  key={title}
                  className="flex items-center gap-5 p-5 md:p-6"
                >
                  <span className={`grid h-16 w-16 shrink-0 place-items-center rounded-2xl ${tone}`}>
                    <Icon className="h-8 w-8" />
                  </span>
                  <h3 className="text-xl font-medium text-text">{title}</h3>
                </Card>
              ))}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}
