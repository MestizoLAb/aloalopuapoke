"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import Reveal from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";

export default function Ambiente() {
  const { lang } = useLang();
  const t = content[lang].ambiente;

  return (
    <section className="relative overflow-hidden bg-forest-deep py-20 text-paper sm:py-28">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-70" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
        {/* Foto grande (stile Roy's) */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-card shadow-[0_40px_90px_-40px_rgba(0,0,0,0.7)]">
            <Image
              src="/img/ambiente-sala.jpg"
              alt={lang === "it" ? "La sala di Alo Alo" : "Alo Alo dining room"}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {/* riquadro foto secondaria sovrapposto */}
          <div className="relative -mt-16 ml-auto hidden w-2/5 overflow-hidden rounded-card border-4 border-forest-deep shadow-2xl sm:block lg:-mr-8">
            <div className="relative aspect-[4/3] w-full">
              <Image
                src="/img/ambiente-bancone.jpg"
                alt={lang === "it" ? "Il bancone di Alo Alo" : "Alo Alo counter"}
                fill
                sizes="30vw"
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        {/* Testo */}
        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow={t.eyebrow}
            title={t.title}
            lead={t.lead}
            tone="dark"
          />
          <Reveal delay={120}>
            <Link
              href="/about"
              className="btn btn-outline mt-8 border-paper/60 text-paper hover:bg-paper hover:text-forest-deep"
            >
              {t.cta}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
