import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import ar from './locales/ar';
import en from './locales/en';

const dictionaries = { ar, en };
const STORAGE_KEY = 'voyara-lang';
const LanguageContext = createContext(null);

const readStoredLang = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'ar' ? stored : 'ar'; // Arabic by default
  } catch {
    return 'ar';
  }
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(readStoredLang);
  const t = dictionaries[lang];

  // Keep <html> direction, language and SEO tags in sync with the active language.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = t.lang;
    root.dir = t.dir;
    document.title = t.meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', t.meta.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', t.meta.description);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* storage unavailable: ignore */
    }
  }, [lang, t]);

  const toggleLang = useCallback(() => setLang((l) => (l === 'ar' ? 'en' : 'ar')), []);
  const value = useMemo(() => ({ lang, t, toggleLang }), [lang, t, toggleLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export const useLang = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLang must be used inside <LanguageProvider>');
  return ctx;
};
