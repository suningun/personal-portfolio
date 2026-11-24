"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/data/projects";

const filters: Array<"all" | ProjectCategory> = ["all", "Web", "AI", "Design"];

export default function ProjectFilters({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<(typeof filters)[number]>("all");
  const visible = useMemo(
    () => (filter === "all" ? projects : projects.filter((project) => project.category === filter)),
    [filter, projects],
  );
  const groups = visible.reduce<Record<number, Project[]>>((result, project) => {
    (result[project.year] ??= []).push(project);
    return result;
  }, {});

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {filters.map((item) => {
          const active = filter === item;
          return (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={`rounded-full border px-4 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? "border-primary bg-primary text-on-primary"
                  : "border-border text-muted hover:border-primary hover:text-primary"
              }`}
            >
              {item.toLowerCase()}
            </button>
          );
        })}
      </div>

      <div className="mt-8 space-y-8">
        {Object.entries(groups)
          .sort(([a], [b]) => Number(b) - Number(a))
          .map(([year, yearProjects]) => (
            <section key={year}>
              <div className="flex items-center gap-3 border-b border-border pb-2 font-mono text-sm text-green">
                <span>{year}</span>
                <span className="h-px flex-1 bg-border" />
              </div>
              <div className="mt-2">
                {yearProjects.map((project) => (
                  <Link
                    key={project.slug}
                    href={`/projects/${project.slug}`}
                    className="group flex items-center gap-3 rounded-xl px-2 py-3 transition-colors hover:bg-surface"
                  >
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-lg font-mono text-sm"
                      style={{
                        color: `var(--${project.color})`,
                        backgroundColor: `color-mix(in srgb, var(--${project.color}) 14%, var(--surface))`,
                      }}
                    >
                      {project.title[0]}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-base font-medium text-text group-hover:text-primary">
                        {project.title}
                      </span>
                      <span className="block truncate text-sm text-muted">{project.tagline}</span>
                    </span>
                    <span className="font-mono text-xs lowercase text-muted">{project.category}</span>
                    <span className="text-lavender">→</span>
                  </Link>
                ))}
              </div>
            </section>
          ))}
      </div>
    </div>
  );
}
