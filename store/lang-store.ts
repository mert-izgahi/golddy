"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LangStore {
  lang: "en" | "ar";
  setLang: (lang: "en" | "ar") => void;
  t: (en: string, ar: string) => string;
}

export const useLangStore = create<LangStore>()(
  persist(
    (set, get) => ({
      lang: "ar",
      setLang: (lang) => set({ lang }),
      t: (en, ar) => (get().lang === "ar" ? ar : en),
    }),
    {
      name: "lang-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
