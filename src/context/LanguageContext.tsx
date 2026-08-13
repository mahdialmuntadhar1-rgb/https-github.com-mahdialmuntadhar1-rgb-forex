import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language, Direction } from '../types';
import enTranslations from '../locales/en.json';
import arTranslations from '../locales/ar.json';
import ckbTranslations from '../locales/ckb.json';

interface LanguageContextType {
  language: Language;
  direction: Direction;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
  updateCustomTranslation: (lang: Language, key: string, value: string) => void;
}

const defaultDictionaries: Record<Language, any> = {
  en: enTranslations,
  ar: arTranslations,
  ckb: ckbTranslations,
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('fx_platform_lang');
    if (saved === 'ar' || saved === 'ckb' || saved === 'en') {
      return saved;
    }
    // Default to en
    return 'en';
  });

  const [customOverrides, setCustomOverrides] = useState<Record<string, Record<string, string>>>(() => {
    try {
      const saved = localStorage.getItem('fx_custom_translations');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const direction: Direction = language === 'ar' || language === 'ckb' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = direction;
    
    // Set appropriate font class or style
    if (direction === 'rtl') {
      document.body.classList.add('font-arabic');
      document.body.classList.remove('font-sans');
    } else {
      document.body.classList.add('font-sans');
      document.body.classList.remove('font-arabic');
    }
  }, [language, direction]);

  const setLanguage = (newLang: Language) => {
    setLanguageState(newLang);
    localStorage.setItem('fx_platform_lang', newLang);
  };

  const updateCustomTranslation = (lang: Language, key: string, value: string) => {
    setCustomOverrides(prev => {
      const updated = {
        ...prev,
        [lang]: {
          ...(prev[lang] || {}),
          [key]: value
        }
      };
      localStorage.setItem('fx_custom_translations', JSON.stringify(updated));
      return updated;
    });
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    // 1. Check custom overrides from admin CMS
    if (customOverrides[language] && customOverrides[language][key] !== undefined) {
      let text = customOverrides[language][key];
      if (params) {
        Object.entries(params).forEach(([paramKey, val]) => {
          text = text.replace(new RegExp(`{${paramKey}}`, 'g'), String(val));
        });
      }
      return text;
    }

    // 2. Check current language dictionary
    const keys = key.split('.');
    let current: any = defaultDictionaries[language];
    for (const k of keys) {
      if (current && typeof current === 'object' && k in current) {
        current = current[k];
      } else {
        current = undefined;
        break;
      }
    }

    // 3. Fallback to English dictionary if missing
    if (current === undefined) {
      let fallback: any = defaultDictionaries['en'];
      for (const k of keys) {
        if (fallback && typeof fallback === 'object' && k in fallback) {
          fallback = fallback[k];
        } else {
          fallback = undefined;
          break;
        }
      }
      current = fallback !== undefined ? fallback : key;
    }

    if (typeof current !== 'string') {
      return key;
    }

    let result = current;
    if (params) {
      Object.entries(params).forEach(([paramKey, val]) => {
        result = result.replace(new RegExp(`{${paramKey}}`, 'g'), String(val));
      });
    }

    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t, updateCustomTranslation }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
