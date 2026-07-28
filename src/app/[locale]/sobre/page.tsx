import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Shield, GraduationCap, Target, Wrench } from 'lucide-react';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface SobrePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: SobrePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);

  return {
    title: dict.about.eyebrow,
    description: dict.about.subtitle,
    openGraph: {
      title: `${dict.about.eyebrow} | ${dict.meta.siteTitle}`,
      description: dict.about.subtitle,
    },
    alternates: {
      canonical: `/${localeParam}/sobre`,
      languages: {
        pt: '/pt/sobre',
        en: '/en/sobre',
        es: '/es/sobre',
        'x-default': '/en/sobre',
      },
    },
  };
}

export default async function SobrePage({ params }: SobrePageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en';
  const dict = await getDictionary(locale);

  return (
    <div className="pt-24 md:pt-32">
      {/* ─── Header ─── */}
      <section className="container-narrow pb-12 md:pb-16">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <Shield size={12} strokeWidth={1.5} />
            {dict.about.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            {dict.about.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {dict.about.subtitle}
          </p>
        </ScrollReveal>
      </section>

      <hr className="divider container-narrow" />

      {/* ─── Bio ─── */}
      <section className="container-narrow section-spacing !pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20">
          <div>
            <ScrollReveal>
              <div className="space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
                <p>{dict.about.bio1}</p>
                <p>{dict.about.bio2}</p>
                <p>{dict.about.bio3}</p>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <ScrollReveal>
              <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap
                    size={14}
                    strokeWidth={1.5}
                    className="text-[var(--color-accent)]"
                  />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    {dict.about.educationTitle}
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <li>{dict.about.education1}</li>
                  <li>{dict.about.education2}</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target
                    size={14}
                    strokeWidth={1.5}
                    className="text-[var(--color-accent)]"
                  />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    {dict.about.certTitle}
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {dict.about.certValue}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench
                    size={14}
                    strokeWidth={1.5}
                    className="text-[var(--color-accent)]"
                  />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    {dict.about.interestsTitle}
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {dict.about.interests.map((item) => (
                    <span
                      key={item}
                      className="inline-flex text-[0.625rem] font-mono px-2 py-1 border border-[rgba(255,255,255,0.06)] text-[var(--color-text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </div>
  );
}
