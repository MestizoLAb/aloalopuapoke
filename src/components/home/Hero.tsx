"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import StoreButtons from "@/components/StoreButtons";

// Slider stile Roy's: slide orizzontale, 500ms ease, autoplay 5s, loop infinito.
const AUTOPLAY = 5000;
const SPEED = 500;
const PANEL_BG = "#fffdf7";

type Slide = {
  img: string;
  eyebrow: string;
  title: string;
  accent: string;
  accentClass: string;
  lead: string;
  cta: string;
  href: string;
  objPos?: string;
  frameBorder: string;
  frameBg: string;
  storeButtons?: boolean;
  storePhrase?: string;
  /** didascalia sovrapposta alla foto (in basso) */
  caption?: string;
};

function slides(lang: "it" | "en"): Slide[] {
  const t = content[lang];
  const it = lang === "it";
  return [
    {
      img: "/img/poke-hero.jpg",
      eyebrow: t.hero.eyebrow,
      title: t.hero.titleTop,
      accent: t.hero.titleBottom,
      accentClass: "text-forest",
      frameBorder: "border-forest/55",
      frameBg: "bg-forest/[0.06]",
      lead: t.hero.lead,
      cta: t.hero.ctaMenu,
      href: "/menu",
      objPos: "50% 82%",
      storeButtons: true,
      storePhrase: it
        ? "Scarica l’app e ottieni il 10% sul primo ordine"
        : "Get the app and enjoy 10% off your first order",
    },
    {
      img: "/img/locale.jpg",
      eyebrow: t.ambiente.eyebrow,
      title: it ? "Un’isola verde" : "A green island",
      accent: it ? "in città" : "in the city",
      accentClass: "text-lagoon-deep",
      frameBorder: "border-lagoon/70",
      frameBg: "bg-lagoon/[0.12]",
      lead: t.ambiente.lead,
      cta: t.ambiente.cta,
      href: "/about",
      objPos: "50% 62%",
      caption: it
        ? "Locale in fase di rinnovamento: immagini puramente indicative del progetto."
        : "Venue under renovation: images are purely indicative of the project.",
    },
    {
      img: "/img/fusion.jpg",
      eyebrow: it ? "Non solo poke" : "Beyond poke",
      title: it ? "Cucina hawaiana" : "Hawaiian kitchen",
      accent: it ? "d’autore" : "with soul",
      accentClass: "text-pink-deep",
      frameBorder: "border-pink-deep/55",
      frameBg: "bg-pink/[0.14]",
      lead: it
        ? "Non solo i piatti tipici della cultura hawaiana: da noi trovi anche l’influenza della cucina asiatica e piatti fusion di ispirazione messicana."
        : "Not just the typical dishes of Hawaiian culture: you’ll also find the influence of Asian cuisine and fusion dishes inspired by Mexican cooking.",
      cta: it ? "Scopri il menù" : "See the menu",
      href: "/menu",
    },
  ];
}

