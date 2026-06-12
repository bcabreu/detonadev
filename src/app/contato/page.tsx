import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Mail, Linkedin, Github, MessageSquare, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contato',
  description: 'Entre em contato com Bruno Abreu. Aberto a oportunidades júnior, trainee ou entrada em Cibersegurança, SOC e Segurança da Informação.',
  openGraph: {
    title: `Contato | ${siteConfig.title}`,
    description: 'Entre em contato com Bruno Abreu para oportunidades em cibersegurança.',
  },
};

export default function ContatoPage() {
  const { author } = siteConfig;
  const github = author.github as string;
  const linkedin = author.linkedin as string;
  const resumeUrl = author.resumeUrl as string;

  const hasGithub = Boolean(github && github.trim() !== '' && !github.includes('placeholder'));
  const hasLinkedin = Boolean(linkedin && linkedin.trim() !== '' && !linkedin.includes('placeholder'));
  const hasResume = Boolean(resumeUrl && resumeUrl.trim() !== '');

  return (
    <div className="pt-24 md:pt-32">
      <section className="container-narrow section-spacing !pt-0">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <MessageSquare size={12} strokeWidth={1.5} />
            Contato
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            Vamos conversar
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-xl mb-4">
            Aberto a oportunidades júnior, trainee ou entrada em Cibersegurança, SOC e Segurança da Informação.
          </p>
          <p className="text-sm text-[var(--color-text-muted)] max-w-lg mb-12">
            Se você é recrutador, profissional de segurança ou alguém interessado em trocar conhecimento, fique à vontade para entrar em contato.
          </p>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
            {author.email && (
              <a href={`mailto:${author.email}`} className="reveal flex items-center gap-4 p-6 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-accent)] transition-all group no-underline">
                <div className="flex items-center justify-center w-10 h-10 border border-[rgba(255,255,255,0.06)] group-hover:border-[var(--color-border-accent)] transition-colors">
                  <Mail size={16} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">E-mail</p>
                  <p className="text-sm text-[var(--color-text-primary)]">{author.email}</p>
                </div>
              </a>
            )}

            {hasLinkedin && (
              <a href={author.linkedin} target="_blank" rel="noopener noreferrer" className="reveal flex items-center gap-4 p-6 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-accent)] transition-all group no-underline">
                <div className="flex items-center justify-center w-10 h-10 border border-[rgba(255,255,255,0.06)] group-hover:border-[var(--color-border-accent)] transition-colors">
                  <Linkedin size={16} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">LinkedIn</p>
                  <p className="text-sm text-[var(--color-text-primary)]">LinkedIn — Bruno Abreu</p>
                </div>
              </a>
            )}

            {hasResume && (
              <a href={author.resumeUrl} target="_blank" rel="noopener noreferrer" className="reveal flex items-center gap-4 p-6 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-accent)] transition-all group no-underline">
                <div className="flex items-center justify-center w-10 h-10 border border-[rgba(255,255,255,0.06)] group-hover:border-[var(--color-border-accent)] transition-colors">
                  <FileText size={16} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">Currículo</p>
                  <p className="text-sm text-[var(--color-text-primary)] font-mono">Baixar currículo</p>
                </div>
              </a>
            )}

            {hasGithub && (
              <a href={author.github} target="_blank" rel="noopener noreferrer" className="reveal flex items-center gap-4 p-6 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] hover:border-[var(--color-border-accent)] transition-all group no-underline">
                <div className="flex items-center justify-center w-10 h-10 border border-[rgba(255,255,255,0.06)] group-hover:border-[var(--color-border-accent)] transition-colors">
                  <Github size={16} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">GitHub</p>
                  <p className="text-sm text-[var(--color-text-primary)]">{author.name}</p>
                </div>
              </a>
            )}
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
