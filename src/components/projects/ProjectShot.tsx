import Link from "next/link";
import type { Project } from "@/data/projects";
import ProjectImage from "@/components/projects/ProjectImage";

const colors = {
  primary: "var(--primary)",
  lavender: "var(--lavender)",
  blush: "var(--blush)",
  green: "var(--green)",
} as const;

export default function ProjectShot({
  project,
  large = false,
}: {
  project: Project;
  large?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group block overflow-hidden rounded-2xl border border-border ${
        large ? "md:grid md:grid-cols-[1.25fr_1fr]" : ""
      }`}
      style={{ backgroundColor: `color-mix(in srgb, ${colors[project.color]} 10%, var(--bg))` }}
    >
      <div className={`relative ${large ? "aspect-[16/10]" : "aspect-[16/9]"}`}>
        <div className="absolute inset-3 overflow-hidden rounded-lg border border-border bg-bg shadow-sm">
          <div className="relative z-10 flex h-6 items-center gap-1 border-b border-border bg-surface px-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="h-1.5 w-1.5 rounded-full bg-blush" />
            <span className="h-1.5 w-1.5 rounded-full bg-green" />
            <span className="ml-2 h-2 flex-1 rounded-full bg-border/60" />
          </div>
          <div className="absolute inset-x-0 bottom-0 top-6">
            <ProjectImage
              src={`/images/projects/${project.slug}/cover.webp`}
              alt={`${project.title} project screenshot`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              sizes={large ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 33vw"}
            />
          </div>
        </div>
      </div>
      <div className={`${large ? "p-6 md:p-8" : "p-4"}`}>
        <p className="font-mono text-xs text-muted">
          {project.category.toLowerCase()} · {project.year}
        </p>
        <h3 className="mt-2 text-xl font-medium text-text">{project.title}</h3>
        <p className="mt-1 text-sm leading-relaxed text-muted">{project.tagline}</p>
        {project.award && (
          <p className="mt-3 font-mono text-xs text-blush">★ {project.award}</p>
        )}
      </div>
    </Link>
  );
}
