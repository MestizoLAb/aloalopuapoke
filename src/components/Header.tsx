"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content, info } from "@/lib/content";
import Logo from "./Logo";

export default function Header() {
  const { lang, toggle } = useLang();
  const t = content[lang];
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/menu", label: t.nav.menu },
    { href: "/about", label: t.nav.about },
    { href: "/app", label: t.nav.app },
    { href: "/contatti", label: t.nav.contact },
  ];

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      {/* Avviso RIAPERTURA — temporaneo: dopo il 31/08 rimuovere questo blocco e riattivare la barra app qui sotto */}
      <div className="bg-coral text-ink">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[0.7rem] font-bold uppercase tracking-[0.15em]">
          <span aria-hidden="true">🌺</span>
          <span>{t.reopen}</span>
        </div>
      </div>

      {/* Barra app — RIPRISTINARE dopo la riapertura (rimuovendo il blocco avviso sopra):
      <div className="bg-forest-darker text-white">
        <Link
          href="/app"
          className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-[0.66rem] font-semibold uppercase tracking-[0.2em] text-white transition-colors hover:text-gold-soft"
        >
          {t.announce}
        </Link>
      </div>
      */}

      {/* Barra principale — verde profondo, logo che sborda (stile Roy's) */}
      <div
        className={`relative bg-forest-deep transition-shadow duration-300 ${
          scrolled ? "shadow-[0_12px_34px_-18px_rgba(0,0,0,0.95)]" : ""
        }`}
      >
        <div className="mx-auto flex h-[62px] max-w-7xl items-center justify-between gap-6 px-4 sm:h-[72px] sm:px-6">
          {/* Logo a sinistra */}
          <Link href="/" className="shrink-0" aria-label="Alo Alo Pua Poke — home">
            <Logo onDark priority className="h-12 w-auto sm:h-[3.4rem]" />
          </Link>

          {/* Nav + azioni a destra */}
          <div className="flex items-center gap-6">
            {/* Nav desktop (case normale, stile Roy's) */}
            <nav className="hidden items-center gap-7 lg:flex">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`text-[0.95rem] font-medium transition-colors ${
                    isActive(l.href) ? "text-white" : "text-white/85 hover:text-white"
                  }`}
                >
                  {l.label}
                </Link>
              ))}
            </nav>

          {/* Azioni */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={toggle}
              className="rounded-full border border-paper/30 px-2.5 py-1.5 text-xs font-bold text-white/90 transition-colors hover:border-gold-soft hover:text-gold-soft active:scale-95"
              aria-label={`Switch language to ${t.common.langFull}`}
              title={t.common.langFull}
            >
              {t.common.langLabel}
            </button>

            <a
              href={info.phoneHref}
              className="hidden rounded-full border border-paper/30 p-2 text-white/90 transition-colors hover:border-gold-soft hover:text-gold-soft active:scale-95 sm:inline-flex"
              aria-label={info.phone}
              title={info.phone}
            >
              <PhoneIcon />
            </a>

            <Link
              href="/app"
              className="btn hidden !px-5 !py-2.5 border border-paper/45 text-white hover:bg-paper hover:text-forest-mid sm:inline-flex"
            >
              {t.nav.order}
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setOpen((v) => !v)}
              className="inline-flex items-center justify-center rounded-full border border-paper/30 p-2 text-white/90 transition-colors hover:border-gold-soft hover:text-gold-soft active:scale-95 lg:hidden"
              aria-label="Menu"
              aria-expanded={open}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* Nav mobile */}
      {open && (
        <div className="border-t border-paper/10 bg-forest-deep lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`border-b border-paper/10 py-3 text-base font-medium transition-colors ${
                  isActive(l.href) ? "text-white" : "text-white/85 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex items-center gap-3 py-4">
              <Link
                href="/app"
                className="btn flex-1 border border-paper/50 text-white hover:bg-paper hover:text-forest-mid"
              >
                {t.nav.order}
              </Link>
              <a
                href={info.phoneHref}
                className="btn border border-paper/30 text-white hover:bg-paper hover:text-forest-mid"
              >
                <PhoneIcon />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M6.6 10.8a13.8 13.8 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.5.6.6 0 1 .5 1 1V20c0 .6-.4 1-1 1C10.4 21 3 13.6 3 4.5 3 4 3.5 3.5 4 3.5H7.5c.6 0 1 .5 1 1 0 1.2.2 2.4.6 3.5.1.4 0 .8-.2 1l-2.3 1.8Z"
        fill="currentColor"
      />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
