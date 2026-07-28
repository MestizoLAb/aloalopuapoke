"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Reveal from "@/components/Reveal";
import StoreButtons from "@/components/StoreButtons";
import SectionHeading from "@/components/SectionHeading";

export default function AppPromo() {
  const { lang } = useLang();
  const t = content[lang].app;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] bg-lagoon-deep px-6 py-12 text-paper sm:px-12 sm:py-16">
            <div className="dot-grid pointer-events-none absolute inset-0 opacity-60" />
            <div className="pointer-events-none absolute -right-10 -top-10 h-56 w-56 rounded-full bg-lagoon-soft/25 blur-3xl" />

            <div className="relative grid items-center gap-8 lg:grid-cols-2">
              <div className="max-w-lg">
                <SectionHeading
                  eyebrow={t.eyebrow}
                  title={t.title}
                  lead={t.lead}
                  tone="dark"
                  eyebrowClass="text-paper"
                />
                <Reveal delay={120} className="mt-8">
                  <StoreButtons />
                </Reveal>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative flex h-44 w-44 flex-col items-center justify-center rounded-full border-4 border-gold/40 bg-forest-deep text-center shadow-2xl sm:h-52 sm:w-52">
                  <span className="font-display text-5xl font-bold text-gold sm:text-6xl">
                    -10%
                  </span>
                  <span className="mt-1 max-w-[8rem] text-[0.68rem] font-semibold uppercase tracking-wide text-paper/80">
                    {t.perk}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
