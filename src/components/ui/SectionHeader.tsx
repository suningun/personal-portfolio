"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function SectionHeader({
  command,
  title,
}: {
  command: string;
  title: string;
}) {
  const [typedCommand, setTypedCommand] = useState("");
  const [titleVisible, setTitleVisible] = useState(false);
  const [started, setStarted] = useState(false);
  const [cursorOn, setCursorOn] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const typeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const blinkTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const play = useCallback(() => {
    if (isReducedMotion) {
      setTypedCommand(command);
      setTitleVisible(true);
      setStarted(true);
      return;
    }

    setStarted(true);

    let char = 0;
    const typeNext = () => {
      setTypedCommand(command.slice(0, char));
      char += 1;
      if (char <= command.length) {
        typeTimerRef.current = setTimeout(typeNext, 55);
      } else {
        setTitleVisible(true);
      }
    };
    typeNext();

    blinkTimerRef.current = setInterval(() => {
      setCursorOn((on) => !on);
    }, 500);
  }, [command, isReducedMotion]);

  useEffect(() => {
    const element = headerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          play();
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (typeTimerRef.current) clearTimeout(typeTimerRef.current);
      if (blinkTimerRef.current) clearInterval(blinkTimerRef.current);
    };
  }, [play]);

  return (
    <div ref={headerRef} className="mb-10">
      <p className="font-mono text-sm text-muted" suppressHydrationWarning>
        <span className="text-green">❯</span>{" "}
        <span className="relative inline-block" suppressHydrationWarning>
          {typedCommand}
          {(started || isReducedMotion) && (
            <span
              className="inline-block bg-primary"
              style={{
                width: 7,
                height: 13,
                marginLeft: 2,
                verticalAlign: "middle",
                opacity: isReducedMotion ? 1 : cursorOn ? 1 : 0,
              }}
              aria-hidden="true"
            />
          )}
        </span>
      </p>
      <h2
        className={`mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-text transition-opacity duration-500 ${
          titleVisible ? "opacity-100" : "opacity-0"
        }`}
        suppressHydrationWarning
      >
        {title}
      </h2>
    </div>
  );
}
