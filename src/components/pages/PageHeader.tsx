"use client";

import Image from "next/image";
import StoreButtons from "@/components/StoreButtons";

type Props = {
  eyebrow: string;
  title: string;
  accent?: string;
  lead?: string;
  /** frase "Scarica l'app" + badge App Store / Google Play sotto il lead */
  appCta?: string;
  /** testata image-led (foto a tutto campo con titolo sovrapposto) */
  image?: string;
  imageAlt?: string;
  objectPosition?: string;
};

export default function PageHeader({
  eyebrow,
  title,
  accent,
  lead,
  appCta,
  image,
  imageAlt,
  objectPosition = "center",
}: Props) {
  /* ---------- Variante image-led (premium, coerente con l'hero) ---------- */
  if (image) {
    return (
      <section className="relative isolate flex min-h-[44vh] flex-col justify-end overflow-hidden bg-ink text-white sm:min-h-[54vh]">
        <div className="absolute inset-0 -z-10">
          <Image
            src={image}
            alt={imageAlt ?? ""}
            fill
            priority
            sizes="100vw"
            className="animate-kenburns object-cover"
            style={{ objectPosition }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/55 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-24 sm:px-8 sm:pb-14">
          <div className="max-w-2xl">
            <h1 className="animate-slide-up" style={{ animationDelay: "80ms" }}>
              <span className="display-caps block text-[2rem] leading-[0.98] tracking-[0.02em] sm:text-[3.4rem]">
                {title}
              </span>
              {accent && (
                <span className="script block text-[1.9rem] leading-[1.05] text-gold-soft sm:text-[3rem]">
                  {accent}
                </span>
              )}
            </h1>
            {lead && (
              <p
                className="animate-slide-up mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg"
                style={{ animationDelay: "160ms" }}
              >
                {lead}
              </p>
            )}
            {appCta && (
              <div className="animate-slide-up mt-6" style={{ animationDelay: "240ms" }}>
                <p className="mb-3 text-sm font-semibold text-white/90">{appCta}</p>
                <StoreButtons />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  /* ---------- Variante verde (fallback: /app, /privacy) ---------- */
  return (
    <section className="relative overflow-hidden bg-forest-deep text-white">
      <div className="dot-grid pointer-events-none absolute inset-0 opacity-50" />
      <Image
        src="/img/hibiscus.png"
        alt=""
        aria-hidden="true"
        width={301}
        height={278}
        className="pointer-events-none absolute -right-6 bottom-0 hidden w-44 rotate-[18deg] opacity-25 sm:block"
      />
      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
        <div className="max-w-2xl">
          <p className="script text-[1.4rem] text-gold-soft sm:text-[1.7rem]">{eyebrow}</p>
          <h1 className="mt-2 display-caps text-[2.2rem] leading-[1] tracking-[0.03em] sm:text-[3.4rem]">
            {title}
            {accent && (
              <span className="script mt-1 block text-[1.2em] normal-case leading-[1.05] text-gold-soft">
                {accent}
              </span>
            )}
          </h1>
          {lead && (
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">{lead}</p>
          )}
          {appCta && (
            <div className="mt-7">
              <p className="mb-3 text-sm font-semibold text-white/90">{appCta}</p>
              <StoreButtons />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
