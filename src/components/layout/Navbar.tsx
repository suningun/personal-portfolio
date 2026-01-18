"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Github, Linkedin, Menu, Settings, X } from "lucide-react";
import ThemeToggle from "@/components/layout/ThemeToggle";

type NavItem = { label: string; id: string };

export default function Navbar() {
  const navItems: NavItem[] = useMemo(
    () => [
      { label: "Home", id: "home" },
      { label: "About", id: "about" },
        { label: "Skills", id: "skills" },
      { label: "Projects", id: "projects" },
      { label: "Experiences", id: "experience" },
      { label: "Contact", id: "contact" },
    ],
    []
  );

  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);

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
    <header className="fixed top-0 left-0 w-full z-50">
      <div className="bg-[color:var(--bg)]/60 backdrop-blur-md border-b border-[var(--border)]">
        {/* 3-column grid => center stays centered */}
          <div className="max-w-6xl mx-auto px-6 h-16 grid grid-cols-[1fr_auto] md:grid-cols-[1fr_auto_1fr] items-center">


          {/* Left */}
          <div className="flex items-center">
            <Link href="/" className="font-semibold text-xl tracking-wide">

              <span className="text-[var(--primary)]">SUNING UN</span>
            
            </Link>
          </div>

          {/* Center (desktop nav) */}
          <nav className="hidden md:flex items-center gap-8 text-sm justify-center">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={[
                    "relative px-2 py-1 transition",
                    "hover:text-[var(--text)]",
                    isActive ? "text-[var(--text)]" : "text-[var(--muted)]",
                  ].join(" ")}
                >
                  {isActive && (
                    <span className="pointer-events-none absolute -inset-1 sm:-inset-1 rounded-full border border-[var(--primary)]/70" />
                  )}
                  <span className="relative">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Right */}
          <div className="flex items-center justify-end gap-2">
            {/* Mobile menu button */}
            <button
              type="button"
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <X className="w-5 h-5 text-[var(--muted)]" />
              ) : (
                <Menu className="w-5 h-5 text-[var(--muted)]" />
              )}
            </button>

            <a
              href="https://github.com/suningun"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 transition"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-[var(--muted)]" />
            </a>

            <a
              href="https://www.linkedin.com/in/suning-un-85a439344/"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex p-2 rounded-full hover:bg-white/10 transition"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-[var(--muted)]" />
            </a>

            {/* ✅ Theme toggle is its own button */}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div className="md:hidden border-t border-[var(--border)]">
            <div className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = active === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={[
                      "px-3 py-2 rounded-lg transition",
                      "hover:bg-white/5",
                      isActive
                        ? "text-[var(--text)] bg-white/5"
                        : "text-[var(--muted)]",
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
    </header>
  );
}
