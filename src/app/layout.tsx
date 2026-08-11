import type { Metadata } from "next";
import { Fredoka, Montserrat } from "next/font/google";
import "./globals.css";
import { LangProvider } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";

// Titoli — Fredoka: sans caldo e tondeggiante, sostituto web di "Skia" (brandbook AloAlo)
const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Corpo testo — Montserrat (indicato dalla guida brand)
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://aloalopuapoke.it"),
  title: {
    default: "Poke a domicilio Bologna: fresco e artigianale | Alo Alo Pua Pokè",
    template: "%s · Alo Alo Pua Pokè",
  },
  description:
    "Ordina poke a domicilio o asporto a Bologna da Alo Alo Pua Pokè, Via Schiassi (zona Sant’Orsola). Bowl fresche, salse fatte in casa, opzioni vegane e gluten free. App, Just Eat o al telefono.",
  keywords: [
    "poke a domicilio Bologna",
    "poke Bologna",
    "poke asporto Bologna",
    "poke delivery Bologna",
    "poke bowl Bologna",
    "poke vegana gluten free Bologna",
    "Alo Alo Pua Pokè",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Poke a domicilio a Bologna — Alo Alo Pua Pokè",
    description:
      "Bowl hawaiane fresche, salse fatte in casa, vegane e gluten free. Consegna e asporto in Via Schiassi, Bologna.",
    url: "https://aloalopuapoke.it/",
    type: "website",
    locale: "it_IT",
    siteName: "Alo Alo Pua Pokè",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Poke bowl hawaiana di Alo Alo Pua Pokè a Bologna",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Poke a domicilio a Bologna — Alo Alo Pua Pokè",
    description:
      "Bowl hawaiane fresche, salse fatte in casa, vegane e gluten free. Consegna e asporto in Via Schiassi, Bologna.",
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: "/favicon.ico?v=2", sizes: "any" },
      { url: "/icon.png?v=2", type: "image/png" },
    ],
    shortcut: "/favicon.ico?v=2",
    apple: "/apple-icon.png?v=2",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${fredoka.variable} ${montserrat.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <LangProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </LangProvider>
      </body>
    </html>
  );
}
