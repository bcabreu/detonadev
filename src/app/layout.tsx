import { headers } from 'next/headers';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { siteConfig } from '@/data/site';
import { defaultLocale } from '@/i18n/config';

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
};

/**
 * Root layout — intentionally minimal.
 *
 * Responsibilities:
 *   1. Load fonts and globals.css
 *   2. Set <html lang> by reading the x-locale header injected by middleware
 *   3. Render <body> with children
 *
 * All UI chrome (Header, Footer, LocaleProvider) lives in app/[locale]/layout.tsx.
 */
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the locale that the middleware injected into the request headers.
  // Falls back to defaultLocale for edge cases (e.g. not-found page outside [locale]).
  const headersList = await headers();
  const locale = headersList.get('x-locale') || defaultLocale;

  return (
    <html
      lang={locale}
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
