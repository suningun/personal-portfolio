"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  portfolio,
  type AccentColor,
  type AdditionalInfoItem,
} from "@/data/portfolio";

const accents: Record<
  AccentColor,
  { text: string; border: string; fill: string }
> = {
  primary: {
    text: "text-primary",
    border: "border-primary",
    fill: "bg-primary",
  },
  lavender: {
    text: "text-lavender",
    border: "border-lavender",
    fill: "bg-lavender",
  },
  green: {
    text: "text-green",
    border: "border-green",
    fill: "bg-green",
  },
  blush: {
    text: "text-blush",
    border: "border-blush",
    fill: "bg-blush",
  },
};

const FADE = 24;

function maskFor(left: boolean, right: boolean) {
  const leftStops = left
    ? `transparent 0px, black ${FADE}px`
    : "black 0px";
  const rightStops = right
    ? `black calc(100% - ${FADE}px), transparent 100%`
    : "black 100%";

  return `linear-gradient(to right, ${leftStops}, ${rightStops})`;
}

function SubHeading({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="mb-5 flex items-center gap-4">
      <h3 className="text-base font-medium text-text">{title}</h3>
      <div className="h-px flex-1 bg-border" />
      {children}
    </div>
  );
}

function LanguagesGroup() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const element = gridRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const languages = portfolio.languages ?? [];

  return (
    <div>
      <SubHeading title="Languages" />

      <div ref={gridRef} className="grid gap-8 md:grid-cols-3">
        {languages.map((language, index) => {
          const accent = accents[language.color];

          return (
            <div key={language.name}>
              <h4 className="text-base font-medium text-text">
                {language.name}
              </h4>
              <p className="font-mono text-xs text-muted">{language.level}</p>

              <div
                className="mt-3 h-1 overflow-hidden rounded-full bg-border"
                role="img"
                aria-label={`${language.name}: ${language.level}, ${language.proficiency}%`}
              >
                <div
                  className={`h-full rounded-full ${accent.fill} transition-[width] duration-1000 ease-out motion-reduce:w-[var(--bar-fill)]! motion-reduce:transition-none`}
                  style={
                    {
                      width: active ? `${language.proficiency}%` : "0%",
                      transitionDelay: `${index * 150}ms`,
                      "--bar-fill": `${language.proficiency}%`,
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function InfoStrip({
  title,
  items,
  className = "",
}: {
  title: string;
  items: AdditionalInfoItem[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef({
    active: false,
    startX: 0,
    startScroll: 0,
  });
  const [revealed, setRevealed] = useState(false);
  const [fades, setFades] = useState({ left: false, right: false });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateFades = () => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const next = {
        left: track.scrollLeft > 1,
        right: track.scrollLeft < maxScroll - 1,
      };
      setFades((current) =>
        current.left === next.left && current.right === next.right
          ? current
          : next,
      );
    };

    updateFades();
    track.addEventListener("scroll", updateFades, { passive: true });
    window.addEventListener("resize", updateFades);

    return () => {
      track.removeEventListener("scroll", updateFades);
      window.removeEventListener("resize", updateFades);
    };
  }, []);

  const scrollByItem = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;

    const first = track.firstElementChild as HTMLElement | null;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 20;
    const distance = (first?.offsetWidth ?? 200) + gap;

    track.scrollBy({ left: direction * distance, behavior: "smooth" });
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || event.button !== 0) return;

    const track = trackRef.current;
    if (!track) return;

    dragRef.current = {
      active: true,
      startX: event.clientX,
      startScroll: track.scrollLeft,
    };
    track.style.scrollBehavior = "auto";
    track.setPointerCapture(event.pointerId);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    event.preventDefault();
    track.scrollLeft =
      dragRef.current.startScroll - (event.clientX - dragRef.current.startX);
  };

  const endDrag = (event: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track || !dragRef.current.active) return;

    dragRef.current.active = false;
    track.style.scrollBehavior = "";

    if (track.hasPointerCapture(event.pointerId)) {
      track.releasePointerCapture(event.pointerId);
    }
  };

  const maskImage = maskFor(fades.left, fades.right);

  return (
    <div className={className}>
      <SubHeading title={title}>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label={`Scroll ${title} left`}
            onClick={() => scrollByItem(-1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label={`Scroll ${title} right`}
            onClick={() => scrollByItem(1)}
            className="grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-primary hover:text-primary"
          >
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </SubHeading>

      <div
        ref={trackRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className="flex cursor-grab snap-x snap-mandatory items-stretch gap-5 overflow-x-auto scroll-smooth py-1 [-ms-overflow-style:none] [scrollbar-width:none] select-none active:cursor-grabbing [&::-webkit-scrollbar]:hidden"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        {items.map((item, index) => (
          <div
            key={`${item.title}-${item.date}`}
            className={`w-[200px] shrink-0 snap-start transition-[opacity,transform] duration-700 ease-out ${
              revealed
                ? "translate-x-0 opacity-100"
                : "translate-x-6 opacity-0"
            } motion-reduce:translate-none motion-reduce:opacity-100`}
            style={{ transitionDelay: `${index * 60}ms` }}
          >
            <div
              className={`h-full border-l-2 pl-4 transition-[transform,border-width] duration-300 ease-out motion-safe:hover:-translate-y-1 hover:border-l-4 ${accents[item.color].border}`}
            >
              <p
                className={`whitespace-nowrap text-lg font-medium md:text-xl ${accents[item.color].text}`}
              >
                {item.result}
              </p>
              <p className="mt-2 text-sm font-medium text-text">{item.title}</p>
              <p className="text-xs text-muted">{item.detail}</p>
              <p className="mt-2.5 font-mono text-xs text-muted">
                {item.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MoreAboutMe() {
  const { achievements, volunteering } = portfolio.additionalInfo;
  const hasLanguages = (portfolio.languages?.length ?? 0) > 0;

  if (!hasLanguages && achievements.length === 0 && volunteering.length === 0) {
    return null;
  }

  return (
    <section id="more" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
        <SectionHeader command="cat more.md" title="More about me" />

        {hasLanguages && <LanguagesGroup />}

        {achievements.length > 0 && (
          <InfoStrip
            className="mt-14"
            title="Achievements"
            items={achievements}
          />
        )}

        {volunteering.length > 0 && (
          <InfoStrip
            className="mt-14"
            title="Volunteering"
            items={volunteering}
          />
        )}
      </div>
    </section>
  );
}
