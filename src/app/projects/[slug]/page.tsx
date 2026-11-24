import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Chip from "@/components/ui/Chip";
import ProjectLightbox from "@/components/projects/ProjectLightbox";
import ProjectImage from "@/components/projects/ProjectImage";
import { getProject, projects } from "@/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Suning Un`,
    description: project.tagline,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((item) => item.slug === project.slug);
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const next = projects[(index + 1) % projects.length];
  const gallery = [1, 2, 3].map((number) => `/images/projects/${project.slug}/gallery-${number}.webp`);

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link href="/projects" className="font-mono text-sm text-lavender hover:text-primary">
        ← cd ../projects
      </Link>
      <p className="mt-8 font-mono text-sm text-muted">
        <span className="text-green">❯</span> cat projects/{project.slug}.md
      </p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-text md:text-5xl">{project.title}</h1>
      <p className="mt-2 text-base leading-relaxed text-muted md:text-lg">{project.tagline}</p>
      {project.award && <p className="mt-3 font-mono text-sm text-blush">★ {project.award}</p>}

      <div className="mt-6 grid grid-cols-2 gap-5 border-l-2 border-border pl-4 text-sm sm:grid-cols-4">
        <Meta label="role" value={project.role} />
        <Meta label="team" value={project.team} />
        <Meta label="timeline" value={String(project.year)} />
        <Meta label="status" value={project.status} status />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" className="rounded-full bg-primary px-5 py-2 font-mono text-sm text-on-primary">
            Live demo ↗
          </a>
        )}
        {project.links.source && (
          <a href={project.links.source} target="_blank" rel="noreferrer" className="rounded-full border border-border px-5 py-2 font-mono text-sm text-text hover:border-primary">
            Source ↗
          </a>
        )}
      </div>

      <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-border bg-surface p-3">
        <ProjectImage src={`/images/projects/${project.slug}/cover.webp`} alt={`${project.title} cover`} fill className="object-contain p-3" priority sizes="(max-width: 768px) 100vw, 768px" />
      </div>

      {project.sample && (
        <p className="mt-4 rounded-xl border border-border bg-surface px-4 py-3 font-mono text-xs text-muted">
          Sample project — this concept demonstrates the kind of work I want to build and refine.
        </p>
      )}

      <DetailSection command="overview">
        <p>{project.overview}</p>
      </DetailSection>
      <DetailSection command="what I did">
        <ul className="space-y-2">
          {project.whatIDid.map((item) => <li key={item} className="flex gap-3"><span className="text-lavender">→</span>{item}</li>)}
        </ul>
      </DetailSection>
      <DetailSection command="tech stack">
        <div className="flex flex-wrap gap-2">{project.tech.map((item) => <Chip key={item} as="span">{item}</Chip>)}</div>
      </DetailSection>
      <DetailSection command="gallery">
        <ProjectLightbox title={project.title} images={gallery} />
      </DetailSection>
      <div className="grid gap-4 md:grid-cols-2">
        <DetailSection command="challenges"><p>{project.challenges}</p></DetailSection>
        <DetailSection command="what I learned"><p>{project.learned}</p></DetailSection>
      </div>
      {project.results && <DetailSection command="results"><p>{project.results}</p></DetailSection>}

      <div className="mt-12 grid gap-3 sm:grid-cols-2">
        <ProjectNav label="← previous" project={previous} />
        <ProjectNav label="next →" project={next} align="right" />
      </div>
    </main>
  );
}

function Meta({ label, value, status = false }: { label: string; value: string; status?: boolean }) {
  return (
    <div>
      <p className="font-mono text-xs text-muted">{label}</p>
      <p className={`mt-1 text-sm ${status ? "text-green" : "text-text"}`}>{status && "● "}{value}</p>
    </div>
  );
}

function DetailSection({ command, children }: { command: string; children: React.ReactNode }) {
  return (
    <section className="mt-8">
      <p className="font-mono text-xs text-muted"><span className="text-green">##</span> {command}</p>
      <div className="mt-3 text-base leading-relaxed text-muted md:text-lg">{children}</div>
    </section>
  );
}

function ProjectNav({ label, project, align = "left" }: { label: string; project: (typeof projects)[number]; align?: "left" | "right" }) {
  return (
    <Link href={`/projects/${project.slug}`} className={`rounded-xl border border-border bg-surface p-4 hover:border-primary/50 ${align === "right" ? "text-right" : ""}`}>
      <p className="font-mono text-xs text-muted">{label}</p>
      <p className="mt-1 text-base font-medium text-text">{project.title}</p>
    </Link>
  );
}
