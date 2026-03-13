"use client";

import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const testimonials = [
  {
    flag: "\uD83C\uDDEB\uD83C\uDDF7",
    profile: "Importateur bordelais",
    refs: "650 références",
    scoreBefore: 6.2,
    scoreAfter: 8.5,
    result:
      "Fiches générées pour 5 vins test en moins de 3 minutes. Accords mets-vins développés, dégustation structurée \u0153il/nez/bouche, notes presse intégrées.",
  },
  {
    flag: "\uD83C\uDDEE\uD83C\uDDF9",
    profile: "Distributeur italien",
    refs: "500 références",
    scoreBefore: 2,
    scoreAfter: 8,
    result:
      "Aucune fiche technique existante, uniquement des pages e-commerce. 5 fiches PDF professionnelles créées de zéro avec branding.",
  },
  {
    flag: "\uD83C\uDDEB\uD83C\uDDF7",
    profile: "Négociant parisien",
    refs: "200 références",
    scoreBefore: 6,
    scoreAfter: 8.5,
    result:
      "Accords mets-vins enrichis, dégustations restructurées, intégration du logo. Des fiches qui donnent envie d\u2019acheter.",
  },
];

function ScoreBar({ before, after }: { before: number; after: number }) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-text-secondary">
          <span className="font-bold text-gray-400">{before}/10</span>
        </span>
        <svg className="w-4 h-4 text-wine mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
        <span className="font-bold text-wine text-lg">{after}/10</span>
      </div>
      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-gray-300 rounded-full"
          style={{ width: `${(before / 10) * 100}%` }}
        />
        <div
          className="absolute inset-y-0 left-0 bg-wine rounded-full transition-all duration-700"
          style={{ width: `${(after / 10) * 100}%` }}
        />
      </div>
    </div>
  );
}

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
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{t.flag}</span>
              <div>
                <p className="text-sm font-semibold text-text">{t.profile}</p>
                <p className="text-xs text-text-secondary">{t.refs}</p>
              </div>
            </div>

            <ScoreBar before={t.scoreBefore} after={t.scoreAfter} />

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
