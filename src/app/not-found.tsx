import Link from 'next/link';
import { Terminal } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70dvh] flex items-center justify-center">
      <div className="container-narrow text-center">
        <Terminal size={28} strokeWidth={1.5} className="text-[var(--color-accent)] mx-auto mb-6" />
        <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4 font-mono">
          404
        </h1>
        <p className="text-[var(--color-text-secondary)] mb-8 max-w-sm mx-auto">
          Página não encontrada. O recurso que você procura não existe ou foi movido.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-5 py-2.5 text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all no-underline"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  );
}
