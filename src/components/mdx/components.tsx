import Link from 'next/link';
import { ArticleImage } from './article-image';

export const mdxComponents = {
  ArticleImage,
  h1: (props: any) => (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter leading-tight mt-10 mb-6" {...props} />
  ),
  h2: (props: any) => (
    <h2 className="text-xl md:text-2xl font-bold tracking-tight mt-14 mb-6 border-b border-[rgba(255,255,255,0.06)] pb-3" {...props} />
  ),
  h3: (props: any) => (
    <h3 className="text-lg md:text-xl font-semibold tracking-tight mt-10 mb-4" {...props} />
  ),
  p: (props: any) => (
    <p className="text-base text-[var(--color-text-secondary)] leading-[1.8] mb-6" {...props} />
  ),
  ul: (props: any) => (
    <ul className="list-disc list-outside pl-6 text-base text-[var(--color-text-secondary)] leading-[1.8] mb-6 space-y-2" {...props} />
  ),
  ol: (props: any) => (
    <ol className="list-decimal list-outside pl-6 text-base text-[var(--color-text-secondary)] leading-[1.8] mb-6 space-y-2" {...props} />
  ),
  li: (props: any) => (
    <li className="pl-1" {...props} />
  ),
  blockquote: (props: any) => (
    <blockquote className="border-l-2 border-[var(--color-accent)] pl-4 italic text-[var(--color-text-muted)] my-6 bg-[rgba(255,255,255,0.02)] py-2 pr-4" {...props} />
  ),
  a: ({ href, children, ...props }: any) => {
    const isInternal = href && (href.startsWith('/') || href.startsWith('#'));
    if (isInternal) {
      return (
        <Link href={href} className="text-[var(--color-accent)] hover:underline underline-offset-4 decoration-[rgba(255,255,255,0.2)] transition-all" {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="text-[var(--color-accent)] hover:underline underline-offset-4 decoration-[rgba(255,255,255,0.2)] transition-all" {...props}>
        {children}
      </a>
    );
  },
  pre: ({ children, ...props }: any) => (
    <pre
      className="my-6 overflow-x-auto border border-[rgba(255,255,255,0.08)] border-l-2 border-l-[var(--color-accent-dim)] bg-[#0d1117] p-5 text-sm leading-relaxed text-slate-300 font-mono rounded-sm"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ className, children, ...props }: any) => {
    // If code is inside a <pre> block, it will have a className like "language-xxx"
    const isBlock = className && className.startsWith('language-');
    if (isBlock) {
      return (
        <code className={`font-mono text-sm ${className}`} {...props}>
          {children}
        </code>
      );
    }
    // Inline code
    return (
      <code className="font-mono text-[0.875em] bg-[rgba(255,255,255,0.08)] text-[var(--color-accent)] px-1.5 py-0.5 rounded-sm border border-[rgba(255,255,255,0.06)]" {...props}>
        {children}
      </code>
    );
  },
  img: (props: any) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img className="max-w-full h-auto border border-[rgba(255,255,255,0.06)] rounded-sm my-8" loading="lazy" {...props} />
  ),
  hr: (props: any) => (
    <hr className="divider my-10" {...props} />
  ),
};
