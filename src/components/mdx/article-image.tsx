'use client';

import Image from 'next/image';
import { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ArticleImageProps {
  src: string;
  alt: string;
  caption?: string;
}

export function ArticleImage({ src, alt, caption }: ArticleImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <figure className="my-6">
        <div className="flex items-center gap-3 border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] px-4 py-3 rounded-sm">
          <ImageOff size={16} strokeWidth={1.5} className="text-[var(--color-text-muted)] flex-shrink-0" />
          <span className="text-xs text-[var(--color-text-muted)] font-mono">
            Imagem pendente{caption ? `: ${caption}` : ''}
          </span>
        </div>
      </figure>
    );
  }

  return (
    <figure className="my-8">
      <div className="relative border border-[rgba(255,255,255,0.06)] bg-[var(--color-bg-surface)] overflow-hidden rounded-sm">
        <Image
          src={src}
          alt={alt}
          width={1200}
          height={800}
          className="w-full h-auto object-contain"
          unoptimized
          onError={() => setHasError(true)}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-[var(--color-text-muted)] text-center font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
