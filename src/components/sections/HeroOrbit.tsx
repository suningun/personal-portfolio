"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { portfolio } from "@/data/portfolio";

type ChipRing = {
  rx: number;
  ry: number;
  rotation: number;
  speed: number;
};

type RingGeometry = {
  cx: number;
  cy: number;
  rings: [ChipRing, ChipRing];
};

type Pulse = {
  chipIndex: number;
  progress: number;
  duration: number;
};

const TWO_PI = Math.PI * 2;
const INNER_RING = {
  rx: 0.36,
  ry: 0.13,
  rotation: -20 * (Math.PI / 180),
  speed: -0.3,
};
const OUTER_RING = {
  rx: 0.47,
  ry: 0.18,
  rotation: 17 * (Math.PI / 180),
  speed: 0.24,
};

const chipColors = [
  "text-lavender border-lavender/50",
  "text-blush border-blush/50",
  "text-lavender border-lavender/50",
  "text-green border-green/50",
  "text-green border-green/50",
  "text-primary border-primary/50",
];

function getRingGeometry(size: number): RingGeometry {
  return {
    cx: size / 2,
    cy: size / 2,
    rings: [
      {
        ...INNER_RING,
        rx: INNER_RING.rx * size,
        ry: INNER_RING.ry * size,
      },
      {
        ...OUTER_RING,
        rx: OUTER_RING.rx * size,
        ry: OUTER_RING.ry * size,
      },
    ],
  };
}

function getChipPosition(
  geometry: RingGeometry,
  ring: ChipRing,
  angle: number,
): { x: number; y: number } {
  const x = Math.cos(angle) * ring.rx;
  const y = Math.sin(angle) * ring.ry;
  const cosRotation = Math.cos(ring.rotation);
  const sinRotation = Math.sin(ring.rotation);

  return {
    x: geometry.cx + x * cosRotation - y * sinRotation,
    y: geometry.cy + x * sinRotation + y * cosRotation,
  };
}

function createPulses(): Pulse[] {
  return Array.from({ length: 5 }, () => ({
    chipIndex: Math.floor(Math.random() * portfolio.personal.heroStack.length),
    progress: Math.random(),
    duration: 1.2,
  }));
}

