"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function FinalCta() {
  const { lang } = useLang();
  const t = content[lang].finalCta;

  return (
    <section className="relative overflow-hidden bg-coral py-20 text-ink sm:py-28">
      <Image
        src="/img/hibiscus.png"
        alt=""
        aria-hidden="true"
        width={301}
        height={278}
        className="pointer-events-none absolute -bottom-8 -left-8 w-40 rotate-[-18deg] opacity-25 sm:w-56"
      />
      <Image
        src="/img/hibiscus.png"
        alt=""
        aria-hidden="true"
        width={301}
        height={278}
        className="pointer-events-none absolute -right-10 -top-10 w-40 rotate-[24deg] opacity-25 sm:w-56"
      />
      <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
        <Reveal>
          <h2 className="display-caps text-[2.2rem] leading-[1.05] text-ink sm:text-5xl">
            {t.title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
            {t.lead}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/app" className="btn btn-forest">
              {t.ctaOrder}
            </Link>
            <a
              href={info.maps}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost text-ink"
            >
              {t.ctaMap}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
