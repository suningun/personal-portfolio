"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { portfolio } from "@/data/portfolio";
import ContactMailAnimation from "./ContactMailAnimation";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isOpening, setIsOpening] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  return (
    <section id="contact" className="scroll-mt-20 relative overflow-hidden bg-bg">
      <Reveal>
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <SectionHeader command="./contact.sh" title="Keep in touch" />

          <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-0">
            <Card className="w-full max-w-[20rem] sm:max-w-[24rem] lg:max-w-[30rem]">
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  if (isOpening) return;

                const subject = `Portfolio contact from ${
                  form.name || form.email
                }`;
                const body = `${form.message}\n\nFrom: ${
                  form.name || form.email
                }\nEmail: ${form.email}`;
                const mailto = `mailto:${portfolio.personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

                setIsOpening(true);
                const reducedMotion = window.matchMedia(
                  "(prefers-reduced-motion: reduce)",
                ).matches;
                window.setTimeout(
                  () => {
                    setShowStatus(true);
                    window.location.href = mailto;
                  },
                  reducedMotion ? 0 : 900,
                );
                }}
              >
              <label className="sr-only" htmlFor="contact-email">
                Your email
              </label>
              <input
                id="contact-email"
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                placeholder="john@example.com"
                autoComplete="email"
                required
                className="h-16 w-full rounded-xl border border-border bg-bg px-4 text-lg text-text outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary"
              />

              <label className="sr-only" htmlFor="contact-message">
                Your message
              </label>
              <textarea
                id="contact-message"
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                placeholder="Hi Suning, let's talk!"
                rows={3}
                required
                className="mt-5 w-full resize-none rounded-xl border border-border bg-bg px-4 py-4 text-lg text-text outline-none placeholder:text-muted focus:border-primary focus:ring-2 focus:ring-primary"
              />

              <Button
                variant="primary"
                type="submit"
                disabled={isOpening}
                className="mt-5 w-full disabled:cursor-wait disabled:opacity-80"
              >
                Send message
              </Button>

              {showStatus && (
                <p className="mt-3 font-mono text-sm text-green">
                  ✓ Opening your email app…
                </p>
              )}
              </form>
            </Card>

            <ContactMailAnimation active={isOpening} />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
