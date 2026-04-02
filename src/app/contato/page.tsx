import { ContactForm } from "@/components/forms/contact-form";
import { Container } from "@/components/layout/container";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata = constructMetadata({
  title: "Fale Conosco",
  description: "Entre em contato com nossa equipe especializada para acelerar seus resultados.",
  path: "/contato",
});

export default function ContatoPage() {
  return (
    <div className="py-16 md:py-24">
      <Container className="grid md:grid-cols-2 gap-12">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">Vamos conversar?</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Preencha o formulário e nossa equipe avaliará seu projeto. Implementamos a sua máquina de atração de leads de ponta a ponta.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-foreground">Canal Direto</h3>
              <p className="text-muted-foreground">contato@kepoweb.com</p>
            </div>
          </div>
        </div>
        <div className="bg-card shadow-sm border rounded-xl p-6 md:p-8">
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
