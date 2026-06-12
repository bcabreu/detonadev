import type { Metadata } from 'next';
import { siteConfig } from '@/data/site';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
import { Shield, GraduationCap, Target, Wrench } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sobre',
  description: `Conheça Bruno Abreu — graduado em Sistemas de Informação e Economia, em transição para cibersegurança. Criador do ${siteConfig.title}.`,
  openGraph: {
    title: `Sobre | ${siteConfig.title}`,
    description: `Conheça Bruno Abreu — graduado em Sistemas de Informação e Economia, em transição para cibersegurança.`,
  },
};

export default function SobrePage() {
  return (
    <div className="pt-24 md:pt-32">
      {/* ─── Header ─── */}
      <section className="container-narrow pb-12 md:pb-16">
        <ScrollReveal>
          <span className="eyebrow mb-6 block w-fit">
            <Shield size={12} strokeWidth={1.5} />
            Sobre
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter mb-6">
            Bruno Abreu
          </h1>
          <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed max-w-2xl">
            Graduado em Sistemas de Informação e Economia, em transição para a área de Cibersegurança.
          </p>
        </ScrollReveal>
      </section>

      <hr className="divider container-narrow" />

      {/* ─── Bio ─── */}
      <section className="container-narrow section-spacing !pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12 lg:gap-20">
          <div>
            <ScrollReveal>
              <div className="space-y-5 text-[var(--color-text-secondary)] leading-relaxed">
                <p>
                  Sou Bruno Abreu, graduado em Sistemas de Informação e Economia, em transição para a área de Cibersegurança. Atualmente estudo os fundamentos da segurança da informação e estou em preparação para a certificação ISC2 Certified in Cybersecurity (CC).
                </p>
                <p>
                  Criei o DetonaDev Cyber Lab para documentar meus estudos práticos em Linux, redes, firewall, logs, SOC, resposta a incidentes e ferramentas usadas em ambientes de segurança. A proposta é registrar o processo de aprendizado de forma transparente, técnica e objetiva, mostrando não apenas comandos, mas também o raciocínio por trás de cada configuração, diagnóstico e solução.
                </p>
                <p>
                  Minha experiência anterior inclui projetos web, automação, aplicativos publicados e tecnologia aplicada a negócios. Essa bagagem complementa minha transição para cibersegurança com uma visão prática de como sistemas funcionam, onde podem falhar e como proteger informações em ambientes reais.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            <ScrollReveal>
              <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <GraduationCap size={14} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    Formação
                  </h3>
                </div>
                <ul className="space-y-2 text-sm text-[var(--color-text-secondary)]">
                  <li>Sistemas de Informação</li>
                  <li>Economia</li>
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Target size={14} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    Certificação em progresso
                  </h3>
                </div>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  ISC2 Certified in Cybersecurity (CC)
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Wrench size={14} strokeWidth={1.5} className="text-[var(--color-accent)]" />
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)]">
                    Áreas de interesse
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {[
                    'SOC', 'Segurança da Informação', 'Linux', 'Redes',
                    'Logs', 'Controle de Acesso', 'Resposta a Incidentes',
                    'Segurança Operacional', 'Firewall', 'SIEM',
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex text-[0.625rem] font-mono px-2 py-1 border border-[rgba(255,255,255,0.06)] text-[var(--color-text-muted)]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </section>
    </div>
  );
}
