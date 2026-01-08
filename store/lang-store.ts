"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LangStore {
    lang: "en" | "ar";
    setLang: (lang: "en" | "ar") => void;
}

export const useLangStore = create<LangStore>()(
    persist(
        (set) => ({
            lang: "ar",
            setLang: (lang) => set({ lang }),
        }),
        {
            name: "lang-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);