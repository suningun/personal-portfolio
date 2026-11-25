"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Github, Linkedin, Menu, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";
import ScrollProgress from "@/components/layout/ScrollProgress";

type NavItem = { label: string; id: string };

export default function Navbar() {
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", id: "home" },
      { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
      { label: "Projects", id: "projects" },
      { label: "Experiences", id: "experience" },
      { label: "More", id: "more" },
      { label: "Contact", id: "contact" },
    ],
    []
  );

  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter(Boolean) as HTMLElement[];

    if (!sections.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setActive(visible.target.id);
      },
      {
        threshold: [0.2, 0.35, 0.5, 0.65],
        rootMargin: "-64px 0px -55% 0px",
      }
    );

    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [navItems]);

  // Close mobile menu on hash change (clicking links)
  useEffect(() => {
    const onHash = () => setOpen(false);
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 left-0 w-full z-50 transition-colors duration-300",
        scrolled ? "bg-bg/75 backdrop-blur-md" : "bg-transparent",
      ].join(" ")}
    >
      <div className="border-border">
        {/* 3-column grid => center stays centered */}
          <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">


          {/* Left */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-mono">
              <Image
                src="/images/avatar.svg"
                alt=""
                width={32}
                height={32}
                className="rounded-full"
                style={{ imageRendering: "pixelated" }}
              />
              <span className="text-sm text-text"><span className="text-green">❯</span> suning</span>
            </Link>
          </div>

          {/* Center (desktop nav) */}
          <nav className="hidden md:flex items-center gap-8 text-sm justify-center font-mono">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    "font-mono text-sm hover:text-text transition-colors",
                    isActive ? "text-text" : "text-muted",
                  ].join(" ")}
                >
                  {isActive && (
                    <span className="text-green mr-1" aria-hidden="true">
                      ❯
                    </span>
                  )}
                  <span>{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center justify-end gap-2">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-full hover:bg-surface transition"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="w-5 h-5 text-muted" />
              ) : (
                <Menu className="w-5 h-5 text-muted" />
              )}
            </button>

            <a
              href="https://github.com/suningun"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-surface transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-muted" />
            </a>

            <a
              href="https://www.linkedin.com/in/suning-un-85a439344/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-surface transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-muted" />
            </a>

            {/* ✅ Theme toggle is its own button */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden border-t border-border">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2 font-mono">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      "px-3 py-2 rounded-lg transition",
                      "hover:bg-surface",
                      isActive
                        ? "text-text bg-surface"
                        : "text-muted",
                    ].join(" ")}
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

        <ScrollProgress
          className={`transition-opacity duration-300 ${
            scrolled ? "opacity-100" : "opacity-0"
          }`}
        />
    </header>
  );
}
