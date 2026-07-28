"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type Lang = "it" | "en";

const STORAGE_KEY = "aloalo-lang";

type LangContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  // Server e primo render client = "it" (evita mismatch di idratazione).
  const [lang, setLangState] = useState<Lang>("it");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (stored === "it" || stored === "en") {
        setLangState(stored);
      } else if (navigator.language?.toLowerCase().startsWith("en")) {
        setLangState("en");
      }
    } catch {
      /* localStorage non disponibile */
    }
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignora */
    }
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(
    () => setLangState((prev) => (prev === "it" ? "en" : "it")),
    []
  );

  return (
    <LangContext.Provider value={{ lang, setLang, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang deve essere usato dentro <LangProvider>");
  }
  return ctx;
}

/** Helper: sceglie il valore giusto in base alla lingua corrente. */
export function pick<T>(lang: Lang, it: T, en: T): T {
  return lang === "it" ? it : en;
}
