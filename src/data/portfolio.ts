// src/data/portfolio.ts

export type SocialLinks = {
  github?: string;
  linkedin?: string;
  facebook?: string;
  twitter?: string;
  website?: string;
};

export type Experience = {
  company: string;
  title: string;
  location?: string;
  start: string;
  end: string;
  summary: string;
  bullets: string[];
  description: string[];
  tech?: string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  summary: string;
  location: string;
  details?: string[];
};

export type Skill = {
  name: string;
  snippet: string;
};

export type SkillCategory = {
  title: string;
  items: Skill[];
};

export type AccentColor = "primary" | "lavender" | "green" | "blush";

export type Language = {
  name: string;
  level: string;
  proficiency: number;
  color: AccentColor;
};

export type AdditionalInfoItem = {
  result: string;
  title: string;
  detail: string;
  date: string;
  color: AccentColor;
};

export type Reference = {
  name: string;
  title: string;
  organization: string;
  phone?: string;
  email?: string;
};

export type PortfolioData = {
  personal: {
    fullName: string;
    github: string;
    name: string;
    role: string;
    location: string;
    email: string;
    summary: string;
    socials: SocialLinks;
    phone: string;
    img: string;
    heroStack: string[];
  };

  skills: SkillCategory[];

  experience: Experience[];
  education: Education[];
  languages?: Language[];
  achievements: string[];

  additionalInfo: {
    achievements: AdditionalInfoItem[];
    volunteering: AdditionalInfoItem[];
  };

  extras?: {
    certifications?: string[];
    volunteering?: string[];
    interests?: string[];
  };
};

export const SITE_URL = "https://suningun.vercel.app";

