import Section from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";
import Image from "next/image";

export default function Projects() {
  return (
    <section id="projects">
      <Section title="Featured Projects">
        <div className="grid md:grid-cols-3 gap-4">
          {portfolio.projects.map((p) => (
            <div
              key={p.name}
              className="overflow-hidden rounded-xl bg-[var(--surface)] border 
              border-[var(--border)] hover:-translate-y-1 hover:shadow-[0_20px_50px_color-mix(in_srgb,var(--primary)_30%,transparent)] transition-all duration-300">
              {/* Project image */}
              {p.img && (
                <div className="relative h-50 w-full">
                  <Image
                    src={p.img}
                    alt={p.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={false}
                  />
                </div>
              )}

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[var(--text)]">
                  {p.name}
                </h3>

                <p className="mt-2 text-[var(--muted)]">{p.description}</p>

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="
                      px-3 py-1
                      rounded-full
                      bg-[var(--surface)]
                      border border-[var(--border)]
                      text-sm text-[var(--text)]"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 mt-5 text-sm">
                  {p.link && (
                    <a
                      className="text-[var(--primary)] hover:underline"
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Project
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </section>
  );
}
