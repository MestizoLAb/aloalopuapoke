"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { tagLabels, type Dish } from "@/lib/menu";
import DishImageNote from "./DishImageNote";

const tagStyle: Record<string, string> = {
  veg: "bg-paper text-forest-mid",
  gf: "bg-paper text-lagoon-deep",
  raw: "bg-paper text-coral-deep",
  new: "bg-paper text-ink-mid",
};

export default function DishCard({ dish }: { dish: Dish; poke?: boolean }) {
  const { lang } = useLang();
  const t = content[lang];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-card border border-ink/8 bg-paper shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-24px_rgba(20,41,31,0.5)]">
      {dish.img && (
        <div className="relative aspect-[4/3] overflow-hidden bg-sand">
          <Image
            src={dish.img}
            alt={dish.name[lang]}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          {dish.tags && dish.tags.length > 0 && (
            <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
              {dish.tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full px-2 py-0.5 text-[0.62rem] font-bold uppercase tracking-wide backdrop-blur-sm ${
                    tagStyle[tag] ?? "bg-ink/10 text-ink"
                  }`}
                >
                  {tagLabels[tag][lang]}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-xl font-semibold text-ink">
            {dish.name[lang]}
          </h3>
          <div className="shrink-0 text-right">
            {dish.sizes ? null : dish.price ? (
              <span className="font-display text-lg font-semibold text-coral-deep">
                € {dish.price}
              </span>
            ) : dish.ask ? (
              <span className="rounded-full bg-sand px-2.5 py-1 text-[0.66rem] font-semibold text-ink-soft">
                {t.menuPage.priceAsk}
              </span>
            ) : null}
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-ink-mid">
          {dish.desc[lang]}
        </p>

        {dish.choices && (
          <div className="mt-3 space-y-2.5 border-t border-ink/8 pt-3">
            {dish.choices.map((g) => (
              <div key={g.group[lang]}>
                <p className="text-[0.68rem] font-bold uppercase tracking-wide text-forest-mid">
                  {g.group[lang]}
                </p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {g.options.map((o) => (
                    <span
                      key={o[lang]}
                      className="rounded-full bg-sand px-2.5 py-0.5 text-xs text-ink-mid"
                    >
                      {o[lang]}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {dish.sizes && (
          <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 border-t border-ink/8 pt-3">
            {dish.sizes.map((s) => (
              <span key={s.label} className="flex items-baseline gap-1.5 text-sm">
                <span className="text-ink-soft">{s.label}</span>
                <span className="font-display font-semibold text-coral-deep">
                  € {s.price}
                </span>
              </span>
            ))}
          </div>
        )}

        {dish.img && <DishImageNote className="mt-auto pt-3" />}
      </div>
    </article>
  );
}
