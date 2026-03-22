import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Fiche technique générée | FicheVin',
  description: 'Votre fiche technique vin a été générée avec succès. Téléchargez-la en PDF.',
  robots: { index: false, follow: false },
}

export default function SuccessLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
