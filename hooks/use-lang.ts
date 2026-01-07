"use client";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface LangState {
    lang: "en" | "ar";
    setLang: (lang: "en" | "ar") => void;
}

export const useLang = create<LangState>()(
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