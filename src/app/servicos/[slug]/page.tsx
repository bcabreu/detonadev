import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo/metadata";
import Link from "next/link";
import { notFound } from "next/navigation";

// Exemplo estático de estrutura simulada, pode vir de JSON ou CMS local no boilerplate real.
const SERVICOS = {
  "criacao-de-sites": {
    nome: "Criação de Sites e Landing Pages",
    descricao: "Desenvolvimento técnico avançado arquitetado pela Kepoweb focado no ecossistema Next.js e otimização cirúrgica nos Web Vitals.",
  },
  "trafego-pago": {
    nome: "Gestão Avançada de Tráfego",
    descricao: "Otimização de campanhas em Google e Meta com tracking server-client impecável para CPL mais barato.",
  }
};

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const servico = SERVICOS[slug as keyof typeof SERVICOS];
  if (!servico) return {};
  return constructMetadata({ title: servico.nome, description: servico.descricao, path: `/servicos/${slug}` });
}

export default async function ServicoPage({ params }: Props) {
  const { slug } = await params;
  const servico = SERVICOS[slug as keyof typeof SERVICOS];

  if (!servico) {
    notFound();
  }

  return (
    <div>
      <section className="bg-muted py-24 md:py-32 border-b">
        <Container>
          <div className="max-w-3xl">
             <div className="inline-flex mb-6 rounded-full border px-2.5 py-0.5 text-xs font-semibold">
               Serviços Especializados
             </div>
             <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary mb-6">{servico.nome}</h1>
             <p className="text-xl md:text-2xl font-light text-muted-foreground">{servico.descricao}</p>
          </div>
        </Container>
      </section>
      
      <section className="py-24 max-w-4xl mx-auto px-4">
          <div className="prose prose-slate dark:prose-invert">
            <h2>Processo e Metodologia</h2>
            <p>Nossa abordagem utiliza uma validação agressiva arquitetural evitando refações. Garantimos pontuação acima da média nas análises Lighthouse.</p>
          </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground">
        <Container className="flex flex-col items-center text-center">
             <h2 className="text-3xl font-extrabold mb-6">Pronto para acelerar?</h2>
             <Link href="/contato"><Button size="lg" variant="secondary" className="font-semibold px-8 h-12">Falar com Consultor</Button></Link>
        </Container>
      </section>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(SERVICOS).map((slug) => ({ slug }));
}
