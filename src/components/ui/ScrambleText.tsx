"use client";

import { useEffect, useState } from "react";

const CHARS = "!<>-_/[]{}=+*?#01";

interface ScrambleTextProps {
  text: string;
  delay?: number;
  className?: string;
}

export default function ScrambleText({
  text,
  delay = 0,
  className,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      return;
    }

    let rafId: number;
    let startTime: number | null = null;
    const duration = 900;

    const timeoutId = setTimeout(() => {
      const step = (now: number) => {
        if (!startTime) startTime = now;
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const resolveIndex = Math.floor(progress * text.length);

        let scrambled = "";
        for (let i = 0; i < text.length; i++) {
          if (text[i] === " ") {
            scrambled += " ";
          } else if (i < resolveIndex) {
            scrambled += text[i];
          } else {
            const randomIndex = Math.floor(Math.random() * CHARS.length);
            scrambled += CHARS[randomIndex];
          }
        }

        setDisplayText(scrambled);

        if (progress < 1) {
          rafId = requestAnimationFrame(step);
        } else {
          setDisplayText(text);
        }
      };

      rafId = requestAnimationFrame(step);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [text, delay]);

  return <span className={className}>{displayText}</span>;
}

export { ScrambleText };
