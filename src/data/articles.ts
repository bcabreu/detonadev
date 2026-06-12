import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Article {
  slug: string;
  title: string;
  summary: string;
  date: string;
  readTime: string;
  status: 'rascunho' | 'publicado';
  categories: string[];
  content?: string;
}

const articlesDirectory = path.join(process.cwd(), 'content/articles');

/**
 * Retorna todos os artigos lendo os arquivos MDX do diretório de conteúdo.
 */
export function getAllArticles(): Article[] {
  // Check if directory exists first, to avoid crashes on Vercel if it's missing
  if (!fs.existsSync(articlesDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(articlesDirectory);
  
  const allArticlesData = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      // Remove ".mdx" to get the slug
      const slug = fileName.replace(/\.mdx$/, '');

      // Read file content
      const fullPath = path.join(articlesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the metadata section
      const matterResult = matter(fileContents);

      return {
        slug,
        ...(matterResult.data as Omit<Article, 'slug' | 'content'>),
        content: matterResult.content,
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
export function getPublishedArticles(): Article[] {
  return getAllArticles().filter((article) => article.status === 'publicado');
}

/**
 * Encontra um artigo pelo slug.
 */
export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

/**
 * Encontra artigos que possuem a categoria informada.
 */
export function getArticlesByCategory(categorySlug: string): Article[] {
  return getAllArticles().filter((article) =>
    article.categories.includes(categorySlug)
  );
}
