import SkillCard from "./SkillCard";
import { portfolio } from "@/data/portfolio";
import { Code2, Server, Database, Wrench } from "lucide-react";

export default function SkillsSection() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {portfolio.skills.categories.map((cat) => (
        <SkillCard key={cat.title} category={cat} />
      ))}
    </div>
  );
}