export default function HeroOrbit() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chipRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const hoveredRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const canvasSize = { value: 0 };
    const colors = {
      lavender: "",
      primary: "",
    };
    const chipSizes: Array<{ width: number; height: number }> = [];
    const pulses = createPulses();
    let animationFrame = 0;
    let elapsed = 0;
    let lastTime = performance.now();
    let speedFactor = 1;
    let visible = true;
    let tabVisible = document.visibilityState === "visible";

    const readColors = () => {
      const styles = getComputedStyle(document.documentElement);
      colors.lavender = styles.getPropertyValue("--lavender").trim();
      colors.primary = styles.getPropertyValue("--primary").trim();
    };

    const resizeCanvas = () => {
      const size = container.getBoundingClientRect().width;
      if (!size) return;

      const devicePixelRatio = window.devicePixelRatio || 1;
      canvasSize.value = size;
      canvas.width = Math.round(size * devicePixelRatio);
      canvas.height = Math.round(size * devicePixelRatio);
      canvas.style.width = `${size}px`;
      canvas.style.height = `${size}px`;
      context.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      chipRefs.current.forEach((chip, index) => {
        if (!chip) return;
        chipSizes[index] = {
          width: chip.offsetWidth,
          height: chip.offsetHeight,
        };
      });
    };

    const resetPulse = (pulse: Pulse) => {
      pulse.chipIndex = Math.floor(
        Math.random() * portfolio.personal.heroStack.length,
      );
      pulse.progress = 0;
      pulse.duration = 1.2;
    };

    const getChipPositionForIndex = (index: number) => {
      const geometry = getRingGeometry(canvasSize.value);
      const ring = geometry.rings[index < 3 ? 0 : 1];
      const ringIndex = index % 3;
      const angle = ringIndex * (TWO_PI / 3) + elapsed * ring.speed;
      return getChipPosition(geometry, ring, angle);
    };

    const draw = () => {
      const size = canvasSize.value;
      if (!size) return;

      const geometry = getRingGeometry(size);
      context.clearRect(0, 0, size, size);
      context.setLineDash([3, 6]);
      context.lineWidth = 1;
      context.strokeStyle = colors.lavender;
      context.globalAlpha = 0.25;

      for (const ring of geometry.rings) {
        context.beginPath();
        context.ellipse(
          geometry.cx,
          geometry.cy,
          ring.rx,
          ring.ry,
          ring.rotation,
          0,
          TWO_PI,
        );
        context.stroke();
      }

      context.setLineDash([]);
      context.globalAlpha = 1;
      if (!mediaQuery.matches) {
        context.fillStyle = colors.primary;

        for (const pulse of pulses) {
          const chipPosition = getChipPositionForIndex(pulse.chipIndex);
          const easedProgress = pulse.progress * pulse.progress;
          const x =
            chipPosition.x + (geometry.cx - chipPosition.x) * easedProgress;
          const y =
            chipPosition.y + (geometry.cy - chipPosition.y) * easedProgress;

          context.globalAlpha = Math.max(0, 1 - pulse.progress);
          context.beginPath();
          context.arc(x, y, 2.5, 0, TWO_PI);
          context.fill();
        }
      }

      context.globalAlpha = 1;
    };

    const positionChips = () => {
      chipRefs.current.forEach((chip, index) => {
        if (!chip) return;

        const geometry = getRingGeometry(canvasSize.value);
        const ring = geometry.rings[index < 3 ? 0 : 1];
        const ringIndex = index % 3;
        const angle = ringIndex * (TWO_PI / 3) + elapsed * ring.speed;
        const position = getChipPosition(geometry, ring, angle);
        const isBehind = Math.sin(angle) < 0;
        const size = chipSizes[index] ?? { width: 0, height: 0 };

        chip.style.transform = `translate(${position.x - size.width / 2}px, ${position.y - size.height / 2}px) scale(${isBehind ? 0.9 : 1})`;
        chip.style.zIndex = isBehind ? "0" : "20";
        chip.style.opacity = isBehind ? "0.55" : "1";
      });
    };

    const render = () => {
      positionChips();
      draw();
    };

    const animate = (time: number) => {
      animationFrame = 0;
      if (!visible || !tabVisible) return;

      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;
      const targetSpeed = hoveredRef.current ? 0.3 : 1;
      speedFactor += (targetSpeed - speedFactor) * Math.min(1, delta * 8);
      elapsed += delta * speedFactor;

      for (const pulse of pulses) {
        pulse.progress += (delta * speedFactor) / pulse.duration;
        if (pulse.progress >= 1) resetPulse(pulse);
      }

      render();
      animationFrame = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (mediaQuery.matches || animationFrame || !visible || !tabVisible) {
        render();
        return;
      }

      lastTime = performance.now();
      animationFrame = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const updateVisibility = (isVisible: boolean) => {
      visible = isVisible;
      if (visible && tabVisible) startAnimation();
      else stopAnimation();
    };

    const handleVisibilityChange = () => {
      tabVisible = document.visibilityState === "visible";
      if (tabVisible && visible) startAnimation();
      else stopAnimation();
    };

    const handleMotionChange = () => {
      stopAnimation();
      render();
      if (!mediaQuery.matches && visible && tabVisible) startAnimation();
    };

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
      render();
    });
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => updateVisibility(entry.isIntersecting),
      { threshold: 0.01 },
    );
    const themeObserver = new MutationObserver(() => {
      readColors();
      render();
    });

    readColors();
    resizeCanvas();
    render();
    chipRefs.current.forEach((chip) => {
      if (chip) chip.style.opacity = "1";
    });
    resizeObserver.observe(container);
    intersectionObserver.observe(container);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    mediaQuery.addEventListener("change", handleMotionChange);
    startAnimation();

    return () => {
      stopAnimation();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      themeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      mediaQuery.removeEventListener("change", handleMotionChange);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative aspect-square w-full max-w-[300px] md:max-w-[460px] mx-auto"
      onPointerEnter={() => {
        hoveredRef.current = true;
      }}
      onPointerLeave={() => {
        hoveredRef.current = false;
      }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 h-full w-full"
        aria-hidden="true"
      />

      <div className="absolute left-1/2 top-1/2 z-[8] h-[53%] w-[53%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/30" />
      <div className="absolute left-1/2 top-1/2 z-10 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-2 border-border bg-[#C5A7F2]">
        <Image
          src="/images/avatar.svg"
          alt={portfolio.personal.fullName}
          fill
          priority
          sizes="(max-width: 768px) 50vw, 230px"
          className="object-cover"
          style={{ imageRendering: "pixelated" }}
        />
      </div>

      {portfolio.personal.heroStack.map((chip, index) => (
        <span
          key={chip}
          ref={(element) => {
            chipRefs.current[index] = element;
          }}
          className={`absolute left-0 top-0 z-0 whitespace-nowrap rounded-full border bg-surface px-3 py-1.5 font-mono text-[10px] opacity-0 will-change-transform md:text-xs ${chipColors[index % chipColors.length]}`}
          aria-hidden="true"
        >
          {chip}
        </span>
      ))}
    </div>
  );
}
