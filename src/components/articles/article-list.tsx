'use client';

import { useState } from 'react';
import { ArticleCard } from '@/components/ui/article-card';
import { Tag } from '@/components/ui/tag';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { categories } from '@/data/categories';
import { Article } from '@/data/articles';

interface ArticleListProps {
  initialArticles: Article[];
}

export function ArticleList({ initialArticles }: ArticleListProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = activeCategory
    ? initialArticles.filter((a) => a.categories.includes(activeCategory))
    : initialArticles;

  return (
    <section className="section-spacing border-t border-[rgba(255,255,255,0.04)] bg-[var(--color-bg-surface)]">
      <div className="container-narrow">
        <ScrollReveal>
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)] block mb-4">
              Filtrar por categoria
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory(null)}
                className={`px-3 py-1.5 text-xs font-mono border rounded-sm transition-all ${
                  activeCategory === null
                    ? 'border-[var(--color-accent)] bg-[rgba(245,158,11,0.1)] text-[var(--color-accent)]'
                    : 'border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:border-[rgba(255,255,255,0.15)] hover:text-[var(--color-text-secondary)]'
                }`}
              >
                Todos
              </button>
              {categories.map((c) => (
                <button
                  key={c.slug}
                  onClick={() => setActiveCategory(c.slug)}
                  className={`px-3 py-1.5 text-xs font-mono border rounded-sm transition-all ${
                    activeCategory === c.slug
                      ? 'border-[var(--color-accent)] bg-[rgba(245,158,11,0.1)] text-[var(--color-accent)]'
                      : 'border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-elevated)] text-[var(--color-text-muted)] hover:border-[rgba(255,255,255,0.15)] hover:text-[var(--color-text-secondary)]'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((article) => (
            <div key={article.slug}>
              <ArticleCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
