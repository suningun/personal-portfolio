"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function CountUp({ value }: { value: number }) {
  const formatted = value.toLocaleString();
  const [display, setDisplay] = useState(formatted);
  const ref = useRef<HTMLSpanElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const doneRef = useRef(false);

  const startCount = useCallback(() => {
    if (doneRef.current) return;
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      doneRef.current = true;
      return;
    }
    doneRef.current = true;
    const start = performance.now();
    const duration = 1100;
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / duration, 1);
      const n = Math.round(easeOutCubic(p) * value);
      setDisplay(n.toLocaleString());
      if (p < 1) {
        frameRef.current = requestAnimationFrame(tick);
      } else {
        frameRef.current = undefined;
      }
    };
    frameRef.current = requestAnimationFrame(tick);
  }, [value]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return;
        startCount();
        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [startCount]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {display}
    </span>
  );
}
