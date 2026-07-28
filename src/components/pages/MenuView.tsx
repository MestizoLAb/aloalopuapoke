"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import {
  menu,
  builderSteps,
  POKE_REGULAR,
  POKE_LARGE,
  POKE_XL,
  type MenuCategory,
} from "@/lib/menu";
import Reveal from "@/components/Reveal";
import DishCard from "@/components/DishCard";
import { OrderWays, GlutenFreeVegan } from "@/components/seo/Sections";
import PageHeader from "./PageHeader";

export default function MenuView() {
  const { lang } = useLang();
  const t = content[lang];
  const it = lang === "it";

  const pokeCat = menu[0];
  const others = menu.slice(1);

  function Category({ cat }: { cat: MenuCategory }) {
    return (
      <section
        id={cat.id}
        className="scroll-mt-40 border-b border-ink/8 py-14 sm:py-20"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <h2 className="display-caps text-xl leading-[1.05] text-ink sm:text-2xl">
              {cat.title[lang]}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-ink-mid">
              {cat.intro[lang]}
            </p>
          </Reveal>

          {cat.kind === "drinks" ? (
            <div className="mt-7 grid gap-x-12 gap-y-1 sm:grid-cols-2">
              {cat.dishes.map((d, i) => (
                <Reveal key={d.id} delay={i * 30}>
                  <div className="flex items-baseline justify-between gap-4 border-b border-ink/8 py-2.5">
                    <p className="text-[0.95rem] text-ink">
                      <span className="font-semibold">{d.name[lang]}</span>
                      {d.desc[lang] && (
                        <span className="ml-2 text-sm text-ink-soft">{d.desc[lang]}</span>
                      )}
                    </p>
                    <span className="shrink-0 font-display font-semibold text-coral-deep">
                      € {d.price}
                    </span>
                  </div>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {cat.dishes.map((dish, i) => (
                <Reveal key={dish.id} delay={i * 60}>
                  <DishCard dish={dish} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    );
  }

  return (
    <>
      <PageHeader
        eyebrow={t.menuPage.eyebrow}
        title={t.menuPage.title}
        lead={t.menuPage.lead}
        image="/img/fusion.jpg"
        imageAlt={
          it
            ? "Ceviche di gamberi con avocado, mango e tortilla, dal menù Alo Alo a Bologna"
            : "Prawn ceviche with avocado, mango and tortilla, from the Alo Alo menu in Bologna"
        }
        objectPosition="50% 45%"
      />

      {/* Nav ancore categorie — builder subito dopo i poke */}
      <div className="sticky top-[94px] z-30 border-b border-ink/8 bg-cream/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
          <a
            href={`#${pokeCat.id}`}
            className="shrink-0 rounded-full border border-ink/12 px-3.5 py-1.5 text-xs font-semibold text-ink-mid transition-colors hover:border-coral-deep hover:text-coral-deep"
          >
            {pokeCat.title[lang]}
          </a>
          <a
            href="#builder"
            className="shrink-0 rounded-full bg-forest-deep px-3.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-forest"
          >
            {t.menuPage.builderTitle}
          </a>
          {others.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="shrink-0 rounded-full border border-ink/12 px-3.5 py-1.5 text-xs font-semibold text-ink-mid transition-colors hover:border-coral-deep hover:text-coral-deep"
            >
              {cat.title[lang]}
            </a>
          ))}
        </div>
      </div>

      <div className="bg-cream">
        {/* 1) Poke firmati */}
        <Category cat={pokeCat} />

        {/* 2) Componi il tuo poke — subito dopo i firmati */}
        <section id="builder" className="relative scroll-mt-40 overflow-hidden bg-forest-deep py-16 text-white sm:py-24">
          {/* Fiori d'ibisco del logo — decoro */}
          <Image
            src="/img/hibiscus.png"
            alt=""
            aria-hidden="true"
            width={301}
            height={278}
            className="pointer-events-none absolute -right-8 -top-10 w-36 rotate-[18deg] opacity-25 sm:w-52"
          />
          <Image
            src="/img/hibiscus.png"
            alt=""
            aria-hidden="true"
            width={301}
            height={278}
            className="pointer-events-none absolute -bottom-12 -left-10 w-32 -rotate-[22deg] opacity-20 sm:w-44"
          />
          <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
            <Reveal className="max-w-2xl">
              <p className="script text-[1.5rem] text-gold-soft sm:text-[1.85rem]">
                {it ? "La tua bowl, come la vuoi" : "Your bowl, your way"}
              </p>
              <h2 className="mt-1 display-caps text-[1.9rem] leading-[1.05] tracking-[0.03em] sm:text-4xl">
                {t.menuPage.builderTitle}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-white/90">
                {t.menuPage.builderLead}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  { s: t.menuPage.regular, p: POKE_REGULAR },
                  { s: t.menuPage.large, p: POKE_LARGE },
                  { s: "XL", p: POKE_XL },
                ].map((x) => (
                  <span
                    key={x.s}
                    className="rounded-full bg-paper/12 px-3.5 py-1.5 text-sm font-semibold text-white ring-1 ring-paper/15"
                  >
                    {x.s} · € {x.p}
                  </span>
                ))}
              </div>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {builderSteps.map((step, i) => (
                <Reveal key={step.n} delay={i * 60}>
                  <div className="h-full rounded-card bg-[#0f5540] p-6 ring-1 ring-paper/15">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold font-display text-sm font-bold text-ink">
                        {step.n}
                      </span>
                      <h3 className="font-display text-lg font-semibold">
                        {step.title[lang]}
                      </h3>
                      {step.note && (
                        <span className="ml-auto rounded-full bg-paper/20 px-2 py-0.5 text-[0.62rem] font-semibold text-white">
                          {step.note[lang]}
                        </span>
                      )}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {step.options.map((opt) => (
                        <span
                          key={opt[lang]}
                          className="rounded-full bg-paper/12 px-2.5 py-1 text-[0.72rem] text-white/90"
                        >
                          {opt[lang]}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10">
              <Link href="/app" className="btn bg-gold text-ink hover:bg-gold-soft">
                {t.finalCta.ctaOrder}
              </Link>
            </div>
          </div>
        </section>

        {/* 3) Resto del menu */}
        {others.map((cat) => (
          <Category key={cat.id} cat={cat} />
        ))}

        {/* Allergeni */}
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <p className="rounded-card border border-ink/10 bg-paper px-5 py-4 text-sm text-ink-mid">
            <span aria-hidden="true">ⓘ </span>
            {t.menuPage.allergens}
          </p>
        </div>
      </div>

      {/* SEO: come ordinare + opzioni gluten free/vegana */}
      <OrderWays />
      <GlutenFreeVegan />
    </>
  );
}
