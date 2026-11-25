"use client";

import { Moon, Sun } from "lucide-react";
import { useRef } from "react";

export default function ThemeToggle() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  function toggle() {
    try {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";

      const useTransition =
        typeof document.startViewTransition === "function" &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (useTransition && buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        document.documentElement.style.setProperty(
          "--tx",
          `${rect.left + rect.width / 2}px`,
        );
        document.documentElement.style.setProperty(
          "--ty",
          `${rect.top + rect.height / 2}px`,
        );

        document.startViewTransition(() => {
          document.documentElement.setAttribute("data-theme", next);
          document.documentElement.style.colorScheme = next;
          localStorage.setItem("theme", next);
        });
        return;
      }

      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.style.colorScheme = next;
      localStorage.setItem("theme", next);
    } catch (error) {
      console.error("Unable to toggle theme.", error);
    }
  }

  return (
    <button
      ref={buttonRef}
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
