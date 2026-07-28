"use client";

import Link from "next/link";
import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Logo from "./Logo";
import Newsletter from "./Newsletter";
import { OPEN_COOKIE_EVENT } from "./CookieBanner";

export default function Footer() {
  const { lang } = useLang();
  const t = content[lang];
  const year = 2026;

  const links = [
    { href: "/menu", label: t.nav.menu },
    { href: "/about", label: t.nav.about },
    { href: "/app", label: t.nav.app },
    { href: "/contatti", label: t.nav.contact },
  ];

  return (
    <>
      <Newsletter />
      <footer className="border-t border-paper/10 bg-forest-deep text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo onDark className="h-20 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/85">
              {t.footer.tagline}
            </p>
          </div>

          {/* Naviga */}
          <div>
            <h3 className="eyebrow text-white">{t.footer.nav}</h3>
            <ul className="mt-4 space-y-2.5">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/85 transition-colors hover:text-gold-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contatti */}
          <div>
            <h3 className="eyebrow text-white">{t.footer.contact}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/85">
              <li>
                <a
                  href={info.maps}
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-gold-soft"
                >
                  {info.address}
                  <br />
                  {info.city}
                </a>
              </li>
              <li>
                <a href={info.phoneHref} className="transition-colors hover:text-gold-soft">
                  {info.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${info.email}`}
                  className="transition-colors hover:text-gold-soft"
                >
                  {info.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Orari + Social */}
          <div>
            <h3 className="eyebrow text-white">{t.footer.hoursLabel}</h3>
            <ul className="mt-4 space-y-1.5 text-sm text-white/85">
              {info.hours[lang].map((h) => (
                <li key={h.d} className="flex flex-col">
                  <span className="font-semibold text-white">{h.d}</span>
                  <span className="text-white/75">{h.h}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex gap-3">
              <SocialLink href={info.social.instagram} label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href={info.social.facebook} label="Facebook">
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-paper/15 pt-6 text-xs text-white/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>© {year} {info.brand} — {t.footer.rights}</span>
            <Link href="/privacy" className="transition-colors hover:text-gold-soft">
              {t.footer.privacy}
            </Link>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_EVENT))}
              className="transition-colors hover:text-gold-soft"
            >
              {t.footer.cookiePrefs}
            </button>
          </p>
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>{info.company} · P.IVA e C.F. {info.vat}</span>
            <span className="text-white/60">·</span>
            <span>
              {t.footer.family}{" "}
              <a
                href={info.familyUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-white underline decoration-paper/40 underline-offset-2 hover:decoration-paper"
              >
                {info.family}
              </a>
            </span>
          </p>
        </div>
      </div>
      </footer>
    </>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-paper/25 text-white/85 transition-colors hover:border-gold-soft hover:text-gold-soft active:scale-95"
    >
      {children}
    </a>
  );
}

function InstagramIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 8.5V7c0-.8.4-1 1-1h1.5V3H14c-2 0-3.5 1.4-3.5 3.6V8.5H8.5v3h2V21h3.5v-9.5h2.3l.5-3H14Z"
        fill="currentColor"
      />
    </svg>
  );
}
