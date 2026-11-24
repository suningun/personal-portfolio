"use client";

import { useEffect, useState } from "react";
import ProjectImage from "@/components/projects/ProjectImage";

export default function ProjectLightbox({
  title,
  images,
}: {
  title: string;
  images: string[];
}) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!selected) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [selected]);

  return (
    <>
      <div className="grid gap-3 md:grid-cols-3">
        {images.map((src, index) => (
          <button
            key={src}
            type="button"
            onClick={() => setSelected(src)}
            className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-surface"
            aria-label={`Open ${title} gallery image ${index + 1}`}
          >
            <ProjectImage src={src} alt={`${title} gallery image ${index + 1}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
          </button>
        ))}
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-bg/90 p-6"
          role="dialog"
          aria-modal="true"
          aria-label={`${title} image preview`}
          onClick={() => setSelected(null)}
        >
          <div className="relative h-full w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
            <ProjectImage src={selected} alt={`${title} enlarged gallery image`} fill className="object-contain" sizes="100vw" />
          </div>
          <button
            type="button"
            onClick={() => setSelected(null)}
            className="absolute right-6 top-6 rounded-full border border-border bg-surface px-4 py-2 font-mono text-sm text-text"
          >
            Close
          </button>
        </div>
      )}
    </>
  );
}
