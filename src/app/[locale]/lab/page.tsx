import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { labStages } from '@/data/lab-stages';
import { Server, Cpu, Activity, Shield, Network } from 'lucide-react';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface LabPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);

  return {
    title: dict.lab.eyebrow,
    description: dict.lab.description,
    openGraph: {
      title: `${dict.lab.eyebrow} | ${dict.meta.siteTitle}`,
      description: dict.lab.description,
    },
    alternates: {
      canonical: `/${localeParam}/lab`,
      languages: {
        pt: '/pt/lab',
        en: '/en/lab',
        es: '/es/lab',
        'x-default': '/en/lab',
      },
    },
  };
}

export default async function LabPage({ params }: LabPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en';
  const dict = await getDictionary(locale);

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
    <div className="pt-24 md:pt-32">
      {/* ─── Header ─── */}
      <section className="container-narrow pb-12 md:pb-16">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <Server size={12} strokeWidth={1.5} />
            {dict.lab.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            {dict.lab.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {dict.lab.description}
          </p>
        </ScrollReveal>
      </section>

      <hr className="divider container-narrow" />

      {/* ─── Architecture / Environment ─── */}
      <section className="container-narrow section-spacing !pt-0">
        <ScrollReveal>
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-2">
              {dict.lab.environmentTitle}
            </h2>
            <p className="text-sm text-[var(--color-text-secondary)] max-w-2xl">
              {dict.lab.environmentFuture}
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6 md:p-8 flex items-start gap-4">
              <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                <Cpu
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--color-accent)]"
                />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {dict.lab.env.accessStation}
                </h3>
                <p className="text-sm font-semibold">
                  {dict.lab.env.accessStationValue}
                </p>
              </div>
            </div>

            <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6 md:p-8 flex items-start gap-4">
              <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                <Server
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--color-accent)]"
                />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {dict.lab.env.server}
                </h3>
                <p className="text-sm font-semibold">
                  {dict.lab.env.serverValue}
                </p>
              </div>
            </div>

            <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6 md:p-8 flex items-start gap-4">
              <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                <Network
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--color-accent)]"
                />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {dict.lab.env.network}
                </h3>
                <p className="text-sm font-semibold">
                  {dict.lab.env.networkValue}
                </p>
              </div>
            </div>

            <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6 md:p-8 flex items-start gap-4">
              <div className="p-3 bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)]">
                <Shield
                  size={20}
                  strokeWidth={1.5}
                  className="text-[var(--color-accent)]"
                />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {dict.lab.env.services}
                </h3>
                <p className="text-sm font-semibold">
                  {dict.lab.env.servicesValue}
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      <hr className="divider container-narrow" />

      {/* ─── Lab Roadmap ─── */}
      <section className="container-narrow section-spacing !pt-0">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-10">
            <Activity
              size={20}
              strokeWidth={1.5}
              className="text-[var(--color-accent)]"
            />
            <div>
              <h2 className="text-xl font-bold">
                {dict.lab.roadmapTitle}
              </h2>
              <p className="text-sm text-[var(--color-text-secondary)] mt-1">
                {dict.lab.roadmapDescription}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical Timeline Line */}
          <div className="absolute left-[27px] top-4 bottom-4 w-px bg-[rgba(255,255,255,0.1)] hidden md:block" />

          <ScrollReveal stagger>
            <div className="space-y-6 md:space-y-8">
              {labStages.map((stage) => {
                const stageDict =
                  dict.labStages[
                    String(stage.id) as keyof typeof dict.labStages
                  ];
                return (
                  <div
                    key={stage.id}
                    className="reveal relative flex flex-col md:flex-row gap-4 md:gap-8 group"
                  >
                    {/* Timeline Node */}
                    <div className="hidden md:flex items-center justify-center shrink-0 w-[55px] h-[55px] bg-[#0a0f1a] border border-[rgba(255,255,255,0.1)] z-10 transition-colors group-hover:border-[rgba(255,255,255,0.2)]">
                      <span className="text-sm font-mono font-bold text-[var(--color-text-secondary)]">
                        {stage.id.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Card */}
                    {stage.articleSlug ? (
                      <Link
                        href={`/${locale}/artigos/${stage.articleSlug}`}
                        className="flex-1 bg-[var(--color-bg-surface)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 transition-all hover:bg-[rgba(255,255,255,0.02)] group-hover:border-[rgba(255,255,255,0.2)] cursor-pointer block"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="md:hidden text-xs font-mono font-bold text-[var(--color-text-muted)] border border-[rgba(255,255,255,0.1)] px-2 py-0.5">
                              {dict.lab.stageLabel} {stage.id.toString().padStart(2, '0')}
                            </span>
                            <h3 className="text-base md:text-lg font-semibold group-hover:text-[var(--color-accent)] transition-colors">
                              {stageDict?.title ?? `Stage ${stage.id}`}
                            </h3>
                          </div>

                          {/* Status Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-widest border"
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
                                    : 'rgba(255,255,255,0.1)',
                              backgroundColor:
                                stage.status === 'documentado'
                                  ? 'rgba(16,185,129,0.05)'
                                  : stage.status === 'em-andamento'
                                    ? 'rgba(245,158,11,0.05)'
                                    : 'transparent',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  stage.status === 'documentado'
                                    ? 'var(--color-status-done)'
                                    : stage.status === 'em-andamento'
                                      ? 'var(--color-status-progress)'
                                      : 'var(--color-status-planned)',
                              }}
                            />
                            {statusLabel(stage.status)}
                          </div>
                        </div>

                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed group-hover:text-[var(--color-text)] transition-colors">
                          {stageDict?.description ?? 'No description.'}
                        </p>
                      </Link>
                    ) : (
                      <div className="flex-1 bg-[var(--color-bg-surface)] border border-[rgba(255,255,255,0.06)] p-6 md:p-8 transition-colors group-hover:border-[rgba(255,255,255,0.12)]">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="md:hidden text-xs font-mono font-bold text-[var(--color-text-muted)] border border-[rgba(255,255,255,0.1)] px-2 py-0.5">
                              {dict.lab.stageLabel} {stage.id.toString().padStart(2, '0')}
                            </span>
                            <h3 className="text-base md:text-lg font-semibold">
                              {stageDict?.title ?? `Stage ${stage.id}`}
                            </h3>
                          </div>

                          {/* Status Badge */}
                          <div
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-widest border"
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
                                    : 'rgba(255,255,255,0.1)',
                              backgroundColor:
                                stage.status === 'documentado'
                                  ? 'rgba(16,185,129,0.05)'
                                  : stage.status === 'em-andamento'
                                    ? 'rgba(245,158,11,0.05)'
                                    : 'transparent',
                            }}
                          >
                            <span
                              className="w-1.5 h-1.5 rounded-full"
                              style={{
                                backgroundColor:
                                  stage.status === 'documentado'
                                    ? 'var(--color-status-done)'
                                    : stage.status === 'em-andamento'
                                      ? 'var(--color-status-progress)'
                                      : 'var(--color-status-planned)',
                              }}
                            />
                            {statusLabel(stage.status)}
                          </div>
                        </div>

                        <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                          {stageDict?.description ?? 'No description.'}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
