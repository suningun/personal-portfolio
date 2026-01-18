import SkillBar from "./SkillBar";

export default function SkillRow({
  skill,
}: {
  skill: { label: string; value: number };
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <p className="text-[var(--text)]/90">{skill.label}</p>
        <p className="text-[var(--muted)]">{skill.value}%</p>
      </div>

      <SkillBar value={skill.value} />
    </div>
  );
}
