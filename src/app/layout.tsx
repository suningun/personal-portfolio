import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import DotGridBackground from "@/components/layout/DotGridBackground";
import { portfolio, SITE_URL } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Suning Un — Software Developer",
  description:
    "Software Development student at AUPP, building web apps with Next.js, React, and Tailwind CSS, and open to internships.",
  icons: {
    icon: "/images/favicon.ico",
  },
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
  openGraph: {
    title: "Suning Un — Software Developer",
    description:
      "Software Development student at AUPP, building web apps with Next.js, React, and Tailwind CSS, and open to internships.",
    url: SITE_URL,
    siteName: "Suning Un",
    type: "website",
    images: [
      {
        url: portfolio.personal.img,
        alt: portfolio.personal.fullName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Suning Un — Software Developer",
    description:
      "Software Development student at AUPP, building web apps with Next.js, React, and Tailwind CSS, and open to internships.",
    images: [portfolio.personal.img],
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: portfolio.personal.fullName,
  jobTitle: portfolio.personal.role,
  url: SITE_URL,
  email: portfolio.personal.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phnom Penh",
    addressCountry: "KH",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "American University of Phnom Penh",
  },
  sameAs: [
    portfolio.personal.socials.github,
    portfolio.personal.socials.linkedin,
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <head>
        <meta name="theme-color" content="#181018" />
        <script
          dangerouslySetInnerHTML={{
            __html: `;(function(){try{
              var t=localStorage.getItem('theme');
              if(!t)t='dark';
              document.documentElement.setAttribute('data-theme', t);
              document.documentElement.style.colorScheme=t;
            }catch(e){} })();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
      <body
        className="font-sans antialiased text-text overflow-x-hidden"
        suppressHydrationWarning
      >
        <DotGridBackground />
        <Navbar />
        <main className="pt-16 relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
