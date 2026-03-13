import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const testimonials = [
  {
    profile: "Un importateur bordelais, 650 références",
    result:
      "Fiches techniques générées pour 5 vins test en moins de 3 minutes. Note qualité : 8.5/10 vs 6.2/10 pour leurs fiches existantes.",
    icon: (
      <svg className="w-6 h-6 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 0-.008.008" />
      </svg>
    ),
  },
  {
    profile: "Un distributeur italien, 500 références",
    result:
      "Aucune fiche technique existante — uniquement des pages e-commerce. 5 fiches PDF professionnelles créées de zéro.",
    icon: (
      <svg className="w-6 h-6 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
      </svg>
    ),
  },
  {
    profile: "Un négociant parisien, 200 références",
    result:
      "Amélioration des accords mets-vins, structuration des dégustations, intégration du branding. Résultat : des fiches qui donnent envie d'acheter.",
    icon: (
      <svg className="w-6 h-6 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
      </svg>
    ),
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper id={SECTION_IDS.testimonials} bgColor="surface">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Ils nous font <span className="text-wine">confiance</span>
      </h2>
      <p className="text-center text-text-secondary mb-14 max-w-xl mx-auto">
        Résultats obtenus lors de nos audits de fiches techniques.
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        {testimonials.map((t) => (
          <div
            key={t.profile}
            className="bg-accent rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)] border border-border flex flex-col"
          >
            <div className="w-12 h-12 bg-primary-light rounded-full flex items-center justify-center mb-5">
              {t.icon}
            </div>
            <p className="text-sm font-semibold text-wine mb-3">{t.profile}</p>
            <p className="text-text-secondary leading-relaxed text-sm flex-1">
              &ldquo;{t.result}&rdquo;
            </p>
          </div>
        ))}
      </div>

      <p className="text-center text-text-secondary text-sm mt-10">
        Résultats obtenus lors de nos audits de fiches techniques. Demandez le vôtre gratuitement.
      </p>
    </SectionWrapper>
  );
}
