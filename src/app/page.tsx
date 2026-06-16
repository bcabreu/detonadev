import Link from 'next/link';
import { ArrowRight, Shield, BookOpen, Linkedin, Server, FileText, Users, Clock, Circle, CheckCircle2 } from 'lucide-react';
import { siteConfig } from '@/data/site';
import { getPublishedArticles } from '@/data/articles';
import { labStages } from '@/data/lab-stages';
import { categories } from '@/data/categories';
import { ArticleCard } from '@/components/ui/article-card';
import { ScrollReveal } from '@/components/ui/scroll-reveal';

export default function HomePage() {
  const publishedArticles = getPublishedArticles();
  const latestArticles = publishedArticles.slice(0, 3);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative min-h-[100dvh] flex items-center pt-20">
        {/* Subtle grid background */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
          aria-hidden="true"
        />
        {/* Radial fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(16,185,129,0.06) 0%, transparent 70%)',
          }}
          aria-hidden="true"
        />

        <div className="container-narrow relative z-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <ScrollReveal>
              <div className="eyebrow mb-6">
                <Shield size={12} strokeWidth={1.5} />
                Cybersecurity Lab
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] mb-6">
                DetonaDev<br />
                <span className="text-[var(--color-accent)] cursor-blink">Cyber Lab</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-sm font-mono text-[var(--color-text-muted)] mb-4 uppercase tracking-wider">
                Por Bruno Abreu — graduado em Sistemas de Informação, em transição para Cibersegurança e SOC.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-base md:text-lg text-[var(--color-text-secondary)] leading-relaxed mb-4 max-w-xl">
                Laboratório público de estudos práticos em cibersegurança, Linux, redes, SOC, logs, firewall e segurança da informação.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed mb-10 max-w-lg">
                Este site documenta minha transição para a área de cibersegurança por meio de laboratórios práticos, estudos técnicos e registros reais de aprendizado. O objetivo é transformar teoria em prática e construir uma base sólida para atuar em Segurança da Informação e SOC.
              </p>
            </ScrollReveal>

            <ScrollReveal>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/lab"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[var(--color-accent)] text-[#0a0f1a] hover:bg-[#34d399] transition-colors no-underline"
                >
                  <Server size={14} strokeWidth={1.5} />
                  Ver Cybersecurity Home Lab
                </Link>
                <Link
                  href="/artigos"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all no-underline"
                >
                  <BookOpen size={14} strokeWidth={1.5} />
                  Ler artigos técnicos
                </Link>
                {siteConfig.author.resumeUrl && (
                  <a
                    href={siteConfig.author.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.06)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[rgba(255,255,255,0.12)] transition-all no-underline"
                  >
                    <FileText size={14} strokeWidth={1.5} />
                    Baixar currículo
                  </a>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─── Lab Preview ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow mb-4 block w-fit">
                  <Server size={12} strokeWidth={1.5} />
                  Laboratório
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Cybersecurity Home Lab
                </h2>
                <p className="text-sm text-[var(--color-text-muted)] mt-2 max-w-md">
                  Ambiente controlado para prática de fundamentos de cibersegurança.
                </p>
              </div>
              <Link
                href="/lab"
                className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:gap-2.5 transition-all no-underline"
              >
                Ver detalhes <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal stagger>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[rgba(255,255,255,0.04)]">
              {labStages.map((stage) => (
                <div
                  key={stage.id}
                  className="reveal bg-[var(--color-bg-deep)] p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="inline-flex items-center justify-center w-7 h-7 text-xs font-mono font-bold border"
                      style={{
                        color:
                          stage.status === 'documentado'
                            ? 'var(--color-status-done)'
                            : stage.status === 'em-andamento'
                            ? 'var(--color-status-progress)'
                            : 'var(--color-status-planned)',
                        borderColor:
                          stage.status === 'documentado'
                            ? 'rgba(16,185,129,0.3)'
                            : stage.status === 'em-andamento'
                            ? 'rgba(245,158,11,0.3)'
                            : 'rgba(255,255,255,0.06)',
                      }}
                    >
                      {stage.id}
                    </span>
                    <span className="text-[0.6rem] font-mono uppercase tracking-widest" style={{
                      color:
                        stage.status === 'documentado'
                          ? 'var(--color-status-done)'
                          : stage.status === 'em-andamento'
                          ? 'var(--color-status-progress)'
                          : 'var(--color-status-planned)',
                    }}>
                      {stage.status === 'documentado' ? 'Documentado' : stage.status === 'em-andamento' ? 'Em andamento' : 'Planejado'}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold mb-2">{stage.title}</h3>
                  <p className="text-xs text-[var(--color-text-muted)] leading-relaxed line-clamp-2">
                    {stage.description}
                  </p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          <Link
            href="/lab"
            className="md:hidden inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] mt-6 hover:gap-2.5 transition-all no-underline"
          >
            Ver detalhes <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ─── Latest Articles ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow mb-4 block w-fit">
                  <FileText size={12} strokeWidth={1.5} />
                  Artigos
                </span>
                <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
                  Estudos recentes
                </h2>
              </div>
              <Link
                href="/artigos"
                className="hidden md:inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] hover:gap-2.5 transition-all no-underline"
              >
                Ver todos <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </div>
          </ScrollReveal>

          {latestArticles.length > 0 ? (
            <ScrollReveal stagger>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {latestArticles.map((article) => (
                  <div key={article.slug} className="reveal">
                    <ArticleCard article={article} />
                  </div>
                ))}
              </div>
            </ScrollReveal>
          ) : (
            <ScrollReveal>
              <div className="border border-dashed border-[rgba(255,255,255,0.06)] p-8 md:p-12 text-center bg-[var(--color-bg-surface)]">
                <Shield size={24} strokeWidth={1.5} className="text-[var(--color-accent)] mx-auto mb-4" />
                <h3 className="text-base font-semibold mb-2">Artigos em preparação</h3>
                <p className="text-sm text-[var(--color-text-secondary)] max-w-md mx-auto leading-relaxed">
                  Os relatórios e análises técnicas serão publicados aqui conforme os laboratórios forem executados na prática no ambiente real.
                </p>
                <div className="mt-6 flex justify-center gap-4 text-xs font-mono text-[var(--color-text-muted)]">
                  <span>SSH & Firewall (Planejando Documentação)</span>
                </div>
              </div>
            </ScrollReveal>
          )}

          <Link
            href="/artigos"
            className="md:hidden inline-flex items-center gap-1.5 text-sm text-[var(--color-accent)] mt-6 hover:gap-2.5 transition-all no-underline"
          >
            Ver todos <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ─── Para Recrutadores ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)] bg-[var(--color-bg-surface)]">
        <div className="container-narrow">
          <ScrollReveal>
            <div className="max-w-2xl">
              <span className="eyebrow mb-6 block w-fit">
                <Users size={12} strokeWidth={1.5} />
                Para recrutadores
              </span>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
                Documentação prática, não conteúdo genérico
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-4">
                Este laboratório documenta minha evolução prática em cibersegurança. A proposta é demonstrar domínio progressivo de fundamentos como Linux, redes, SSH, firewall, logs, análise de eventos, ferramentas de segurança e conceitos de SOC.
              </p>
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-8">
                Cada artigo registra o objetivo, o ambiente, o problema, o diagnóstico, a solução e o aprendizado. Este não é um blog de notícias é um registro técnico de estudos reais.
              </p>

              <div className="flex flex-wrap gap-2 mb-8">
                {['Linux', 'Redes', 'SSH', 'Firewall', 'Logs', 'SOC', 'Nmap', 'Wireshark', 'UFW', 'SIEM'].map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center text-xs font-mono px-3 py-1.5 border border-[rgba(255,255,255,0.06)] text-[var(--color-text-secondary)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  href="/lab"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium bg-[var(--color-accent)] text-[#0a0f1a] hover:bg-[#34d399] transition-colors no-underline"
                >
                  Ver laboratório completo
                  <ArrowRight size={14} strokeWidth={1.5} />
                </Link>
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all no-underline"
                >
                  Sobre Bruno Abreu
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
