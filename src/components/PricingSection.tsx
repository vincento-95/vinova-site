import SectionWrapper from "./SectionWrapper";
import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

const plans = [
  {
    name: "Pack Standard",
    price: "790",
    period: "/mois HT",
    features: [
      "Fiches techniques illimitées",
      "PDF brandé avec votre logo",
      "Mise à jour en temps réel",
      "Support par email",
    ],
    highlighted: false,
  },
  {
    name: "Pack Premium",
    price: "1 190",
    period: "/mois HT",
    features: [
      "Tout le Pack Standard",
      "Catalogue automatisé",
      "Emails de prospection personnalisés",
      "Traduction EN / IT / ES",
      "Support prioritaire",
    ],
    highlighted: true,
  },
];

export default function PricingSection() {
  return (
    <SectionWrapper id={SECTION_IDS.pricing} bgColor="bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Tarifs <span className="text-wine">simples et transparents</span>
      </h2>
      <p className="text-center text-text-secondary mb-16">
        Setup initial : 490 € — sans engagement de durée
      </p>
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-[var(--radius-lg)] p-8 md:p-10 ${
              plan.highlighted
                ? "bg-wine text-white shadow-[var(--shadow-card-lg)]"
                : "bg-surface border border-border shadow-[var(--shadow-card)]"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-2 font-serif ${
                plan.highlighted ? "text-white" : "text-text"
              }`}
            >
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-4xl font-bold">{plan.price} €</span>
              <span
                className={`text-sm ${
                  plan.highlighted ? "text-white/70" : "text-text-secondary"
                }`}
              >
                {plan.period}
              </span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <span
                    className={`mt-0.5 ${
                      plan.highlighted ? "text-white/80" : "text-wine"
                    }`}
                  >
                    ✓
                  </span>
                  <span
                    className={
                      plan.highlighted ? "text-white/90" : "text-text-secondary"
                    }
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>
            <ScrollLink
              href={`#${SECTION_IDS.contact}`}
              className={`block text-center py-3 px-6 rounded-[var(--radius)] font-medium transition-colors ${
                plan.highlighted
                  ? "bg-white text-wine hover:bg-accent"
                  : "bg-wine text-white hover:bg-wine-dark"
              }`}
            >
              Commencez par le test gratuit
            </ScrollLink>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
