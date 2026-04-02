"use client";

import { Container } from "@/components/layout/container";

export function FeaturesSection() {
  const features = [
    { title: "Alta Performance", desc: "100/100 Core Web Vitals" },
    { title: "Tracking Perfeito", desc: "Disparos controlados de Pixel/GTM LGPD." },
    { title: "Customização Visual", desc: "Design Tokens em variáveis nativas" }
  ];

  return (
    <section className="py-24 bg-muted/50" aria-labelledby="features-title">
      <Container>
        <h2 id="features-title" className="text-3xl font-bold text-center mb-12">Por que adotar o Boilerplate?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div key={idx} className="p-6 bg-background rounded-2xl border shadow-sm">
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
