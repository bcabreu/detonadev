'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from '@/i18n/locale-context';
import { locales } from '@/i18n/config';
import type { Locale } from '@/i18n/config';
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';

const localeLabels: Record<Locale, string> = {
  pt: 'Português',
  en: 'English',
  es: 'Español'
};

export function LanguageSelector() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (newLocale: Locale) => {
    setIsOpen(false);
    if (newLocale === locale) return;

    // Create the new path by replacing the current locale segment
    // Example: /pt/artigos -> /en/artigos
    // Example: /pt -> /en
    const segments = pathname.split('/');
    if (segments.length >= 2) {
      segments[1] = newLocale;
    }
    const newPath = segments.join('/');
    
    router.push(newPath);
    router.refresh(); // Ensure RSC payloads are refreshed with the new locale
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[rgba(255,255,255,0.05)] rounded-sm transition-colors"
        aria-label="Selecionar idioma"
        aria-expanded={isOpen}
      >
        <Globe size={14} strokeWidth={1.5} />
        <span className="uppercase font-mono text-xs font-semibold tracking-wider">{locale}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 origin-top-right rounded-md border border-[rgba(255,255,255,0.06)] bg-[#0a0f1a] shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
          <div className="py-1">
            {locales.map((l) => (
              <button
                key={l}
                onClick={() => handleSelect(l)}
                className={cn(
                  'block w-full text-left px-4 py-2 text-sm transition-colors',
                  l === locale
                    ? 'text-[var(--color-accent)] bg-[rgba(52,211,153,0.1)]'
                    : 'text-[var(--color-text-secondary)] hover:bg-[rgba(255,255,255,0.05)] hover:text-[var(--color-text-primary)]'
                )}
              >
                {localeLabels[l]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
