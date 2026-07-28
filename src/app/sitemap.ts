import type { MetadataRoute } from 'next';
import { siteConfig } from '@/data/site';
import { getPublishedArticles } from '@/data/articles';
import { locales } from '@/i18n/config';

export default function sitemap(): MetadataRoute.Sitemap {
  // Base routes that exist in all languages
  const baseRoutes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/lab', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/artigos', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: '/sobre', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: '/contato', priority: 0.5, changeFrequency: 'monthly' as const },
  ];

  // Helper to build hreflang alternates for any given path
  const buildAlternates = (path: string) => {
    const languages: Record<string, string> = {};
    locales.forEach((l) => {
      languages[l] = `${siteConfig.url}/${l}${path}`;
    });
    languages['x-default'] = `${siteConfig.url}/en${path}`;
    return { languages };
  };

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages
  locales.forEach((locale) => {
    baseRoutes.forEach(({ path, priority, changeFrequency }) => {
      sitemapEntries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: buildAlternates(path),
      });
    });
  });

  // 2. Article Pages
  // Note: we fetch articles for the 'pt' locale to get the canonical list of slugs.
  // Then we map each slug across all locales.
  const articles = getPublishedArticles('pt');
  
  locales.forEach((locale) => {
    articles.forEach((article) => {
      const path = `/artigos/${article.slug}`;
      sitemapEntries.push({
        url: `${siteConfig.url}/${locale}${path}`,
        lastModified: new Date(article.date),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: buildAlternates(path),
      });
    });
  });

  return sitemapEntries;
}
