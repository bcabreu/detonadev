import { Container } from "@/components/layout/container";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Termos de Uso",
  description: "Termos Gerais e normativas de utilização dos nossos serviços.",
  noIndex: true,
});

export default function TermsPage() {
  return (
    <div className="py-16">
      <Container className="max-w-3xl prose prose-slate dark:prose-invert">
        <h1 className="text-3xl font-extrabold mb-8 tracking-tight">Termos de Uso</h1>
        <p className="mb-8">Estes são os termos gerais aplicáveis ao uso dos serviços.</p>
        
        <div className="space-y-6">
            <section>
                <h2 className="text-xl font-bold mb-2">1. Aceite</h2>
                <p className="text-muted-foreground">Ao navegar por este boilerplate, você aceita que a performance deve ser sua métrica de guia.</p>
            </section>
        </div>
      </Container>
    </div>
  );
}
