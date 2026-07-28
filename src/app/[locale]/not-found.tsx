import Link from 'next/link';
import { Shield, Home } from 'lucide-react';
import { ScrollReveal } from '@/components/ui/scroll-reveal';
// Note: not-found.tsx in App Router does not receive route params like `locale`.
// So we must use a client component or rely on default text. Since not-found is a boundary,
// the simplest approach for a static export is to use English as the universal fallback,
// or we can use a client component to read the pathname.
// Given we want standard static export, we'll use a generic multi-language message or English.
// Let's use English by default since it's the fallback locale.

export default function NotFound() {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center pt-20">
      <div className="container-narrow text-center">
        <ScrollReveal>
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.06)] mb-8">
            <Shield size={32} strokeWidth={1.5} className="text-[var(--color-accent)]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter mb-4">404</h1>
          <p className="text-lg text-[var(--color-text-secondary)] mb-8 max-w-md mx-auto">
            Page not found. The resource you are looking for does not exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-[rgba(255,255,255,0.1)] text-[var(--color-text-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all no-underline mx-auto"
          >
            <Home size={16} strokeWidth={1.5} />
            Back to home
          </Link>
        </ScrollReveal>
      </div>
    </div>
  );
}
