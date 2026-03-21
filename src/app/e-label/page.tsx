import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ELabelWineForm from '@/components/elabel/ELabelWineForm'

export const metadata = {
  title: "E-Label — Générateur d'e-labels conformes UE | FicheVin",
  description: "Créez vos e-labels conformes au Règlement UE 2021/2117. Ingrédients, valeurs nutritionnelles, QR code pour vos étiquettes de vin.",
}

export default function ELabelPage() {
  return (
    <>
      <Header />
      <main className="pt-14 min-h-screen bg-bg">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-text">Générateur d&apos;e-label</h1>
            <p className="text-text-secondary text-sm mt-1">
              Créez votre e-label conforme UE 2021/2117 en quelques minutes. Calcul nutritionnel automatique et QR code téléchargeable. <strong className="text-text">3 € par e-label</strong>, paiement unique.
            </p>
          </div>
          <div className="bg-surface border border-border rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-card)]">
            <ELabelWineForm />
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
