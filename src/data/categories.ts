export interface Category {
  slug: string;
  label: string;
}

export const categories: Category[] = [
  { slug: 'home-lab', label: 'Home Lab' },
  { slug: 'linux', label: 'Linux' },
  { slug: 'redes', label: 'Redes' },
  { slug: 'soc', label: 'SOC' },
  { slug: 'logs', label: 'Logs' },
  { slug: 'ferramentas', label: 'Ferramentas' },
  { slug: 'isc2-cc', label: 'ISC2 CC' },
  { slug: 'seguranca-da-informacao', label: 'Segurança da Informação' },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
