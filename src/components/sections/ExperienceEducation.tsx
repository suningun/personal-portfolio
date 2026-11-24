"use client";

import { Briefcase, GraduationCap } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";
import Section from "@/components/ui/Section";

type TimelineEntry = {
  id: string;
  kind: "job" | "education";
  sortDate: number;
  title: string;
  subtitle?: string;
  summary?: string;
  date: string;
  location?: string;
  bullets?: string[];
  tech?: string[];
};

const monthValue: Record<string, number> = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

function parseDate(value: string) {
  const year = Number(value.match(/\d{4}/)?.[0] ?? 0);
  const month = Object.entries(monthValue).find(([name]) =>
    value.toLowerCase().includes(name),
  )?.[1] ?? 1;
  return year * 100 + month;
}

export default function ExperienceEducation() {
  const timelineRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const entryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const activeIdRef = useRef<string | null>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const reducedMotionRef = useRef(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const entries = useMemo<TimelineEntry[]>(() => {
    const jobs: TimelineEntry[] = portfolio.experience.map((item, index) => ({
      id: `job-${index}`,
      kind: "job",
      sortDate: parseDate(item.end === "Present" ? "9999" : item.end),
      title: item.title,
      subtitle: item.company,
      summary: item.summary,
      date: `${item.start} — ${item.end}`,
      location: item.location,
      bullets: item.bullets,
      tech: item.tech,
    }));
    const education: TimelineEntry[] = portfolio.education.map((item, index) => ({
      id: `education-${index}`,
      kind: "education",
      sortDate: parseDate(item.end),
      title: item.degree,
      subtitle: item.school,
      summary: item.summary,
      date: `${item.start} — ${item.end}`,
      location: item.location,
      bullets: item.details,
    }));

    return [...jobs, ...education].sort(
      (a, b) => b.sortDate - a.sortDate,
    );
  }, []);

  useEffect(() => {
    const timeline = timelineRef.current;
    const fill = fillRef.current;
    if (!timeline || !fill) return;

    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const updateScrollLinkedState = () => {
      frameRef.current = undefined;
      const rect = timeline.getBoundingClientRect();
      const denominator = Math.max(rect.height - window.innerHeight, 1);
      const progress = reducedMotionRef.current
        ? 1
        : Math.min(1, Math.max(0, -rect.top / denominator));
      fill.style.transform = `scaleY(${progress})`;

      if (reducedMotionRef.current) return;

      let closestId: string | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      const viewportCenter = window.innerHeight / 2;
      for (const entry of entries) {
        const element = entryRefs.current[entry.id];
        if (!element) continue;
        const distance = Math.abs(
          element.getBoundingClientRect().top +
            element.getBoundingClientRect().height / 2 -
            viewportCenter,
        );
        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = entry.id;
        }
      }

      if (closestId === activeIdRef.current) return;
      if (activeIdRef.current) {
        const previous = entryRefs.current[activeIdRef.current];
        previous?.querySelector("[data-card]")?.classList.remove("border-primary/50");
        previous?.querySelector("[data-dot]")?.classList.remove(
          "bg-primary",
          "animate-pulse",
          "shadow-[0_0_0_6px_color-mix(in_srgb,var(--primary)_18%,transparent)]",
        );
        previous?.querySelector("[data-date]")?.classList.remove("text-primary");
      }
      activeIdRef.current = closestId;
      if (closestId) {
        const current = entryRefs.current[closestId];
        current?.querySelector("[data-card]")?.classList.add("border-primary/50");
        current?.querySelector("[data-dot]")?.classList.add(
          "bg-primary",
          "animate-pulse",
          "shadow-[0_0_0_6px_color-mix(in_srgb,var(--primary)_18%,transparent)]",
        );
        current?.querySelector("[data-date]")?.classList.add("text-primary");
      }
    };

    const requestUpdate = () => {
      if (frameRef.current === undefined) {
        frameRef.current = window.requestAnimationFrame(updateScrollLinkedState);
      }
    };
    const observer = new IntersectionObserver(
      (observations) => {
        if (reducedMotionRef.current) return;
        for (const observation of observations) {
          observation.target.classList.toggle(
            "is-visible",
            observation.isIntersecting,
          );
        }
      },
      { threshold: 0.15 },
    );

    Object.values(entryRefs.current).forEach((entry) => {
      if (entry) observer.observe(entry);
    });
    window.addEventListener("scroll", requestUpdate, { passive: true });
    requestUpdate();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", requestUpdate);
      if (frameRef.current !== undefined) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, [entries]);

  return (
    <section id="experience" className="scroll-mt-20">
      <Section title="Experiences & Education" command="git log --oneline">
        <div ref={timelineRef} className="relative">
          <div className="pointer-events-none absolute bottom-0 left-1.5 top-0 z-0 w-0.5 bg-border md:left-1/2 md:-translate-x-1/2" />
          <div
            ref={fillRef}
            className="pointer-events-none absolute bottom-0 left-1.5 top-0 z-0 w-0.5 origin-top bg-primary md:left-1/2 md:-translate-x-1/2"
          />

          <div className="space-y-8">
            {entries.map((entry, index) => {
              const isEducation = entry.kind === "education";
              const Icon = isEducation ? GraduationCap : Briefcase;
              const left = index % 2 === 0;

              return (
                <div
                  key={entry.id}
                  ref={(element) => {
                    entryRefs.current[entry.id] = element;
                  }}
                  className="timeline-entry group relative grid translate-x-[-12px] grid-cols-1 pl-6 opacity-30 transition-[opacity,transform] duration-500 ease-out motion-reduce:translate-x-0 motion-reduce:opacity-100 md:grid-cols-2 md:gap-10 md:pl-0 [&.is-visible]:translate-x-0 [&.is-visible]:opacity-100"
                >
                  <button
                    type="button"
                    aria-label={`Center ${entry.title} on timeline`}
                    onClick={() =>
                      entryRefs.current[entry.id]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      })
                    }
                    className="absolute left-0 top-10 z-20 h-3 w-3 rounded-full border-2 border-border bg-bg transition-colors md:left-1/2 md:-translate-x-1/2"
                    data-dot
                  />

                  <div
                    className={
                      left
                        ? "md:col-start-1 md:row-start-1 md:pr-8"
                        : "md:col-start-2 md:row-start-1 md:pl-8"
                    }
                  >
                    <Card
                      data-card
                      className="w-full transition-transform duration-300 group-hover:-translate-y-0.5 group-focus-within:-translate-y-0.5"
                    >
                      <button
                        type="button"
                        aria-expanded={Boolean(expanded[entry.id])}
                        onClick={() =>
                          setExpanded((current) => ({
                            ...current,
                            [entry.id]: !current[entry.id],
                          }))
                        }
                        className="w-full text-left"
                      >
                        <span className="flex items-start gap-4">
                          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-on-primary">
                            <Icon className="h-5 w-5" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block text-lg font-medium text-text">{entry.title}</span>
                            <span className="block text-base leading-relaxed text-muted md:text-lg">
                              {entry.subtitle}
                            </span>
                            {entry.summary && (
                              <span className="mt-2 line-clamp-2 block text-sm leading-relaxed text-muted md:text-base">
                                {entry.summary}
                              </span>
                            )}
                            <span className="mt-3 flex flex-wrap gap-2 font-mono text-xs text-muted">
                              {entry.location && (
                                <span className="rounded-full border border-border bg-bg px-3 py-1">
                                  {entry.location}
                                </span>
                              )}
                              <span data-date className="rounded-full border border-border bg-bg px-3 py-1">
                                {entry.date}
                              </span>
                            </span>
                          </span>
                        </span>
                        {entry.tech && (
                          <span className="mt-5 flex flex-wrap gap-2">
                            {entry.tech.map((tech) => (
                              <Chip key={tech} as="span">{tech}</Chip>
                            ))}
                          </span>
                        )}
                        {entry.bullets?.length ? (
                          <span className={`grid transition-[grid-template-rows] duration-500 ${expanded[entry.id] ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                            <span className="overflow-hidden">
                              <span className="mt-5 block space-y-2 text-base leading-relaxed text-muted md:text-lg">
                                {entry.bullets.map((bullet) => (
                                  <span key={bullet} className="flex gap-3">
                                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                    <span>{bullet}</span>
                                  </span>
                                ))}
                              </span>
                            </span>
                          </span>
                        ) : null}
                      </button>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Section>
    </section>
  );
}
