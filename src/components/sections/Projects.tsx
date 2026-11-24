import Section from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";
import Image from "next/image";
import ProjectsTiltCard from "./ProjectsTiltCard";
import Chip from "@/components/ui/Chip";

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <Section title="Featured Projects" command="ls projects/">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {portfolio.projects.map((p) => (
            <ProjectsTiltCard key={p.name}>
              {/* Project image */}
              {p.img && (
                <div className="relative h-50 w-full">
                  <Image
                    src={p.img}
                    alt={`Screenshot of ${p.name}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={false}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-medium text-text">
                  {p.name}
                </h3>

                {p.role && (
                  <p className="mt-1 font-mono text-xs text-muted">{p.role}</p>
                )}

                {p.award && (
                  <Chip as="span" className="mt-3 max-w-full whitespace-normal border-blush/40 bg-blush/10 text-blush">
                    {p.award}
                  </Chip>
                )}

                <p className="mt-2 text-base md:text-lg leading-relaxed text-muted">{p.description}</p>

                {p.highlights && p.highlights.length > 0 && (
                  <ul className="mt-4 space-y-1 text-base md:text-lg leading-relaxed text-muted">
                    {p.highlights.map((highlight) => (
                      <li key={highlight} className="flex gap-2">
                        <span className="text-blush">•</span>
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((t) => (
                    <Chip
                      key={t}
                      as="span"
                      className="text-lavender"
                    >
                      {t}
                    </Chip>
                  ))}
                </div>

                <div className="flex gap-4 mt-5 text-sm">
                  {p.link && (
                    <a
                      className="font-mono text-sm text-lavender hover:text-primary"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Live Demo ↗
                    </a>
                  )}
                  {p.github && (
                    <a
                      className="font-mono text-sm text-lavender hover:text-primary"
                      href={p.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Source Code ↗
                    </a>
                  )}
                </div>
              </div>
            </ProjectsTiltCard>
          ))}
        </div>

      </Section>
    </section>
  );
}
