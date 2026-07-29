"use client";

import { useLang } from "@/lib/i18n";
import Reveal from "@/components/Reveal";
import PageHeader from "./PageHeader";

type Sub = { h: string; p?: string[]; list?: string[] };
type Section = { h: string; p?: string[]; list?: string[]; sub?: Sub[] };
type Policy = {
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: Section[];
};

const POLICY: Record<"it" | "en", Policy> = {
  it: {
    eyebrow: "Informativa",
    title: "Privacy & Cookie Policy",
    updated: "Ultimo aggiornamento: 29 luglio 2026",
    intro:
      "La presente informativa descrive come vengono trattati i dati personali degli utenti che consultano il sito aloalopuapoke.it e che interagiscono con i servizi in esso presenti (iscrizione alla newsletter, richieste di contatto), ai sensi del Regolamento (UE) 2016/679 (“GDPR”) e del D.Lgs. 196/2003 come modificato dal D.Lgs. 101/2018 (“Codice Privacy”).",
    sections: [
      {
        h: "1. Titolare del trattamento",
        p: [
          "Il Titolare del trattamento è ORDINE 33 S.R.L., con sede legale in Via Filippo Schiassi 32/a, 40138 Bologna (BO), Italia — C.F. e P.IVA 04382121202.",
          "Sito web di riferimento: aloalopuapoke.it.",
          "Per qualsiasi richiesta relativa al trattamento dei dati personali è possibile scrivere a info@mestizo-lab.com.",
        ],
      },
      {
        h: "2. Quali dati raccogliamo e per quali finalità",
        p: ["Trattiamo solo i dati necessari a fornire i servizi richiesti. In particolare:"],
        list: [
          "Iscrizione alla newsletter — indirizzo e-mail. Finalità: inviarti aggiornamenti, novità e iniziative. Base giuridica: il tuo consenso (art. 6.1.a GDPR), revocabile in ogni momento.",
          "Richieste di contatto — quando ci scrivi via e-mail o ci chiami, trattiamo i dati che ci fornisci (es. nome, e-mail, numero di telefono e contenuto del messaggio) al solo fine di rispondere alla tua richiesta. Base giuridica: esecuzione di misure precontrattuali richieste dall’interessato (art. 6.1.b GDPR).",
          "Dati di navigazione e cookie — dati tecnici (indirizzo IP, tipo di browser/dispositivo, pagine visitate) necessari al funzionamento e alla sicurezza del Sito. Base giuridica: legittimo interesse (art. 6.1.f GDPR). Il Sito non utilizza cookie di profilazione o marketing (vedi la sezione 3).",
        ],
      },
      {
        h: "3. Cookie e strumenti di tracciamento",
        p: ["Un cookie è un piccolo file di testo salvato sul tuo dispositivo. Il Sito utilizza:"],
        sub: [
          {
            h: "Cookie tecnici (senza consenso)",
            p: [
              "Necessari al corretto funzionamento del Sito e a memorizzare le tue preferenze (es. lingua e la scelta espressa su questo banner). Sono salvati nella memoria locale del browser e non richiedono consenso.",
            ],
          },
          {
            h: "Mappa (OpenStreetMap)",
            p: [
              "Nella pagina Contatti mostriamo una mappa tramite OpenStreetMap: un servizio cartografico che non utilizza cookie di profilazione né a fini pubblicitari.",
            ],
          },
          {
            h: "Nessun cookie di analisi o marketing",
            p: [
              "Allo stato attuale il Sito NON utilizza cookie o strumenti di statistica, analisi o marketing di terze parti (come Google Analytics o Meta Pixel). Qualora in futuro venissero introdotti, saranno attivati soltanto previo tuo consenso e questa informativa sarà aggiornata di conseguenza.",
            ],
          },
        ],
      },
      {
        h: "",
        p: [
          "Puoi rivedere la scelta espressa sul banner in qualsiasi momento tramite il link “Preferenze cookie” presente nel footer del Sito, oppure gestire e cancellare i cookie tecnici dalle impostazioni del tuo browser.",
        ],
      },
      {
        h: "4. Destinatari dei dati",
        p: [
          "I dati non vengono diffusi né venduti. Possono essere trattati, per nostro conto e come Responsabili del trattamento (art. 28 GDPR), da fornitori che ci supportano nell’erogazione del servizio, tra cui:",
        ],
        list: [
          "Vercel Inc. — hosting e distribuzione del Sito;",
          "OpenStreetMap Foundation — visualizzazione della mappa nella pagina Contatti;",
          "fornitori di posta elettronica e strumenti gestionali per rispondere alle richieste.",
        ],
      },
      {
        h: "5. Trasferimento dei dati fuori dall’UE",
        p: [
          "Il fornitore di hosting (Vercel Inc.) può trattare dati tecnici, come l’indirizzo IP presente nei log del server, anche negli Stati Uniti. In tal caso il trasferimento avviene sulla base di garanzie adeguate ai sensi degli artt. 44 e ss. GDPR, quali le Clausole Contrattuali Standard della Commissione Europea e/o l’adesione al EU–U.S. Data Privacy Framework.",
        ],
      },
      {
        h: "6. Per quanto tempo conserviamo i dati",
        list: [
          "Newsletter: fino alla revoca del consenso (disiscrizione);",
          "Richieste di contatto: per il tempo necessario a gestire la richiesta e per i successivi obblighi di legge;",
          "Dati statistici/marketing: secondo i periodi di conservazione dei rispettivi strumenti (indicati nelle loro policy).",
        ],
      },
      {
        h: "7. I tuoi diritti",
        p: ["In qualità di interessato, ai sensi degli artt. 15–22 GDPR, hai diritto di:"],
        list: [
          "accedere ai tuoi dati e ottenerne copia;",
          "rettificare i dati inesatti o incompleti;",
          "chiederne la cancellazione (“diritto all’oblio”) o la limitazione del trattamento;",
          "opporti al trattamento e alla profilazione;",
          "ricevere i dati in formato strutturato (portabilità) e revocare in ogni momento il consenso prestato.",
        ],
      },
      {
        h: "",
        p: [
          "Puoi esercitare i tuoi diritti scrivendo a info@mestizo-lab.com. Risponderemo senza ingiustificato ritardo e comunque entro un mese.",
        ],
      },
      {
        h: "8. Reclamo all’Autorità di controllo",
        p: [
          "Se ritieni che il trattamento dei tuoi dati violi la normativa, hai il diritto di proporre reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).",
        ],
      },
      {
        h: "9. Modifiche a questa informativa",
        p: [
          "Possiamo aggiornare la presente informativa per adeguarla a modifiche normative o dei servizi. La versione vigente è sempre pubblicata su questa pagina, con indicazione della data di ultimo aggiornamento.",
        ],
      },
    ],
  },
  en: {
    eyebrow: "Legal notice",
    title: "Privacy & Cookie Policy",
    updated: "Last updated: 29 July 2026",
    intro:
      "This notice describes how we process the personal data of users who visit the website aloalopuapoke.it and interact with the services available on it (newsletter sign-up, contact requests), pursuant to Regulation (EU) 2016/679 (“GDPR”) and Italian Legislative Decree 196/2003 as amended by Legislative Decree 101/2018 (“Privacy Code”).",
    sections: [
      {
        h: "1. Data controller",
        p: [
          "The data controller is ORDINE 33 S.R.L., registered office at Via Filippo Schiassi 32/a, 40138 Bologna (BO), Italy — VAT and Tax Code 04382121202.",
          "Reference website: aloalopuapoke.it.",
          "For any request regarding the processing of personal data you can write to info@mestizo-lab.com.",
        ],
      },
      {
        h: "2. What data we collect and why",
        p: ["We only process the data needed to provide the requested services. In particular:"],
        list: [
          "Newsletter sign-up — e-mail address. Purpose: to send you updates, news and initiatives. Legal basis: your consent (art. 6.1.a GDPR), which can be withdrawn at any time.",
          "Contact requests — when you write to us by e-mail or call us, we process the data you provide (e.g. name, e-mail, phone number and message content) solely to reply to your request. Legal basis: performance of pre-contractual measures requested by the data subject (art. 6.1.b GDPR).",
          "Browsing data and cookies — technical data (IP address, browser/device type, pages visited) necessary for the Site to work and be secure. Legal basis: legitimate interest (art. 6.1.f GDPR). The Site does not use profiling or marketing cookies (see section 3).",
        ],
      },
      {
        h: "3. Cookies and tracking tools",
        p: ["A cookie is a small text file saved on your device. The Site uses:"],
        sub: [
          {
            h: "Technical cookies (no consent required)",
            p: [
              "Necessary for the Site to work correctly and to store your preferences (e.g. language and the choice made on this banner). They are saved in your browser’s local storage and do not require consent.",
            ],
          },
          {
            h: "Map (OpenStreetMap)",
            p: [
              "On the Contact page we show a map via OpenStreetMap: a mapping service that uses no profiling or advertising cookies.",
            ],
          },
          {
            h: "No analytics or marketing cookies",
            p: [
              "At present the Site does NOT use any third-party statistics, analytics or marketing cookies or tools (such as Google Analytics or Meta Pixel). Should any be introduced in the future, they will be activated only with your prior consent and this notice will be updated accordingly.",
            ],
          },
        ],
      },
      {
        h: "",
        p: [
          "You can review the choice made on the banner at any time via the “Cookie preferences” link in the Site footer, or manage and delete technical cookies from your browser settings.",
        ],
      },
      {
        h: "4. Data recipients",
        p: [
          "Data is neither disclosed nor sold. It may be processed, on our behalf and as data processors (art. 28 GDPR), by providers that support us in delivering the service, including:",
        ],
        list: [
          "Vercel Inc. — hosting and distribution of the Site;",
          "OpenStreetMap Foundation — display of the map on the Contact page;",
          "e-mail providers and management tools used to reply to requests.",
        ],
      },
      {
        h: "5. Data transfers outside the EU",
        p: [
          "The hosting provider (Vercel Inc.) may process technical data, such as the IP address in server logs, also in the United States. In that case the transfer takes place on the basis of adequate safeguards pursuant to art. 44 et seq. GDPR, such as the European Commission’s Standard Contractual Clauses and/or adherence to the EU–U.S. Data Privacy Framework.",
        ],
      },
      {
        h: "6. How long we keep the data",
        list: [
          "Newsletter: until consent is withdrawn (unsubscribe);",
          "Contact requests: for the time needed to handle the request and for subsequent legal obligations;",
          "Statistical/marketing data: according to the retention periods of the respective tools (set out in their policies).",
        ],
      },
      {
        h: "7. Your rights",
        p: ["As a data subject, pursuant to art. 15–22 GDPR, you have the right to:"],
        list: [
          "access your data and obtain a copy of it;",
          "rectify inaccurate or incomplete data;",
          "request its erasure (“right to be forgotten”) or the restriction of processing;",
          "object to the processing and to profiling;",
          "receive the data in a structured format (portability) and withdraw your consent at any time.",
        ],
      },
      {
        h: "",
        p: [
          "You can exercise your rights by writing to info@mestizo-lab.com. We will respond without undue delay and in any case within one month.",
        ],
      },
      {
        h: "8. Complaint to the supervisory authority",
        p: [
          "If you believe that the processing of your data breaches the law, you have the right to lodge a complaint with the Italian Data Protection Authority (Garante per la protezione dei dati personali, www.garanteprivacy.it).",
        ],
      },
      {
        h: "9. Changes to this notice",
        p: [
          "We may update this notice to reflect changes in the law or in our services. The version in force is always published on this page, with the date of the last update.",
        ],
      },
    ],
  },
};

