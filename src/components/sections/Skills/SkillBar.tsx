import type { SkillLevel } from "@/data/portfolio";

export default function SkillBar({
  level,
  highlighted = false,
}: {
  level: SkillLevel;
  highlighted?: boolean;
}) {
  return (
    <span
      className={`inline-flex rounded-full border border-border px-3 py-1 text-sm font-mono transition-colors duration-200 hover:bg-primary hover:text-on-primary ${
        highlighted ? "bg-primary text-on-primary" : "bg-surface text-muted"
      }`}
    >
      {level}
    </span>
  );
}
