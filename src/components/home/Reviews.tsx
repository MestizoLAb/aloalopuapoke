"use client";

import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Reviews() {
  const { lang } = useLang();
  const t = content[lang].reviews;

  const platforms = [
    {
      name: "Google",
      href: info.social.google,
      label: lang === "it" ? "Leggi le recensioni" : "Read the reviews",
    },
    {
      name: "Tripadvisor",
      href: info.social.tripadvisor,
      label: lang === "it" ? "Leggi le recensioni" : "Read the reviews",
    },
    {
      name: "Just Eat",
      href: info.social.justeat,
      label: lang === "it" ? "Ordina in delivery" : "Order for delivery",
    },
  ];

  return (
    <section className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          eyebrowClass="text-lagoon-deep"
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {platforms.map((p, i) => (
            <Reveal key={p.name} delay={i * 80}>
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between rounded-card border border-ink/8 bg-cream p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-forest/50"
              >
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{p.name}</p>
                  <p className="mt-1 text-sm text-ink-soft">{p.label}</p>
                </div>
                <span className="text-coral-deep transition-transform duration-300 group-hover:translate-x-1">
                  <ArrowIcon />
                </span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
