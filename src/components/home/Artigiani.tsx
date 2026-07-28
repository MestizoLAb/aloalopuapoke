"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Reveal from "@/components/Reveal";
import DishImageNote from "@/components/DishImageNote";
import SectionHeading from "@/components/SectionHeading";

export default function Artigiani() {
  const { lang } = useLang();
  const t = content[lang].artigiani;

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
        <Reveal>
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-[2rem] shadow-[0_30px_70px_-34px_rgba(20,41,31,0.5)]">
            <Image
              src="/img/poke-2.jpg"
              alt={lang === "it" ? "Salse fatte in casa" : "Homemade sauces"}
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
            <div className="absolute inset-x-3 bottom-3">
              <DishImageNote className="rounded-xl bg-ink/65 px-3 py-1.5 !text-paper backdrop-blur-md" />
            </div>
          </div>
        </Reveal>

        <div className="max-w-lg">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

          <ul className="mt-8 space-y-4">
            {t.points.map((p) => (
              <li key={p.t} className="flex gap-4">
                <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-coral/15 text-coral-deep">
                  <CheckIcon />
                </span>
                <div>
                  <p className="font-display text-lg font-semibold text-ink">{p.t}</p>
                  <p className="text-sm text-ink-mid">{p.d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 12.5l4.5 4.5L19 7"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