export default function PrivacyView() {
  const { lang } = useLang();
  const t = POLICY[lang];

  return (
    <>
      <PageHeader eyebrow={t.eyebrow} title={t.title} />

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <Reveal>
            <p className="text-sm font-semibold text-ink-soft">{t.updated}</p>
            <p className="mt-5 text-base leading-relaxed text-ink-mid">{t.intro}</p>
          </Reveal>

          <div className="mt-10 space-y-8">
            {t.sections.map((s, i) => (
              <Reveal key={i}>
                <div>
                  {s.h && (
                    <h2 className="display-caps text-lg leading-[1.1] text-ink sm:text-xl">
                      {s.h}
                    </h2>
                  )}
                  {s.p?.map((p, j) => (
                    <p
                      key={j}
                      className={`${s.h ? "mt-3" : ""} text-base leading-relaxed text-ink-mid`}
                    >
                      {p}
                    </p>
                  ))}
                  {s.list && (
                    <ul className="mt-4 space-y-2.5">
                      {s.list.map((li, j) => (
                        <li key={j} className="flex gap-3 text-base leading-relaxed text-ink-mid">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                          <span>{li}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  {s.sub?.map((sub, j) => (
                    <div key={j} className="mt-5">
                      <h3 className="font-display text-base font-semibold text-ink">{sub.h}</h3>
                      {sub.p?.map((p, k) => (
                        <p key={k} className="mt-2 text-base leading-relaxed text-ink-mid">
                          {p}
                        </p>
                      ))}
                      {sub.list && (
                        <ul className="mt-3 space-y-2.5">
                          {sub.list.map((li, k) => (
                            <li key={k} className="flex gap-3 text-base leading-relaxed text-ink-mid">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-forest" aria-hidden="true" />
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
