import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Mail, Linkedin, FileText, Github, Send } from 'lucide-react';
import { isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';

interface ContatoPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: ContatoPageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};
  const dict = await getDictionary(localeParam);

  return {
    title: dict.contact.eyebrow,
    description: dict.contact.description,
    openGraph: {
      title: `${dict.contact.eyebrow} | ${dict.meta.siteTitle}`,
      description: dict.contact.description,
    },
    alternates: {
      canonical: `/${localeParam}/contato`,
      languages: {
        pt: '/pt/contato',
        en: '/en/contato',
        es: '/es/contato',
        'x-default': '/en/contato',
      },
    },
  };
}

export default async function ContatoPage({ params }: ContatoPageProps) {
  const { locale: localeParam } = await params;
  const locale: Locale = isValidLocale(localeParam) ? localeParam : 'en';
  const dict = await getDictionary(locale);

  const links = [
    {
      label: dict.contact.email,
      href: `mailto:${siteConfig.author.email}`,
      icon: Mail,
      isExternal: false,
    },
    {
      label: dict.contact.linkedin,
      href: siteConfig.author.linkedin,
      icon: Linkedin,
      isExternal: true,
    },
    {
      label: dict.contact.github,
      href: siteConfig.author.github,
      icon: Github,
      isExternal: true,
    },
    {
      label: dict.contact.resume,
      href: siteConfig.author.resumeUrl,
      icon: FileText,
      isExternal: true,
    },
  ].filter((l) => l.href);

  return (
    <div className="pt-24 md:pt-32">
      {/* ─── Header ─── */}
      <section className="container-narrow pb-12 md:pb-16">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <Send size={12} strokeWidth={1.5} />
            {dict.contact.eyebrow}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            {dict.contact.title}
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl mb-4">
            {dict.contact.description}
          </p>
          <p className="text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            {dict.contact.subdescription}
          </p>
        </ScrollReveal>
      </section>

      <hr className="divider container-narrow" />

      {/* ─── Links Grid ─── */}
      <section className="container-narrow section-spacing !pt-0">
        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.isExternal ? '_blank' : undefined}
                  rel={link.isExternal ? 'noopener noreferrer' : undefined}
                  className="reveal flex items-center p-6 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] hover:border-[var(--color-accent)] transition-colors group no-underline"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-[rgba(255,255,255,0.02)] mr-4 group-hover:bg-[rgba(16,185,129,0.1)] transition-colors">
                    <Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent)] transition-colors"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-xs text-[var(--color-text-muted)] mt-1 truncate">
                      {link.href.replace('mailto:', '').replace('https://', '')}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
