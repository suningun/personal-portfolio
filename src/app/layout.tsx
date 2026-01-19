// src/app/layout.tsx
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import Image from "next/image";
import Script from "next/script";
// @ts-ignore: allow side-effect css import without type declarations
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <title>Suning Un, Software Developer</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <meta
  name="format-detection"
  content="telephone=no, date=no, email=no, address=no"
/>
        <Script
            id="theme-init"
            strategy="beforeInteractive"
            dangerouslySetInnerHTML={{
              __html: `;(function(){try{
                var t=localStorage.getItem('theme');
                if(!t){
                  var mq=window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)');
                  t=mq&&mq.matches?'dark':'light';
                }
                document.documentElement.setAttribute('data-theme', t);
              }catch(e){} })();`,
            }}
          />

      </head>
  <body
    className="tech-bg text-[var(--text)] overflow-x-hidden"
    suppressHydrationWarning
  >
    <div className="scanlines" />
    <div className="particles" />
    <Navbar />
    <main className="pt-16 relative z-10">{children}</main>
    <Footer />
  </body>


    </html>
  );
}