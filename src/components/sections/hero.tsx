import { Container } from "../layout/container";
import { Button } from "../ui/button";
import { MoveRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32">
      <Container className="text-center flex flex-col items-center relative z-10">
        <div className="inline-flex items-center rounded-sm bg-accent px-3 py-1 text-xs font-medium text-accent-foreground mb-8">
          🚀 Next.js App Router + Tailwind v4
        </div>
        <h1 className="text-balance text-4xl md:text-6xl font-extrabold tracking-tight text-primary max-w-4xl mb-6">
          Fundação Profissional para <span className="text-muted-foreground">Landing Pages Premium</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl text-balance mb-10 leading-relaxed">
          O boilerplate técnico oficial da Kepoweb focado em conversão, SEO Technical avançado e prontidão para campanhas do Google Ads.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center max-w-md">
          <Button size="lg" className="w-full sm:w-auto h-12 text-base px-8">
            Começar Projeto <MoveRight className="ml-2 h-4 w-4" />
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-12 text-base px-8">
            Documentação Interna
          </Button>
        </div>
      </Container>

      {/* Decorative gradient background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#e4e4e7_100%)] dark:[background:radial-gradient(125%_125%_at_50%_10%,#09090b_40%,#18181b_100%)]" />
    </section>
  );
}
