'use client';

import Link from 'next/link';
import type { Article } from '@/data/articles';
import { isValidCategory } from '@/data/categories';
import { formatDate, cn } from '@/lib/utils';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import { Tag } from '@/components/ui/tag';
import { useLocale } from '@/i18n/locale-context';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { locale, dictionary: dict } = useLocale();
  const isDraft = article.status === 'rascunho';

  return (
    <article
      className={cn(
        'group relative border transition-all duration-500 bg-[var(--color-bg-surface)] h-full flex flex-col',
        isDraft
          ? 'border-dashed border-[rgba(255,255,255,0.08)] opacity-85 hover:opacity-100 hover:border-[rgba(255,255,255,0.15)]'
          : 'border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)]'
      )}
    >
      <div className="p-6 md:p-8 flex flex-col flex-1">
        {/* Categories */}
        <div className="flex flex-wrap gap-2 mb-4">
          {article.categories.slice(0, 3).map((catSlug) => {
            if (!isValidCategory(catSlug)) return null;
            const label = dict.categories[catSlug as keyof typeof dict.categories] || catSlug;
            return <Tag key={catSlug} label={label} size="sm" />;
          })}
          {isDraft && (
            <span className="inline-flex items-center text-[0.625rem] font-mono uppercase tracking-wider px-2 py-1 text-[var(--color-status-progress)] border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.08)]">
              {dict.status.draft}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold leading-snug mb-3 group-hover:text-[var(--color-accent)] transition-colors duration-300">
          {article.title}
        </h3>

        {/* Summary */}
        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-5 line-clamp-3">
          {article.summary}
        </p>

        {/* Meta row — pushed to bottom */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[rgba(255,255,255,0.04)]">
          <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={12} strokeWidth={1.5} />
              {formatDate(article.date, locale)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={12} strokeWidth={1.5} />
              {article.readTime}
            </span>
          </div>

          <Link
            href={`/${locale}/artigos/${article.slug}`}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-accent)] hover:gap-2.5 transition-all duration-300 no-underline"
          >
            {isDraft ? dict.common.viewDraft : dict.common.readArticle}
            <ArrowRight size={12} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

      {/* Full card clickable overlay */}
      <Link
        href={`/${locale}/artigos/${article.slug}`}
        className="absolute inset-0 z-10"
        aria-label={`${dict.common.readLabel} ${article.title}`}
      />
    </article>
  );
}
