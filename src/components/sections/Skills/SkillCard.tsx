import SkillRow from "./SkillRow";
import { iconMap } from "@/lib/icon";

type Category = {
  title: string;
  icon: keyof typeof iconMap; // <-- IMPORTANT
  items: { label: string; value: number }[];
};

export default function SkillCard({ category }: { category: Category }) {
  const Icon = iconMap[category.icon] ?? iconMap.Code2;

  return (
    <div className="rounded-2xl p-6 bg-[var(--surface)] border border-[var(--border)]">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-2xl grid place-items-center bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)] text-white">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-[var(--text)]">
          {category.title}
        </h3>
      </div>

      <div className="space-y-5">
        {category.items.map((skill) => (
          <SkillRow key={skill.label} skill={skill} />
        ))}
      </div>
    </div>
  );
}
