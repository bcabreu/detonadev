export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(dateString: string, locale: string = 'pt'): string {
  const localeMap: Record<string, string> = {
    pt: 'pt-BR',
    en: 'en-US',
    es: 'es-ES'
  };
  const standardLocale = localeMap[locale] || 'en-US';

  return new Date(dateString + 'T12:00:00').toLocaleDateString(standardLocale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
