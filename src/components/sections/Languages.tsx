import { portfolio } from "@/data/portfolio";
import { Languages as LanguagesIcon } from "lucide-react";
import SkillBar from "./Skills/SkillBar";
import type { SkillLevel } from "@/data/portfolio";

export default function Languages() {
    if (!portfolio.languages || portfolio.languages.length === 0) {
        return null;
    }

    return (
        <div className="py-4 px-4 sm:px-6 max-w-6xl mx-auto">
        <h3 className="text-xl font-semibold mb-6 text-text">
            Languages
        </h3>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.languages.map((lang) => (
            <div
                key={lang.name}
                className="rounded-xl p-4 bg-surface border border-border"
            >
                <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-lg grid place-items-center bg-primary text-on-primary flex-shrink-0">
                    <LanguagesIcon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                    <h4 className="font-semibold text-text text-sm">
                    {lang.name}
                    </h4>
                    <p className="text-xs text-muted font-mono">{lang.level}</p>
                </div>
                </div>

                <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                    <p className="text-xs text-text/80 font-mono">{lang.proficiency}%</p>
                    <SkillBar level={getSkillLevel(lang.proficiency)} />
                </div>
                </div>
            </div>
            ))}
        </div>
        </div>
    );
}

function getSkillLevel(value: number): SkillLevel {
    if (value >= 70) return "Comfortable";
    if (value >= 40) return "Familiar";
    return "Learning";
}
