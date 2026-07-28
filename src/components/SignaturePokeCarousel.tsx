"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";
import { tagLabels, type MenuCategory } from "@/lib/menu";
import Reveal from "@/components/Reveal";

const AUTOPLAY = 6000;
const SPEED = 500;
const PANEL_BG = "#fffdf7";

// Un colore accento per ciascun poke firmato (stesso ordine di signatureBowls).
type Accent = {
  text: string;
  frameBorder: string;
  frameBg: string;
  dot: string;
  tab: string;
};
const ACCENTS: Accent[] = [
  // Ocean — azzurro laguna
  {
    text: "text-lagoon-deep",
    frameBorder: "border-lagoon/70",
    frameBg: "bg-lagoon/[0.10]",
    dot: "bg-lagoon-deep",
    tab: "border-lagoon-deep text-lagoon-deep",
  },
  // Sky — corallo (salmone)
  {
    text: "text-coral-deep",
    frameBorder: "border-coral/60",
    frameBg: "bg-coral/[0.12]",
    dot: "bg-coral-deep",
    tab: "border-coral-deep text-coral-deep",
  },
  // Earth — rosa
  {
    text: "text-pink-deep",
    frameBorder: "border-pink-deep/55",
    frameBg: "bg-pink/[0.14]",
    dot: "bg-pink-deep",
    tab: "border-pink-deep text-pink-deep",
  },
  // Nature — verde
  {
    text: "text-forest",
    frameBorder: "border-forest/55",
    frameBg: "bg-forest/[0.07]",
    dot: "bg-forest-deep",
    tab: "border-forest text-forest-mid",
  },
];

export default function SignaturePokeCarousel({ cat }: { cat: MenuCategory }) {
  const { lang } = useLang();
  const t = content[lang];
  const it = lang === "it";
  const data = cat.dishes;
  const n = data.length;
  const track = [data[n - 1], ...data, data[0]]; // cloni per loop infinito

  const [pos, setPos] = useState(1);
  const [anim, setAnim] = useState(true);
  const [reduced, setReduced] = useState(false);
  const paused = useRef(false);
  const sliding = useRef(false);
  const touchX = useRef<number | null>(null);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
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
    <div className="mx-auto w-full max-w-6xl px-5 pt-3 sm:px-8 sm:pt-6">
      <Reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <h2 className="display-caps text-lg leading-[1.05] text-ink sm:text-2xl">
          {cat.title[lang]}
        </h2>
        {/* Schede navigazione (nomi dei poke) */}
        <div className="flex flex-nowrap gap-1.5 overflow-x-auto">
          {data.map((d, i) => (
            <button
              key={d.id}
              onClick={() => goTo(i)}
              aria-current={i === active}
              className={`shrink-0 rounded-full border-2 px-3 py-1 text-[0.8rem] font-semibold transition-colors ${
                i === active
                  ? `${ACCENTS[i % ACCENTS.length].tab} bg-paper`
                  : "border-ink/12 text-ink-soft hover:border-ink/30"
              }`}
            >
              {d.name[lang]}
            </button>
          ))}
        </div>
      </Reveal>

      {/* Carosello */}
      <div
        className="relative mt-4 overflow-hidden rounded-2xl shadow-[0_22px_50px_-38px_rgba(20,41,31,0.55)]"
        style={{ backgroundColor: PANEL_BG }}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        onFocusCapture={() => (paused.current = true)}
        onBlurCapture={() => (paused.current = false)}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        aria-roledescription="carousel"
      >
        <div className="overflow-hidden">
          <div
            className="flex"
            style={{
              transform: `translateX(-${pos * 100}%)`,
              transition: anim ? `transform ${SPEED}ms ease` : "none",
            }}
            onTransitionEnd={onRest}
          >
            {track.map((d, i) => {
              const real = ((i - 1) % n + n) % n;
              const a = ACCENTS[real % ACCENTS.length];
              return (
                <div key={i} className="w-full shrink-0" aria-hidden={i !== pos}>
                  <div className="flex flex-col sm:flex-row sm:items-stretch">
                    {/* Foto */}
                    <div className="relative mx-auto aspect-[7/5] w-full max-w-[320px] self-center overflow-hidden rounded-xl sm:mx-0 sm:aspect-[4/3] sm:max-w-none sm:w-[41%]">
                      <Image
                        src={d.img!}
                        alt={d.name[lang]}
                        fill
                        sizes="(max-width: 640px) 320px, 41vw"
                        className="object-cover object-center"
                      />
                      {d.tags && d.tags.length > 0 && (
                        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
                          {d.tags.map((tag) => (
                            <span
                              key={tag}
                              className="rounded-full bg-paper/90 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-wide text-ink backdrop-blur-sm"
                            >
                              {tagLabels[tag][lang]}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Contenuto */}
                    <div className="flex w-full items-center px-5 py-2 sm:w-[59%] sm:px-7 sm:py-6">
                      <div className="w-full max-w-md">
                        <span className={`script block text-[1.05rem] leading-[1.1] sm:text-[1.35rem] ${a.text}`}>
                          {it ? "Pokè firmato" : "Signature bowl"}
                        </span>
                        <h3 className="display-caps text-[1.5rem] leading-[1] text-ink sm:text-[2.1rem]">
                          {d.name[lang]}
                        </h3>

                        {/* Cornice di enfasi sulla descrizione (colore accento) */}
                        <div className={`mt-2.5 rounded-lg border ${a.frameBorder} ${a.frameBg} px-3.5 py-2.5`}>
                          <p className="line-clamp-2 text-[0.85rem] leading-snug text-ink-mid sm:line-clamp-3 sm:text-[0.92rem]">
                            {d.desc[lang]}
                          </p>
                        </div>

                        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <span className="font-display text-lg font-bold text-coral-deep sm:text-xl">
                            € {d.price}
                          </span>
                          <Link href="/app" className="btn btn-forest !px-3.5 !py-1.5 text-[0.8rem]">
                            {t.finalCta.ctaOrder}
                          </Link>
                          <Link href="/menu" className="btn btn-outline !px-3.5 !py-1.5 text-[0.8rem]">
                            {it ? "Guarda menu completo" : "See the full menu"}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Frecce */}
        <button
          onClick={prev}
          aria-label={it ? "Poke precedente" : "Previous bowl"}
          className="absolute left-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest-deep/75 text-paper shadow-lg backdrop-blur-sm transition-colors hover:bg-forest-deep active:scale-95 sm:flex"
        >
          <Chevron dir="left" />
        </button>
        <button
          onClick={next}
          aria-label={it ? "Poke successivo" : "Next bowl"}
          className="absolute right-3 top-1/2 z-20 hidden h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-forest-deep/75 text-paper shadow-lg backdrop-blur-sm transition-colors hover:bg-forest-deep active:scale-95 sm:flex"
        >
          <Chevron dir="right" />
        </button>
      </div>

      {/* Dots */}
      <div className="mt-2.5 flex items-center justify-center gap-2.5">
        {data.map((d, i) => (
          <button
            key={d.id}
            onClick={() => goTo(i)}
            aria-label={`${it ? "Vai a" : "Go to"} ${d.name[lang]}`}
            aria-current={i === active}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active
                ? `w-8 ${ACCENTS[i % ACCENTS.length].dot}`
                : "w-2 bg-ink/20 hover:bg-ink/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
