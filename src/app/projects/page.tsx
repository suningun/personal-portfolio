import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectFilters from "@/components/projects/ProjectFilters";

export const metadata: Metadata = {
  title: "Projects — Suning Un",
  description: "Selected web, AI, and design projects by Suning Un.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 md:py-24">
      <Link href="/#projects" className="font-mono text-sm text-lavender hover:text-primary">
        ← cd ~
      </Link>
      <div className="mt-8 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-sm text-muted">
            <span className="text-green">❯</span> ls -a projects/
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text md:text-4xl">
            All projects
          </h1>
        </div>
        <span className="font-mono text-xs text-muted">{projects.length} projects</span>
      </div>
      <div className="mt-6">
        <ProjectFilters projects={projects} />
      </div>
    </main>
  );
}
