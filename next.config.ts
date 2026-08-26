import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Gestiamo noi i redirect con/senza slash finale, così le vecchie URL
  // WordPress (es. /info/) arrivano a destinazione in UN SOLO hop.
  skipTrailingSlashRedirect: true,
  images: {
    formats: ["image/avif", "image/webp"],
    // Fase di anteprima: niente cache lunga sulle immagini ottimizzate,
    // così il browser mostra sempre la versione aggiornata.
    minimumCacheTTL: 0,
  },
  async headers() {
    return [
      {
        // File statici in /public/img: non cachare durante l'anteprima.
        source: "/img/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, must-revalidate" },
        ],
      },
      {
        // Schermi TV del locale (signage): raggiungibili via URL ma non indicizzati.
        source: "/tv/:path*",
        headers: [
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // Dominio canonico: forza SENZA www (301)
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.aloalopuapoke.it" }],
        destination: "https://aloalopuapoke.it/:path*",
        permanent: true,
      },
      // Vecchie URL WordPress → nuove pagine (preserva il posizionamento)
      { source: "/info", destination: "/contatti", permanent: true },
      { source: "/info/", destination: "/contatti", permanent: true },
      // Segnaposto/default WordPress → home
      { source: "/sample-page", destination: "/", permanent: true },
      { source: "/sample-page/", destination: "/", permanent: true },
      { source: "/2022/:path*", destination: "/", permanent: true },
      { source: "/category/:path*", destination: "/", permanent: true },
      // Vecchie sitemap WordPress/Yoast → sitemap nuova (elimina i 404 su GSC)
      { source: "/sitemap_index.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/page-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/post-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      { source: "/category-sitemap.xml", destination: "/sitemap.xml", permanent: true },
      // Normalizzazione slash finale (gestita da noi, un solo hop) → senza slash
      { source: "/menu/", destination: "/menu", permanent: true },
      { source: "/about/", destination: "/about", permanent: true },
      { source: "/contatti/", destination: "/contatti", permanent: true },
      { source: "/app/", destination: "/app", permanent: true },
      { source: "/privacy/", destination: "/privacy", permanent: true },
    ];
  },
};

export default nextConfig;
