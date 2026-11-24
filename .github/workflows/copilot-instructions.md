# Portfolio conventions
- Next.js 16 App Router, TypeScript, Tailwind 4, output: "export" (static). No new deps.
- Theme tokens only (no hex): bg, surface, border, text, muted, primary, on-primary,
  lavender, blush, green. Fonts: font-sans (Geist) for text, font-mono (Geist Mono)
  only for labels, buttons, chips, dates.
- Reuse: SectionHeader {command,title}, Card, Chip, Button (primary/outline), Reveal.
- Section eyebrow = "❯ command" (❯ in text-green). Sub-headings in pages = "## name" mono.
- Cards: rounded-2xl bg-surface border-border; hover -translate-y-1, lighter border,
  title → text-primary, "→" slides in.
- Links: font-mono text-lavender hover:text-primary.
- Animations: subtle, transform/opacity only, respect prefers-reduced-motion.
- Data lives in src/data/*.ts. Server components by default; "use client" only when needed.
- Always finish with: npm run lint && npm run build.