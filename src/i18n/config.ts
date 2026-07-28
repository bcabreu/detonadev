export const locales = ['pt', 'en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español',
};

/** Cookie name used to persist the user's manual language preference. */
export const LOCALE_COOKIE = 'NEXT_LOCALE';

/**
 * Maps Accept-Language primary subtags to our supported locales.
 * Any language not listed here falls back to `defaultLocale`.
 */
export const acceptLanguageMap: Record<string, Locale> = {
  pt: 'pt',
  en: 'en',
  es: 'es',
};

/** Check whether a string is a valid locale. */
export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
