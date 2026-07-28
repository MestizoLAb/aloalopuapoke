"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import { faqIt, faqEn } from "@/lib/faq";

export default function HomeFaq() {
  const { lang } = useLang();
  const it = lang === "it";
  const faqs = it ? faqIt : faqEn;

  return (
    <section id="faq" className="scroll-mt-32 bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <span className="eyebrow text-forest-mid">FAQ</span>
          <h2 className="mt-3 display-caps text-[1.7rem] leading-[1.1] text-ink sm:text-3xl">
            {it
              ? "Domande frequenti sul poke a domicilio a Bologna"
              : "Frequently asked questions about poke delivery in Bologna"}
          </h2>
        </Reveal>

        <div className="mt-8 divide-y divide-ink/10 border-y border-ink/10">
          {faqs.map((f, i) => (
            <Reveal key={i}>
              <details className="group py-1.5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-left">
                  <h3 className="font-display text-base font-semibold text-ink sm:text-lg">
                    {f.q}
                  </h3>
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink-mid transition-transform group-open:rotate-45"
                    aria-hidden="true"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 pr-10 text-base leading-relaxed text-ink-mid">{f.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
