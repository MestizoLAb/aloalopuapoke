"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { signatureBowls } from "@/lib/menu";
import Reveal from "@/components/Reveal";
import DishCard from "@/components/DishCard";
import SectionHeading from "@/components/SectionHeading";

export default function Signature() {
  const { lang } = useLang();
  const t = content[lang].signature;

  return (
    <section className="bg-cream py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading eyebrow={t.eyebrow} title={t.title} lead={t.lead} />
          <Reveal delay={120} className="shrink-0">
            <Link href="/menu#builder" className="btn btn-outline">
              {t.builderCta}
            </Link>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {signatureBowls.map((dish, i) => (
            <Reveal key={dish.id} delay={i * 70}>
              <DishCard dish={dish} poke />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
