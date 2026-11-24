"use client";

import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const cursorStyle = document.createElement("style");
    cursorStyle.id = "hide-native-cursor";
    cursorStyle.textContent =
      "*, *::before, *::after { cursor: none !important; }\ninput, textarea, [contenteditable] { cursor: text !important; }";
    document.head.appendChild(cursorStyle);

    dot.style.opacity = "1";
    ring.style.opacity = "1";

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let hovering = false;
    let rafId: number;

    const INTERACTIVE = "a, button, [role=button], .card";

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.transform = `translate3d(${targetX - 3}px, ${targetY - 3}px, 0)`;
    };

    const onMouseOver = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest(INTERACTIVE);
      if (el) hovering = true;
    };

    const onMouseOut = (e: MouseEvent) => {
      const from = (e.target as Element | null)?.closest(INTERACTIVE);
      const to = (e.relatedTarget as Element | null)?.closest(INTERACTIVE);
      if (from && !to) hovering = false;
    };

    const onMouseLeave = () => {
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const onMouseEnter = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const loop = () => {
      ringX += (targetX - ringX) * 0.18;
      ringY += (targetY - ringY) * 0.18;

      const size = hovering ? 48 : 28;
      const half = size / 2;

      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.transform = `translate3d(${ringX - half}px, ${ringY - half}px, 0)`;
      ring.style.backgroundColor = hovering
        ? "rgb(var(--color-primary) / 0.15)"
        : "transparent";

      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    rafId = requestAnimationFrame(loop);

    return () => {
      cursorStyle.remove();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full bg-primary"
        style={{ width: 6, height: 6, opacity: 0, willChange: "transform" }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full border-[1.5px] border-primary"
        style={{
          width: 28,
          height: 28,
          opacity: 0,
          willChange: "transform, width, height",
          transition:
            "width 200ms ease, height 200ms ease, background-color 200ms ease",
        }}
      />
    </>
  );
}
