import type { Metadata } from "next";
import MenuView from "@/components/pages/MenuView";

export const metadata: Metadata = {
  title: "Menù e prezzi delle poke bowl a Bologna",
  description:
    "Il menù di Alo Alo Pua Pokè: poke firmati Ocean, Sky, Nature ed Earth, componi la tua poke, avotoast, tartare, ceviche, tapas e dolci. Prezzi da 12€, opzioni vegane e gluten free.",
  alternates: { canonical: "/menu" },
};

export default function MenuPage() {
  return <MenuView />;
}
