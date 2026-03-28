import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "FicheVin — Fiches techniques vin pour importateurs et négociants",
  description:
    "Générez vos fiches techniques vin en 30 secondes. Dégustation, accords mets-vins, mise en page brandée. Test gratuit sur 5 vins.",
  keywords: [
    "fiche technique vin",
    "importateur vin",
    "automatisation vin",
    "IA vin",
    "négociant vin",
    "fiches techniques automatisées",
  ],
  openGraph: {
    title: "FicheVin — Fiches techniques vin pour importateurs et négociants",
    description:
      "Générez vos fiches techniques vin en 30 secondes. Dégustation, accords mets-vins, mise en page brandée. Test gratuit sur 5 vins.",
    siteName: "FicheVin",
    url: "https://fichevin.fr",
    images: [
      {
        url: "https://fichevin.fr/fiche-apres.png",
        width: 800,
        height: 1100,
        alt: "Exemple de fiche technique vin générée par FicheVin",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FicheVin — Fiches techniques vin pour importateurs et négociants",
    description:
      "Générez vos fiches techniques vin en 30 secondes. Dégustation, accords mets-vins, mise en page brandée.",
    images: ["https://fichevin.fr/fiche-apres.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🍷</text></svg>",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "FicheVin",
  description:
    "Service d'automatisation de fiches techniques vin pour importateurs et négociants",
  url: "https://fichevin.fr",
  areaServed: {
    "@type": "Country",
    name: "France",
  },
  serviceType: "Automatisation de fiches techniques vin",
  priceRange: "€€",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,300;0,8..60,400;0,8..60,600;0,8..60,700;1,8..60,400&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-2ZEXXF525F"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-2ZEXXF525F');
        `}
      </Script>
      <body>{children}</body>
    </html>
  );
}
