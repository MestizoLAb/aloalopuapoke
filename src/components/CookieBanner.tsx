"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

const KEY = "aloalo-cookie-consent";
export const OPEN_COOKIE_EVENT = "open-cookie-preferences";

export default function CookieBanner() {
  const { lang } = useLang();
  const t = content[lang].cookie;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Mostra il banner solo se non è ancora stata espressa una scelta.
    let stored: string | null = null;
    try {
      stored = localStorage.getItem(KEY);
    } catch {
      /* localStorage non disponibile */
    }
    if (!stored) setOpen(true);

    const reopen = () => setOpen(true);
    window.addEventListener(OPEN_COOKIE_EVENT, reopen);
    return () => window.removeEventListener(OPEN_COOKIE_EVENT, reopen);
  }, []);

  const choose = (value: "accepted" | "rejected") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* no-op */
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-[60] px-3 pb-3 sm:px-5 sm:pb-5">
      <div className="pointer-events-auto mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-paper/15 bg-forest-deep/95 p-4 text-paper shadow-2xl shadow-black/40 backdrop-blur sm:flex-row sm:items-center sm:gap-6 sm:p-5">
        <p className="text-sm leading-relaxed text-paper/90">
          {t.text}{" "}
          <Link
            href="/privacy"
            className="font-semibold text-white underline decoration-paper/40 underline-offset-2 hover:decoration-paper"
          >
            {t.more}
          </Link>
        </p>
        <div className="flex gap-3 sm:shrink-0">
          <button
            onClick={() => choose("rejected")}
            className="flex-1 rounded-xl border border-paper/30 px-4 py-2.5 text-sm font-semibold text-paper transition-colors hover:bg-paper/10 sm:flex-none"
          >
            {t.reject}
          </button>
          <button
            onClick={() => choose("accepted")}
            className="flex-1 rounded-xl bg-red px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red/90 sm:flex-none"
          >
            {t.accept}
          </button>
        </div>
      </div>
    </div>
  );
}
