import type { Metadata } from "next";
import PrivacyView from "@/components/pages/PrivacyView";

export const metadata: Metadata = {
  title: "Privacy & Cookie Policy",
  description:
    "Informativa privacy e cookie di Alo Alo Pua Pokè (ORDINE 33 S.R.L.): come trattiamo i dati e gestiamo i cookie ai sensi del GDPR.",
  alternates: { canonical: "/privacy" },
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return <PrivacyView />;
}
