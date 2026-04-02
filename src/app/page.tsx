import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12 px-4 text-center">
      <div className="max-w-3xl space-y-6">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-primary">
          Kepoweb Boilerplate Vercel
        </h1>
        <p className="text-xl text-muted-foreground w-full max-w-2xl mx-auto">
          Fundação premium focada em SEO Técnico, Tracking com Consentimento e Performance Absoluta para páginas institucionais.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
          <Link
            href="/landing-page"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          >
            Ver Landing Page Exemplo
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Documentação Interna
          </Link>
        </div>
      </div>
    </div>
  );
}
