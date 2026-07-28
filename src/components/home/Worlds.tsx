"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

const icons = ["🥢", "🥑", "🐟", "🌿"];

// Accenti secondari brand (verde · arancio · azzurro · rosso)
const accents = [
  { tile: "bg-forest/12", rule: "bg-forest", hover: "hover:border-forest/40" },
  { tile: "bg-coral/15", rule: "bg-coral", hover: "hover:border-coral/50" },
  { tile: "bg-lagoon/15", rule: "bg-lagoon", hover: "hover:border-lagoon/50" },
  { tile: "bg-red/12", rule: "bg-red", hover: "hover:border-red/50" },
];

export default function Worlds() {
  const { lang } = useLang();
  const t = content[lang].worlds;

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow={t.eyebrow}
          title={t.title}
          lead={t.lead}
          eyebrowClass="text-lagoon-deep"
        />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {t.items.map((item, i) => {
            const a = accents[i % accents.length];
            return (
              <Reveal key={item.name} delay={i * 80}>
                <div
                  className={`group relative h-full overflow-hidden rounded-card border border-ink/8 bg-cream p-6 transition-colors duration-300 ${a.hover}`}
                >
                  <span className={`absolute inset-x-0 top-0 h-1 ${a.rule}`} />
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${a.tile} text-2xl transition-transform duration-300 group-hover:-translate-y-1`}
                  >
                    <span aria-hidden="true">{icons[i]}</span>
                  </div>
                  <h3 className="mt-4 font-display text-xl font-semibold text-ink">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mid">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
