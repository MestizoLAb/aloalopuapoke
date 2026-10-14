"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";

type Bi = { it: string; en: string };

type Copy = {
  kicker: string;
  title: string;
  lead: string;
  tasteLabel: string;
  ctaMenu: string;
  ctaMestizo: string;
  close: string;
};

const copy: Record<"it" | "en", Copy> = {
  it: {
    kicker: "Il laboratorio di culture di Bologna",
    title: "Benvenuto nel mondo Mestizo Lab",
    lead: "Tre cucine, un tetto: poke hawaiano, toast & burger e cucina messicana. Tante specialità tutte da gustare.",
    tasteLabel: "Tante cose da gustare",
    ctaMenu: "Scopri il menù",
    ctaMestizo: "Scopri Mestizo Lab",
    close: "Chiudi",
  },
  en: {
    kicker: "Bologna's laboratory of cultures",
    title: "Welcome to the world of Mestizo Lab",
    lead: "Three kitchens, one roof: Hawaiian poke, toast & burgers and Mexican cuisine. So many specialities to enjoy.",
    tasteLabel: "So much to enjoy",
    ctaMenu: "Explore the menu",
    ctaMestizo: "Discover Mestizo Lab",
    close: "Close",
  },
};

type Cuisine = {
  href: string;
  external: boolean;
  photo: string;
  logo: string;
  logoW: number;
  logoH: number;
  logoAlt: string;
  label: Bi;
  desc: Bi;
  labelColor: string;
};

const cuisines: Cuisine[] = [
  {
    href: "/menu",
    external: false,
    photo: "/img/vfoto-poke.jpg",
    logo: "/img/logo-green.png",
    logoW: 760,
    logoH: 606,
    logoAlt: "Alo Alo Pua Pokè",
    label: { it: "Poke hawaiano", en: "Hawaiian poke" },
    desc: { it: "Bowl fresche, come vuoi tu.", en: "Fresh bowls, your way." },
    labelColor: "text-forest-mid",
  },
  {
    href: "https://mestizo-lab.com",
    external: true,
    photo: "/img/vfoto-burger.jpg",
    logo: "/img/mestizo-lab-logo-green.png",
    logoW: 620,
    logoH: 363,
    logoAlt: "Mestizo Lab",
    label: { it: "Toast & burger", en: "Toast & burgers" },
    desc: { it: "Avocado toast, burger e brunch.", en: "Avocado toast, burgers and brunch." },
    labelColor: "text-forest-mid",
  },
  {
    href: "https://mestizo-lab.com/la-frida",
    external: true,
    photo: "/img/tacos-gamberi.jpg",
    logo: "/img/lafrida-logo.png",
    logoW: 560,
    logoH: 297,
    logoAlt: "La Frida · Cucina Messicana",
    label: { it: "Cucina messicana", en: "Mexican cuisine" },
    desc: { it: "Tacos, tostadas e dolci.", en: "Tacos, tostadas and sweets." },
    labelColor: "text-pink-deep",
  },
];

const tastes = [
  { src: "/img/vfoto-avotoast.jpg", alt: "Avocado toast" },
  { src: "/img/vfoto-pulledpork.jpg", alt: "Toast pulled pork" },
  { src: "/img/vfoto-camaron.jpg", alt: "Tacos di gamberi" },
  { src: "/img/vfoto-tostadas.jpg", alt: "Tostadas" },
  { src: "/img/vfoto-enchiladas.jpg", alt: "Enchiladas mineras" },
  { src: "/img/vfoto-pandulce.jpg", alt: "Pan dulce" },
  { src: "/img/poke-nachos.jpg", alt: "Poke Nachos" },
];

