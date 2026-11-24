"use client";

import Image from "next/image";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t">
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-6 grid md:grid-cols-[1.5fr_1fr_1fr] gap-10">
        {/* Brand / summary */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/images/avatar.svg"
              alt="Suning Un"
              width={34}
              height={34}
              className="rounded-full"
              style={{ imageRendering: "pixelated" }}
            />
            <span className="font-mono text-sm">
              <span className="text-green">❯</span> suning
            </span>
          </div>
          <p className="text-sm text-muted">
            Software Development student building web apps from the interface to the database.
          </p>
          <p className="font-mono text-xs text-green">● open to internships</p>
        </div>
        {/* Navigation links */}
        <div>
          <p className="font-mono text-xs text-muted mb-2">navigate</p>
          <div className="grid grid-cols-2 gap-y-2 text-sm text-muted">
            <Link href="#home" className="hover:text-text transition">Home</Link>
            <Link href="#about" className="hover:text-text transition">About</Link>
            <Link href="#skills" className="hover:text-text transition">Skills</Link>
            <Link href="#projects" className="hover:text-text transition">Projects</Link>
            <Link href="#experience" className="hover:text-text transition">Experience</Link>
            <Link href="#more" className="hover:text-text transition">More</Link>
            <Link href="#contact" className="hover:text-text transition">Contact</Link>
          </div>
        </div>
        {/* Social / elsewhere */}
        <div>
          <p className="font-mono text-xs text-muted mb-2">elsewhere</p>
          <div className="flex flex-col gap-2 text-sm text-muted">
            {portfolio.personal.socials?.github && (
              <Link href={portfolio.personal.socials.github} target="_blank" rel="noreferrer" className="hover:text-primary transition">
                GitHub ↗
              </Link>
            )}
            {portfolio.personal.socials?.linkedin && (
              <Link href={portfolio.personal.socials.linkedin} target="_blank" rel="noreferrer" className="hover:text-primary transition">
                LinkedIn ↗
              </Link>
            )}
            {portfolio.personal.email && (
              <Link href={`mailto:${portfolio.personal.email}`} className="hover:text-primary transition">
                Email ↗
              </Link>
            )}
          </div>
        </div>
      </div>
      {/* Bottom bar */}
      <div className="border-t font-mono text-xs text-muted flex justify-between items-center max-w-6xl mx-auto px-6 py-4">
        <p>© {year} Suning Un · built with Next.js</p>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-green hover:text-primary transition"
        >
          <span className="font-mono">❯ cd ~</span>
          <span className="text-xl leading-none">↑</span>
        </button>
      </div>
    </footer>
  );
}
