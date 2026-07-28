import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { getDictionary } from '@/i18n/get-dictionary';
import { LocaleProvider } from '@/i18n/locale-context';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { siteConfig } from '@/data/site';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * Pre-generate pages for every supported locale at build time.
 */
export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

/**
 * Locale-aware metadata — overrides root layout metadata with translated content.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isValidLocale(localeParam)) return {};

  const dict = await getDictionary(localeParam);

  return {
    title: {
      default: `${dict.meta.siteTitle} | ${siteConfig.author.name}`,
      template: `%s | ${dict.meta.siteTitle}`,
    },
    description: dict.meta.siteDescription,
    authors: [{ name: siteConfig.author.name }],
    openGraph: {
      type: 'website',
      locale: localeParam,
      url: siteConfig.url,
      siteName: siteConfig.name,
      title: `${dict.meta.siteTitle} | ${siteConfig.author.name}`,
      description: dict.meta.siteDescription,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/**
 * Locale layout — wraps all pages under /[locale]/.
 *
 * Responsibilities:
 *   1. Validate the locale param (404 if invalid)
 *   2. Load the correct dictionary
 *   3. Provide locale + dictionary to all descendants via LocaleProvider
 *   4. Render the shared UI chrome (Header + Footer)
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  // Guard: reject any locale that isn't in our supported list
  if (!isValidLocale(localeParam)) {
    notFound();
  }

  const locale: Locale = localeParam;
  const dictionary = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} dictionary={dictionary}>
      <div className="relative flex min-h-[100dvh] flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </LocaleProvider>
  );
}
