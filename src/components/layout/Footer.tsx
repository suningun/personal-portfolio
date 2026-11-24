"use client";

import { portfolio } from "@/data/portfolio";
import { useEffect, useState } from "react";

const linksLeft = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const linksRight = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setShowBackToTop(window.scrollY > 600);
    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  return (
    <footer className="relative mt-20 border-t border-border">
      {/* top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand / summary */}
          <div className="space-y-4">
            <div className="font-semibold text-2xl tracking-wide">
              <span className="text-primary">SUNING UN</span>
            </div>

            <p className="text-base md:text-lg leading-relaxed text-muted max-w-sm">
              {portfolio.personal.summary ??
                "Crafting beautiful, functional, and scalable web applications with passion and precision."}
            </p>
          </div>

          {/* Quick links */}
          <div className="md:justify-self-center">
            <h4 className="text-xl font-semibold text-text">
              Quick Links
            </h4>

            <div className="mt-4 grid grid-cols-2 gap-x-12 gap-y-3 text-muted">
              {linksLeft.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="hover:text-text transition"
                >
                  {l.label}
                </a>
              ))}
              {linksRight.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="hover:text-text transition"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:justify-self-end">
            <h4 className="text-xl font-semibold text-text">
              Get in Touch
            </h4>

            <div className="mt-4 space-y-3 text-muted">
              {portfolio.personal.email && (
                <a
                  className="block hover:text-text transition break-all"
                  href={`mailto:${portfolio.personal.email}`}
                >
                  {portfolio.personal.email}
                </a>
              )}

              {portfolio.personal.location && (
                <p className="block">{portfolio.personal.location}</p>
              )}

              {portfolio.personal.phone && (
                <a
                  className="block hover:text-text transition"
                  href={`tel:${portfolio.personal.phone}`}
                >
                  {portfolio.personal.phone}
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row gap-4 items-center justify-between text-muted text-sm font-mono">
          <p>
            © {year} {portfolio.personal.name}
          </p>

          <div className="flex items-center gap-6">
            <p>Built with Next.js &amp; Tailwind CSS</p>
          </div>
        </div>
      </div>

      {/* back to top */}
      <a
        href="#home"
        className={`fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full inline-flex items-center justify-center bg-primary text-on-primary hover:scale-105 active:scale-95 transition-opacity ${showBackToTop ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        aria-label="Back to top"
      >
        <span className="text-2xl leading-none">↑</span>
      </a>
    </footer>
  );
}
