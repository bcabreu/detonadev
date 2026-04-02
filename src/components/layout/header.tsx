import Link from "next/link";
import { Container } from "./container";
import { Button } from "../ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" aria-label="Ir para a página inicial">
          <span className="font-bold text-xl tracking-tight text-primary">Kepoweb.</span>
        </Link>
        <nav aria-label="Navegação Principal" className="hidden md:flex gap-6">
          <Link href="#sobre" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground">Sobre</Link>
          <Link href="#servicos" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground">Serviços</Link>
          <Link href="#clientes" className="text-sm font-medium hover:text-primary transition-colors text-muted-foreground">Cases</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button>Falar com Especialista</Button>
        </div>
      </Container>
    </header>
  );
}