export default function Hero() {
  const { lang } = useLang();
  const data = slides(lang);
  const n = data.length;
  const track = [data[n - 1], ...data, data[0]];

  const [pos, setPos] = useState(1);
  const [anim, setAnim] = useState(true);
  const [reduced, setReduced] = useState(false);
  const [heroMinH, setHeroMinH] = useState<string>("");
  const paused = useRef(false);
  const sliding = useRef(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const header = document.querySelector("header");
    if (!header) return;
    // Altezza-schermo intera solo da desktop (lg): su mobile la hero segue il
    // contenuto, così la foto ha spazio e non viene schiacciata.
    const update = () =>
      setHeroMinH(
        window.innerWidth >= 1024 ? `calc(100dvh - ${header.offsetHeight}px)` : ""
      );
    update();
    const ro = new ResizeObserver(update);
    ro.observe(header);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const active = ((pos - 1) % n + n) % n;

  const move = useCallback((delta: number) => {
    if (sliding.current) return;
    sliding.current = true;
    setAnim(true);
    setPos((p) => p + delta);
    window.setTimeout(() => (sliding.current = false), SPEED + 160);
  }, []);
  const next = useCallback(() => move(1), [move]);
  const prev = useCallback(() => move(-1), [move]);
  const goTo = useCallback(
    (real: number) => {
      if (sliding.current || real === active) return;
      sliding.current = true;
      setAnim(true);
      setPos(real + 1);
      window.setTimeout(() => (sliding.current = false), SPEED + 160);
    },
    [active]
  );

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(() => {
      if (!paused.current) next();
    }, AUTOPLAY);
    return () => clearInterval(id);
  }, [reduced, next]);

  const onRest = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget) return;
    if (pos === n + 1) {
      setAnim(false);
      setPos(1);
    } else if (pos === 0) {
      setAnim(false);
      setPos(n);
    }
    sliding.current = false;
  };

  useEffect(() => {
    if (anim) return;
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    return () => cancelAnimationFrame(raf);
  }, [anim]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (dx < -40) next();
    else if (dx > 40) prev();
    touchX.current = null;
  };

  return (
    <section
      className="relative flex flex-col gap-2.5 overflow-hidden bg-cream px-3 py-3 sm:gap-3 sm:px-5 sm:py-4 lg:min-h-[calc(100dvh-6.5rem)]"
      style={{ minHeight: heroMinH || undefined }}
    >
      {/* Striscia superiore (verde) */}
      <div className="mx-auto w-full max-w-6xl shrink-0">
        <div className="flex items-center justify-center gap-3 rounded-xl bg-forest-deep px-4 py-2.5 sm:gap-4">
          <span className="display-caps text-[0.6rem] tracking-[0.26em] text-white sm:text-[0.72rem]">
            Poke bar hawaiano
          </span>
          <span className="text-gold-soft" aria-hidden="true">✦</span>
          <span className="display-caps text-[0.6rem] tracking-[0.26em] text-white sm:text-[0.72rem]">
            Bologna
          </span>
          <span className="hidden text-pink sm:inline" aria-hidden="true">✦</span>
          <span className="display-caps hidden text-[0.6rem] tracking-[0.26em] text-white sm:inline sm:text-[0.72rem]">
            Aloha
          </span>
        </div>
      </div>

      {/* Carosello */}
      <div
        className="relative mx-auto h-[45rem] w-full max-w-7xl overflow-hidden rounded-2xl shadow-[0_26px_60px_-42px_rgba(20,41,31,0.55)] sm:h-[48rem] lg:h-auto lg:flex-1"
        style={{ backgroundColor: PANEL_BG }}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="flex h-full"
            style={{
              transform: `translateX(-${pos * 100}%)`,
              transition: anim ? `transform ${SPEED}ms ease` : "none",
            }}
            onTransitionEnd={onRest}
          >
            {track.map((s, i) => (
              <div key={i} className="h-full w-full shrink-0" aria-hidden={i !== pos}>
                <div className="flex h-full w-full flex-col lg:flex-row lg:items-stretch">
                  {/* Testo (NON è un heading: l'H1 della pagina è la fascia money sotto) */}
                  <div className="flex w-full flex-1 items-center px-6 py-7 sm:px-9 sm:py-8 lg:w-[45%] lg:flex-none lg:py-12 lg:pl-12 lg:pr-8">
                    <div className="max-w-md">
                      <div>
                        <span className="script block text-[1.4rem] leading-[1.1] text-forest-mid sm:text-[1.7rem]">
                          {s.eyebrow}
                        </span>
                        <span className="display-caps mt-1 block text-[2.2rem] leading-[0.98] text-ink sm:text-[3.3rem]">
                          {s.title}
                        </span>
                        <span className={`script block text-[2.05rem] leading-[1.02] tracking-[0.03em] sm:text-[2.9rem] ${s.accentClass}`}>
                          {s.accent}
                        </span>
                      </div>
                      <div className={`mt-5 rounded-lg border ${s.frameBorder} ${s.frameBg} px-4 py-3`}>
                        <p className="text-[0.95rem] leading-relaxed text-ink-mid sm:text-base">
                          {s.lead}
                        </p>
                      </div>
                      {s.storeButtons ? (
                        <div className="mt-6">
                          {s.storePhrase && (
                            <p className="mb-3 max-w-xs text-[0.9rem] font-semibold text-ink-mid">
                              {s.storePhrase}
                            </p>
                          )}
                          <StoreButtons dark />
                        </div>
                      ) : (
                        <Link href={s.href} className="btn btn-outline mt-6">
                          {s.cta}
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Foto */}
                  <div className="relative h-72 w-full sm:h-80 lg:h-auto lg:w-[55%] lg:flex-none">
                    <Image
                      src={s.img}
                      alt=""
                      fill
                      priority={i === 1}
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className="object-cover"
                      style={{ objectPosition: s.objPos ?? "center" }}
                    />
                    {s.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 via-ink/45 to-transparent px-4 pb-3 pt-8">
                        <p className="text-[0.72rem] font-medium leading-snug text-white/90">
                          {s.caption}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={prev}
          aria-label={lang === "it" ? "Slide precedente" : "Previous slide"}
          className="absolute left-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-forest-deep/75 text-paper shadow-lg backdrop-blur-sm transition-colors hover:bg-forest-deep active:scale-95 lg:flex"
        >
          <Chevron dir="left" />
        </button>
        <button
          onClick={next}
          aria-label={lang === "it" ? "Slide successiva" : "Next slide"}
          className="absolute right-3 top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-forest-deep/75 text-paper shadow-lg backdrop-blur-sm transition-colors hover:bg-forest-deep active:scale-95 lg:flex"
        >
          <Chevron dir="right" />
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5">
          {data.map((s, i) => (
            <button
              key={s.img}
              onClick={() => goTo(i)}
              aria-label={`${lang === "it" ? "Vai alla slide" : "Go to slide"} ${i + 1}`}
              aria-current={i === active}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-8 bg-forest-deep" : "w-2 bg-forest-deep/40 hover:bg-forest-deep/70"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Marquee inferiore */}
      <div className="mx-auto w-full max-w-5xl shrink-0 overflow-hidden rounded-xl bg-forest-darker py-2.5 text-paper">
        <div className="flex overflow-hidden">
          <div className="flex shrink-0 animate-marquee items-center gap-8 pr-8 text-sm font-semibold uppercase tracking-[0.2em] text-white">
            {marqueeItems().map((m, i) => (
              <Marquee key={`a-${i}`} text={m} i={i} />
            ))}
          </div>
          <div
            className="flex shrink-0 animate-marquee items-center gap-8 pr-8 text-sm font-semibold uppercase tracking-[0.2em] text-gold-soft"
            aria-hidden="true"
          >
            {marqueeItems().map((m, i) => (
              <Marquee key={`b-${i}`} text={m} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function marqueeItems() {
  return ["Poke", "Avotoast", "Tartare", "Ceviche", "Poke Nachos", "Fruit bowl", "Aloha"];
}

const starColors = ["text-coral", "text-pink", "text-lagoon-soft", "text-gold-soft"];

function Marquee({ text, i }: { text: string; i: number }) {
  return (
    <span className="flex items-center gap-8">
      {text}
      <span className={starColors[i % starColors.length]}>✦</span>
    </span>
  );
}
