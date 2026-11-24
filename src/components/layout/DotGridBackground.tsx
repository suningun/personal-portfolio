"use client";

import { useEffect, useRef } from "react";

const GRID_SPACING = 24;
const SPOTLIGHT_RADIUS = 150;

type Color = {
  r: number;
  g: number;
  b: number;
};

function parseColor(value: string): Color {
  const hex = value.trim().replace("#", "");
  if (/^[0-9a-f]{6}$/i.test(hex)) {
    return {
      r: Number.parseInt(hex.slice(0, 2), 16),
      g: Number.parseInt(hex.slice(2, 4), 16),
      b: Number.parseInt(hex.slice(4, 6), 16),
    };
  }

  const rgb = value.match(/\d+/g)?.map(Number);
  return {
    r: rgb?.[0] ?? 255,
    g: rgb?.[1] ?? 255,
    b: rgb?.[2] ?? 255,
  };
}

function mixColors(from: Color, to: Color, amount: number): Color {
  return {
    r: Math.round(from.r + (to.r - from.r) * amount),
    g: Math.round(from.g + (to.g - from.g) * amount),
    b: Math.round(from.b + (to.b - from.b) * amount),
  };
}

export default function DotGridBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const pointer = { x: 0, y: 0 };
    const size = { width: 0, height: 0, dpr: 1 };
    let colors = { border: parseColor(""), primary: parseColor("") };
    let spotlight = { x: 0, y: 0 };
    let driftStartedAt = 0;
    let driftTimer: number | undefined;
    let animationFrame: number | undefined;
    let drifting = false;
    let isHidden = document.hidden;

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      colors = {
        border: parseColor(styles.getPropertyValue("--border")),
        primary: parseColor(styles.getPropertyValue("--primary")),
      };
    };

    const resize = () => {
      size.width = window.innerWidth;
      size.height = window.innerHeight;
      size.dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(size.width * size.dpr);
      canvas.height = Math.floor(size.height * size.dpr);
      canvas.style.width = `${size.width}px`;
      canvas.style.height = `${size.height}px`;
      context.setTransform(size.dpr, 0, 0, size.dpr, 0, 0);
      draw();
    };

    const draw = () => {
      context.clearRect(0, 0, size.width, size.height);

      for (let x = 0; x <= size.width; x += GRID_SPACING) {
        for (let y = 0; y <= size.height; y += GRID_SPACING) {
          const distance = Math.hypot(x - spotlight.x, y - spotlight.y);
          const proximity = Math.max(0, 1 - distance / SPOTLIGHT_RADIUS);
          const color = mixColors(colors.border, colors.primary, proximity);
          const opacity = 0.1 + proximity * 0.45;
          const radius = 1 + proximity * 1.4;

          context.beginPath();
          context.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${opacity})`;
          context.arc(x, y, radius, 0, Math.PI * 2);
          context.fill();
        }
      }
    };

    const animateDrift = (time: number) => {
      animationFrame = undefined;
      if (isHidden || reducedMotion || !drifting) return;

      const elapsed = (time - driftStartedAt) / 1000;
      spotlight = {
        x: size.width / 2 + Math.sin(elapsed * 0.18) * size.width * 0.28,
        y: size.height / 2 + Math.sin(elapsed * 0.23) * size.height * 0.2,
      };
      draw();
      animationFrame = window.requestAnimationFrame(animateDrift);
    };

    const startDrift = () => {
      if (isHidden || reducedMotion) return;
      drifting = true;
      driftStartedAt = performance.now();
      if (animationFrame === undefined) {
        animationFrame = window.requestAnimationFrame(animateDrift);
      }
    };

    const scheduleDrift = () => {
      if (driftTimer !== undefined) window.clearTimeout(driftTimer);
      driftTimer = window.setTimeout(startDrift, 3000);
    };

    const handlePointerMove = (event: MouseEvent) => {
      pointer.x = event.clientX;
      pointer.y = event.clientY;
      spotlight = pointer;
      drifting = false;
      draw();
      scheduleDrift();
    };

    const handleVisibilityChange = () => {
      isHidden = document.hidden;
      if (isHidden) {
        if (animationFrame !== undefined) {
          window.cancelAnimationFrame(animationFrame);
          animationFrame = undefined;
        }
        return;
      }

      if (drifting) {
        driftStartedAt = performance.now();
        animationFrame = window.requestAnimationFrame(animateDrift);
      } else {
        draw();
      }
    };

    readColors();
    spotlight = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    resize();

    const themeObserver = new MutationObserver(() => {
      readColors();
      draw();
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handlePointerMove);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    if (!reducedMotion) scheduleDrift();

    return () => {
      if (driftTimer !== undefined) window.clearTimeout(driftTimer);
      if (animationFrame !== undefined) {
        window.cancelAnimationFrame(animationFrame);
      }
      themeObserver.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
