"use client";

import { useRef } from "react";

export default function ProjectsTiltCard({
  children,
}: {
  children: React.ReactNode;
}) {
  const cardRef = useRef<HTMLDivElement>(null);

  const reset = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 300ms ease-out";
    card.style.transform = "perspective(800px) translateY(0) rotateX(0deg) rotateY(0deg)";
  };

  const tilt = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || event.pointerType === "touch" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
      return;
    }

    const bounds = card.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    card.style.transition = "transform 80ms ease-out";
    card.style.transform = `perspective(800px) translateY(-4px) rotateX(${y * -14}deg) rotateY(${x * 14}deg)`;
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={tilt}
      onPointerLeave={reset}
      className="overflow-hidden rounded-xl bg-surface border border-border hover:border-primary transition-colors duration-300"
    >
      {children}
    </div>
  );
}
