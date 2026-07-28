'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteConfig } from '@/data/site';
import { cn } from '@/lib/utils';
import { Menu, X, Terminal } from 'lucide-react';
import { useLocale } from '@/i18n/locale-context';
import { LanguageSelector } from '@/components/ui/language-selector';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { locale, dictionary } = useLocale();

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navItems = [
    { href: '/', label: dictionary.nav.home },
    { href: '/lab', label: dictionary.nav.lab },
    { href: '/artigos', label: dictionary.nav.articles },
    { href: '/sobre', label: dictionary.nav.about },
    { href: '/contato', label: dictionary.nav.contact },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-40 transition-all duration-500 border-b',
        scrolled
          ? 'bg-[#0a0f1a]/90 backdrop-blur-sm border-[rgba(255,255,255,0.06)]'
          : 'bg-transparent border-transparent'
      )}
    >
      <div className="container-narrow">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors no-underline"
          >
            <Terminal size={18} strokeWidth={1.5} className="text-[var(--color-accent)]" />
            <span className="font-mono text-sm font-semibold tracking-wide">
              DetonaDev
            </span>
          </Link>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const localizedHref = `/${locale}${item.href === '/' ? '' : item.href}`;
              const isActive =
                item.href === '/'
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(localizedHref);
              return (
                <li key={item.href}>
                  <Link
                    href={localizedHref}
                    className={cn(
                      'px-3 py-1.5 text-sm transition-colors rounded-sm no-underline',
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            
            <li className="ml-2 pl-3 border-l border-[rgba(255,255,255,0.1)]">
              <LanguageSelector />
            </li>
          </ul>

          {/* Mobile hamburger & Lang */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSelector />
            <button
              type="button"
              className="flex items-center justify-center w-9 h-9 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={20} strokeWidth={1.5} /> : <Menu size={20} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          'md:hidden overflow-hidden transition-all duration-400',
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        )}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="container-narrow border-t border-[rgba(255,255,255,0.06)] bg-[#0a0f1a]/95 backdrop-blur-sm pb-6 pt-4">
          <ul className="flex flex-col gap-1">
            {navItems.map((item, i) => {
              const localizedHref = `/${locale}${item.href === '/' ? '' : item.href}`;
              const isActive =
                item.href === '/'
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(localizedHref);
              return (
                <li
                  key={item.href}
                  style={{
                    opacity: mobileOpen ? 1 : 0,
                    transform: mobileOpen ? 'translateY(0)' : 'translateY(8px)',
                    transition: `opacity 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms, transform 0.3s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                  }}
                >
                  <Link
                    href={localizedHref}
                    className={cn(
                      'block px-3 py-2.5 text-sm transition-colors no-underline',
                      isActive
                        ? 'text-[var(--color-accent)]'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
