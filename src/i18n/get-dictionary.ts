import type { Locale } from './config';

/**
 * Dictionary type — inferred from the Portuguese dictionary (source of truth).
 * All locale dictionaries must match this shape exactly.
 */
const dictionaries = {
  pt: () => import('./dictionaries/pt.json').then((m) => m.default),
  en: () => import('./dictionaries/en.json').then((m) => m.default),
  es: () => import('./dictionaries/es.json').then((m) => m.default),
} as const;

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)['pt']>>;

/**
 * Server-side dictionary loader.
 * Import the JSON dynamically so Next.js can tree-shake unused locales from each page bundle.
 */
export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
