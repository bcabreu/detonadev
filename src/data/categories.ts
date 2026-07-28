export const categorySlugs = [
  'home-lab',
  'linux',
  'redes',
  'soc',
  'logs',
  'ferramentas',
  'isc2-cc',
  'seguranca-da-informacao',
] as const;

export type CategorySlug = typeof categorySlugs[number];

export function isValidCategory(slug: string): slug is CategorySlug {
  return categorySlugs.includes(slug as CategorySlug);
}
