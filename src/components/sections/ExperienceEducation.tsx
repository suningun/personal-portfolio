import { Briefcase, GraduationCap } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Section from "@/components/ui/Section";

type ExperienceItem = (typeof portfolio.experience)[number] & { type: "experience" };
type EducationItem = (typeof portfolio.education)[number] & { type: "education" };
type TimelineItem = ExperienceItem | EducationItem;

export default function Experiencee() {
  const items: TimelineItem[] = [
    ...(portfolio.experience ?? []).map((e) => ({ ...e, type: "experience" as const })),
    ...(portfolio.education ?? []).map((e) => ({ ...e, type: "education" as const })),
  ];

  return (
    <section id="experience">
      <Section title="Experiences & Education">
        <div className="relative">
          {/* center line */}
          <div
            className="
              pointer-events-none absolute left-1/2 top-0 -translate-x-1/2
              h-full w-px hidden md:block
              bg-[color-mix(in_srgb,var(--primary)_75%,transparent)]
              opacity-40
              -z-10
            "
          />

          <div className="space-y-10">
            {items.map((e, idx) => {
              const left = idx % 2 === 0;
              const isEdu = e.type === "education";
              const Icon = isEdu ? GraduationCap : Briefcase;

              return (
                <div
                  key={`${e.type}-${isEdu ? e.school : e.company}-${e.start}-${e.end}`}
                  className="relative grid grid-cols-1 md:grid-cols-2 md:gap-10"
                >
                  {/* dot */}
                  <div
                    className="
                      absolute left-1/2 top-10 -translate-x-1/2
                      h-4 w-4 rounded-full hidden md:block
                      bg-[var(--primary)]
                      shadow-[0_0_0_6px_color-mix(in_srgb,var(--primary)_20%,transparent),0_0_30px_color-mix(in_srgb,var(--primary)_35%,transparent)]
                    "
                  />

                  {/* left column */}
                  <div className={left ? "md:pr-8" : "md:pr-8 md:opacity-0 md:pointer-events-none"} />

                  {/* card */}
                  <div
                    className={
                      left
                        ? "md:col-start-1 md:row-start-1 md:justify-self-end md:pr-8"
                        : "md:col-start-2 md:pl-8"
                    }
                  >
                    <div
                      className="
                        w-full max-w-xl
                        rounded-2xl p-6
                        bg-[color-mix(in_srgb,var(--surface)_70%,transparent)]
                        border border-[var(--border)]
                        shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                        hover:-translate-y-1 hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition-all duration-300
                      "
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="
                            p-3 rounded-xl
                            bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)]
                            text-white
                            shadow-[0_0_20px_color-mix(in_srgb,var(--primary)_35%,transparent)]
                          "
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-[var(--text)]">
                            {isEdu ? e.degree : e.title}
                          </h3>

                          <p className="text-[var(--muted)]">{isEdu ? e.school : e.company}</p>

                                  {e.location && (
                          <p className="inline-flex mt-3 px-3 py-1 rounded-full text-xs
                              bg-[color-mix(in_srgb,var(--bg)_70%,transparent)]
                              border border-[var(--border)]
                              text-[var(--muted)]">
                                      {e.location}
                                    </p>
                                  )}
                          <span
                            className="
                              inline-flex mt-3 px-3 py-1 rounded-full text-xs
                              bg-[color-mix(in_srgb,var(--bg)_70%,transparent)]
                              border border-[var(--border)]
                              text-[var(--muted)]
                            "
                          >
                            {e.start} — {e.end}
                          </span>
                        </div>
    
                      </div>

                      {(() => {
                        const list = isEdu ? e.details : e.bullets;
                        return list?.length ? (
                          <ul className="mt-5 space-y-2 text-[var(--muted)]">
                            {list.map((t) => (
                              <li key={t} className="flex gap-3">
                                <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--primary)]/80" />
                                <span>{t}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null;
                      })()}
                    </div>
                  </div>

                  {/* right placeholder */}
                  <div className={left ? "md:col-start-2 md:opacity-0 md:pointer-events-none" : ""} />
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </section>
  );
}
