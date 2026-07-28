import { info } from "@/lib/content";
import { faqIt } from "@/lib/faq";

const SITE = "https://aloalopuapoke.it";

/** Dati strutturati della money page: attività locale + FAQ (lingua di default: IT). */
export default function JsonLd() {
  const restaurant = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${SITE}/#restaurant`,
    name: info.brand,
    legalName: `${info.company}`,
    url: SITE,
    image: `${SITE}/img/poke-hero.jpg`,
    logo: `${SITE}/img/logo-green.png`,
    telephone: info.phone,
    email: info.email,
    priceRange: "€€",
    servesCuisine: ["Hawaiian", "Poke", "Fusion"],
    vatID: info.vat,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Via Filippo Schiassi, 32/a",
      postalCode: "40138",
      addressLocality: "Bologna",
      addressRegion: "BO",
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 44.488124,
      longitude: 11.371082,
    },
    areaServed: ["Bologna", "Sant'Orsola", "San Donato", "Cirenaica"],
    hasMenu: `${SITE}/menu`,
    acceptsReservations: false,
    sameAs: [info.social.instagram, info.social.facebook].filter(Boolean),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "11:30",
        closes: "15:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "18:30",
        closes: "22:00",
      },
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqIt.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurant) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  );
}
