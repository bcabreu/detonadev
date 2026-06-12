import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/data/articles';
import { categories } from '@/data/categories';
import { siteConfig } from '@/data/site';
import { formatDate } from '@/lib/utils';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Tag } from '@/components/ui/tag';
import { ArrowLeft, Clock, Calendar, AlertTriangle } from 'lucide-react';
import { mdxComponents } from '@/components/mdx/components';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getAllArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  
  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: `${siteConfig.url}/artigos/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | ${siteConfig.title}`,
      description: article.summary,
      url: `${siteConfig.url}/artigos/${article.slug}`,
      type: 'article',
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  
  if (!article) notFound();

  // Em produção, se for rascunho, retornar 404 para proteger a página.
  if (process.env.NODE_ENV === 'production' && article.status === 'rascunho') {
    notFound();
  }

  return (
    <div className="pt-24 md:pt-32">
      <article className="container-narrow section-spacing !pt-0">
        <ScrollReveal>
          <Link href="/artigos" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors mb-8 no-underline">
            <ArrowLeft size={14} strokeWidth={1.5} />
            Voltar para artigos
          </Link>
        </ScrollReveal>

        <ScrollReveal>
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-5">
              {article.categories.map((s) => {
                const c = categories.find((x) => x.slug === s);
                return c ? <Tag key={s} label={c.label} /> : null;
              })}
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight mb-4">{article.title}</h1>
            <p className="text-[var(--color-text-secondary)] leading-relaxed mb-5 max-w-2xl">{article.summary}</p>
            <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
              <span className="inline-flex items-center gap-1.5"><Calendar size={12} strokeWidth={1.5} />{formatDate(article.date)}</span>
              <span className="inline-flex items-center gap-1.5"><Clock size={12} strokeWidth={1.5} />{article.readTime}</span>
              <span>Por {siteConfig.author.name}</span>
            </div>
          </div>
        </ScrollReveal>

        <hr className="divider" />

        {article.status === 'rascunho' && (
          <ScrollReveal>
            <div className="flex items-start gap-3 border border-[rgba(245,158,11,0.3)] bg-[rgba(245,158,11,0.05)] p-5 mb-10">
              <AlertTriangle size={16} strokeWidth={1.5} className="text-[var(--color-status-progress)] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-[var(--color-status-progress)] mb-1">Artigo em rascunho</p>
                <p className="text-xs text-[var(--color-text-muted)]">Este artigo está sendo preparado e será preenchido com o conteúdo real do laboratório após sua execução.</p>
              </div>
            </div>
          </ScrollReveal>
        )}

        <div className="mdx-content mt-12 max-w-3xl">
          {article.content ? (
            <MDXRemote source={article.content} components={mdxComponents} />
          ) : (
            <div className="border border-dashed border-[rgba(255,255,255,0.06)] p-8 text-center">
              <p className="text-sm text-[var(--color-text-muted)] font-mono">Conteúdo será adicionado após a execução do laboratório.</p>
            </div>
          )}
        </div>

        <hr className="divider" />

        <ScrollReveal>
          <div className="flex justify-between items-center">
            <Link href="/artigos" className="inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] no-underline"><ArrowLeft size={14} strokeWidth={1.5} />Todos os artigos</Link>
            <Link href="/lab" className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors no-underline">Ver Home Lab</Link>
          </div>
        </ScrollReveal>
      </article>
    </div>
  );
}
