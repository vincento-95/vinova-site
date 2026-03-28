import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

const guarantees = [
  {
    text: "Satisfait ou refait —\nToute fiche qui ne vous convient pas est corrigée gratuitement",
  },
  {
    text: "Paiement unique — Pas d'abonnement, pas de frais cachés",
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

        {/* 3 colonnes */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">

          {/* Offre 1 — Fiche à l'unité */}
          <div className="bg-surface border border-border shadow-[var(--shadow-card)] rounded-[var(--radius-lg)] p-7 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card-lg)]">
            <span className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-primary-light text-wine">
              À l&apos;unité
            </span>

            <h3 className="text-lg font-semibold mb-2 font-serif text-text">
              Fiche à l&apos;unité
            </h3>

            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-4xl font-bold text-text">9 €</span>
              <span className="text-sm text-text-secondary">/fiche</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                "Template standard FicheVin",
                "Pas de personnalisation",
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
              className="block text-center py-3 px-6 rounded-[var(--radius)] font-medium transition-colors border-2 border-wine text-wine hover:bg-wine hover:text-white text-sm"
            >
              Générer une fiche
            </ScrollLink>
          </div>

          {/* Offre 2 — Pack Pro */}
          <div className="bg-surface border-2 border-wine shadow-[0_8px_40px_rgba(114,47,55,0.25)] rounded-[var(--radius-lg)] p-7 md:py-9 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(114,47,55,0.35)]">
            <span className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-wine text-white">
              Le plus populaire
            </span>

            <h3 className="text-lg font-semibold mb-2 font-serif text-text">
              Pack Pro
            </h3>

            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-4xl font-bold text-text">249 €</span>
              <span className="text-sm text-text-secondary">HT</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                "50 fiches incluses",
                "Votre logo + vos couleurs",
                "Template personnalisé",
                "Livraison 48h",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-wine">&#10003;</span>
                  <span className="text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-text-secondary mb-4">
              Fiches supplémentaires : <span className="font-semibold text-text">5 €/fiche</span>
            </p>

            <ScrollLink
              href={`#${SECTION_IDS.contactForm}`}
              className="block text-center py-3.5 px-6 rounded-[var(--radius)] font-medium transition-colors bg-wine text-white hover:bg-wine-dark text-base shadow-[var(--shadow-card)]"
            >
              Demander mes 5 fiches gratuites
            </ScrollLink>
          </div>

          {/* Offre 3 — Pack Premium */}
          <div className="bg-surface border border-border shadow-[var(--shadow-card)] rounded-[var(--radius-lg)] p-7 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[var(--shadow-card-lg)]">
            <span className="inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 bg-accent text-text">
              Premium
            </span>

            <h3 className="text-lg font-semibold mb-2 font-serif text-text">
              Pack Premium
            </h3>

            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-4xl font-bold text-text">449 €</span>
              <span className="text-sm text-text-secondary">HT</span>
            </div>

            <ul className="space-y-3 mb-6 flex-1">
              {[
                "100 fiches incluses",
                "Tout le Pack Pro inclus",
                "Traduction EN incluse",
                "Mises à jour millésime pendant 12 mois",
                "Support prioritaire",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm">
                  <span className="mt-0.5 text-wine">&#10003;</span>
                  <span className="text-text-secondary">{f}</span>
                </li>
              ))}
            </ul>

            <p className="text-xs text-text-secondary mb-4">
              Fiches supplémentaires : <span className="font-semibold text-text">4 €/fiche</span>
            </p>

            <ScrollLink
              href={`#${SECTION_IDS.contactForm}`}
              className="block text-center py-3 px-6 rounded-[var(--radius)] font-medium transition-colors border-2 border-wine text-wine hover:bg-wine hover:text-white text-sm"
            >
              Demander un devis
            </ScrollLink>
          </div>
        </div>

        {/* Bandeau garantie */}
        <div className="mt-10 max-w-5xl mx-auto bg-wine-50 rounded-[var(--radius-lg)] p-6 md:p-8 border border-wine-100">
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {guarantees.map((g) => (
              <div key={g.text} className="flex items-start gap-2 text-sm text-text">
                <span className="text-green-600 font-bold mt-0.5 flex-shrink-0">&#10003;</span>
                <span className="whitespace-pre-line">{g.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Encadré comparaison */}
        <div className="mt-8 max-w-4xl mx-auto bg-accent rounded-[var(--radius-lg)] p-6 md:p-8 border border-border text-center">
          <p className="text-text leading-relaxed">
            <span className="font-semibold">Comparez :</span> un graphiste freelance facture 30-50 € par fiche.
            Pour 100 fiches, c&apos;est 3 000 à 5 000 €.<br />
            Le Pack Pro FicheVin : <span className="font-bold text-wine">249 € HT</span> pour 50 fiches brandées, livrées sous 48h.
          </p>
        </div>
      </div>
    </section>
  );
}
