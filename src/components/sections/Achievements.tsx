import { portfolio } from "@/data/portfolio";
import { Award } from "lucide-react";

export default function Achievements() {
    if (!portfolio.achievements || portfolio.achievements.length === 0) {
        return null;
    }

    return (
        <div className="py-4 px-4 sm:px-6 max-w-6xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[var(--text)]">
            Achievements
        </h3>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {portfolio.achievements.map((achievement, idx) => (
            <div
                key={idx}
                className="flex items-start gap-3 rounded-xl p-4 bg-[var(--surface)] border border-[var(--border)]"
            >
                <div className="h-8 w-8 rounded-lg grid place-items-center bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)] text-white flex-shrink-0 mt-0.5">
                <Award className="h-4 w-4" />
                </div>
                <p className="text-sm text-[var(--text)]/90">{achievement}</p>
            </div>
            ))}
        </div>
        </div>
    );
}
