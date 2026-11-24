"use client";

import { useEffect, useRef, useState } from "react";
import SkillCard from "./SkillCard";
import { portfolio } from "@/data/portfolio";

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [started, setStarted] = useState(false);
  const total = portfolio.skills.categories.reduce(
    (count, category) => count + category.items.length,
    0,
  );

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started) return;
        setStarted(true);
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          observer.disconnect();
          return;
        }

        let index = 0;
        const timer = window.setInterval(() => {
          setActiveIndex(index);
          index += 1;
          if (index >= total) {
            window.setTimeout(() => setActiveIndex(-1), 220);
            window.clearInterval(timer);
          }
        }, 120);

        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [started, total]);

  const categoryStarts = portfolio.skills.categories.map((category, index) =>
    portfolio.skills.categories
      .slice(0, index)
      .reduce((count, previous) => count + previous.items.length, 0),
  );

  return (
    <div ref={sectionRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {portfolio.skills.categories.map((cat, categoryIndex) => {
        return (
          <SkillCard
            key={cat.title}
            category={cat}
            activeIndex={activeIndex}
            startIndex={categoryStarts[categoryIndex]}
          />
        );
      })}
    </div>
  );
}
