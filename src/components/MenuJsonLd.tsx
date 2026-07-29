import { menu, type Dish } from "@/lib/menu";

const SITE = "https://aloalopuapoke.it";

/** "14,50" / "10,00 €" → "14.50" (formato prezzo schema.org). */
function toPrice(p: string): string {
  return p.replace(/[^\d,]/g, "").replace(",", ".");
}

/** Offerte del piatto: array per le taglie, singola per il prezzo unico. */
function offersFor(d: Dish) {
  if (d.sizes?.length) {
    return d.sizes.map((s) => ({
      "@type": "Offer",
      name: s.label,
      price: toPrice(s.price),
      priceCurrency: "EUR",
    }));
  }
  if (d.price) {
    return { "@type": "Offer", price: toPrice(d.price), priceCurrency: "EUR" };
  }
  return undefined;
}

/** Mappa i tag interni sui tipi di dieta schema.org. */
function dietFor(d: Dish): string[] | undefined {
  const out: string[] = [];
  if (d.tags?.includes("veg")) out.push("https://schema.org/VegetarianDiet");
  if (d.tags?.includes("gf")) out.push("https://schema.org/GlutenFreeDiet");
  return out.length ? out : undefined;
}

/**
 * Dati strutturati del menu (lingua di default: IT), collegati al Restaurant
 * della home tramite lo stesso @id. Aiuta Google (rich results) e le AI a
 * leggere piatti e prezzi in modo strutturato.
 */
export default function MenuJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE}/#restaurant`,
    name: "Alo Alo Pua Poke",
    url: SITE,
    hasMenu: {
      "@type": "Menu",
      "@id": `${SITE}/menu#menu`,
      name: "Menù Alo Alo Pua Pokè",
      url: `${SITE}/menu`,
      inLanguage: "it",
      hasMenuSection: menu.map((cat) => ({
        "@type": "MenuSection",
        name: cat.title.it,
        ...(cat.intro.it ? { description: cat.intro.it } : {}),
        hasMenuItem: cat.dishes.map((d) => {
          const offers = offersFor(d);
          const diet = dietFor(d);
          return {
            "@type": "MenuItem",
            name: d.name.it,
            ...(d.desc.it ? { description: d.desc.it } : {}),
            ...(offers ? { offers } : {}),
            ...(diet ? { suitableForDiet: diet } : {}),
          };
        }),
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
