"use client";

import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { portfolio } from "@/data/portfolio";

type Field = "name" | "email" | "message";
type Status = "idle" | "invalid" | "sending" | "sent" | "error";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
const EMAIL_PATTERN = /^\S+@\S+\.\S+$/;

const fields: { id: Field; label: string; placeholder: string }[] = [
  { id: "name", label: "name:", placeholder: "Jane Doe" },
  { id: "email", label: "email:", placeholder: "jane@company.com" },
  { id: "message", label: "message:", placeholder: "Hi Suning…" },
];

export default function ContactSection() {
  const email = portfolio.personal.email;
  const [form, setForm] = useState<Record<Field, string>>({
    name: "",
    email: "",
    message: "",
  });
  const [invalid, setInvalid] = useState<Field[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [statusText, setStatusText] = useState("");
  const inputRefs = useRef<
    Partial<Record<Field, HTMLInputElement | HTMLTextAreaElement | null>>
  >({});
  const honeypotRef = useRef<HTMLInputElement>(null);

  function update(field: Field, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (invalid.length || status === "invalid" || status === "error") {
      setInvalid((prev) => prev.filter((f) => f !== field));
      setStatus("idle");
      setStatusText("");
    }
  }

  function nextOnEnter(event: KeyboardEvent<HTMLInputElement>, next: Field) {
    if (event.key === "Enter") {
      event.preventDefault();
      inputRefs.current[next]?.focus();
    }
  }

  function openMailto() {
    const subject = `Portfolio message from ${form.name}`;
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;
    if (honeypotRef.current?.checked) return;

    const missing = fields.map((f) => f.id).filter((id) => !form[id].trim());
    const badEmail =
      form.email.trim() !== "" && !EMAIL_PATTERN.test(form.email.trim());

    if (missing.length || badEmail) {
      setInvalid(badEmail ? [...missing, "email"] : missing);
      setStatus("invalid");
      setStatusText(
        missing.length
          ? "✗ fill in the highlighted fields"
          : "✗ that email doesn't look right",
      );
      return;
    }

    if (!WEB3FORMS_KEY) {
      openMailto();
      return;
    }

    setStatus("sending");
    setStatusText("sending…");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          subject: `Portfolio message from ${form.name.trim()}`,
          from_name: "Portfolio contact form",
          botcheck: "",
        }),
      });
      const data: { success?: boolean } = await response
        .json()
        .catch(() => ({}));
      if (!response.ok || !data.success) {
        throw new Error("Web3Forms rejected the message");
      }

      setStatus("sent");
      setStatusText("✓ message sent. I'll reply within a day or two.");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
      setStatusText("✗ couldn't send. email me at");
    }
  }

  const statusColor =
    status === "sent"
      ? "text-green"
      : status === "sending"
        ? "text-muted"
        : "text-primary";

  return (
    <section id="contact" className="scroll-mt-20 relative bg-bg">
      <Reveal>
        <div className="mx-auto max-w-6xl px-6 py-24 md:py-28">
          <SectionHeader command="./contact.sh" title="Keep in touch" />
          <p className="-mt-6 mb-8 text-base text-muted md:text-lg">
            Open to internships and new projects.
          </p>

          <div>
            <Card className="overflow-hidden p-0 md:p-0">
              <div className="flex items-center gap-2 border-b border-border px-5 py-3.5 md:px-6">
                <span className="h-3 w-3 rounded-full bg-primary" />
                <span className="h-3 w-3 rounded-full bg-blush" />
                <span className="h-3 w-3 rounded-full bg-green" />
                <span className="ml-2 font-mono text-xs text-muted md:text-sm">
                  contact.sh
                </span>
              </div>

              <div className="grid md:grid-cols-[220px_1fr]">
                  <aside className="flex flex-col items-center gap-3 border-b border-border p-6 text-center md:border-b-0 md:border-r">
                    <img src="/images/avatar.svg" alt="Suning Un" width={96} height={96} className="rounded-full" style={{ imageRendering: "pixelated" }} />
                    <p className="text-base font-medium text-text">Suning Un</p>
                    <p className="font-mono text-xs text-green">● open to work</p>
                    <div className="flex flex-col gap-1">
                      {portfolio.personal.socials?.github && (
                        <a href={portfolio.personal.socials.github} target="_blank" rel="noreferrer" className="font-mono text-sm text-lavender hover:text-primary">GitHub ↗</a>
                      )}
                      {portfolio.personal.socials?.linkedin && (
                        <a href={portfolio.personal.socials.linkedin} target="_blank" rel="noreferrer" className="font-mono text-sm text-lavender hover:text-primary">LinkedIn ↗</a>
                      )}
                    </div>
                  </aside>
                  <form
                noValidate
                onSubmit={handleSubmit}
                className="p-5 font-mono text-sm md:p-7 md:text-base"
              >
                {/* Honeypot: hidden from people, bots tend to tick it */}
                <input
                  ref={honeypotRef}
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                {fields.map((field, index) => {
                  const isInvalid = invalid.includes(field.id);
                  const next = fields[index + 1]?.id;
                  const shared = {
                    id: `contact-${field.id}`,
                    value: form[field.id],
                    placeholder: field.placeholder,
                    "aria-invalid": isInvalid || undefined,
                    className:
                      "min-w-0 flex-1 resize-none bg-transparent text-text outline-none placeholder:text-muted/60",
                  };

                  return (
                    <div
                      key={field.id}
                      className="flex items-start gap-2 border-l-2 border-transparent py-2 pl-2 transition-colors focus-within:border-primary"
                    >
                      <span className="text-green" aria-hidden="true">
                        ❯
                      </span>
                      <label
                        htmlFor={`contact-${field.id}`}
                        className={`w-20 shrink-0 transition-colors md:w-24 ${
                          isInvalid ? "text-primary" : "text-lavender"
                        }`}
                      >
                        {field.label}
                      </label>
                      {field.id === "message" ? (
                        <textarea
                          {...shared}
                          ref={(el) => {
                            inputRefs.current.message = el;
                          }}
                          rows={5}
                          onChange={(e) => update("message", e.target.value)}
                        />
                      ) : (
                        <input
                          {...shared}
                          ref={(el) => {
                            inputRefs.current[field.id] = el;
                          }}
                          type={field.id === "email" ? "email" : "text"}
                          autoComplete={field.id}
                          onChange={(e) => update(field.id, e.target.value)}
                          onKeyDown={(e) => next && nextOnEnter(e, next)}
                        />
                      )}
                    </div>
                  );
                })}

                <p
                  aria-live="polite"
                  className={`mt-2 min-h-5 pl-2 text-xs md:text-sm ${statusColor}`}
                >
                  {statusText}
                  {status === "error" && (
                    <>
                      {" "}
                      <a
                        href={`mailto:${email}`}
                        className="underline underline-offset-2"
                      >
                        {email}
                      </a>
                    </>
                  )}
                  {status === "sending" && (
                    <span className="ml-1 inline-block h-3 w-1.5 animate-pulse bg-primary align-middle motion-reduce:animate-none" />
                  )}
                </p>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-5">
                  <span className="text-xs text-muted md:text-sm">
                    or{" "}
                    <a
                      href={`mailto:${email}`}
                      className="text-lavender hover:text-primary"
                    >
                      {email}
                    </a>
                  </span>
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={status === "sending"}
                    className="disabled:cursor-wait disabled:opacity-70"
                  >
                    {status === "sending" ? "sending…" : "send ↵"}
                  </Button>
                </div>
              </form>
            </div>
            </Card>


          </div>
        </div>
      </Reveal>
    </section>
  );
}
