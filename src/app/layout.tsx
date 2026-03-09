import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fiches techniques vin automatisées | Vinova",
  description:
    "Générez vos fiches techniques vin en 30 secondes grâce à l'IA. Solution pour importateurs gérant 50 à 300 références.",
  keywords: [
    "fiche technique vin",
    "importateur vin",
    "automatisation vin",
    "IA vin",
    "négociant vin",
  ],
  openGraph: {
    title: "Fiches techniques vin générées en 30 secondes",
    description:
      "Solution IA pour importateurs de vin. Générez vos fiches techniques automatiquement.",
    siteName: "Vinova",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fiches techniques vin automatisées",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
