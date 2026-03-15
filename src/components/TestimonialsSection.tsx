"use client";

import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const testimonials = [
  {
    flag: "🇫🇷",
    profile: "Importateur bordelais",
    refs: "650 références",
    scoreBefore: 6.2,
    scoreAfter: 8.5,
    result:
      "Fiches générées pour 5 vins test en moins de 3 minutes. Accords mets-vins développés, dégustation structurée oeil/nez/bouche, notes presse intégrées.",
  },
  {
    flag: "🇮🇹",
    profile: "Distributeur italien",
    refs: "500 références",
    scoreBefore: 2,
    scoreAfter: 8,
    result:
      "Aucune fiche technique existante, uniquement des pages e-commerce. 5 fiches PDF professionnelles créées de zéro avec branding.",
  },
  {
    flag: "🇫🇷",
    profile: "Négociant parisien",
    refs: "200 références",
    scoreBefore: 6,
    scoreAfter: 8.5,
    result:
      "Accords mets-vins enrichis, dégustations restructurées, intégration du logo. Des fiches qui donnent envie d'acheter.",
  },
];

export default function TestimonialsSection() {
  return (
    <SectionWrapper id={SECTION_IDS.testimonials} bgColor="bg">
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
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{t.flag}</span>
              <div>
                <p className="text-sm font-semibold text-text">{t.profile}</p>
                <p className="text-xs text-text-secondary">{t.refs}</p>
              </div>
            </div>

            {/* Score visuel */}
            <div className="flex items-center gap-2 my-3">
              <span className="text-2xl text-gray-400 line-through">{t.scoreBefore}</span>
              <span className="text-2xl text-text-secondary">&rarr;</span>
              <span className="text-3xl font-bold text-wine">{t.scoreAfter}/10</span>
            </div>

            <p className="text-text-secondary leading-relaxed text-sm flex-1 italic">
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
