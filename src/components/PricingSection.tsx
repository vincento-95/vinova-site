import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

const plans = [
  {
    name: "Fiche à l'unité",
    price: "1 €",
    priceSuffix: "/fiche",
    badge: "Pour tester",
    style: "default" as const,
    features: [
      "1 fiche technique PDF",
      "Dégustation IA structurée",
      "Accords mets-vins",
      "Téléchargement immédiat",
    ],
    cta: "Générer une fiche",
    ctaHref: `#${SECTION_IDS.contact}`,
  },
  {
    name: "Standard",
    price: "790 €",
    priceSuffix: "/mois HT",
    badge: "Le plus populaire",
    style: "highlighted" as const,
    features: [
      "Fiches illimitées",
      "Mise en page brandée (votre logo, vos couleurs)",
      "Dégustation + accords + service + garde",
      "Mises à jour incluses",
      "Support prioritaire",
    ],
    setup: "Setup initial : 490 €",
    cta: "Demander mes 5 fiches gratuites",
    ctaHref: `#${SECTION_IDS.contactForm}`,
  },
  {
    name: "Premium",
    price: "1 190 €",
    priceSuffix: "/mois HT",
    badge: "Pour les exportateurs",
    style: "premium" as const,
    features: [
      "Tout le Standard +",
      "Catalogue PDF automatisé",
      "Emails de prospection personnalisés",
      "Traduction EN / IT / ES",
    ],
    setup: "Setup initial : 490 €",
    cta: "Demander mes 5 fiches gratuites",
    ctaHref: `#${SECTION_IDS.contactForm}`,
  },
];

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
    <section id={SECTION_IDS.pricing} className="py-20 md:py-28 px-6 bg-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
          Un investissement, <span className="text-wine">pas une dépense</span>
        </h2>
        <p className="text-center text-text-secondary mb-14 max-w-xl mx-auto">
          Choisissez la formule qui correspond à votre activité.
        </p>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          {plans.map((plan) => {
            const isHighlighted = plan.style === "highlighted";
            const isPremium = plan.style === "premium";

            return (
              <div
                key={plan.name}
                className={`rounded-[var(--radius-lg)] p-8 flex flex-col h-full transition-all duration-300 hover:scale-[1.02] ${
                  isHighlighted
                    ? "bg-surface border-2 border-wine shadow-[0_8px_40px_rgba(114,47,55,0.25)] relative md:-mt-4 md:mb-0 md:py-10 scale-[1.01] hover:shadow-[0_12px_48px_rgba(114,47,55,0.35)]"
                    : "bg-surface border border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-card-lg)]"
                }`}
              >
                {/* Badge */}
                <span
                  className={`inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                    isHighlighted
                      ? "bg-wine text-white"
                      : "bg-primary-light text-wine"
                  }`}
                >
                  {plan.badge}
                </span>

                <h3 className="text-xl font-semibold mb-2 font-serif text-text">
                  {plan.name}
                </h3>

                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-text">{plan.price}</span>
                  <span className="text-sm text-text-secondary">
                    {plan.priceSuffix}
                  </span>
                </div>

                <ul className="space-y-3 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 text-wine">&#10003;</span>
                      <span className="text-text-secondary">{f}</span>
                    </li>
                  ))}
                </ul>

                {plan.setup && (
                  <p className="text-xs mb-4 text-text-secondary">
                    {plan.setup}
                  </p>
                )}

                <ScrollLink
                  href={plan.ctaHref}
                  className={`block text-center py-3.5 px-6 rounded-[var(--radius)] font-medium transition-colors ${
                    isHighlighted
                      ? "bg-wine text-white hover:bg-wine-dark text-base shadow-[var(--shadow-card)]"
                      : isPremium
                        ? "border-2 border-wine text-wine hover:bg-wine hover:text-white text-sm"
                        : "border border-border text-text-secondary hover:border-wine hover:text-wine text-sm"
                  }`}
                >
                  {plan.cta}
                </ScrollLink>
              </div>
            );
          })}
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
            Vinova vous coûte <span className="font-bold text-wine">790 €/mois</span> pour des fiches illimitées.
          </p>
        </div>
      </div>
    </section>
  );
}
