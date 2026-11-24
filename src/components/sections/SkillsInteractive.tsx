"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import type { PointerEvent } from "react";
import { portfolio, type Skill, type SkillCategory } from "@/data/portfolio";
import Card from "@/components/ui/Card";
import Chip from "@/components/ui/Chip";

const IDLE_TEXT = "hover a skill to see it in action";
const TOKEN_PATTERN =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`|\b(?:const|let|return|export|function|type|SELECT|FROM|WHERE|def|print|git)\b|\b\d+(?:\.\d+)?\b)/gi;

function SyntaxHighlightedText({ text }: { text: string }) {
  const parts = text.split(TOKEN_PATTERN);

  return (
    <>
      {parts.map((part, index) => {
        if (!part) return null;
        if (/^["'`]/.test(part)) {
          return <span key={index} className="text-green">{part}</span>;
        }
        if (/^\d+(?:\.\d+)?$/.test(part)) {
          return <span key={index} className="text-primary">{part}</span>;
        }
        if (/^(const|let|return|export|function|type|SELECT|FROM|WHERE|def|print|git)$/i.test(part)) {
          return <span key={index} className="text-lavender">{part}</span>;
        }
        return <span key={index} className="text-text">{part}</span>;
      })}
    </>
  );
}

function getSkillKey(category: SkillCategory, skill: Skill) {
  return `${category.title}:${skill.name}`;
}

export default function SkillsInteractive() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const typingTimer = useRef<number | undefined>(undefined);
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [entered, setEntered] = useState(false);
  const [activeKey, setActiveKey] = useState<string | null>(null);
  const [terminalText, setTerminalText] = useState(IDLE_TEXT);
  const [isTyping, setIsTyping] = useState(false);

  const prefersReducedMotion = () =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const typeText = useCallback((text: string) => {
    if (typingTimer.current !== undefined) {
      window.clearInterval(typingTimer.current);
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTerminalText(text);
      setIsTyping(false);
      return;
    }

    setTerminalText("");
    setIsTyping(true);
    let index = 0;
    typingTimer.current = window.setInterval(() => {
      index += 1;
      setTerminalText(text.slice(0, index));
      if (index >= text.length && typingTimer.current !== undefined) {
        window.clearInterval(typingTimer.current);
        typingTimer.current = undefined;
        setIsTyping(false);
      }
    }, 22);
  }, []);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setEntered(true);
        typeText(IDLE_TEXT);
        observer.disconnect();
      },
      { threshold: 0.25 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      if (typingTimer.current !== undefined) {
        window.clearInterval(typingTimer.current);
      }
    };
  }, [typeText]);

  const selectSkill = (category: SkillCategory, skill: Skill) => {
    setActiveKey(getSkillKey(category, skill));
    typeText(skill.snippet);
  };

  const handleChipMove = (
    event: React.PointerEvent<HTMLButtonElement>,
    key: string,
  ) => {
    if (
      event.pointerType === "touch" ||
      prefersReducedMotion() ||
      !window.matchMedia("(pointer: fine)").matches
    ) {
      return;
    }

    const chip = chipRefs.current[key];
    if (!chip) return;
    const bounds = chip.getBoundingClientRect();
    const dx = event.clientX - (bounds.left + bounds.width / 2);
    const dy = event.clientY - (bounds.top + bounds.height / 2);
    chip.style.transition = "transform 80ms ease-out";
    chip.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px)`;
  };

  const resetChip = (key: string) => {
    const chip = chipRefs.current[key];
    if (!chip) return;
    chip.style.transition =
      "transform 420ms cubic-bezier(.34,1.56,.64,1)";
    chip.style.transform = "translate(0px, 0px)";
  };

  const categoryStarts = portfolio.skills.map((category, categoryIndex) =>
    portfolio.skills
      .slice(0, categoryIndex)
      .reduce((count, previous) => count + previous.items.length, 0),
  );

  return (
    <div ref={sectionRef}>
      <div className="grid gap-3 md:grid-cols-3">
        {portfolio.skills.map((category, categoryIndex) => {
          const categoryDelay = categoryIndex * 110;
          const isLanguages = category.title === "Languages";

          return (
            <Card
              key={category.title}
              className={`group relative overflow-hidden transition-[opacity,transform] duration-700 ${
                isLanguages ? "md:col-span-2" : ""
              } ${
                hydrated && !entered
                  ? "translate-y-4 opacity-0"
                  : "translate-y-0 opacity-100"
              } motion-reduce:translate-y-0 motion-reduce:opacity-100`}
              style={{ transitionDelay: `${categoryDelay}ms` }}
              onPointerMove={(event) => {
                const card = event.currentTarget;
                const bounds = card.getBoundingClientRect();
                card.style.setProperty("--x", `${event.clientX - bounds.left}px`);
                card.style.setProperty("--y", `${event.clientY - bounds.top}px`);
              }}
            >
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(220px circle at var(--x) var(--y), color-mix(in srgb, var(--primary) 13%, transparent), transparent 70%)",
                }}
              />
              <h3 className="relative text-base font-medium text-text">
                {category.title}
              </h3>
              <div className="relative mt-5 flex flex-wrap gap-2.5">
                {category.items.map((skill, index) => {
                  const key = getSkillKey(category, skill);
                  const currentIndex = categoryStarts[categoryIndex] + index;
                  const isActive = activeKey === key;

                  return (
                    <Chip
                      key={skill.name}
                      ref={(node) => {
                        chipRefs.current[key] = node;
                      }}
                      type="button"
                      className={`px-3.5 py-1.5 transition-colors ${
                        isActive
                          ? "border-primary bg-primary !text-on-primary"
                          : "border-border bg-bg text-text hover:border-primary hover:bg-primary hover:!text-on-primary"
                      } ${
                        hydrated && !entered
                          ? "scale-[.85] opacity-0"
                          : "scale-100 opacity-100"
                      } motion-reduce:scale-100 motion-reduce:opacity-100`}
                      style={{
                        transitionDelay: `${categoryDelay + currentIndex * 45}ms`,
                        transitionProperty: "transform, opacity, background-color, color",
                        transitionTimingFunction: "cubic-bezier(.34,1.56,.64,1)",
                      }}
                      onPointerMove={(event: PointerEvent<HTMLButtonElement>) =>
                        handleChipMove(event, key)
                      }
                      onPointerLeave={() => resetChip(key)}
                      onFocus={() => selectSkill(category, skill)}
                      onMouseEnter={() => selectSkill(category, skill)}
                      onClick={() => selectSkill(category, skill)}
                    >
                      {skill.name}
                    </Chip>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="mt-6 flex min-w-0 items-center gap-3 overflow-hidden p-3 md:p-3">
        <span className="shrink-0 text-green">❯</span>
        <span
          aria-live="polite"
          className="min-w-0 truncate font-mono text-sm text-text"
        >
          {activeKey ? (
            <SyntaxHighlightedText text={terminalText} />
          ) : (
            terminalText
          )}
        </span>
        <span
          className={`h-3.5 w-[7px] shrink-0 bg-primary ${
            isTyping ? "animate-pulse" : "animate-pulse"
          }`}
          aria-hidden="true"
        />
        <span className="ml-auto hidden shrink-0 font-mono text-xs lowercase text-muted sm:inline">
          {activeKey
            ? activeKey.replace(":", " · ")
            : "skills · portfolio"}
        </span>
      </Card>
    </div>
  );
}
