import type { Metadata } from "next";
import ContattiView from "@/components/pages/ContattiView";

export const metadata: Metadata = {
  title: "Dove siamo e orari — Via Filippo Schiassi 32/a, Bologna",
  description:
    "Alo Alo Pua Pokè in Via Filippo Schiassi 32/a a Bologna, zona Sant’Orsola–San Donato. Orari, telefono, email e mappa. Asporto e consegna a pranzo e cena.",
  alternates: { canonical: "/contatti" },
};

export default function ContattiPage() {
  return <ContattiView />;
}
