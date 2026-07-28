"use client";

import { useLang } from "@/lib/i18n";
import { content } from "@/lib/content";

/** Didascalia fine-print bilingue sotto le foto dei piatti. */
export default function DishImageNote({ className = "" }: { className?: string }) {
  const { lang } = useLang();
  return (
    <p
      className={`text-[0.62rem] leading-snug italic text-ink-soft/85 ${className}`}
    >
      {content[lang].common.illustrative}
    </p>
  );
}
