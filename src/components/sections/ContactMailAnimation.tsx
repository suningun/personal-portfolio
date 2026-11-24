"use client";

import { Mail } from "lucide-react";

export default function ContactMailAnimation({ active }: { active: boolean }) {
  return (
    <div
      className={`relative h-8 transition-opacity duration-200 ${
        active ? "opacity-100" : "opacity-0"
      }`}
      aria-hidden={!active}
    >
      <div className="absolute left-3 right-8 top-1/2 border-t border-dashed border-primary/60" />
      <span
        className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-primary transition-[left] duration-[900ms] ease-in-out motion-reduce:transition-none"
        style={{ left: active ? "calc(100% - 2rem)" : "0.75rem" }}
      />
      <span className="absolute right-0 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-primary text-primary">
        <Mail className="h-4 w-4" />
      </span>
    </div>
  );
}
