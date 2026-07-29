"use client";

import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Reveal from "@/components/Reveal";
import { DeliveryZones } from "@/components/seo/Sections";
import PageHeader from "./PageHeader";

export default function ContattiView() {
  const { lang } = useLang();
  const t = content[lang].contactPage;

  // Mappa via OpenStreetMap: nessun cookie di profilazione/marketing → conforme
  // GDPR senza bisogno di consenso preventivo (a differenza dell'embed di Google Maps).
  const mapSrc =
    "https://www.openstreetmap.org/export/embed.html?bbox=11.3650%2C44.4851%2C11.3772%2C44.4911&layer=mapnik&marker=44.488124%2C11.371082";

  return (
    <>
      <PageHeader
        eyebrow={t.eyebrow}
        title={t.title}
        lead={t.lead}
        image="/img/poke-earth.jpg"
        imageAlt={lang === "it" ? "Poke bowl fresca di Alo Alo Pua Pokè, Via Schiassi Bologna" : "Fresh Alo Alo Pua Pokè poke bowl, Via Schiassi Bologna"}
        objectPosition="55% 60%"
      />

      <section className="bg-cream py-16 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-14">
          {/* Info */}
          <Reveal className="space-y-6">
            <InfoRow label={t.addressLabel} icon={<PinIcon />}>
              <a
                href={info.maps}
                target="_blank"
                rel="noreferrer"
                className="hover:text-coral-deep"
              >
                {info.address}, {info.city}
              </a>
            </InfoRow>

            <InfoRow label={t.phoneLabel} icon={<PhoneIcon />}>
              <a href={info.phoneHref} className="hover:text-coral-deep">
                {info.phone}
              </a>
            </InfoRow>

            <InfoRow label={t.emailLabel} icon={<MailIcon />}>
              <a href={`mailto:${info.email}`} className="hover:text-coral-deep">
                {info.email}
              </a>
            </InfoRow>

            <InfoRow label={t.hoursLabel} icon={<ClockIcon />}>
              <ul className="space-y-1">
                {info.hours[lang].map((h) => (
                  <li key={h.d} className="flex flex-wrap gap-x-2">
                    <span className="font-semibold text-ink">{h.d}:</span>
                    <span className="text-ink-mid">{h.h}</span>
                  </li>
                ))}
              </ul>
            </InfoRow>

            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={info.maps}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                {t.directions}
              </a>
              <a href={info.phoneHref} className="btn btn-ghost text-forest-mid">
                {info.phone}
              </a>
            </div>
          </Reveal>

          {/* Mappa */}
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-ink/10 shadow-lg">
              <iframe
                title="Mappa Alo Alo Pua Poke"
                src={mapSrc}
                className="h-[380px] w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Delivery */}
      <section className="bg-forest-deep py-16 text-white sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal className="max-w-xl">
            <h2 className="display-caps text-[1.9rem] leading-[1.05] sm:text-4xl">
              {t.orderTitle}
            </h2>
            <p className="mt-3 text-base leading-relaxed text-white/85">{t.orderLead}</p>
          </Reveal>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={info.social.justeat}
              target="_blank"
              rel="noreferrer"
              className="btn bg-gold text-ink hover:bg-gold-soft"
            >
              Just Eat
            </a>
            <a href="/app" className="btn btn-ghost text-white">
              AloAlo App · -10%
            </a>
          </div>
        </div>
      </section>

      {/* SEO: zone di consegna a Bologna */}
      <DeliveryZones />
    </>
  );
}

function InfoRow({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-card border border-ink/8 bg-paper p-5">
      <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-lagoon/12 text-lagoon-deep">
        {icon}
      </span>
      <div>
        <p className="eyebrow text-ink-soft">{label}</p>
        <div className="mt-1.5 text-sm text-ink-mid">{children}</div>
      </div>
    </div>
  );
}

function PinIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="10" r="2.5" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8a13.8 13.8 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5 3 4 3.5 3.5 4 3.5H7.5c.6 0 1 .5 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.3 1.8Z" />
    </svg>
  );
}
function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
