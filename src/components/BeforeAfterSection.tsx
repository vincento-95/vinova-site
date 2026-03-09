import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const comparisons = [
  {
    before: "Fiche Word générique sans mise en forme",
    after: "Fiche PDF brandée avec votre logo",
  },
  {
    before: "Données copiées-collées, erreurs fréquentes",
    after: "Données structurées et vérifiées par l'IA",
  },
  {
    before: "Mise en page manuelle, résultat inégal",
    after: "Design professionnel et cohérent",
  },
];

export default function BeforeAfterSection() {
  return (
    <SectionWrapper id={SECTION_IDS.beforeAfter} bgColor="bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Le même vin.{" "}
        <span className="text-wine">Deux présentations.</span>
      </h2>
      <p className="text-center text-text-secondary mb-16">
        Comparez la version classique et la version générée par notre IA.
      </p>
      <div className="space-y-8">
        {comparisons.map((comp, i) => (
          <div key={i} className="grid md:grid-cols-2 gap-4">
            {/* Avant */}
            <div className="bg-border/50 rounded-[var(--radius)] h-48 flex flex-col items-center justify-center px-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-2">
                Avant
              </span>
              <span className="text-text-secondary font-medium text-center">
                {comp.before}
              </span>
            </div>
            {/* Après */}
            <div className="bg-sheet rounded-[var(--radius)] h-48 flex flex-col items-center justify-center px-6 border-2 border-wine/20 shadow-[var(--shadow-card)]">
              <span className="text-xs font-semibold uppercase tracking-wider text-wine mb-2">
                Après — Version IA
              </span>
              <span className="text-wine-dark font-medium text-center">
                {comp.after}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
