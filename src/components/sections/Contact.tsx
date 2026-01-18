"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Github, Linkedin } from "lucide-react";
import Section from "@/components/ui/Section";
import { portfolio } from "@/data/portfolio";

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
      className="
        flex items-center gap-4
        rounded-2xl p-5
        bg-[color-mix(in_srgb,var(--surface)_65%,transparent)]
        border border-[var(--border)]
        
      ">
      <div
        className="
          h-12 w-12 rounded-2xl grid place-items-center
          bg-gradient-to-br from-[var(--grad-left)] to-[var(--grad-right)]
          shadow-[0_12px_30px_color-mix(in_srgb,var(--primary)_25%,transparent)]
          text-white
        ">
        {icon}
      </div>

      <div className="min-w-0">
        <p className="text-sm text-[var(--muted)]">{label}</p>
        {href ? (
          <a
            href={href}
            className="text-[var(--text)] font-medium hover:text-[var(--primary)] transition break-all"
          >
            {value}
          </a>
        ) : (
          <p className="text-[var(--text)] font-medium break-words">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactSection() {
  // simple UI-only form (no backend)
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  return (
    <section id="contact">
      <Section title="Keep in Touch">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* LEFT: Contact info */}
          <div
            className="
              rounded-3xl p-6 sm:p-8
              bg-[color-mix(in_srgb,var(--surface)_55%,transparent)]
              border border-[var(--border)]
              backdrop-blur-md
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

            <h3 className="text-2xl font-semibold text-[var(--text)]">
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
              <p className="text-lg font-semibold text-[var(--text)]">
                Follow Me
              </p>

              <div className="mt-4 flex gap-4">
                <a
                  href={portfolio.personal?.github ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    h-14 w-14 rounded-2xl grid place-items-center
                    bg-[color-mix(in_srgb,var(--surface)_65%,transparent)]
                    border border-[var(--border)]
                    hover:-translate-y-1 transition
                    hover:shadow-[0_18px_45px_color-mix(in_srgb,var(--primary)_18%,transparent)]
                  "
                  aria-label="GitHub"
                >
                  <Github className="h-6 w-6 text-[var(--text)]" />
                </a>

                <a
                  href={portfolio.personal.socials?.linkedin ?? "#"}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    h-14 w-14 rounded-2xl grid place-items-center
                    bg-[color-mix(in_srgb,var(--surface)_65%,transparent)]
                    border border-[var(--border)]
                    hover:-translate-y-1 transition
                    hover:shadow-[0_18px_45px_color-mix(in_srgb,var(--primary)_18%,transparent)]
                  "
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-6 w-6 text-[var(--text)]" />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div
            className="
              rounded-3xl p-6 sm:p-8
              bg-[color-mix(in_srgb,var(--surface)_55%,transparent)]
              border border-[var(--border)]
              backdrop-blur-md
              shadow-[0_20px_60px_rgba(0,0,0,0.35)]
            "
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                // UI only (you can connect later)
                alert("Message sent (demo) ✅");
                setForm({ name: "", email: "", message: "" });
              }}
              className="space-y-6"
            >
              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Your Name
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="
                    w-full rounded-2xl px-4 py-3
                    bg-[color-mix(in_srgb,var(--bg)_80%,transparent)]
                    border border-[var(--border)]
                    text-[var(--text)]
                    placeholder:text-[var(--muted)]
                    outline-none
                    focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Your Email
                </label>
                <input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="
                    w-full rounded-2xl px-4 py-3
                    bg-[color-mix(in_srgb,var(--bg)_80%,transparent)]
                    border border-[var(--border)]
                    text-[var(--text)]
                    placeholder:text-[var(--muted)]
                    outline-none
                    focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-2">
                  Your Message
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  placeholder="Write your message..."
                  rows={7}
                  className="
                    w-full rounded-2xl px-4 py-3
                    bg-[color-mix(in_srgb,var(--bg)_80%,transparent)]
                    border border-[var(--border)]
                    text-[var(--text)]
                    placeholder:text-[var(--muted)]
                    outline-none resize-none
                    focus:ring-2 focus:ring-[color-mix(in_srgb,var(--primary)_35%,transparent)]
                  "
                />
              </div>

              <button
                type="submit"
                className="
                  w-full h-14 rounded-2xl
                  inline-flex items-center justify-center gap-3
                  text-white font-semibold
                  bg-gradient-to-r from-[var(--grad-left)] to-[var(--grad-right)]
                  shadow-[0_20px_45px_color-mix(in_srgb,var(--primary)_22%,transparent)]
                  hover:brightness-110 active:scale-[0.99]
                  transition
                "
              >
                <Send className="h-5 w-5" />
                Send Message
              </button>
            </form>
          </div>
        </div>
      </Section>
    </section>
  );
}