export const portfolio: PortfolioData = {
  personal: {
    fullName: "Suning Un",
    github: "https://github.com/suningun",
    name: "Suning",
    role: "Software Developer",
    location: "Phnom Penh, Cambodia",
    email: "suningun55555@gmail.com",
    summary: "I build clean, fast, and modern web applications focused on performance, usability, and thoughtful design.",
    socials: {
      github: "https://github.com/suningun",
      linkedin: "https://www.linkedin.com/in/suning-un-85a439344/"
    },
    phone: "+855 70 833 235",
    img: "/images/ing.webp",
    heroStack: ["React", "Next.js", "Tailwind", "NestJS", "SQL", "Git"],
  },

  skills: [
    {
      title: "Languages",
      items: [
        { name: "HTML", snippet: "<h1>Hello, I'm Suning</h1>" },
        { name: "CSS", snippet: ".card { border-radius: 16px; }" },
        { name: "JavaScript", snippet: "const stack = [...frontend, ...backend];" },
        { name: "TypeScript", snippet: "type Dev = { name: string; stack: string[] };" },
        { name: "Python", snippet: "print(model.predict(image))" },
        { name: "Java", snippet: 'System.out.println("Hello, AUPP");' },
        { name: "SQL", snippet: "SELECT name FROM projects WHERE live = 1;" },
      ],
    },
    {
      title: "Frameworks",
      items: [
        { name: "React", snippet: '<SkillCard skill="React" />' },
        { name: "Next.js", snippet: "export default function Page() { ... }" },
        { name: "Tailwind CSS", snippet: 'className="rounded-full bg-primary"' },
      ],
    },
    {
      title: "Design",
      items: [
        { name: "Figma", snippet: "frame → auto layout → prototype" },
        { name: "Framer", snippet: "publish → dermis-ai.framer.app" },
      ],
    },
    {
      title: "AI and ML",
      items: [
        { name: "Teachable Machine", snippet: "upload images → train → export model" },
      ],
    },
    {
      title: "Tools",
      items: [
        { name: "Git", snippet: 'git commit -m "feat: skills section"' },
        { name: "GitHub", snippet: "git push origin main" },
        { name: "Vercel", snippet: "vercel --prod   ✓ deployed" },
      ],
    },
  ],



  experience: [
    {
      company: "Sisters of Code",
      title: "Paid Part-Time Trainer",
      location: "Hybrid",
      start: "2025",
      end: "Present",
      summary: "Teaching students in Phnom Penh and Takeo to code with Scratch, HTML and CSS, plus online safety and AI basics.",
      description:["Teaching students at Phnom Penh / Takeo Province"],
      bullets: [
        "Establish Sisters of Code Club",
        "Taught computer literacy, online safety, and digital identity protection",
        "Provided hands-on coding instruction using Code.org, Scratch, WIX, HTML & CSS",
        "Introduced students to AI fundamentals & emerging technologies.",
        "Assess student progress and provide constructive feedback",
      ],
      tech: ["HTML", "CSS", "Wix Website"],
    },
        {
      company: "DICHI Academy x ELIX (ATC)",
      title: "Techpreneur Trainee - Full Stack Track, Cohort 2",
      location: "Phnom Penh",
      start: "July 2026",
      end: "Present",
      summary: "Building full-stack apps and an MVP for real industry problems in fast one-week sprints.",
      description:["Full Stack Development & Entrepreneurship"],
      bullets: [
          "Selected for fully-funded 7-month Techpreneur Bootcamp 2.0, one of 60 chosen from 1,100+ applicants",
          "Training in front-end, back-end, Database, and UX/UI design as part of Full Stack track",
          "Participating in rapid ideation challenges, solving real business problems for industry partners within one-week sprints",
          "Building entrepreneurial competencies including problem-solving, design thinking, and product development",
          "Working toward building a Minimum Viable Product (MVP) in response to real-world problem statements",
      ],
      tech: ["HTML", "CSS", "JavaScript", "Database", "UX/UI", "ReactJS", "NestJS"],
    },

  ],

  education: [
    {
      school: "American University of Phnom Penh",
      degree: "Bachelor of Science in Software Development",
      start: "2025",
      end: "2028",
      summary: "Studying software development on a full 4-year AMT scholarship.",
      location:"Cambodia",
      details: [
        "Full 4-year AMT Scholarship recipient, covering the complete Bachelor's degree program",
      ],
    },
  ],

  languages: [
    {
      name: "Khmer",
      level: "Native",
      proficiency: 100,
      color: "primary",
    },
    {
      name: "English",
      level: "Fluent",
      proficiency: 80,
      color: "lavender",
    },
    {
      name: "Chinese",
      level: "Intermediate",
      proficiency: 55,
      color: "green",
    },
  ],

  achievements: [
    "Sep 2026 — Selected to participate in Cambodia ICT Camp 2026, one of the successful applicants out of 352, hosted by Open Development Cambodia in Siem Reap.",
    "Dec 2023 — Won 4th place in the Startup Cambodia Writing Competition, placing among the top contenders out of 15 finalists.",
    "Mar 2025 — Received a partial scholarship from Immerse Education in recognition of an outstanding essay submission.",
    "Dec 2025 — Earned the Techo Sen Award after Team Dermis placed 3rd out of 11 teams in the AI For Education Competition.",
    "2023 - 2024 — Achieved a Grade A in Science on the Bac II National Examination (MOEYS), scoring 99.618.",
    "2026 — Selected as one of 60 participants out of over 1,100 applicants for the Techpreneur Bootcamp 2.0.",
  ],

  additionalInfo: {
    achievements: [
      {
        result: "3rd place",
        title: "Techo Sen Award",
        detail: "AI For Education, 11 teams",
        date: "Dec 2025",
        color: "primary",
      },
      {
        result: "Top 60",
        title: "Techpreneur Bootcamp 2.0",
        detail: "From 1,100+ applicants",
        date: "2026",
        color: "lavender",
      },
      {
        result: "Selected",
        title: "Cambodia ICT Camp 2026",
        detail: "From 352 applicants",
        date: "Sep 2026",
        color: "green",
      },
      {
        result: "Scholarship",
        title: "Immerse Education",
        detail: "Outstanding essay",
        date: "Mar 2025",
        color: "blush",
      },
      {
        result: "Grade A",
        title: "Bac II National Exam",
        detail: "Science",
        date: "2024",
        color: "lavender",
      },
      {
        result: "4th place",
        title: "Startup Cambodia Writing",
        detail: "15 finalists",
        date: "Dec 2023",
        color: "primary",
      },
    ],
    volunteering: [
      {
        result: "HR Core Team",
        title: "Cambodia Tech Summit",
        detail: "Recruiting and training volunteers",
        date: "2025 — now",
        color: "green",
      },
      {
        result: "Leader",
        title: "KimiTABI Program",
        detail: "Exchange with Japanese students",
        date: "Aug 2025",
        color: "green",
      },
      {
        result: "Speakers",
        title: "RYL Season 8",
        detail: "Rewrite Your Story, CKCC",
        date: "Nov 2023",
        color: "green",
      },
      {
        result: "Team Lead",
        title: "Red Cross Youth",
        detail: "Chamrouen Phal High School",
        date: "2022 — 24",
        color: "green",
      },
    ],
  },

  extras: {
    volunteering: [
      "2025 - Present — Worked on the HR Core Team for the Cambodia Tech Summit at ATC, recruiting, training, and managing event volunteers.",
      "Aug 2025 — Participated in the KimiTABI Program (two-week leadership collaboration with Japanese university students), researching real social issues, designing and running an event for children, and presenting ideas in English.",
      "Nov - 2023 — Volunteered as a Speaker Coordinator for RYL Season 8 (Rewrite Your Story) at CKCC",
      "2022-2024 — Led as Team Lead in the Red Cross Youth Program at Chamrouen Phal High School.",
    ],
  },
};
