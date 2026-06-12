import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { Terminal, Linkedin, Mail, Github } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { author } = siteConfig;
  const github = author.github as string;
  const linkedin = author.linkedin as string;

  return (
    <footer className="border-t border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)]">
      <div className="container-narrow py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8">
          {/* Branding */}
          <div className="max-w-sm">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[var(--color-text-primary)] hover:text-[var(--color-accent)] transition-colors no-underline mb-3"
            >
              <Terminal size={16} strokeWidth={1.5} className="text-[var(--color-accent)]" />
              <span className="font-mono text-sm font-semibold tracking-wide">
                DetonaDev
              </span>
            </Link>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
              Estudos práticos em Cibersegurança, Linux, Redes e SOC.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              Links
            </span>
            <nav className="flex flex-col gap-2">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors no-underline"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
              Contato
            </span>
            <div className="flex flex-col gap-2">
              {Boolean(linkedin && linkedin.trim() !== '' && !linkedin.includes('placeholder')) && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors no-underline inline-flex items-center gap-1.5"
                >
                  <Linkedin size={14} strokeWidth={1.5} />
                  LinkedIn — Bruno Abreu
                </a>
              )}
              {Boolean(author.email) && (
                <a
                  href={`mailto:${author.email}`}
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors no-underline inline-flex items-center gap-1.5"
                >
                  <Mail size={14} strokeWidth={1.5} />
                  {author.email}
                </a>
              )}
              {Boolean(github && github.trim() !== '' && !github.includes('placeholder')) && (
                <a
                  href={github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] transition-colors no-underline inline-flex items-center gap-1.5"
                >
                  <Github size={14} strokeWidth={1.5} />
                  GitHub — {author.name}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[rgba(255,255,255,0.04)]">
          <p className="text-xs text-[var(--color-text-muted)]">
            &copy; {currentYear} {siteConfig.title} &mdash; {siteConfig.author.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
