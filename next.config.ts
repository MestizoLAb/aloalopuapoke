import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
    ];
  },
};

export default nextConfig;
