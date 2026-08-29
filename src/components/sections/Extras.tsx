import { portfolio } from "@/data/portfolio";
import { BookOpen, Heart, Lightbulb } from "lucide-react";

export default function Extras() {
    const hasCertifications =
        portfolio.extras?.certifications &&
        portfolio.extras.certifications.length > 0;
    const hasVolunteering =
        portfolio.extras?.volunteering && portfolio.extras.volunteering.length > 0;
    const hasInterests =
        portfolio.extras?.interests && portfolio.extras.interests.length > 0;

    if (!hasCertifications && !hasVolunteering && !hasInterests) {
        return null;
    }

    const sections = [
        {
        title: "Certifications",
        icon: BookOpen,
        items: portfolio.extras?.certifications,
        show: hasCertifications,
        },
        {
        title: "Volunteering",
        icon: Heart,
        items: portfolio.extras?.volunteering,
        show: hasVolunteering,
        },
        {
        title: "Interests",
        icon: Lightbulb,
        items: portfolio.extras?.interests,
        show: hasInterests,
        },
    ];

    return (
        <div className="py-4 px-4 sm:px-6 max-w-6xl mx-auto">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[var(--text)]">
            Extras
        </h3>
        <div className="grid gap-6 md:grid-cols-3">
            {sections.map(
            (section) =>
                section.show && (
                <div
                    key={section.title}
                    className="rounded-xl p-4 bg-[var(--surface)] border border-[var(--border)]"
                >
                    <div className="flex items-center gap-3 mb-4">
                    <div className="h-8 w-8 rounded-lg grid place-items-center bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)] text-white flex-shrink-0">
                        <section.icon className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-[var(--text)] text-sm">
                        {section.title}
                    </h4>
                    </div>
                    <div className="space-y-2">
                    {section.items?.map((item, idx) => (
                        <p
                        key={idx}
                        className="text-xs text-[var(--text)]/80 leading-relaxed"
                        >
                        • {item}
                        </p>
                    ))}
                    </div>
                </div>
                ),
            )}
        </div>
        </div>
    );
}
