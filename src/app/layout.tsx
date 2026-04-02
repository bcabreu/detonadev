import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { UTMTracker } from '@/lib/utm/utm-helper';
import { ConsentBanner } from '@/components/ui/consent-banner';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Kepoweb Boilerplate',
    template: '%s | Kepoweb',
  },
  description: 'Boilerplate premium para Landing Pages e Institucionais focado em Performance e Conversão.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Implementação Oficial do GTM, GA4 e Meta Pixel via Google Tag Manager */}
        {process.env.NEXT_PUBLIC_GTM_ID && (
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                // Consentimento LGPD base (Fechado até o ConsentBanner dar grant local via Storage)
                gtag('consent', 'default', {
                  'ad_storage': 'denied',
                  'analytics_storage': 'denied'
                });
                (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');
              `,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans" suppressHydrationWarning>
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
        
        {/* Pop-up LGPD Renderizado como Client isolado na raiz, sem wrapper de Context */}
        <ConsentBanner />
      </body>
    </html>
  );
}
