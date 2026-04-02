import { Hero } from "@/components/sections/hero";
import { Container } from "@/components/layout/container";
import { constructMetadata } from "@/lib/seo/metadata";
import { SchemaMarkup, getFAQSchema } from "@/lib/seo/schema-markup";

export const metadata = constructMetadata({
  title: "Landing Page Exemplo",
  description: "Um modelo de landing page otimizada com conversão direta e Server Components.",
  path: "/landing-page",
});

const exampleFaq = getFAQSchema([
  { question: "O boilerplate suporta Meta Ads?", answer: "Sim, a camada tracking-provider já inclui a lógica base via DataLayer ou direto." }
]);

export default function LandingPage() {
  return (
    <div>
      <SchemaMarkup schema={exampleFaq} />
      <Hero />
      <section className="py-24 bg-secondary">
         <Container className="text-center">
            <h2 className="text-3xl font-extrabold mb-6">Módulos Prontos para Uso</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
               Expanda essa página utilizando as Sections na pasta `src/components/sections`. A base de CSS variables facilita a troca da hierarquia de cores.
            </p>
         </Container>
      </section>
    </div>
  );
}
