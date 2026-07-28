import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { Locale } from '@/i18n/config';

export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  status: 'rascunho' | 'publicado';
  categories: string[];
  content?: string;
  isFallback?: boolean; // Indicates if the article was loaded from PT fallback
}

/**
 * Retorna todos os artigos lendo os arquivos MDX do diretório de conteúdo.
 * Usa o diretório 'pt' como fonte de verdade para a lista de artigos.
 * Se o locale solicitado não tiver tradução, usa o arquivo em PT como fallback.
 */
export function getAllArticles(locale: Locale = 'pt'): Article[] {
  const baseDirectory = path.join(process.cwd(), 'content/articles/pt');
  
  // Check if directory exists first, to avoid crashes on Vercel if it's missing
  if (!fs.existsSync(baseDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(baseDirectory);
  
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove ".mdx" to get the slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Check if localized version exists, otherwise fallback to PT
      const localizedPath = path.join(process.cwd(), `content/articles/${locale}`, fileName);
      const basePath = path.join(baseDirectory, fileName);
      
      const isFallback = locale !== 'pt' && !fs.existsSync(localizedPath);
      const fullPath = isFallback ? basePath : localizedPath;

      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as Omit<Article, 'slug' | 'content'>),
        content: matterResult.content,
        isFallback,
      };
    });

  // Sort articles by date (newest first)
  return allArticlesData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

/**
 * Retorna apenas os artigos que não são rascunho.
 */
export function getPublishedArticles(locale: Locale = 'pt'): Article[] {
  return getAllArticles(locale).filter((article) => article.status === 'publicado');
}

/**
 * Encontra um artigo pelo slug.
 */
export function getArticleBySlug(slug: string, locale: Locale = 'pt'): Article | undefined {
  return getAllArticles(locale).find((article) => article.slug === slug);
}

/**
 * Encontra artigos que possuem a categoria informada.
 */
export function getArticlesByCategory(categorySlug: string, locale: Locale = 'pt'): Article[] {
  return getAllArticles(locale).filter((article) =>
    article.categories.includes(categorySlug)
  );
}
