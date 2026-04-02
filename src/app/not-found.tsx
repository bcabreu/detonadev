import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <Container className="text-center flex flex-col items-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-6" />
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">Página Não Encontrada</h1>
        <p className="text-xl text-muted-foreground mb-8">
          A rota que você tentou acessar não existe ou não está mais disponível.
        </p>
        <Link href="/">
          <Button size="lg">Retornar à Navegação Segura</Button>
        </Link>
      </Container>
    </div>
  );
}
