import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo/metadata";
import { CheckCircle } from "lucide-react";
import Link from "next/link";

export const metadata = constructMetadata({
  title: "Obrigado",
  description: "Recebemos o seu contato. Entraremos em respostas em breve.",
  noIndex: true, // Páginas de sucesso nunca devem ser indexadas
});

export default function ObrigadoPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] py-12 px-4 text-center">
      <Container className="max-w-2xl flex flex-col items-center">
        <CheckCircle className="w-16 h-16 text-green-500 mb-6" />
        <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-4">
          Mensagem Recebida!
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Obrigado por nos contatar. Um de nossos consultores especializados analisará sua solicitação e entrará em contato em breve.
        </p>
        <Link href="/">
          <Button variant="outline" size="lg">
            Voltar para a Home
          </Button>
        </Link>
      </Container>
    </div>
  );
}
