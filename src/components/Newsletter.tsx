"use client";

import Image from "next/image";
import { useState } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

export default function Newsletter() {
  const { lang } = useLang();
  const t = content[lang].newsletter;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setStatus("error");
      return;
    }
    // TODO: collegare un servizio email reale (Formspree / Mailchimp / Brevo)
    setStatus("success");
    setName("");
    setEmail("");
  }

  return (
    <section className="relative overflow-hidden border-t border-ink/10 bg-paper">
      {/* Decorazioni fiore d'ibisco (dal logo) */}
      <Image
        src="/img/hibiscus.png"
        alt=""
        aria-hidden="true"
        width={301}
        height={278}
        className="pointer-events-none absolute -left-10 -top-8 w-36 rotate-[-18deg] opacity-70 sm:w-44"
      />
      <Image
        src="/img/hibiscus.png"
        alt=""
        aria-hidden="true"
        width={301}
        height={278}
        className="pointer-events-none absolute -bottom-12 right-4 w-40 rotate-[15deg] opacity-30 sm:w-52"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-2 lg:gap-16">
        {/* Testo (sinistra) */}
        <div>
          <h2 className="display-caps text-5xl leading-[0.95] text-forest-mid sm:text-6xl">
            {t.title}
          </h2>
          <p className="script mt-1 text-2xl text-pink-deep sm:text-3xl">{t.subtitle}</p>
          <p className="mt-5 max-w-md text-base leading-relaxed text-ink-mid sm:text-lg">
            {t.lead}
          </p>
        </div>

        {/* Form (destra) */}
        <div>
          {status === "success" ? (
            <p className="rounded-card border border-forest/40 bg-forest/8 px-5 py-4 font-semibold text-forest-mid">
              {t.success}
            </p>
          ) : (
            <form onSubmit={onSubmit} className="flex flex-col gap-3" noValidate>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                aria-label={t.namePlaceholder}
                className="w-full rounded-sm border border-ink/20 bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:border-forest focus:outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error") setStatus("idle");
                }}
                placeholder={t.emailPlaceholder}
                aria-label={t.emailPlaceholder}
                required
                className={`w-full rounded-sm border bg-white px-4 py-3 text-sm text-ink placeholder:text-ink-soft/70 focus:outline-none ${
                  status === "error" ? "border-red-deep" : "border-ink/20 focus:border-forest"
                }`}
              />
              <button type="submit" className="btn btn-forest mt-1 self-start">
                {t.cta}
              </button>
            </form>
          )}
          {status === "error" && (
            <p className="mt-2 text-sm font-semibold text-red-deep">{t.error}</p>
          )}
          <p className="mt-4 text-xs text-ink-soft">{t.privacy}</p>
        </div>
      </div>
    </section>
  );
}
