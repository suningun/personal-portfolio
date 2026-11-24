import SkillsInteractive from "./SkillsInteractive";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <SectionHeader command="ls skills/" title="What I work with" />
        <SkillsInteractive />
      </div>
    </section>
  );
}
