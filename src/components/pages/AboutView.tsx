"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { WhyDifferent } from "@/components/seo/Sections";
import PageHeader from "./PageHeader";

export default function AboutView() {
  const { lang } = useLang();
  const t = content[lang].aboutPage;

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image="/img/poke-sky.jpg"
        imageAlt={lang === "it" ? "Poke bowl colorata firmata Alo Alo" : "Colourful signature Alo Alo poke bowl"}
        objectPosition="50% 55%"
      />

      {/* Storia */}
      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_30px_70px_-34px_rgba(20,41,31,0.55)]">
              <Image
                src="/img/locale.jpg"
                alt={lang === "it" ? "L’interno di Alo Alo Pua Pokè in Via Schiassi a Bologna" : "Inside Alo Alo Pua Pokè on Via Schiassi in Bologna"}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                style={{ objectPosition: "50% 62%" }}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-5 pb-4 pt-10">
                <p className="text-[0.78rem] font-medium leading-snug text-white/90">
                  {lang === "it"
                    ? "Locale in fase di rinnovamento: immagini puramente indicative del progetto."
                    : "Venue under renovation: images are purely indicative of the project."}
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal className="max-w-lg">
            <p className="text-base leading-relaxed text-ink-mid">{t.story1}</p>
            <p className="mt-4 text-base leading-relaxed text-ink-mid">{t.story2}</p>
            <div className="mt-6 rounded-card border border-ink/10 bg-paper px-5 py-4">
              <p className="text-sm text-ink-soft">
                {content[lang].footer.family}{" "}
                <a
                  href={info.familyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-coral-deep hover:text-ink"
                >
                  {info.family}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Valori */}
      <section className="bg-paper py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2 className="display-caps text-[1.9rem] leading-[1.05] text-ink sm:text-4xl">
              {t.valuesTitle}
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.values.map((v, i) => (
              <Reveal key={v.t} delay={i * 70}>
                <div className="h-full rounded-card border border-ink/8 bg-cream p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-coral/15 font-display text-lg font-bold text-coral-deep">
                    {i + 1}
                  </span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-ink">
                    {v.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mid">{v.d}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-12">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/menu" className="btn btn-forest">
                {content[lang].common.menuFull}
              </Link>
              <Link href="/contatti" className="btn btn-outline">
                {content[lang].contactPage.title}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SEO: perché il nostro poke è diverso */}
      <WhyDifferent />
    </>
  );
}