export default function WelcomeModal() {
  const { lang } = useLang();
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);

  // Appare a ogni visita, poco dopo l'ingresso.
  useEffect(() => {
    const t1 = setTimeout(() => setOpen(true), 450);
    return () => clearTimeout(t1);
  }, []);

  // Entrata animata + blocco scroll del body quando aperto.
  useEffect(() => {
    if (!open) return;
    const r = requestAnimationFrame(() => setVisible(true));
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(r);
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setVisible(false);
    setTimeout(() => setOpen(false), 220);
  }

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mestizo Lab"
      className={`fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 transition-opacity duration-200 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Backdrop */}
      <button
        aria-label={t.close}
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/70 backdrop-blur-sm"
      />

      {/* Card */}
      <div
        className={`relative z-10 my-auto w-full max-w-2xl overflow-hidden rounded-[1.75rem] bg-cream shadow-2xl shadow-black/50 transition-all duration-300 ${
          visible ? "translate-y-0 scale-100" : "translate-y-3 scale-[0.97]"
        }`}
      >
        {/* Header verde — brand ombrello Mestizo Lab */}
        <div className="relative flex flex-col items-center justify-center bg-forest-deep px-6 pb-4 pt-5 text-center">
          <button
            onClick={close}
            aria-label={t.close}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/15 hover:text-white"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          <Image
            src="/img/mestizo-lab-logo.png"
            alt="Mestizo Lab"
            width={620}
            height={363}
            priority
            className="h-auto w-[150px] sm:w-[168px]"
          />
          <p className="mt-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/80">
            {t.kicker}
          </p>
        </div>

        {/* Corpo */}
        <div className="px-5 py-5 sm:px-7">
          <h2 className="text-center font-display text-xl font-bold leading-tight text-ink sm:text-[1.6rem]">
            {t.title}
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-sm leading-relaxed text-ink-mid">
            {t.lead}
          </p>

          {/* Tre cucine */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {cuisines.map((c) => {
              const inner = (
                <>
                  <div className="relative aspect-square w-24 shrink-0 overflow-hidden sm:aspect-[16/11] sm:w-full">
                    <Image
                      src={c.photo}
                      alt={c.label[lang]}
                      fill
                      sizes="(max-width: 640px) 96px, 220px"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center px-3 py-2 text-left sm:items-center sm:py-3 sm:text-center">
                    <Image
                      src={c.logo}
                      alt={c.logoAlt}
                      width={c.logoW}
                      height={c.logoH}
                      className="h-8 w-auto max-w-[70%] shrink-0 self-start object-contain sm:max-w-full sm:self-center"
                    />
                    <p className={`mt-1.5 text-xs font-semibold uppercase tracking-wide ${c.labelColor}`}>
                      {c.label[lang]}
                    </p>
                    <p className="mt-0.5 text-[0.72rem] leading-snug text-ink-soft">
                      {c.desc[lang]}
                    </p>
                  </div>
                </>
              );
              const cls =
                "group flex overflow-hidden rounded-2xl border border-ink/10 bg-paper shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg sm:flex-col";
              return c.external ? (
                <a key={c.logoAlt} href={c.href} target="_blank" rel="noreferrer" onClick={close} className={cls}>
                  {inner}
                </a>
              ) : (
                <Link key={c.logoAlt} href={c.href} onClick={close} className={cls}>
                  {inner}
                </Link>
              );
            })}
          </div>

          {/* Striscia assaggi — dal video */}
          <p className="mt-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-coral-deep">
            {t.tasteLabel}
          </p>
          <div className="mt-2.5 flex gap-2.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tastes.map((img) => (
              <div
                key={img.src}
                className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl sm:h-20 sm:w-28"
              >
                <Image src={img.src} alt={img.alt} fill sizes="112px" className="object-cover" />
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/menu" onClick={close} className="btn btn-coral w-full justify-center sm:w-auto">
              {t.ctaMenu}
            </Link>
            <a
              href="https://mestizo-lab.com"
              target="_blank"
              rel="noreferrer"
              onClick={close}
              className="text-sm font-semibold text-forest-mid underline decoration-forest/40 underline-offset-2 hover:decoration-forest"
            >
              {t.ctaMestizo} →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
