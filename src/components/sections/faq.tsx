"use client";

import { Container } from "@/components/layout/container";

export function FAQSection() {
  return (
    <section className="py-24" aria-labelledby="faq-title">
      <Container className="max-w-3xl">
        <h2 id="faq-title" className="text-3xl font-bold mb-8 text-center">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          <details className="p-4 border rounded-lg group">
            <summary className="font-medium cursor-pointer list-none flex justify-between">
              Como funciona o cookie banner? <span className="group-open:rotate-180 transition-transform">↓</span>
             </summary>
            <p className="mt-4 text-muted-foreground text-sm">Integra diretamente os dados opt-in com window.dataLayer para Consent Mode V2.</p>
          </details>
          <details className="p-4 border rounded-lg group">
            <summary className="font-medium cursor-pointer list-none flex justify-between">
              Posso usar o Vercel Edge Server? <span className="group-open:rotate-180 transition-transform">↓</span>
             </summary>
            <p className="mt-4 text-muted-foreground text-sm">Sim, mas recomendamos Node.js runtime standalone se utilizar bibliotecas que dependem nativamente dele.</p>
          </details>
        </div>
      </Container>
    </section>
  );
}
