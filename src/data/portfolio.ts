// src/data/portfolio.ts

import type { iconMap } from "@/lib/icon";


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
  bullets: string[];
  description: string[];
  tech?: string[];
};

export type Education = {
  school: string;
  degree: string;
  start: string;
  end: string;
  location: string;
  details?: string[];
};

export type Project = {
  name: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  img: string;
};
export type Language = {
  name: string;
  level: string;
  proficiency: number;
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
    github: string;
    name: string;
    role: string;
    location: string;
    email: string;
    summary: string;
    socials: SocialLinks;
    phone: string;
    img: string;
  };

  skills: {
    categories: {
      title: string;
      icon: keyof typeof iconMap;
      items: {
        label: string;
        value: number;
      }[];
    }[];
  };

  experience: Experience[];
  education: Education[];
  languages?: Language[];
  projects: Project[];
  achievements: string[];

  extras?: {
    certifications?: string[];
    volunteering?: string[];
    interests?: string[];
  };
};

export const portfolio: PortfolioData = {
  personal: {
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
  },

  skills: {
    categories: [
      {
        title: "Languages",
        icon: "Code2",
        items: [
          { label: "Python & JAVA", value: 75 },
          { label: "HTML & CSS", value: 95 },
          { label: "JavaScript", value: 90 },
          { label: "C++", value: 10 },
        ],
      },
      {
        title: "Frameworks",
        icon: "Server",
        items: [
          { label: "Bootstrap", value: 60 },
          { label: "Tailwind CSS", value: 55 },
          { label: "React", value: 20 },
          { label: "Django", value: 5 },
        ],
      },
      {
        title: "Databases",
        icon: "Database",
        items: [
          { label: "SQLite", value: 75 },
        ],
      },
      {
        title: "Tools",
        icon: "Wrench",
        items: [
          { label: "Git", value: 75 },
          { label: "Vercel", value: 55 },
          { label: "Framer", value: 82 },
          { label: "Figma", value: 90 },
        ],
      },
    ],
  },



  experience: [
    {
      company: "Sisters of Code",
      title: "Paid Part-Time Trainer",
      location: "Hybrid",
      start: "2025",
      end: "Present",
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
    },
    {
      name: "English",
      level: "Fluent",
      proficiency: 85,
    },
    {
      name: "Chinese",
      level: "Intermediate",
      proficiency: 60,
    },
  ],

  projects: [
    {
      name: "Personal Portfolio",
      description: "My personal website built with Next.js and Tailwind.",
      tech: ["Next.js", "Tailwind"],
      link: "https://suningun.vercel.app/",
      img: "/images/portfolio-ing.png",
    },
        {
      name: "Dermis AI Disease Detector",
      description: "AI built with Teachable Machine & Implemented using Framer.",
      tech: ["Teachable Machine", "Framer"],
      link: "https://vibrant-illuminate-985343.framer.app/",
      img: "/images/dermis.png",
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

  extras: {
    volunteering: [
      "2025 - Present — Worked on the HR Core Team for the Cambodia Tech Summit at ATC, recruiting, training, and managing event volunteers.",
      "Aug 2025 — Participated in the KimiTABI Program (two-week leadership collaboration with Japanese university students), researching real social issues, designing and running an event for children, and presenting ideas in English.",
      "Nov - 2023 — Volunteered as a Speaker Coordinator for RYL Season 8 (Rewrite Your Story) at CKCC",
      "2022-2024 — Led as Team Lead in the Red Cross Youth Program at Chamrouen Phal High School.",
    ],
  },
};
