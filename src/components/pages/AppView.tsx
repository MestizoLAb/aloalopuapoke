"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Reveal from "@/components/Reveal";
import PageHeader from "./PageHeader";
import StoreButtons from "@/components/StoreButtons";

const accent = [
  "bg-forest/12 text-forest-mid",
  "bg-coral/15 text-coral-deep",
  "bg-lagoon/15 text-lagoon-deep",
  "bg-pink/20 text-pink-deep",
];

export default function AppView() {
  const { lang } = useLang();
  const t = content[lang].appPage;
  const it = lang === "it";

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} lead={t.lead} />

      {/* Showcase — telefono in evidenza + vantaggio */}
      <section className="overflow-hidden bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
          {/* Testo */}
          <Reveal>
            <span className="script text-[1.5rem] text-forest-mid sm:text-[1.85rem]">
              {it ? "Ordina in un tap" : "Order in a tap"}
            </span>
            <h2 className="display-caps mt-1 text-[2rem] leading-[1] text-ink sm:text-[2.9rem]">
              {it ? "Ordina, accumula" : "Order, earn"}
              <span className="script block text-[1.3em] normal-case leading-[1.05] tracking-normal text-lagoon-deep">
                {it ? "e risparmia" : "and save"}
              </span>
            </h2>

            <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-coral/15 px-4 py-2">
              <span className="font-display text-2xl font-black leading-none text-coral-deep">
                -10%
              </span>
              <span className="text-sm font-semibold text-ink-mid">
                {it ? "sul primo ordine" : "on your first order"}
              </span>
            </div>

            <p className="mt-5 max-w-md text-base leading-relaxed text-ink-mid">{t.lead}</p>

            <div className="mt-7">
              <StoreButtons dark />
              <p className="mt-3 text-xs text-ink-soft">{t.note}</p>
            </div>
          </Reveal>

          {/* Telefono */}
          <Reveal delay={120} className="order-first lg:order-none">
            <div className="relative mx-auto flex max-w-sm items-center justify-center">
              {/* alone colorato dietro il telefono */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-lagoon/40 via-pink/25 to-gold-soft/45 blur-3xl sm:h-96 sm:w-96" />
              <div className="relative z-10 h-[430px] w-full sm:h-[540px]">
                <Image
                  src="/img/app-mockup-green.png"
                  alt={it ? "App AloAlo Pua Poke sul telefono" : "AloAlo Pua Poke app on a phone"}
                  fill
                  sizes="(max-width: 1024px) 80vw, 460px"
                  className="object-contain drop-shadow-[0_34px_60px_rgba(16,40,25,0.3)]"
                  priority
                />
              </div>
              {/* sticker -10% */}
              <div className="absolute right-0 top-8 z-20 flex h-[4.6rem] w-[4.6rem] rotate-6 flex-col items-center justify-center rounded-full bg-coral-deep text-paper shadow-xl">
                <span className="font-display text-xl font-black leading-none">-10%</span>
                <span className="mt-0.5 text-[0.55rem] font-semibold uppercase tracking-wide">
                  {it ? "1° ordine" : "1st order"}
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Vantaggi */}
      <section className="bg-paper py-16 sm:py-20">
        <div className="mx-auto max-w-5xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <h2 className="display-caps text-[1.7rem] leading-[1.05] text-ink sm:text-3xl">
              {it ? "Perché usare l’app" : "Why use the app"}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {t.features.map((f, i) => (
              <Reveal key={f.t} delay={i * 70}>
                <div className="flex gap-4">
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${accent[i % accent.length]}`}
                  >
                    <FeatureIcon i={i} />
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                      {f.t}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mid">{f.d}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chiamaci — alternativa all'app */}
      <section className="relative overflow-hidden bg-forest-deep py-16 text-white sm:py-20">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
        <Image
          src="/img/hibiscus.png"
          alt=""
          aria-hidden="true"
          width={301}
          height={278}
          className="pointer-events-none absolute -right-6 -bottom-8 hidden w-44 rotate-[18deg] opacity-20 sm:block"
        />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-5 text-center sm:px-8">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white/12 text-gold-soft">
            <PhoneIcon />
          </span>
          <p className="text-lg leading-relaxed text-white/90 sm:text-xl">
            {it
              ? "In alternativa puoi sempre ordinare chiamandoci al:"
              : "Or you can always order by calling us:"}
          </p>
          <a
            href={info.phoneHref}
            className="display-caps text-[2.1rem] leading-none text-gold-soft transition-colors hover:text-white sm:text-[3.4rem]"
          >
            {info.phone}
          </a>
        </div>
      </section>
    </>
  );
}

function FeatureIcon({ i }: { i: number }) {
  const paths = [
    <path key="0" d="M5 12h14M5 12v7h14v-7M5 12V8h14v4M12 8V5m0 0a2 2 0 1 0-3 2m3-2a2 2 0 1 1 3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />,
    <path key="1" d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />,
    <path key="2" d="M12 3l2.5 5.5 6 .6-4.5 4 1.3 5.9L12 21l-5.3 3 1.3-5.9-4.5-4 6-.6L12 3Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
    <path key="3" d="M4 12V5a1 1 0 0 1 1-1h7l8 8-8 8-8-8Zm4-5.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />,
  ];
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      {paths[i % paths.length]}
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a13.8 13.8 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5 3 4 3.5 3.5 4 3.5H7.5c.6 0 1 .5 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.3 1.8Z" />
    </svg>
  );
}
