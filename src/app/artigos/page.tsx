import { getAllArticles } from '@/data/articles';
import { ArticleList } from '@/components/articles/article-list';
import { FileText } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Artigos Técnicos',
  description: 'Documentações, análises e tutoriais do laboratório.',
};

export default function ArtigosPage() {
  const articles = getAllArticles();

  return (
    <div className="pt-24 md:pt-32">
      {/* ─── Header ─── */}
      <section className="container-narrow pb-12 md:pb-16">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <FileText size={12} strokeWidth={1.5} />
            Artigos
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-4">
            Artigos técnicos
          </h1>
          <p className="text-[var(--color-text-secondary)] max-w-xl">
            Documentações, investigações e tutoriais técnicos baseados nas práticas do laboratório de cibersegurança.
          </p>
        </ScrollReveal>
      </section>

      {/* ─── Content ─── */}
      <ArticleList initialArticles={articles} />
    </div>
  );
}
