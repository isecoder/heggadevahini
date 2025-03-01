"use client";

import { createContext, useContext, useState, useEffect } from "react";

type Language = "English" | "Kannada";

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>("Kannada"); // Default to Kannada

  useEffect(() => { try {
    const storedLang = localStorage.getItem("language") as Language;
    if (storedLang) setLanguage(storedLang);
  }
  catch (error) {
    console.log(error);
  }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === "English" ? "Kannada" : "English";
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
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
