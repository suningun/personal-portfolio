"use client";

import { useEffect, useRef, useState } from "react";
import { portfolio } from "@/data/portfolio";

const getLines = () => [
  `name: ${portfolio.personal.fullName}`,
  `role: ${portfolio.personal.role}`,
  `based in: ${portfolio.personal.location}`,
  `focus: ${portfolio.personal.summary}`,
];

export default function AboutTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const [started, setStarted] = useState(false);
  const [commandText, setCommandText] = useState("");
  const [output, setOutput] = useState("");
  const [commandDone, setCommandDone] = useState(false);
  const timerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const element = terminalRef.current;
    if (!element) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lines = getLines();
    const finalOutput = lines.join("\n");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        setStarted(true);

        if (reducedMotion) {
          setCommandText("❯ cat about.md");
          setCommandDone(true);
          setOutput(finalOutput);
          observer.disconnect();
          return;
        }

        let index = 0;
        let line = 0;
        const command = "❯ cat about.md";
        timerRef.current = window.setInterval(() => {
          if (index < command.length) {
            index += 1;
            setCommandText(command.slice(0, index));
            if (index === command.length) {
              setCommandDone(true);
              index = 0;
            }
            return;
          }

          const current = lines[line];
          index += 1;
          setOutput(lines.slice(0, line).join("\n") + (line > 0 ? "\n" : "") + current.slice(0, index));

          if (index >= current.length) {
            line += 1;
            index = 0;
            if (line >= lines.length && timerRef.current !== undefined) {
              window.clearInterval(timerRef.current);
              timerRef.current = undefined;
            }
          }
        }, 30);

        observer.disconnect();
      },
      { threshold: 0.15 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (timerRef.current !== undefined) {
        window.clearInterval(timerRef.current);
      }
    };
  }, []);

  const lines = getLines();
  const outputLines = output.split("\n");

  return (
    <div
      ref={terminalRef}
      className="rounded-xl border border-border bg-surface overflow-hidden font-mono text-sm"
    >
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
        <span className="h-2.5 w-2.5 rounded-full bg-blush" />
        <span className="h-2.5 w-2.5 rounded-full bg-green" />
        <span className="ml-2 text-muted">about.md</span>
      </div>
      <div className="min-h-40 p-5 text-muted">
        <p className="text-green">
          {commandText}
          {!commandDone && started && <span className="animate-pulse">▮</span>}
        </p>
        <div className="mt-2 whitespace-pre-wrap">
          {outputLines.map((line, index) => (
            <p
              key={`${line}-${index}`}
              className={index === lines.length - 1 ? "text-primary" : "text-text"}
            >
              {line}
            </p>
          ))}
          {commandDone && (
            <span className="text-primary animate-pulse">▮</span>
          )}
        </div>
      </div>
    </div>
  );
}
