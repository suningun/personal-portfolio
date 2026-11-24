 "use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { portfolio } from "@/data/portfolio";
import Section from "@/components/ui/Section";
import { useEffect, useRef, useState } from "react";

type ExperienceItem = (typeof portfolio.experience)[number] & { type: "experience" };
type EducationItem = (typeof portfolio.education)[number] & { type: "education" };
type TimelineItem = ExperienceItem | EducationItem;

const isExperienceItem = (item: TimelineItem): item is ExperienceItem => item.type === "experience";

export default function Experiencee() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const items: TimelineItem[] = [
    ...(portfolio.experience ?? []).map((e) => ({ ...e, type: "experience" as const })),
    ...(portfolio.education ?? []).map((e) => ({ ...e, type: "education" as const })),
  ];

  useEffect(() => {
    const element = timelineRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setVisible(true);
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience">
      <Section title="Experiences & Education" eyebrow="~/experience">
        <div
          ref={timelineRef}
          className={`relative transition-opacity duration-700 ${
            visible
              ? "opacity-100"
              : "opacity-0 motion-reduce:opacity-100"
          }`}
        >
          {/* center line */}
          <div
            className={`pointer-events-none absolute left-1.5 top-0 h-full w-0.5 origin-top bg-primary -z-10 transition-transform duration-[1600ms] ease-out md:left-1/2 md:-translate-x-1/2 ${
              visible ? "scale-y-100" : "scale-y-0 motion-reduce:scale-y-100"
            }`}
          />

          <div className="space-y-10">
            {items.map((e, idx) => {
              const left = idx % 2 === 0;
              const isEdu = e.type === "education";
              const Icon = isEdu ? GraduationCap : Briefcase;

              const description = isExperienceItem(e) ? e.description : undefined;
              const bulletItems = isEdu ? e.details : isExperienceItem(e) ? e.bullets : undefined;

              return (
                <div
                  key={`${e.type}-${isEdu ? e.school : e.company}-${e.start}-${e.end}`}
                  className={`relative grid grid-cols-1 pl-6 md:grid-cols-2 md:gap-10 md:pl-0 transition-all duration-700 ease-out ${
                    visible
                      ? "translate-x-0 opacity-100"
                      : "translate-x-[-1rem] opacity-0 motion-reduce:translate-x-0 motion-reduce:opacity-100"
                  }`}
                  style={{ transitionDelay: `${idx * 450}ms` }}
                >
                  {/* dot */}
                  <div
                    className={`absolute left-0 top-10 h-3 w-3 rounded-full border-2 bg-bg md:left-1/2 md:-translate-x-1/2 ${
                      idx % 3 === 0
                        ? "border-primary"
                        : idx % 3 === 1
                          ? "border-lavender"
                          : "border-green"
                    }`}
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
                      className="w-full max-w-xl rounded-xl p-6 bg-surface border border-border hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="flex items-start gap-4">
                        <div
                          className="p-3 rounded-xl bg-primary text-on-primary"
                        >
                          <Icon className="w-5 h-5" />
                        </div>

                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-text">
                            {isEdu ? e.degree : e.title}
                          </h3>

                          <p className="text-base md:text-lg leading-relaxed text-muted">{isEdu ? e.school : e.company}</p>

                                  {e.location && (
                          <p className="inline-flex mt-3 px-3 py-1 rounded-full text-xs bg-bg border border-border text-muted font-mono">
                                      {e.location}
                                    </p>
                                  )}
                          <span
                            className="inline-flex mt-3 px-3 py-1 rounded-full text-xs bg-bg border border-border text-muted font-mono"
                          >
                            {e.start} — {e.end}
                          </span>
                        </div>
    
            </div>
            
            {/* Description as normal text (no bullets) */}
            {description?.length ? (
              <p className="mt-4 text-base md:text-lg leading-relaxed text-muted">{description[0]}</p>
            ) : null}

            {/* Bullets only for details / bullets */}
            {bulletItems?.length ? (
              <ul className="text-base md:text-lg leading-relaxed mt-5 space-y-2 text-muted">
                {bulletItems.map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-green" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            ) : null}
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
