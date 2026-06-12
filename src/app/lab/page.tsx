import type { Metadata } from 'next';
import Link from 'next/link';
import { siteConfig } from '@/data/site';
import { labStages } from '@/data/lab-stages';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Server, Monitor, Wifi, ArrowRight, CheckCircle, Clock, Circle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cybersecurity Home Lab',
  description:
    'Laboratório prático de cibersegurança com Linux, SSH, firewall, logs, Nmap, Wireshark e Wazuh. Documentação técnica por Bruno Abreu.',
  openGraph: {
    title: `Cybersecurity Home Lab | ${siteConfig.title}`,
    description:
      'Laboratório prático de cibersegurança com Linux, SSH, firewall, logs, Nmap, Wireshark e Wazuh.',
  },
};

export default function LabPage() {
  return (
    <div className="pt-24 md:pt-32">
      {/* ─── Header ─── */}
      <section className="container-narrow pb-12 md:pb-16">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <Server size={12} strokeWidth={1.5} />
            Home Lab
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            Cybersecurity Home Lab
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Este laboratório foi criado para praticar fundamentos reais de cibersegurança em um ambiente controlado. A proposta é estudar Linux, redes, acesso remoto, firewall, logs, análise de eventos, ferramentas de diagnóstico e conceitos de SOC.
          </p>
        </ScrollReveal>
      </section>

      <hr className="divider container-narrow" />

      {/* ─── Ambiente ─── */}
      <section className="container-narrow section-spacing !pt-0">
        <ScrollReveal>
          <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-8">
            Ambiente utilizado
          </h2>
        </ScrollReveal>

        <ScrollReveal stagger>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(255,255,255,0.04)]">
            {[
              {
                icon: Monitor,
                label: 'Estação de acesso',
                value: 'MacBook (terminal remoto)',
              },
              {
                icon: Server,
                label: 'Servidor',
                value: 'Ubuntu 24.04.4 LTS',
              },
              {
                icon: Wifi,
                label: 'Rede',
                value: 'Rede local Wi-Fi',
              },
              {
                icon: Server,
                label: 'Serviços',
                value: 'OpenSSH, UFW Firewall',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="reveal bg-[var(--color-bg-deep)] p-6"
              >
                <item.icon size={16} strokeWidth={1.5} className="text-[var(--color-accent)] mb-3" />
                <p className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                  {item.label}
                </p>
                <p className="text-sm text-[var(--color-text-primary)]">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <p className="text-sm text-[var(--color-text-muted)] mt-6">
            Futuramente: Nmap, Wireshark, Wazuh e outros recursos serão integrados ao ambiente.
          </p>
        </ScrollReveal>
      </section>

      {/* ─── Lab Roadmap ─── */}
      <section className="section-spacing border-t border-[rgba(255,255,255,0.04)]">
        <div className="container-narrow">
          <ScrollReveal>
            <h2 className="text-xl md:text-2xl font-bold tracking-tight mb-3">
              Lab Roadmap
            </h2>
            <p className="text-sm text-[var(--color-text-muted)] mb-12 max-w-lg">
              Progressão planejada de estudos e laboratórios práticos em cibersegurança.
            </p>
          </ScrollReveal>

          <div className="relative">
            {/* Vertical line */}
            <div
              className="absolute left-[15px] md:left-[19px] top-0 bottom-0 w-px bg-[rgba(255,255,255,0.06)]"
              aria-hidden="true"
            />

            <div className="space-y-0">
              {labStages.map((stage, index) => (
                <ScrollReveal key={stage.id}>
                  <div className="relative flex gap-5 md:gap-8 pb-10 last:pb-0">
                    {/* Timeline node */}
                    <div className="relative z-10 flex-shrink-0 mt-1">
                      {stage.status === 'documentado' ? (
                        <CheckCircle size={32} strokeWidth={1.5} className="text-[var(--color-status-done)]" />
                      ) : stage.status === 'em-andamento' ? (
                        <Clock size={32} strokeWidth={1.5} className="text-[var(--color-status-progress)]" />
                      ) : (
                        <Circle size={32} strokeWidth={1} className="text-[var(--color-status-planned)]" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-5 md:p-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xs font-mono text-[var(--color-text-muted)]">
                          Etapa {stage.id}
                        </span>
                        <span
                          className="text-[0.6rem] font-mono uppercase tracking-widest"
                          style={{
                            color:
                              stage.status === 'documentado'
                                ? 'var(--color-status-done)'
                                : stage.status === 'em-andamento'
                                ? 'var(--color-status-progress)'
                                : 'var(--color-status-planned)',
                          }}
                        >
                          {stage.status === 'documentado'
                            ? 'Documentado'
                            : stage.status === 'em-andamento'
                            ? 'Em andamento'
                            : 'Planejado'}
                        </span>
                      </div>

                      <h3 className="text-base font-semibold mb-2">
                        {stage.title}
                      </h3>

                      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                        {stage.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-2">
                        {stage.tools.map((tool) => (
                          <span
                            key={tool}
                            className="inline-flex text-[0.6rem] font-mono px-2 py-0.5 border border-[rgba(255,255,255,0.06)] text-[var(--color-text-muted)]"
                          >
                            {tool}
                          </span>
                        ))}

                        {stage.articleSlug && (
                          <Link
                            href={`/artigos/${stage.articleSlug}`}
                            className="inline-flex items-center gap-1 text-xs text-[var(--color-accent)] ml-auto hover:gap-2 transition-all no-underline"
                          >
                            Ver artigo <ArrowRight size={10} strokeWidth={1.5} />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
