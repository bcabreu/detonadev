import Link from 'next/link';
import {
  ArrowRight,
  Shield,
  BookOpen,
  Server,
  FileText,
  Users,
} from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getPublishedArticles } from '@/data/articles';
import { labStages } from '@/data/lab-stages';
import { ArticleCard } from '@/components/ui/article-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en';
  const dict = await getDictionary(locale);

  const publishedArticles = getPublishedArticles();
  const latestArticles = publishedArticles.slice(0, 3);

  /** Maps the PT status identifier to the translated display label. */
  function statusLabel(status: string): string {
    switch (status) {
      case 'documentado':
        return dict.status.documented;
      case 'em-andamento':
        return dict.status.inProgress;
      default:
        return dict.status.planned;
    }
  }

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[100dvh] flex items-center pt-20">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        {/* Radial fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-narrow relative z-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="eyebrow mb-6">
                <Shield size={12} strokeWidth={1.5} />
                {dict.home.eyebrow}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] mb-6">
                {dict.home.heroTitle1}
                <br />
                <span className="text-[var(--color-accent)] cursor-blink">
                  {dict.home.heroTitle2}
                </span>
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-sm font-mono text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
                {dict.home.authorBio}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4 max-w-xl">
                {dict.home.heroDescription}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-lg">
                {dict.home.heroSubtext}
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/lab`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[var(--color-accent)] text-[#0a0f1a] hover:bg-[#34d399] transition-colors no-underline"
                >
                  <Server size={14} strokeWidth={1.5} />
                  {dict.home.viewLab}
                </Link>
                <Link
                  href={`/${locale}/artigos`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all no-underline"
                >
                  <BookOpen size={14} strokeWidth={1.5} />
                  {dict.home.readArticles}
                </Link>
                {siteConfig.author.resumeUrl && (
                  <a
                    href={siteConfig.author.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.06)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[rgba(255,255,255,0.12)] transition-all no-underline"
                  >
                    <FileText size={14} strokeWidth={1.5} />
                    {dict.common.downloadResume}
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Lab Preview ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow mb-4 block w-fit">
                  <Server size={12} strokeWidth={1.5} />
                  {dict.home.labEyebrow}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {dict.home.labTitle}
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-md">
                  {dict.home.labDescription}
                </p>
              </div>
              <Link
                href={`/${locale}/lab`}
                className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:gap-2.5 transition-all no-underline"
              >
                {dict.common.viewDetails}{' '}
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)]">
              {labStages.map((stage) => {
                const stageDict =
                  dict.labStages[
                    String(stage.id) as keyof typeof dict.labStages
                  ];
                return (
                  <div
                    key={stage.id}
                    className="reveal bg-[var(--color-bg-deep)] p-6 md:p-8"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="inline-flex items-center justify-center w-7 h-7 text-xs font-mono font-bold border"
                        style={{
                          color:
                            stage.status === 'documentado'
                              ? 'var(--color-status-done)'
                              : stage.status === 'em-andamento'
                                ? 'var(--color-status-progress)'
                                : 'var(--color-status-planned)',
                          borderColor:
                            stage.status === 'documentado'
                              ? 'rgba(16,185,129,0.3)'
                              : stage.status === 'em-andamento'
                                ? 'rgba(245,158,11,0.3)'
                                : 'rgba(255,255,255,0.06)',
                        }}
                      >
                        {stage.id}
                      </span>
                      <span
                        className="text-[0.6rem] font-mono uppercase tracking-widest"
                        style={{
                          color:
                            stage.status === 'documentado'
                              ? 'var(--color-status-done)'
                              : stage.status === 'em-andamento'
                                ? 'var(--color-status-progress)'
                                : 'var(--color-status-planned)',
                        }}
                      >
                        {statusLabel(stage.status)}
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold mb-2">
                      {stageDict?.title ?? `Stage ${stage.id}`}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                      {stageDict?.description ?? 'No description.'}
                    </p>
                  </div>
                );
              })}
            </div>
          </ScrollReveal>

          <Link
            href={`/${locale}/lab`}
            className="md:hidden inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] mt-6 hover:gap-2.5 transition-all no-underline"
          >
            {dict.common.viewDetails}{' '}
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ─── Latest Articles ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow mb-4 block w-fit">
                  <FileText size={12} strokeWidth={1.5} />
                  {dict.home.articlesEyebrow}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  {dict.home.articlesTitle}
                </h2>
              </div>
              <Link
                href={`/${locale}/artigos`}
                className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:gap-2.5 transition-all no-underline"
              >
                {dict.common.viewAll}{' '}
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </ScrollReveal>

          {latestArticles.length > 0 ? (
            <ScrollReveal stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestArticles.map((article) => (
                  <div key={article.slug} className="reveal">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="border border-dashed border-[rgba(255,255,255,0.06)] p-8 md:p-12 text-center bg-[var(--color-bg-surface)]">
                <Shield
                  size={24}
                  strokeWidth={1.5}
                  className="text-[var(--color-accent)] mx-auto mb-4"
                />
                <h3 className="text-base font-semibold mb-2">
                  {dict.home.articlesEmptyTitle}
                </h3>
                <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
                  {dict.home.articlesEmptyDescription}
                </p>
                <div className="mt-6 flex justify-center gap-4 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>{dict.home.articlesEmptyTag}</span>
                </div>
              </div>
            </ScrollReveal>
          )}

          <Link
            href={`/${locale}/artigos`}
            className="md:hidden inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] mt-6 hover:gap-2.5 transition-all no-underline"
          >
            {dict.common.viewAll}{' '}
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ─── Para Recrutadores ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)] bg-[var(--color-bg-surface)]">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="eyebrow mb-6 block w-fit">
                <Users size={12} strokeWidth={1.5} />
                {dict.home.recruitersEyebrow}
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                {dict.home.recruitersTitle}
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                {dict.home.recruitersDescription1}
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                {dict.home.recruitersDescription2}
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {[
                  'Linux',
                  'Redes',
                  'SSH',
                  'Firewall',
                  'Logs',
                  'SOC',
                  'Nmap',
                  'Wireshark',
                  'UFW',
                  'SIEM',
                ].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center text-xs font-mono px-3 py-1.5 border border-[rgba(255,255,255,0.06)] text-[var(--color-text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/lab`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[var(--color-accent)] text-[#0a0f1a] hover:bg-[#34d399] transition-colors no-underline"
                >
                  {dict.home.viewFullLab}
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
                <Link
                  href={`/${locale}/sobre`}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all no-underline"
                >
                  {dict.home.aboutAuthor}
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
