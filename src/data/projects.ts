export type ProjectCategory = "Web" | "AI" | "Design";

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  year: number;
  color: "primary" | "lavender" | "blush" | "green";
  featured?: boolean;
  sample?: boolean;
  award?: string;
  tech: string[];
  role: string;
  team: string;
  status: string;
  links: {
    demo?: string;
    source?: string;
  };
  overview: string;
  whatIDid: string[];
  challenges: string;
  learned: string;
  results?: string;
};

export const projects: Project[] = [
  {
    slug: "dermis-ai",
    title: "Dermis AI",
    tagline: "Spot skin conditions early from a single photo.",
    category: "AI",
    year: 2025,
    color: "blush",
    featured: true,
    award: "Techo Sen Award, 3rd of 11",
    tech: ["Teachable Machine", "Framer", "Figma"],
    role: "AI model and UI",
    team: "4 people",
    status: "Live",
    links: { demo: "https://vibrant-illuminate-985343.framer.app/" },
    overview:
      "Dermis AI is an educational skin-health concept that helps people explore possible skin conditions from a photo.",
    whatIDid: [
      "Trained the image model in Teachable Machine",
      "Designed the screens and interaction flow in Figma",
      "Built and published the site in Framer",
    ],
    challenges:
      "Making an AI result feel understandable and reassuring without overstating what a model can diagnose.",
    learned:
      "How to turn a machine-learning prototype into a focused product story with clear user feedback.",
    results: "Placed 3rd out of 11 teams in the AI For Education Competition 2025.",
  },
  {
    slug: "portfolio",
    title: "Personal Portfolio",
    tagline: "A terminal-themed portfolio built from scratch.",
    category: "Web",
    year: 2026,
    color: "lavender",
    featured: true,
    tech: ["Next.js", "React", "Tailwind CSS"],
    role: "Full-stack developer",
    team: "Solo",
    status: "Live",
    links: {
      demo: "https://suningun.vercel.app/",
      source: "https://github.com/suningun/personal-portfolio",
    },
    overview:
      "A personal site designed to present my work, experience, and learning journey through a playful terminal-inspired interface.",
    whatIDid: [
      "Designed and built the responsive interface",
      "Added theme-aware motion and interactive sections",
      "Configured static export, metadata, sitemap, and deployment",
    ],
    challenges:
      "Balancing expressive motion with fast loading, accessibility, and a clear reading hierarchy.",
    learned:
      "How to build reusable UI primitives and keep a growing Next.js site consistent.",
    results: "A fast static portfolio that is easy to update as new work ships.",
  },
  {
    slug: "bootcamp-mvp",
    title: "Bootcamp MVP",
    tagline: "An MVP for an industry partner's real problem.",
    category: "Web",
    year: 2026,
    color: "green",
    featured: true,
    sample: true,
    tech: ["React", "NestJS", "SQL"],
    role: "Full-stack developer",
    team: "Bootcamp team",
    status: "Prototype",
    links: {},
    overview:
      "A sample product concept created during a fast-paced full-stack bootcamp sprint.",
    whatIDid: ["Mapped the user flow", "Built the core screens", "Connected the first API flow"],
    challenges: "Turning a broad problem statement into a useful MVP in one week.",
    learned: "How to communicate trade-offs and prioritize a small but testable product.",
  },
  {
    slug: "campus-events",
    title: "Campus Events Board",
    tagline: "Find and RSVP to club events in one place.",
    category: "Web",
    year: 2026,
    color: "blush",
    featured: true,
    sample: true,
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: "Frontend developer",
    team: "Solo",
    status: "Concept",
    links: {},
    overview: "A focused event board for discovering student activities and saving a place.",
    whatIDid: ["Designed the event browsing flow", "Created responsive event cards", "Added RSVP states"],
    challenges: "Keeping event information scannable while still feeling welcoming.",
    learned: "How small interaction details can make a utility interface feel more human.",
  },
  {
    slug: "plant-doctor",
    title: "Plant Doctor",
    tagline: "Classify leaf diseases from a photo.",
    category: "AI",
    year: 2026,
    color: "green",
    sample: true,
    tech: ["Python", "Teachable Machine", "React"],
    role: "ML prototype developer",
    team: "Solo",
    status: "Concept",
    links: {},
    overview: "A sample computer-vision concept that helps gardeners understand common plant problems.",
    whatIDid: ["Prepared a simple image dataset", "Prototyped classification results", "Designed a clear result screen"],
    challenges: "Communicating confidence and limitations without confusing a first-time user.",
    learned: "How data quality affects the usefulness of even a small ML experiment.",
  },
  {
    slug: "khmer-flashcards",
    title: "Khmer Flashcards",
    tagline: "Learn Khmer words with spaced repetition.",
    category: "Web",
    year: 2025,
    color: "lavender",
    sample: true,
    tech: ["React", "JavaScript", "CSS"],
    role: "Product designer and developer",
    team: "Solo",
    status: "Concept",
    links: {},
    overview: "A lightweight vocabulary practice tool for building a daily Khmer-learning habit.",
    whatIDid: ["Designed the practice flow", "Created reusable flashcard states", "Added progress feedback"],
    challenges: "Making repetition feel rewarding instead of repetitive.",
    learned: "How to design a small loop around a clear learning goal.",
  },
  {
    slug: "volunteer-hub",
    title: "Volunteer Hub",
    tagline: "Sign-ups and shift tracking for volunteers.",
    category: "Web",
    year: 2025,
    color: "primary",
    sample: true,
    tech: ["Next.js", "TypeScript", "SQL"],
    role: "Full-stack developer",
    team: "Solo",
    status: "Concept",
    links: {},
    overview: "A sample coordination tool for organizing people, shifts, and event responsibilities.",
    whatIDid: ["Mapped volunteer and organizer flows", "Designed shift states", "Built the dashboard concept"],
    challenges: "Showing scheduling information clearly across different roles.",
    learned: "How role-based views can simplify a complex operational workflow.",
  },
  {
    slug: "cafe-ordering",
    title: "Café Ordering UI",
    tagline: "A mobile ordering flow prototype.",
    category: "Design",
    year: 2025,
    color: "blush",
    sample: true,
    tech: ["Figma", "Framer", "UI Design"],
    role: "Product designer",
    team: "Solo",
    status: "Prototype",
    links: {},
    overview: "A sample mobile ordering experience focused on quick selection and clear order status.",
    whatIDid: ["Created the visual direction", "Prototyped the ordering journey", "Tested layout variations"],
    challenges: "Reducing friction between browsing a menu and confirming an order.",
    learned: "How a strong visual hierarchy can make a short flow feel effortless.",
  },
  {
    slug: "study-timer",
    title: "Study Timer",
    tagline: "A Pomodoro timer with simple focus stats.",
    category: "Web",
    year: 2024,
    color: "lavender",
    sample: true,
    tech: ["JavaScript", "CSS", "HTML"],
    role: "Frontend developer",
    team: "Solo",
    status: "Concept",
    links: {},
    overview: "A calm timer concept for building a repeatable study rhythm.",
    whatIDid: ["Designed the timer states", "Added focus and break modes", "Created a compact stats view"],
    challenges: "Keeping the interface quiet while making the current state obvious.",
    learned: "How to use motion and spacing to support concentration.",
  },
  {
    slug: "library-finder",
    title: "Library Finder",
    tagline: "Search books across campus libraries.",
    category: "Web",
    year: 2024,
    color: "green",
    sample: true,
    tech: ["React", "API", "Tailwind CSS"],
    role: "Frontend developer",
    team: "Solo",
    status: "Concept",
    links: {},
    overview: "A sample search experience for finding books and checking their availability.",
    whatIDid: ["Designed search and filter states", "Created book result cards", "Added empty and loading states"],
    challenges: "Making a large set of results easy to scan on a small screen.",
    learned: "How thoughtful states make search tools feel reliable.",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
