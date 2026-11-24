"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import Section from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";
import ContactMailAnimation from "./ContactMailAnimation";

function InfoRow({
  icon,
  label,
  value,
  href,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div
      className="flex items-center gap-4 rounded-xl p-5 bg-surface border border-border">
      <div className="h-12 w-12 rounded-2xl grid place-items-center bg-primary text-on-primary">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-muted">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-text font-medium hover:text-primary transition break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-text font-medium break-words">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isOpening, setIsOpening] = useState(false);
  const [showStatus, setShowStatus] = useState(false);

  return (
    <section id="contact">
      <Section title="Keep in Touch" eyebrow="~/contact">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Contact info */}
          <div
            className="rounded-xl p-6 sm:p-8 bg-surface border border-border">

            <h3 className="text-xl font-semibold text-text">
              Contact Information
            </h3>

            <div className="mt-6 space-y-4">
              {portfolio.personal.email && (
                <InfoRow
                  icon={<Mail className="h-5 w-5" />}
                  label="Email"
                  value={portfolio.personal.email}
                  href={`mailto:${portfolio.personal.email}`}
                />
              )}

              {portfolio.personal.phone && (
                <InfoRow
                  icon={<Phone className="h-5 w-5" />}
                  label="Phone"
                  value={portfolio.personal.phone}
                  href={`tel:${portfolio.personal.phone}`}
                />
              )}

              {portfolio.personal.location && (
                <InfoRow
                  icon={<MapPin className="h-5 w-5" />}
                  label="Location"
                  value={portfolio.personal.location}
                />
              )}
            </div>

            {/* Socials */}
            <div className="mt-10">
              <p className="text-xl font-semibold text-text">
                Follow Me
              </p>

              <div className="mt-4 flex gap-4">
                <a
                  href={portfolio.personal?.github ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="h-14 w-14 rounded-xl grid place-items-center bg-surface border border-border hover:-translate-y-1 transition"
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 text-text" />
                </a>

                <a
                  href={portfolio.personal.socials?.linkedin ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="h-14 w-14 rounded-xl grid place-items-center bg-surface border border-border hover:-translate-y-1 transition"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-text" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div
            className="rounded-xl p-6 sm:p-8 bg-surface border border-border"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (isOpening) return;
                const subject = `Portfolio contact from ${form.name}`;
                const body = `${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`;
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
              className="space-y-6"
            >
              <div>
                <label
                  htmlFor="contact-name"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Your Name
                </label>
                <input
                  id="contact-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-bg border border-border text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-email"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Your Email
                </label>
                <input
                  id="contact-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl px-4 py-3 bg-bg border border-border text-text placeholder:text-muted outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block text-sm font-medium text-text mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="contact-message"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message..."
                  rows={7}
                  required
                  className="w-full rounded-xl px-4 py-3 bg-bg border border-border text-text placeholder:text-muted outline-none resize-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <button
                type="submit"
                className="w-full h-14 rounded-xl inline-flex items-center justify-center gap-3 text-on-primary font-semibold font-mono bg-primary hover:brightness-110 active:scale-[0.99] transition"
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
              <ContactMailAnimation active={isOpening} />
              {showStatus && (
                <p className="font-mono text-sm text-green">
                  ✓ Opening your email app…
                </p>
              )}
              <p className="text-center text-sm text-muted">
                This opens your email app with the message ready to send.
              </p>
            </form>
          </div>
        </div>
      </Section>
    </section>
  );
}
