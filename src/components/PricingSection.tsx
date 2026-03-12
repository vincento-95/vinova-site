import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

const features = [
  "Fiche PDF professionnelle",
  "Données complétées automatiquement",
  "Téléchargement immédiat",
  "Sans abonnement ni engagement",
];

export default function PricingSection() {
  return (
    <section
      id={SECTION_IDS.pricing}
      className="py-24 px-6 bg-bg"
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
          Un prix <span className="text-wine">simple et transparent</span>
        </h2>
        <p className="text-center text-text-secondary mb-16">
          Payez uniquement ce que vous utilisez. Sans engagement.
        </p>
        <div className="max-w-md mx-auto bg-wine text-white rounded-[var(--radius-lg)] p-10 shadow-[var(--shadow-card-lg)] text-center">
          <h3 className="text-xl font-semibold mb-2 font-serif">
            Par fiche technique
          </h3>
          <div className="flex items-baseline justify-center gap-1 mb-8">
            <span className="text-6xl font-bold">1 €</span>
            <span className="text-white/70 text-sm">/fiche</span>
          </div>
          <ul className="space-y-3 mb-8 text-left">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-2">
                <span className="mt-0.5 text-white/80">✓</span>
                <span className="text-white/90">{f}</span>
              </li>
            ))}
          </ul>
          <ScrollLink
            href={`#${SECTION_IDS.contact}`}
            className="block text-center py-3 px-6 rounded-[var(--radius)] font-medium transition-colors bg-white text-wine hover:bg-accent"
          >
            Générer ma fiche maintenant
          </ScrollLink>
        </div>
      </div>
    </section>
  );
}
