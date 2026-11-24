# Suning Un — Personal Portfolio

Personal portfolio website for **Suning Un**, a Software Development student and aspiring software developer based in Phnom Penh, Cambodia.

The site presents Suning's background, technical skills, projects, experience, education, achievements, volunteering, and contact information in a responsive single-page layout.

## Features

- Responsive design for desktop, tablet, and mobile screens
- Single-page navigation with active section highlighting
- Mobile navigation menu
- Light and dark themes with saved user preference
- Hero section with profile information and calls to action
- About section with personal goals and strengths
- Skills grouped by languages, frameworks, databases, and tools
- Project cards with images, technologies, and external links
- Experience and education timeline
- Language proficiency indicators
- Achievements and volunteering sections
- Contact details with email, phone, location, GitHub, and LinkedIn links
- UI-only contact form
- Static export configuration for simple deployment

## Technology Stack

- [Next.js](https://nextjs.org/) 16
- [React](https://react.dev/) 19
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide React](https://lucide.dev/) for icons
- ESLint for code quality

## Getting Started

### Prerequisites

- Node.js 20 or newer
- npm

### Installation

Clone the repository, enter the project directory, and install dependencies:

```bash
git clone https://github.com/suningun/personal-portfolio.git
cd personal-portfolio
npm install
```

### Development

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project Structure

```text
personal-portfolio/
├── public/
│   └── images/                 # Profile, project, and favicon images
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles and theme variables
│   │   ├── layout.tsx          # Root layout, navbar, footer, and theme setup
│   │   └── page.tsx            # Homepage section composition
│   ├── components/
│   │   ├── layout/             # Navbar, footer, and theme toggle
│   │   ├── sections/           # Portfolio page sections
│   │   └── ui/                 # Reusable UI components
│   ├── data/
│   │   └── portfolio.ts        # Portfolio content and TypeScript types
│   └── lib/
│       └── icon.ts             # Skill category icon map
├── next.config.ts              # Next.js and static export configuration
├── postcss.config.mjs          # Tailwind/PostCSS configuration
├── tailwind.config.ts          # Tailwind configuration
└── tsconfig.json               # TypeScript configuration
```

## Updating Portfolio Content

Most personal information is centralized in [`src/data/portfolio.ts`](src/data/portfolio.ts). Update that file to change:

- Name, role, location, email, phone, and social links
- Profile image
- Skills and proficiency values
- Work experience
- Education
- Languages
- Projects and project links
- Achievements
- Volunteering and other additional information

Images used by the site should be placed in [`public/images`](public/images) and referenced with paths such as `/images/profile.webp`.

## Deployment

The project is configured for static output in `next.config.ts`:

```ts
output: "export"
```

Build the static site with:

```bash
npm run build
```

The generated site is written to the `out/` directory and can be deployed to Vercel, Netlify, GitHub Pages, or another static web server.

## Current Limitations

- The contact form is currently UI-only. It shows a confirmation alert but does not send or store messages.
- Detailed project pages have not been implemented yet.
- Privacy Policy and Terms of Service links are present in the footer, but their pages are not currently included.
- The project does not currently include a backend, database, authentication, or API routes.

## Author

**Suning Un**

- GitHub: [github.com/suningun](https://github.com/suningun)
- LinkedIn: [Suning Un](https://www.linkedin.com/in/suning-un-85a439344/)
