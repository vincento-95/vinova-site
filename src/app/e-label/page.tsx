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
            <h1 className="text-3xl md:text-4xl font-bold text-text text-center mb-4 font-serif">Générateur d&apos;E-Label</h1>
            <p className="text-text-secondary text-base mt-1 text-center">
              Créez votre e-label conforme UE 2021/2117 en quelques minutes.<br />
              Calcul nutritionnel automatique et QR code téléchargeable.
            </p>
            <div className="mt-4 bg-wine-50 border border-wine-100 rounded-[var(--radius)] px-5 py-4 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-2xl font-bold text-wine">3 €</span>
                <span className="text-text-secondary text-sm ml-2">par e-label</span>
              </div>
              <div className="flex gap-4 text-xs text-text-secondary">
                <span>Paiement unique</span>
                <span>·</span>
                <span>QR code inclus</span>
                <span>·</span>
                <span>Page hébergée à vie</span>
              </div>
            </div>
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
