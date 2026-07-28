"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/**
 * Bottoni store — app AloAlo Pua Poke (xMenu S.r.l.).
 */
const iosUrl = "https://apps.apple.com/it/app/aloalo-pua-poke-srls/id1605643166";
const androidUrl =
  "https://play.google.com/store/apps/details?id=it.xmenu.aloalopuapoke";

export default function StoreButtons({
  dark = false,
  compact = false,
}: {
  dark?: boolean;
  compact?: boolean;
}) {
  const { lang } = useLang();
  const t = content[lang].app;

  const base = `inline-flex items-center rounded-2xl transition-transform active:scale-95 ${
    compact ? "gap-2 px-2.5 py-1.5" : "gap-3 px-4 py-2.5"
  }`;
  const style = dark
    ? "bg-ink text-paper hover:bg-ink-mid"
    : "bg-paper text-ink hover:bg-white";
  const subCls = compact
    ? "text-[0.5rem] uppercase tracking-wide opacity-70"
    : "text-[0.6rem] uppercase tracking-wide opacity-70";
  const mainCls = compact ? "text-[0.72rem] font-bold" : "text-sm font-bold";

  return (
    <div className={`flex gap-2 ${compact ? "flex-nowrap" : "flex-wrap gap-3"}`}>
      <a
        href={iosUrl}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${style}`}
        aria-label={t.ios}
      >
        <AppleIcon />
        <span className="flex flex-col text-left leading-tight">
          <span className={subCls}>
            {lang === "it" ? "Scarica su" : "Download on"}
          </span>
          <span className={mainCls}>{t.ios}</span>
        </span>
      </a>
      <a
        href={androidUrl}
        target="_blank"
        rel="noreferrer"
        className={`${base} ${style}`}
        aria-label={t.android}
      >
        <PlayIcon />
        <span className="flex flex-col text-left leading-tight">
          <span className={subCls}>
            {lang === "it" ? "Disponibile su" : "Get it on"}
          </span>
          <span className={mainCls}>{t.android}</span>
        </span>
      </a>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M16.4 12.7c0-2 1.6-3 1.7-3-1-1.4-2.4-1.6-2.9-1.6-1.2-.1-2.4.7-3 .7-.6 0-1.6-.7-2.6-.7-1.3 0-2.5.8-3.2 2-1.4 2.3-.4 5.8 1 7.7.7.9 1.4 2 2.4 1.9 1-.04 1.3-.6 2.5-.6 1.2 0 1.5.6 2.5.6 1 0 1.7-.9 2.3-1.9.7-1 1-2 1-2-.03-.03-2.1-.8-2.2-3.1ZM14.6 6.2c.5-.7.9-1.6.8-2.5-.8 0-1.7.5-2.3 1.2-.5.6-.9 1.5-.8 2.4.9.06 1.7-.4 2.3-1.1Z" />
    </svg>
  );
}
function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 3.5c-.3.2-.5.6-.5 1v15c0 .4.2.8.5 1l8.4-8.5L4 3.5Z" fill="#00d3f6" />
      <path d="M17.5 9.2 14 7.1 12.4 8.5l2.6 2.6 2.5-1.4c.6-.4.6-1.1 0-1.5Z" fill="#ffc107" />
      <path d="m4 3.5 8.4 8.5L14 10.6 5.6 2.7c-.5-.3-1.1-.3-1.6.8Z" fill="#00e676" />
      <path d="m4 20.5 8.4-8.5L14 13.4 5.6 21.3c-.5.3-1.1.3-1.6-.8Z" fill="#ff3d47" />
    </svg>
  );
}
