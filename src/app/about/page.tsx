import type { Metadata } from "next";
import AboutView from "@/components/pages/AboutView";

export const metadata: Metadata = {
  title: "Chi siamo — Alo Alo dentro Mestizo Lab",
  description:
    "La storia di Alo Alo Pua Pokè: salse fatte in casa, pesce marinato ogni giorno, opzioni vegane e gluten free. Nato nel laboratorio di culture Mestizo Lab, in Via Schiassi a Bologna.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutView />;
}
