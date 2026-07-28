import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/data/articles';
import { isValidCategory } from '@/data/categories';
import { siteConfig } from '@/data/site';
import { formatDate } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Tag } from '@/components/ui/tag';
import { ArrowLeft, Clock, Calendar, AlertTriangle, Languages } from 'lucide-react';
import { mdxComponents } from '@/components/mdx/components';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface ArticlePageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { locale: localeParam, slug } = await params;
  if (!isValidLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);

  // Still fetching from the non-i18n data layer for now.
  const article = getArticleBySlug(slug, localeParam as Locale);
  if (!article) return {};
  
  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `/${localeParam}/artigos/${article.slug}`,
      languages: {
        pt: `/pt/artigos/${article.slug}`,
        en: `/en/artigos/${article.slug}`,
        es: `/es/artigos/${article.slug}`,
        'x-default': `/en/artigos/${article.slug}`,
      },
    },
    openGraph: {
      title: `${article.title} | ${dict.meta.siteTitle}`,
      description: article.summary,
      url: `${siteConfig.url}/${localeParam}/artigos/${article.slug}`,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { locale: localeParam, slug } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en';
  const dict = await getDictionary(locale);

  const article = getArticleBySlug(slug, locale);
  if (!article) notFound();

  // Protect draft articles in production
  if (process.env.NODE_ENV === 'production' && article.status === 'rascunho') {
    notFound();
  }

  const isFallback = article.isFallback;

  return (
    <div className="pt-24 md:pt-32">
      <article className="container-narrow section-spacing !pt-0">
        <ScrollReveal>
          <Link href={`/${locale}/artigos`} className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 no-underline">
            <ArrowLeft size={14} strokeWidth={1.5} />
            {dict.articles.backToArticles}
          </Link>
        </ScrollReveal>

        {isFallback && (
          <ScrollReveal>
            <div className="flex items-start gap-3 border border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.05)] p-5 mb-8">
              <Languages size={16} strokeWidth={1.5} className="text-[var(--color-accent)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--color-accent)] mb-1">{dict.articles.fallbackBannerTitle}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{dict.articles.fallbackBannerDescription}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-5">
              {article.categories.map((s) => {
                const label = isValidCategory(s) ? dict.categories[s as keyof typeof dict.categories] || s : s;
                return <Tag key={s} label={label} />;
              })}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight mb-4">{article.title}</h1>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5 max-w-2xl">{article.summary}</p>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="inline-flex items-center gap-1.5"><Calendar size={12} strokeWidth={1.5} />{formatDate(article.date, locale)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={12} strokeWidth={1.5} />{article.readTime}</span>
              <span>{dict.common.by} {siteConfig.author.name}</span>
            </div>
          </div>
        </ScrollReveal>

        <hr className="divider" />

        {article.status === 'rascunho' && (
          <ScrollReveal>
            <div className="flex items-start gap-3 border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.05)] p-5 mb-10">
              <AlertTriangle size={16} strokeWidth={1.5} className="text-[var(--color-status-progress)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--color-status-progress)] mb-1">{dict.articles.draftBannerTitle}</p>
                <p className="text-xs text-[var(--color-text-muted)]">{dict.articles.draftBannerDescription}</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="mdx-content mt-12 max-w-3xl">
          {article.content ? (
            <MDXRemote source={article.content} components={mdxComponents} />
          ) : (
            <div className="border border-dashed border-[rgba(255,255,255,0.06)] p-8 text-center">
              <p className="text-sm text-[var(--color-text-muted)] font-mono">{dict.articles.emptyContent}</p>
            </div>
          )}
        </div>

        <hr className="divider" />

        <ScrollReveal>
          <div className="flex justify-between items-center">
            <Link href={`/${locale}/artigos`} className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] no-underline"><ArrowLeft size={14} strokeWidth={1.5} />{dict.articles.allArticles}</Link>
            <Link href={`/${locale}/lab`} className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors no-underline">{dict.articles.viewHomeLab}</Link>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
