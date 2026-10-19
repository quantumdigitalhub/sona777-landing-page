import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

type Language = "en" | "hi";
const LanguageContext = createContext({ language: "en" as Language, setLanguage: (_language: Language) => {}, t: (en: string, _hi: string) => en });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");
  useEffect(() => {
    try { if (localStorage.getItem("raja567-language") === "hi") setLanguage("hi"); } catch { /* Storage may be unavailable. */ }
  }, []);
  useEffect(() => { document.documentElement.lang = language; }, [language]);
  function changeLanguage(value: Language) {
    setLanguage(value);
    try { localStorage.setItem("raja567-language", value); } catch { /* Keep the current session usable. */ }
  }
  return <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t: (en, hi) => language === "hi" ? hi : en }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }