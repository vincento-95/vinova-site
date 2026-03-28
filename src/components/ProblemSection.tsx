import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const painPoints = [
  {
    icon: (
      <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
    title: "Un temps précieux perdu\nen mise en page",
    description:
      "Vos équipes passent 30 minutes par fiche à copier-coller depuis Excel vers Word. Pour 80 références, c'est 40 heures de travail à faible valeur ajoutée.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
      </svg>
    ),
    title: "Des fiches qui ne font pas honneur à vos vins",
    description:
      "Des PDF Word sans mise en page, sans notes de dégustation structurées, sans accords mets-vins. Vos commerciaux présentent des documents qui ne donnent pas envie d'acheter.",
  },
  {
    icon: (
      <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
      </svg>
    ),
    title: "Un catalogue impossible à maintenir",
    description:
      "Nouveau millésime ? Nouveau domaine ? Changement de prix ? Mettre à jour 200 fiches à la main, c'est le projet que tout le monde repousse.",
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper id={SECTION_IDS.problem} bgColor="surface">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Ce qui vous coûte des ventes{" "}
        <span className="text-wine">aujourd&apos;hui</span>
      </h2>
      <p className="text-center text-text-secondary mb-14 max-w-2xl mx-auto">
        Chaque jour sans fiches professionnelles, c&apos;est du chiffre d&apos;affaires qui passe à côté.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {painPoints.map((point) => (
          <div
            key={point.title}
            className="bg-accent rounded-[var(--radius-lg)] p-8 shadow-[var(--shadow-card)] border border-border text-center"
          >
            <div className="w-14 h-14 bg-primary-light rounded-full flex items-center justify-center mb-5 mx-auto">
              {point.icon}
            </div>
            <h3 className="text-lg font-semibold text-text mb-3 whitespace-pre-line">
              {point.title}
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm text-justify">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
