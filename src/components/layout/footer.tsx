import Link from "next/link";
import { Container } from "./container";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background pt-12 pb-8">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <Link href="/" className="flex items-center space-x-2" aria-label="Ir para a página inicial">
            <span className="font-bold text-xl tracking-tight">Kepoweb.</span>
          </Link>
          <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left">
            Agência focada em conversão, tráfego pago e sites de altíssima performance.
          </p>
        </div>
        <nav aria-label="Navegação de Rodapé" className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/politica-de-privacidade" className="hover:text-primary transition-colors">
            Privacidade
          </Link>
          <Link href="/termos" className="hover:text-primary transition-colors">
            Termos
          </Link>
        </nav>
      </Container>
      <Container className="border-t mt-8 pt-8 flex items-center justify-center">
        <p className="text-xs text-muted-foreground text-center">
          &copy; {new Date().getFullYear()} Kepoweb. Todos os direitos reservados.
        </p>
      </Container>
    </footer>
  );
}
