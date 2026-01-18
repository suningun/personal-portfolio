"use client";

import { useEffect, useRef, useState } from "react";

export default function SkillBar({ value }: { value: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStart(true);
          io.disconnect(); // animate once
        }
      },
      { threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="h-2 w-full rounded-full bg-[color-mix(in_srgb,var(--border)_55%,transparent)] overflow-hidden"
    >
      <div
        className="h-full rounded-full bg-gradient-to-r from-[var(--grad-left)] to-[var(--grad-right)] transition-[width] duration-1000 ease-out"
        style={{ width: start ? `${value}%` : "0%" }}
      />
    </div>
  );
}
