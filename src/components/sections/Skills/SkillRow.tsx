import type { SkillLevel } from "@/data/portfolio";
import SkillBar from "./SkillBar";

export default function SkillRow({
  skill,
  highlighted,
}: {
  skill: { label: string; level: SkillLevel };
  highlighted: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-3 text-sm">
        <p className="text-text/90">{skill.label}</p>
        <SkillBar level={skill.level} highlighted={highlighted} />
      </div>
    </div>
  );
}
