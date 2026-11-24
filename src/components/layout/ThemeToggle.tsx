"use client";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  function toggle() {
    try {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.style.colorScheme = next;
      localStorage.setItem("theme", next);
    } catch (error) {
      console.error("Unable to toggle theme.", error);
    }
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-surface transition-transform duration-300 active:rotate-180"
      aria-label="Toggle theme"
      type="button"
    >
      <Moon
        className="w-5 h-5 text-muted in-data-[theme=dark]:hidden"
      />
      <Sun
        className="hidden w-5 h-5 text-muted in-data-[theme=dark]:block"
      />
    </button>
  );
}
