import { Metadata } from "next";

interface SeoProps {
  title: string;
  description: string;
  image?: string;
  path?: string;
  noIndex?: boolean;
}

/**
 * Função utilitária para gerar Metadata tipado por página,
 * garantindo Open Graph e Twitter Cards uniformes para redes.
 */
export function constructMetadata({
  title,
  description,
  image = "/og-image.jpg",
  path = "",
  noIndex = false,
}: SeoProps): Metadata {
  const url = process.env.NEXT_PUBLIC_SITE_URL || "https://kepoweb.com";
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${url}${path}`,
      siteName: "Kepoweb",
      images: [
        {
          url: image, // Recomendação: 1200x630
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
      locale: "pt_BR",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: `${url}${path}`,
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
