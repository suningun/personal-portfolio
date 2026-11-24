"use client";

import { useEffect, useRef, useState } from "react";
import Card from "@/components/ui/Card";

const intro =
  "I’m a Software Development student in Phnom Penh who loves turning ideas into apps people actually use. Right now I’m learning full-stack development and looking for my first internship.";
const splitAt = intro.indexOf(" Right now");

export default function AboutTerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);
  const timerRef = useRef<number | undefined>(undefined);
  const [text, setText] = useState("");

  useEffect(() => {
    const element = terminalRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setText(intro);
          return;
        }

        let index = 0;
        timerRef.current = window.setInterval(() => {
          index += 1;
          setText(intro.slice(0, index));
          if (index >= intro.length && timerRef.current !== undefined) {
            window.clearInterval(timerRef.current);
            timerRef.current = undefined;
          }
        }, 30);
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

  const firstPart = text.slice(0, splitAt);
  const secondPart = text.slice(splitAt);

  return (
    <Card ref={terminalRef} className="overflow-hidden p-0">
      <div className="flex items-center gap-3 border-b border-border px-5 py-4">
        <span className="h-4 w-4 rounded-full bg-primary" />
        <span className="h-4 w-4 rounded-full bg-blush" />
        <span className="h-4 w-4 rounded-full bg-green" />
        <span className="ml-3 font-mono text-lg text-muted">about.md</span>
      </div>
      <p className="p-7 text-xl font-medium leading-relaxed text-text md:p-9 md:text-2xl">
        {firstPart}
        <span className="text-muted">{secondPart}</span>
        {text.length < intro.length && (
          <span className="ml-1 inline-block h-6 w-1.5 animate-pulse bg-primary align-middle" />
        )}
      </p>
    </Card>
  );
}
