"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark =
      window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ?? false;
    const initial: "light" | "dark" = saved ?? (prefersDark ? "dark" : "light");

    setTheme(initial);
    document.documentElement.setAttribute("data-theme", initial);
    document.documentElement.style.colorScheme = initial;

    function onStorage(e: StorageEvent) {
      if (e.key !== "theme") return;
      const next =
        (e.newValue as "light" | "dark" | null) ??
        (prefersDark ? "dark" : "light");
      setTheme(next);
      document.documentElement.setAttribute("data-theme", next);
      document.documentElement.style.colorScheme = next;
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  function toggle() {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    document.documentElement.style.colorScheme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-full hover:bg-white/10 transition-transform duration-300 active:rotate-180"
      aria-label="Toggle theme"
      type="button"
    >
      {theme === "light" ? (
        <Moon className="w-5 h-5 text-[var(--muted)]" />
      ) : (
        <Sun className="w-5 h-5 text-[var(--muted)]" />
      )}
    </button>
  );
}
