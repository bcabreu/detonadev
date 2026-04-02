import { Container } from "@/components/layout/container";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Política de Privacidade",
  description: "Termos e Condições que regem a utilização deste portal.",
  noIndex: true, // Paginas legais não interessam ser rankeadas em alguns casos
});

export default function PrivacyPolicyPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Política de Privacidade</h1>
        <p className="mb-4 text-muted-foreground">Data de atualização: {new Date().toLocaleDateString("pt-BR")}</p>
        <div className="space-y-6 text-foreground">
          <section>
            <h2 className="text-xl font-semibold mb-2">1. Coleta de Dados</h2>
            <p>
              Em respeito à Lei Geral de Proteção de Dados Pessoais (LGPD), nossos cookies acionados na home apenas coletam dados pseudônimos, e o rastreamento integral ocorre apenas mediante seu aceite.
            </p>
          </section>
        </div>
      </Container>
    </div>
  );
}
