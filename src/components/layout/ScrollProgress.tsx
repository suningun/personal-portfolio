"use client";

import { useCallback, useEffect, useRef } from "react";

export default function ScrollProgress({
  className = "",
}: {
  className?: string;
}) {
  const fillRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | undefined>(undefined);
  const reducedMotionRef = useRef(false);

  const update = useCallback(() => {
    if (!fillRef.current || !tipRef.current) return;

    let value: number;
    if (reducedMotionRef.current) {
      value = 1;
    } else {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      value = max <= 0 ? 1 : Math.min(1, Math.max(0, window.scrollY / max));
    }

    fillRef.current.style.transform = `scaleX(${value})`;
    tipRef.current.style.left = `${value * 100}%`;
    tipRef.current.style.opacity = value === 0 ? "0" : "1";
  }, []);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const onScroll = () => {
      if (frameRef.current === undefined) {
        frameRef.current = requestAnimationFrame(() => {
          update();
          frameRef.current = undefined;
        });
      }
    };

    const onResize = () => {
      if (frameRef.current === undefined) {
        frameRef.current = requestAnimationFrame(() => {
          update();
          frameRef.current = undefined;
        });
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (frameRef.current !== undefined) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [update]);

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-px bg-border ${className}`}
    >
      <div
        ref={fillRef}
        className="pointer-events-none absolute left-0 bottom-0 h-0.5 w-full origin-left bg-primary"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={tipRef}
        className="pointer-events-none absolute bottom-[-5px] h-3 w-1.5 rounded-[1px] bg-primary animate-[cursor-blink_1s_step-end_infinite] motion-reduce:animate-none"
        style={{ left: "0%", transform: "translateX(-3px)", opacity: "0" }}
      />
    </div>
  );
}
