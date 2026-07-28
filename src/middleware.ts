import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, isValidLocale, LOCALE_COOKIE, acceptLanguageMap } from './i18n/config';
import type { Locale } from './i18n/config';

/**
 * Paths that should never be processed by the locale middleware.
 * Includes static assets, API routes, and Next.js internal routes.
 */
const IGNORED_PATHS = [
  '/_next',
  '/api',
  '/favicon.ico',
  '/icon.svg',
  '/images',
  '/robots.txt',
  '/sitemap.xml',
  '/curriculo.pdf',
];

/**
 * Parse the Accept-Language header and return the best matching locale.
 *
 * Example header: "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7,es;q=0.5"
 * → Parsed as [{ lang: 'pt', q: 1 }, { lang: 'pt', q: 0.9 }, { lang: 'en', q: 0.8 }, ...]
 * → Returns 'pt' (highest quality match)
 */
function getLocaleFromAcceptLanguage(header: string): Locale {
  const entries = header
    .split(',')
    .map((part) => {
      const [langTag, qParam] = part.trim().split(';');
      const quality = qParam ? parseFloat(qParam.replace('q=', '')) : 1;
      // Extract primary subtag (e.g., 'pt' from 'pt-BR')
      const primaryLang = langTag.trim().split('-')[0].toLowerCase();
      return { lang: primaryLang, quality };
    })
    .sort((a, b) => b.quality - a.quality);

  for (const { lang } of entries) {
    const mapped = acceptLanguageMap[lang];
    if (mapped) return mapped;
  }

  return defaultLocale;
}

/**
 * Check if the pathname starts with any of the ignored prefixes.
 */
function isIgnoredPath(pathname: string): boolean {
  return IGNORED_PATHS.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Check if the pathname already starts with a valid locale prefix.
 */
function getPathnameLocale(pathname: string): Locale | null {
  const segments = pathname.split('/');
  const firstSegment = segments[1]; // e.g., '/pt/artigos' → 'pt'
  return isValidLocale(firstSegment) ? firstSegment : null;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Skip static assets and internal routes
  if (isIgnoredPath(pathname)) {
    return NextResponse.next();
  }

  // 2. If pathname already has a valid locale, let it through
  const pathnameLocale = getPathnameLocale(pathname);
  if (pathnameLocale) {
    // Inject x-locale header so the root layout can set <html lang="...">
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-locale', pathnameLocale);

    const response = NextResponse.next({ request: { headers: requestHeaders } });
    response.cookies.set(LOCALE_COOKIE, pathnameLocale, {
      path: '/',
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: 'lax',
    });
    return response;
  }

  // 3. Determine the best locale for this user
  let locale: Locale = defaultLocale;

  // 3a. Check cookie for saved preference (manual selection overrides detection)
  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    // 3b. Parse Accept-Language header for automatic detection
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage) {
      locale = getLocaleFromAcceptLanguage(acceptLanguage);
    }
  }

  // 4. Redirect to locale-prefixed path
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname}`;

  const response = NextResponse.redirect(url, 307);
  response.cookies.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  });

  return response;
}

export const config = {
  // Match all routes except static files with extensions
  matcher: ['/((?!.*\\.).*)'],
};
