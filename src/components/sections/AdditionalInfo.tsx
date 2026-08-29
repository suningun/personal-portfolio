import { portfolio } from "@/data/portfolio";
import { Award, BookOpen, Handshake, Lightbulb } from "lucide-react";

export default function AdditionalInfo() {
  const hasAchievements =
    portfolio.achievements && portfolio.achievements.length > 0;
  const hasCertifications =
    portfolio.extras?.certifications &&
    portfolio.extras.certifications.length > 0;
  const hasVolunteering =
    portfolio.extras?.volunteering && portfolio.extras.volunteering.length > 0;
  const hasInterests =
    portfolio.extras?.interests && portfolio.extras.interests.length > 0;

  if (
    !hasAchievements &&
    !hasCertifications &&
    !hasVolunteering &&
    !hasInterests
  ) {
    return null;
  }

  const sections = [
    {
      title: "Achievements",
      icon: Award,
      items: portfolio.achievements,
      show: hasAchievements,
    },
    {
      title: "Certifications",
      icon: BookOpen,
      items: portfolio.extras?.certifications,
      show: hasCertifications,
    },
    {
      title: "Volunteering",
      icon: Handshake,
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
      <div className="rounded-xl p-6 bg-[var(--surface)] border border-[var(--border)]">
        <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[var(--text)]">
          Additional Info
        </h3>

        <div className="space-y-6">
          {sections.map(
            (section) =>
              section.show && (
                <div key={section.title}>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-8 w-8 rounded-lg grid place-items-center bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)] text-white flex-shrink-0">
                      <section.icon className="h-4 w-4" />
                    </div>
                    <h4 className="font-semibold text-[var(--text)] text-sm">
                      {section.title}
                    </h4>
                  </div>
                  <ul className="space-y-1 ml-11">
                    {section.items?.map((item, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-[var(--text)]/80 leading-relaxed"
                      >
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ),
          )}
        </div>
      </div>
    </div>
  );
}
