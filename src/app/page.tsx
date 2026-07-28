"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { info } from "@/lib/content";
import { menu } from "@/lib/menu";
import Hero from "@/components/home/Hero";
import SignaturePokeCarousel from "@/components/SignaturePokeCarousel";
import StoreButtons from "@/components/StoreButtons";
import HomeFaq from "@/components/home/HomeFaq";
import JsonLd from "@/components/JsonLd";

export default function HomePage() {
  const { lang } = useLang();
  const it = lang === "it";

  return (
    <>
      <JsonLd />
      <Hero />

      {/* H1 — money page: poke a domicilio Bologna */}
      <section className="bg-paper py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <h1 className="display-caps text-[1.85rem] leading-[1.08] tracking-[0.03em] text-ink sm:text-[2.9rem]">
            {it
              ? "Poke a domicilio e asporto a Bologna: fresco, artigianale e su misura"
              : "Poke delivery and takeaway in Bologna: fresh, handmade and made to measure"}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ink-mid sm:text-lg">
            {it
              ? "Bowl hawaiane preparate ogni giorno nella nostra cucina in Via Schiassi, con le salse fatte da noi. Le ricevi a casa o le ritiri al volo, a pranzo e a cena."
              : "Hawaiian bowls made fresh every day in our kitchen on Via Schiassi, with sauces we make ourselves. Delivered to your door or picked up in a flash, lunch and dinner."}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/app" className="btn btn-forest">
              {it ? "Ordina ora nell’app" : "Order now in the app"}
            </Link>
            <a
              href={info.social.justeat}
              target="_blank"
              rel="noreferrer"
              className="btn bg-gold text-ink hover:bg-gold-soft"
            >
              {it ? "Ordina su Just Eat" : "Order on Just Eat"}
            </a>
          </div>
        </div>
      </section>

      {/* Poke firmati — le foto protagoniste */}
      <section className="bg-cream py-10 sm:py-14">
        <SignaturePokeCarousel cat={menu[0]} />
      </section>

      {/* Momento app — −10%, enfatizzato */}
      <section className="relative overflow-hidden bg-lagoon-deep py-14 text-white sm:py-20">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          {/* Testo */}
          <div className="order-2 lg:order-1">
            <p className="script text-[1.5rem] text-gold-soft sm:text-[1.85rem]">
              {it ? "Scarica l’app AloAlo" : "Get the AloAlo app"}
            </p>
            <h2 className="display-caps mt-1 flex flex-wrap items-baseline gap-x-3 text-[1.7rem] leading-[1] sm:text-[2.4rem]">
              <span className="font-display text-[2.6em] font-black leading-none tracking-tight text-gold-soft">
                −10%
              </span>
              <span>{it ? "sul primo ordine" : "on your first order"}</span>
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 sm:text-lg">
              {it
                ? "Ordini in un tap, ritrovi le tue bowl preferite e accumuli punti a ogni ordine. E ordinando diretto aiuti noi: meno commissioni, più cura negli ingredienti."
                : "Order in a tap, find your favourite bowls again and earn points on every order. Ordering direct helps us too: fewer fees, more care in the ingredients."}
            </p>
            <div className="mt-7">
              <StoreButtons />
            </div>
          </div>

          {/* Telefono — più grande */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="relative h-[340px] w-[220px] sm:h-[460px] sm:w-[300px] lg:h-[540px] lg:w-[350px]">
              <Image
                src="/img/app-mockup-green.png"
                alt={it ? "App AloAlo Pua Poke sul telefono" : "AloAlo Pua Poke app on a phone"}
                fill
                sizes="(max-width: 640px) 220px, 350px"
                className="animate-float object-contain drop-shadow-[0_40px_70px_rgba(8,30,40,0.5)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ (blocco GEO della money page) */}
      <HomeFaq />

      {/* Alo Alo dentro Mestizo Lab — il differenziatore di marca */}
      <section className="relative overflow-hidden bg-forest-deep py-16 text-white sm:py-24">
        <div className="dot-grid pointer-events-none absolute inset-0 opacity-40" />
        <Image
          src="/img/hibiscus.png"
          alt=""
          aria-hidden="true"
          width={301}
          height={278}
          className="pointer-events-none absolute -right-8 -bottom-10 hidden w-52 rotate-[18deg] opacity-20 sm:block"
        />
        <div className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="display-caps text-[1.7rem] leading-[1.12] tracking-[0.04em] sm:text-[2.4rem]">
            {it ? "Non una pokeria in serie" : "Not an assembly-line poke shop"}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            {it
              ? "Alo Alo è il volto fresco e veloce di Mestizo Lab, il laboratorio di culture di Via Schiassi, insieme alla cucina messicana di La Frida. Le salse le facciamo noi, senza coloranti né conservanti — ed è lì che nascono piatti come i Poke Nachos, che altrove non trovi."
              : "Alo Alo is the fresh, fast face of Mestizo Lab, the laboratory of cultures on Via Schiassi, alongside La Frida’s Mexican kitchen. We make the sauces ourselves, no colourings or preservatives — and that’s where dishes like Poke Nachos come from, the ones you won’t find elsewhere."}
          </p>
          <div className="mt-8">
            <a
              href={info.familyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn bg-gold text-ink hover:bg-gold-soft"
            >
              {it ? "Scopri Mestizo Lab" : "Discover Mestizo Lab"}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
