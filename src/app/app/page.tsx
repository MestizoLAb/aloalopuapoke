import type { Metadata } from "next";
import AppView from "@/components/pages/AppView";

export const metadata: Metadata = {
  title: "App AloAlo Pua Pokè — 10% sul primo ordine",
  description:
    "Scarica l'app AloAlo Pua Pokè: ordina in un tap, accumula punti e ricevi il 10% sul primo ordine. Disponibile per iOS e Android, oppure ordina al telefono.",
  alternates: { canonical: "/app" },
};

export default function AppPage() {
  return <AppView />;
}
