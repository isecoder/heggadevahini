"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "English" | "Kannada";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("English");

  useEffect(() => {
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang) setLanguage(storedLang);
  }, []);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "English" ? "Kannada" : "English"));
    localStorage.setItem("language", language === "English" ? "Kannada" : "English");
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
};
