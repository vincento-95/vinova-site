import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

const plans = [
  {
    name: "Fiche à l'unité",
    price: "1 €",
    priceSuffix: "/fiche",
    badge: "Pour tester",
    highlighted: false,
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
    highlighted: true,
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
    highlighted: false,
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
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-[var(--radius-lg)] p-8 flex flex-col h-full ${
                plan.highlighted
                  ? "bg-wine text-white border-2 border-wine shadow-[var(--shadow-card-lg)] relative md:-mt-4 md:mb-0 md:py-10"
                  : "bg-surface border border-border shadow-[var(--shadow-card)]"
              }`}
            >
              {/* Badge */}
              <span
                className={`inline-block self-start text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 ${
                  plan.highlighted
                    ? "bg-white/20 text-white"
                    : "bg-primary-light text-wine"
                }`}
              >
                {plan.badge}
              </span>

              <h3 className={`text-xl font-semibold mb-2 font-serif ${plan.highlighted ? "" : "text-text"}`}>
                {plan.name}
              </h3>

              <div className="flex items-baseline gap-1 mb-6">
                <span className={`text-4xl font-bold ${plan.highlighted ? "" : "text-text"}`}>{plan.price}</span>
                <span className={`text-sm ${plan.highlighted ? "text-white/70" : "text-text-secondary"}`}>
                  {plan.priceSuffix}
                </span>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <span className={`mt-0.5 ${plan.highlighted ? "text-white/80" : "text-wine"}`}>&#10003;</span>
                    <span className={plan.highlighted ? "text-white/90" : "text-text-secondary"}>{f}</span>
                  </li>
                ))}
              </ul>

              {plan.setup && (
                <p className={`text-xs mb-4 ${plan.highlighted ? "text-white/60" : "text-text-secondary"}`}>
                  {plan.setup}
                </p>
              )}

              <ScrollLink
                href={plan.ctaHref}
                className={`block text-center py-3 px-6 rounded-[var(--radius)] font-medium transition-colors text-sm ${
                  plan.highlighted
                    ? "bg-white text-wine hover:bg-accent"
                    : "bg-wine text-white hover:bg-wine-dark"
                }`}
              >
                {plan.cta}
              </ScrollLink>
            </div>
          ))}
        </div>

        {/* Encadré comparaison */}
        <div className="mt-12 max-w-3xl mx-auto bg-accent rounded-[var(--radius-lg)] p-6 md:p-8 border border-border text-center">
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
