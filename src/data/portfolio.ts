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
    img: "/images/profile.jpg",
  },

  skills: {
    categories: [
      {
        title: "Languages",
        icon: "Code2",
        items: [
          { label: "Python & JAVA", value: 50 },
          { label: "HTML & CSS", value:60 },
          { label: "JavaScript", value: 20 },
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
          { label: "Django", value: 10 },
        ],
      },
      {
        title: "Databases",
        icon: "Database",
        items: [
          { label: "MySQL", value: 30 },
        ],
      },
      {
        title: "Tools",
        icon: "Wrench",
        items: [
          { label: "Git", value: 33 },
          { label: "Vercel", value: 55 },
          { label: "Framer", value: 82 },
          { label: "Figma", value: 86 },
        ],
      },
    ],
  },



  experience: [
    {
      company: "Sisters of Code",
      title: "Paid Part-Time Trainer",
      location: "Remote",
      start: "2025",
      end: "Present",
      description:["Teaching students at Takeo Province"],
      bullets: [
        "Establish Sisters of Code Club",
        "Taught computer literacy, online safety, and digital identity protection",
        "Provided hands-on coding instruction using Code.org, Scratch, WIX, HTML & CSS",
        "Introduced students to AI fundamentals & emerging technologies.",
        "Assess student progress and provide constructive feedback",
      ],
      tech: ["HTML", "CSS", "Wix Website"],
    },

  ],

  education: [
    {
      school: "American University of Phnom Penh",
      degree: "Bachelor of Science in Software Development",
      start: "2024",
      end: "2029",
      location:"Cambodia",
    },
  ],

  projects: [
    {
      name: "Personal Portfolio",
      description: "My personal website built with Next.js and Tailwind.",
      tech: ["Next.js", "Tailwind"],
      link: "https://vibrant-illuminate-985343.framer.app/",
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
    "Top student award (example)",
    "Hackathon finalist (example)",
  ],

  extras: {
    certifications: ["Google UX Certificate (example)"],
    interests: ["UI Design", "Open Source", "Learning"],
  },
};
