import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

const guarantees = [
  {
    text: "Satisfait ou refait — Toute fiche qui ne vous convient pas est corrigée gratuitement",
  },
  {
    text: "Sans engagement — Résiliez quand vous voulez, pas de durée minimum",
  },
  {
    text: "Test gratuit — Jugez sur 5 fiches avant de vous engager",
  },
];

export default function PricingSection() {
  return (
    <section id={SECTION_IDS.pricing} className="py-20 md:py-28 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
          Un investissement, <span className="text-wine">pas une dépense</span>
        </h2>
        <p className="text-center text-text-secondary mb-14 max-w-xl mx-auto">
          Choisissez la formule qui correspond à votre activité.
        </p>

        {/* 2 colonnes — Abonnement en premier sur mobile */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto items-start">
          {/* Colonne Abonnement (principale) — affichée en premier sur mobile */}
          <div className="bg-surface border-2 border-wine shadow-[0_8px_40px_rgba(114,47,55,0.25)] rounded-[var(--radius-lg)] p-8 md:py-10 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(114,47,55,0.35)] order-1 md:order-2">
            <span className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-wine text-white">
              Le plus populaire
            </span>

            <h3 className="text-xl font-semibold mb-2 font-serif text-text">
              Abonnement
            </h3>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-text">490 €</span>
              <span className="text-sm text-text-secondary">/mois HT</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                "Fiches illimitées",
                "Mise en page brandée (votre logo, vos couleurs)",
                "Dégustation + accords + service + garde",
                "Traduction EN / IT / ES incluse",
                "Mises à jour incluses",
                "Support prioritaire",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-wine">&#10003;</span>
                  <span className="text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-text-secondary mb-4">
              Setup initial : <del className="text-text-secondary">490 €</del>{" "}
              <span className="text-green-600 font-semibold">Offert pour les 20 premiers clients</span>
            </p>

            <ScrollLink
              href={`#${SECTION_IDS.contactForm}`}
              className="block text-center py-3.5 px-6 rounded-[var(--radius)] font-medium transition-colors bg-wine text-white hover:bg-wine-dark text-base shadow-[var(--shadow-card)]"
            >
              Demander mes 5 fiches gratuites
            </ScrollLink>
          </div>

          {/* Colonne À l'unité */}
          <div className="bg-surface border border-border shadow-[var(--shadow-card)] rounded-[var(--radius-lg)] p-8 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card-lg)] order-2 md:order-1">
            <span className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-primary-light text-wine">
              À l&apos;unité
            </span>

            <h3 className="text-xl font-semibold mb-2 font-serif text-text">
              Fiche à l&apos;unité
            </h3>

            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-4xl font-bold text-text">9 €</span>
              <span className="text-sm text-text-secondary">/fiche</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                "1 fiche technique PDF",
                "Dégustation IA structurée",
                "Accords mets-vins développés",
                "Téléchargement immédiat",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-wine">&#10003;</span>
                  <span className="text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>

            <ScrollLink
              href={`#${SECTION_IDS.contact}`}
              className="block text-center py-3.5 px-6 rounded-[var(--radius)] font-medium transition-colors border-2 border-wine text-wine hover:bg-wine hover:text-white text-sm"
            >
              Générer une fiche
            </ScrollLink>
          </div>
        </div>

        {/* Bandeau garantie */}
        <div className="mt-10 max-w-4xl mx-auto bg-wine-50 rounded-[var(--radius-lg)] p-6 md:p-8 border border-wine-100">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {guarantees.map((g) => (
              <div key={g.text} className="flex items-start gap-2 text-sm text-text">
                <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                <span>{g.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Encadré comparaison */}
        <div className="mt-8 max-w-3xl mx-auto bg-accent rounded-[var(--radius-lg)] p-6 md:p-8 border border-border text-center">
          <p className="text-text leading-relaxed">
            <span className="font-semibold">Comparez :</span> un graphiste freelance facture 30-50 € par fiche.
            Pour 100 fiches, c&apos;est 3 000 à 5 000 €.
            Vinova vous coûte <span className="font-bold text-wine">490 €/mois</span> pour des fiches illimitées.
          </p>
        </div>
      </div>
    </section>
  );
}
