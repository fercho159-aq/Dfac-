
import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Script from 'next/script';
import { FloatingActionButtons } from '@/components/floating-action-buttons';

export const metadata: Metadata = {
  metadataBase: new URL('https://cimbrayaccesorios.com.mx'),
  title: {
    default: 'DFAC - Accesorios para Cimbra | Venta en CDMX con Entrega en 24h',
    template: '%s | DFAC Accesorios para Cimbra',
  },
  description: 'Venta de accesorios para cimbra, andamios, puntales, silletas, cuñas y productos para concreto en CDMX y Zona Metropolitana. Entrega en 24 horas.',
  keywords: ['cimbra', 'andamios', 'construccion', 'accesorios para cimbra', 'apuntalamiento', 'puntales', 'silletas', 'CDMX'],
  verification: {
    google: [
      'jkMx5np0vlwBrwGvt51jqLcHkS1jNTh83-yBdKYfpRQ',
      '7P_GYcW51SlnE2dIlYHZpcRiLFkUQzxozntPfDwIYGM',
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'DFAC - Accesorios para Cimbra',
    description: 'Venta de accesorios para cimbra, andamios, puntales, silletas y productos para concreto en CDMX. Entrega en 24 horas.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: 'DFAC - Accesorios para Cimbra',
              description: 'Venta de accesorios para cimbra, andamios, puntales, silletas, cuñas y productos para concreto en CDMX y Zona Metropolitana.',
              url: 'https://cimbrayaccesorios.com.mx',
              telephone: ['+525525989751', '+525541673745', '+525555715084'],
              email: 'ventas@cimbrayaccesorios.com.mx',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Cuauhtémoc 105, San Pedro Iztacalco',
                addressLocality: 'Iztacalco',
                addressRegion: 'Ciudad de México',
                postalCode: '08220',
                addressCountry: 'MX',
              },
              openingHoursSpecification: {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '09:00',
                closes: '18:00',
              },
              sameAs: [
                'https://www.facebook.com/share/1GYpQ8pWLK/',
                'https://www.instagram.com/dfac_cimbra',
                'https://www.tiktok.com/@accesorios.dfac',
              ],
            }),
          }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-WN6W5G9B');
          `}
        </Script>
        {/* End Google Tag Manager */}

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
        
        {/* <!-- Google tag (gtag.js) --> */}
        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-T74VLVQB70"></Script>
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-T74VLVQB70');
          `}
        </Script>

        {/* Google Ads WhatsApp Conversion Tracking */}
        <Script id="gtag-conversion-whatsapp" strategy="afterInteractive">
          {`
            function gtag_report_conversion(url) {
              var callback = function () {
                if (typeof(url) != 'undefined') {
                  window.location = url;
                }
              };
              gtag('event', 'conversion', {
                'send_to': 'AW-987044751/EqbqCPHnpdEcEI-31NYD',
                'event_callback': callback
              });
              return false;
            }
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WN6W5G9B"
        height="0" width="0" style={{display: 'none', visibility: 'hidden'}}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow bg-background">{children}</main>
          <Footer />
        </div>
        <FloatingActionButtons />
        <Toaster />
      </body>
    </html>
  );
}
