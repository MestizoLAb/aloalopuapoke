"use client";

import { useLang } from "@/lib/i18n";
import { info } from "@/lib/content";
import Reveal from "@/components/Reveal";
import StoreButtons from "@/components/StoreButtons";

/* Blocchi SEO/GEO riutilizzabili, spostati dalla home alle pagine per intento. */

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="display-caps text-[1.6rem] leading-[1.1] text-ink sm:text-[2.1rem]">
      {children}
    </h2>
  );
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-lg font-semibold text-ink sm:text-xl">{children}</h3>;
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-base leading-relaxed text-ink-mid">{children}</p>;
}
function Bullets({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {items.map((li, i) => (
        <li key={i} className="flex gap-3 text-base leading-relaxed text-ink-mid">
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
          <span>{li}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- /menu — Come ordinare (app · delivery · asporto) ---------------- */
export function OrderWays() {
  const { lang } = useLang();
  const it = lang === "it";
  return (
    <section className="border-t border-ink/8 bg-cream py-14 sm:py-16">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <H2>{it ? "Come ordinare da Alo Alo: app, delivery o asporto" : "How to order from Alo Alo: app, delivery or takeaway"}</H2>
          <P>
            {it
              ? "Tre modi per averlo, a seconda della tua giornata. Prepariamo tutto al momento: il pesce si condisce quando ordini, così la bowl arriva fresca."
              : "Three ways to get it, depending on your day. We make everything to order: the fish is dressed when you order, so the bowl arrives fresh."}
          </P>
        </Reveal>

        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <Reveal>
            <div className="h-full rounded-card border border-ink/8 bg-paper p-6">
              <H3>{it ? "App Alo Alo — 10% sul primo ordine" : "Alo Alo app — 10% off your first order"}</H3>
              <P>
                {it
                  ? "Il modo più diretto e conveniente: primo ordine scontato del 10% e le tue bowl preferite sempre pronte."
                  : "The most direct and convenient way: 10% off your first order and your favourite bowls always ready."}
              </P>
              <div className="mt-5">
                <StoreButtons dark compact />
              </div>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <div className="h-full rounded-card border border-ink/8 bg-paper p-6">
              <H3>{it ? "Delivery: Just Eat" : "Delivery: Just Eat"}</H3>
              <P>
                {it
                  ? "Preferisci le piattaforme che usi già? Cerca Alo Alo Pua Pokè su Just Eat e ordina come al solito."
                  : "Prefer the platforms you already use? Search Alo Alo Pua Pokè on Just Eat and order as usual."}
              </P>
              <a href={info.social.justeat} target="_blank" rel="noreferrer" className="btn btn-outline mt-5 !px-4 !py-2 text-sm">
                {it ? "Ordina su Just Eat" : "Order on Just Eat"}
              </a>
            </div>
          </Reveal>
          <Reveal delay={160}>
            <div className="h-full rounded-card border border-ink/8 bg-paper p-6">
              <H3>{it ? "Asporto in Via Schiassi" : "Takeaway on Via Schiassi"}</H3>
              <P>
                {it
                  ? "Zona ospedale o uffici San Donato? Ordina prima e ritira senza fila, a due passi dal Sant’Orsola."
                  : "Near the hospital or the San Donato offices? Order ahead and pick up without queuing, steps from Sant’Orsola."}
              </P>
              <a href={info.phoneHref} className="btn btn-ghost mt-5 !px-4 !py-2 text-sm text-forest-mid">
                {info.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------- /menu — Poke gluten free e vegana ---------------- */
export function GlutenFreeVegan() {
  const { lang } = useLang();
  const it = lang === "it";
  return (
    <section className="border-t border-ink/8 bg-paper py-14 sm:py-16">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <H2>{it ? "Poke gluten free e vegana a Bologna" : "Gluten-free and vegan poke in Bologna"}</H2>
          <P>
            {it
              ? "Celiaca, vegana, o semplicemente attenta a cosa mangi? Non sei un ripensamento del menù: le opzioni ci sono per davvero."
              : "Coeliac, vegan, or simply careful about what you eat? You're not a menu afterthought: the options are genuinely there."}
          </P>
          <Bullets
            items={
              it
                ? [
                    "Salse fatte da noi anche in versione vegana e gluten free — senza coloranti né conservanti.",
                    "Bowl 100% vegetali complete di proteine (tofu, edamame, legumi).",
                    "Basi e ingredienti senza glutine per comporre in sicurezza.",
                  ]
                : [
                    "Sauces we make ourselves, also vegan and gluten free — no colourings or preservatives.",
                    "100% plant-based bowls with complete proteins (tofu, edamame, pulses).",
                    "Gluten-free bases and ingredients so you can build safely.",
                  ]
            }
          />
          <P>
            {it
              ? "Gestiamo gli allergeni con attenzione in cucina. Se hai un dubbio specifico, scrivici prima di ordinare:"
              : "We handle allergens carefully in the kitchen. If you have a specific question, write to us before ordering:"}{" "}
            <a href={`mailto:${info.email}`} className="font-semibold text-forest-mid underline decoration-forest/40 underline-offset-2 hover:text-ink">
              {info.email}
            </a>
            .
          </P>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- /about — Perché il nostro poke è diverso ---------------- */
export function WhyDifferent() {
  const { lang } = useLang();
  const it = lang === "it";
  return (
    <section className="bg-cream py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <H2>
            {it
              ? "Perché il nostro poke è diverso: salse artigianali fatte a Bologna"
              : "Why our poke is different: sauces handmade in Bologna"}
          </H2>
          <P>
            {it
              ? "A Bologna di poke ne trovi tanto. La differenza, da noi, sta in due cose che non si copiano."
              : "There's plenty of poke in Bologna. With us, the difference comes down to two things you can't copy."}
          </P>
          <P>
            {it
              ? "Le salse le facciamo noi. Non arrivano in tanica: le prepariamo in cucina, senza coloranti né conservanti. È la parte che dà davvero sapore a una bowl — ed è quella su cui le catene non possono competere."
              : "We make the sauces. They don't arrive in a drum: we prepare them in the kitchen, with no colourings or preservatives. It's the part that actually gives a bowl its flavour — and the part chains can't compete on."}
          </P>
          <P>
            {it
              ? "Siamo un laboratorio di culture, non una pokeria in serie. Alo Alo nasce sotto lo stesso tetto di Mestizo Lab e dialoga con la cucina messicana di La Frida: da lì nascono piatti come i Poke Nachos, che altrove non esistono."
              : "We're a laboratory of cultures, not an assembly-line poke shop. Alo Alo was born under the same roof as Mestizo Lab and talks to La Frida's Mexican kitchen: that's where dishes like Poke Nachos come from — you won't find them elsewhere."}
          </P>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- /contatti — Dove consegniamo + contesto orari ---------------- */
export function DeliveryZones() {
  const { lang } = useLang();
  const it = lang === "it";
  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <Reveal>
          <H2>
            {it
              ? "Dove consegniamo a Bologna: Sant’Orsola, San Donato, Cirenaica"
              : "Where we deliver in Bologna: Sant’Orsola, San Donato, Cirenaica"}
          </H2>
          <P>
            {it
              ? "Consegniamo nella nostra zona e dintorni, così la bowl arriva in fretta e nel punto giusto di freschezza:"
              : "We deliver in our area and nearby, so the bowl arrives quickly and at its freshest:"}
          </P>
          <Bullets
            items={
              it
                ? ["Sant’Orsola e area ospedaliera", "San Donato", "Cirenaica"]
                : ["Sant’Orsola and the hospital area", "San Donato", "Cirenaica"]
            }
          />
          <P>
            {it
              ? "Non sei sicura di rientrare? Inserisci l’indirizzo nell’app: ti dice subito se consegniamo da te. Asporto e consegna seguono gli orari qui sopra, e puoi ordinare in anticipo per l’ora che ci indichi."
              : "Not sure you're covered? Enter your address in the app: it tells you straight away if we deliver to you. Takeaway and delivery follow the hours above, and you can order ahead for the time you tell us."}
          </P>
        </Reveal>
      </div>
    </section>
  );
}
