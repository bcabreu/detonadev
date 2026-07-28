'use client';

import { createContext, useContext } from 'react';
import type { Locale } from './config';
import type { Dictionary } from './get-dictionary';

interface LocaleContextValue {
  locale: Locale;
  dictionary: Dictionary;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

interface LocaleProviderProps {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
}

/**
 * Wraps the app tree to provide locale and dictionary to any client component.
 * The locale layout injects these from server-side.
 */
export function LocaleProvider({ locale, dictionary, children }: LocaleProviderProps) {
  return (
    <LocaleContext.Provider value={{ locale, dictionary }}>
      {children}
    </LocaleContext.Provider>
  );
}

/**
 * Hook for client components to access the current locale and dictionary.
 * Must be called within a <LocaleProvider>.
 */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale must be used within a <LocaleProvider>');
  }
  return ctx;
}
