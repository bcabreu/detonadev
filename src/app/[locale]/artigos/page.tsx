import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { getPublishedArticles } from '@/data/articles';
import { ArticleList } from '@/components/articles/article-list';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { FileText } from 'lucide-react';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface ArtigosPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ArtigosPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);

  return {
    title: dict.articles.eyebrow,
    description: dict.articles.description,
    openGraph: {
      title: `${dict.articles.eyebrow} | ${dict.meta.siteTitle}`,
      description: dict.articles.description,
    },
    alternates: {
      canonical: `/${localeParam}/artigos`,
      languages: {
        pt: '/pt/artigos',
        en: '/en/artigos',
        es: '/es/artigos',
        'x-default': '/en/artigos',
      },
    },
  };
}

export default async function ArtigosPage({ params }: ArtigosPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en';
  const dict = await getDictionary(locale);

  // Still fetching all articles from data layer.
  // In Phase 4, getPublishedArticles() will become locale-aware.
  const articles = getPublishedArticles(locale);

  return (
    <div className="pt-24 md:pt-32">
      <section className="container-narrow pb-12 md:pb-16 border-b border-[rgba(255,255,255,0.04)]">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <FileText size={12} strokeWidth={1.5} />
            {dict.articles.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            {dict.articles.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {dict.articles.description}
          </p>
        </ScrollReveal>
      </section>

      <section className="container-narrow section-spacing !pt-12">
        <ArticleList initialArticles={articles} />
      </section>
    </div>
  );
}
