import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, Translations } from '../locales/types';
import en from '../locales/en';
import ko from '../locales/ko';
import ja from '../locales/ja';
import zh from '../locales/zh';
import es from '../locales/es';

const translations: Record<Language, Translations> = { en, ko, ja, zh, es };

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('ninja_lang');
    if (saved && (['en', 'ko', 'ja', 'zh', 'es'] as Language[]).includes(saved as Language)) {
      return saved as Language;
    }
    return 'ko';
  });

  const handleSetLang = (newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('ninja_lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang: handleSetLang, t: translations[lang] }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
