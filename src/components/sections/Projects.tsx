import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectShot from "@/components/projects/ProjectShot";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";

export default function Projects() {
  const featured = projects.filter((project) => project.featured);
  const [lead, ...small] = featured;

  return (
    <section id="projects" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <Reveal>
          <SectionHeader command="ls projects/" title="Featured projects" />
          {lead && <ProjectShot project={lead} large />}
          <div className="mt-3 grid gap-3 md:grid-cols-3">
            {small.map((project) => (
              <ProjectShot key={project.slug} project={project} />
            ))}
          </div>
          <div className="mt-5 text-center">
            <Link
              href="/projects"
              className="inline-flex rounded-full border border-border px-5 py-2 font-mono text-sm text-lavender transition-colors hover:border-primary hover:text-primary"
            >
              See all {projects.length} projects →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
