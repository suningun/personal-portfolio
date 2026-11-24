import SkillRow from "./SkillRow";
import { iconMap } from "@/lib/icon";
import type { SkillLevel } from "@/data/portfolio";

type Category = {
  title: string;
  icon: keyof typeof iconMap; // <-- IMPORTANT
  items: { label: string; level: SkillLevel }[];
};

export default function SkillCard({
  category,
  activeIndex,
  startIndex,
}: {
  category: Category;
  activeIndex: number;
  startIndex: number;
}) {
  const Icon = iconMap[category.icon] ?? iconMap.Code2;

  return (
    <div className="rounded-xl p-6 bg-surface border border-border">
      <div className="flex items-center gap-4 mb-6">
        <div className="h-14 w-14 rounded-2xl grid place-items-center bg-primary text-on-primary">
          <Icon className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-semibold text-text">
          {category.title}
        </h3>
      </div>

      <div className="space-y-5">
        {category.items.map((skill, index) => (
          <SkillRow
            key={skill.label}
            skill={skill}
            highlighted={activeIndex === startIndex + index}
          />
        ))}
      </div>
    </div>
  );
}
