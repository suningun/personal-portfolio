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
    img: "/images/avatar.svg",
    heroStack: ["React", "Next.js", "Tailwind", "NestJS", "SQL", "Git"],
  },

  skills: [
    {
      title: "Frontend",
      items: [
        { name: "HTML", snippet: "<h1>Hello, I'm Suning</h1>" },
        { name: "CSS", snippet: ".card { border-radius: 16px; }" },
        { name: "React", snippet: "const [open, setOpen] = useState(false);" },
        { name: "Next.js", snippet: "export default async function Page() { …" },
        { name: "Vite", snippet: "npm create vite@latest" },
        { name: "Tailwind CSS", snippet: 'className="rounded-full bg-primary"' },
        { name: "shadcn/ui", snippet: "npx shadcn@latest add button" },
        { name: "Zustand", snippet: "const useStore = create((set) => ({ count: 0 }));" },
        { name: "Framer Motion", snippet: '<motion.div animate={{ opacity: 1 }} />' },
      ],
    },
    {
      title: "Backend",
      items: [
        { name: "Node.js", snippet: "node server.js" },
        { name: "Express", snippet: 'app.get("/api/health", (req, res) => res.json({ ok: true }));' },
        { name: "NestJS", snippet: '@Get(":id") findOne(@Param("id") id: string) {}' },
        { name: "REST APIs", snippet: "GET /api/projects → 200 OK" },
        { name: "GraphQL", snippet: "query { projects { title } }" },
        { name: "WebSockets", snippet: 'socket.emit("message", text);' },
        { name: "Swagger", snippet: "@ApiTags(\"users\")" },
        { name: "Postman", snippet: "POST /api/login → 201 Created" },
        { name: "JWT", snippet: 'jwt.sign({ sub: user.id }, process.env.JWT_SECRET)' },
        { name: "OAuth 2.0", snippet: "GET /auth/google/callback" },
        { name: "bcrypt", snippet: 'await bcrypt.hash(password, 10)' },
      ],
    },
    {
      title: "Languages",
      items: [
        { name: "JavaScript", snippet: "const stack = [...frontend, ...backend];" },
        { name: "TypeScript", snippet: "type User = { id: number; email: string };" },
        { name: "Python", snippet: "print(model.predict(image))" },
        { name: "Java", snippet: 'System.out.println("Hello, AUPP");' },
        { name: "SQL", snippet: "SELECT name FROM projects WHERE live = true;" },
      ],
    },
    {
      title: "Databases",
      items: [
        { name: "PostgreSQL", snippet: "SELECT * FROM users WHERE active = true;" },
        { name: "MySQL", snippet: "CREATE TABLE posts (id INT PRIMARY KEY);" },
        { name: "MongoDB", snippet: 'db.users.find({ role: "admin" })' },
        { name: "Prisma", snippet: "await prisma.user.findMany()" },
      ],
    },
    {
      title: "Messaging and caching",
      items: [
        { name: "Redis", snippet: 'SET session:42 "suning" EX 3600' },
        { name: "BullMQ", snippet: 'await queue.add("send-email", { to: user.email });' },
        { name: "RabbitMQ", snippet: 'channel.sendToQueue("orders", Buffer.from(msg));' },
      ],
    },
    {
      title: "Testing and DevOps",
      items: [
        { name: "Jest", snippet: "expect(sum(1, 2)).toBe(3);" },
        { name: "Vitest", snippet: "const spy = vi.fn();" },
        { name: "Playwright", snippet: 'await page.click("text=Send");' },
        { name: "Supertest", snippet: 'await request(app).get("/api/health").expect(200);' },
        { name: "Lighthouse", snippet: "Performance 98 · LCP 1.2s · CLS 0" },
        { name: "Docker", snippet: "docker compose up -d" },
        { name: "GitHub Actions", snippet: "on: [push]" },
        { name: "Nginx", snippet: "proxy_pass http://localhost:3000;" },
        { name: "Linux", snippet: "ssh deploy@server" },
        { name: "Vercel", snippet: "vercel --prod   ✓ deployed" },
        { name: "AWS", snippet: 'aws s3 cp out/ s3://my-site --recursive' },
      ],
    },
    {
      title: "Mobile and PWA",
      items: [
        { name: "PWA", snippet: '"display": "standalone"' },
        { name: "Service Workers", snippet: "self.addEventListener(\"fetch\", handleFetch);" },
        { name: "React Native", snippet: "<View><Text>Hello, Suning</Text></View>" },
        { name: "Expo", snippet: "npx expo start" },
      ],
    },
    {
      title: "Tools and design",
      items: [
        { name: "Git", snippet: 'git commit -m "feat: skills section"' },
        { name: "GitHub", snippet: "git push origin main" },
        { name: "VS Code", snippet: "code ." },
        { name: "Figma", snippet: "frame → auto layout → prototype" },
        { name: "Framer", snippet: "publish → dermis-ai.framer.app" },
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
