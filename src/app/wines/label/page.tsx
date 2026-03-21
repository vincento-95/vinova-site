import ELabelFromURL from '@/components/elabel/ELabelFromURL'

export const metadata = {
  title: 'E-label — Ingrédients et informations nutritionnelles',
  robots: { index: false, follow: false },
}

export default function WineLabelPage() {
  return <ELabelFromURL />
}
