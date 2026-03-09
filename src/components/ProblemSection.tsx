import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const painPoints = [
  {
    icon: "⏱️",
    title: "40 heures de travail",
    description:
      "30 min par fiche × 80 références = 40 heures perdues à copier-coller et reformater.",
  },
  {
    icon: "📄",
    title: "Des fiches qui ne vendent pas",
    description:
      "Des fiches Word basiques qui ne donnent pas envie d'acheter. Vos vins méritent mieux.",
  },
  {
    icon: "🔄",
    title: "Un catalogue jamais à jour",
    description:
      "Un catalogue jamais à jour, des commerciaux qui improvisent devant les clients.",
  },
];

export default function ProblemSection() {
  return (
    <SectionWrapper id={SECTION_IDS.problem} bgColor="surface">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-16 font-serif">
        Vos fiches techniques vous coûtent{" "}
        <span className="text-wine">du temps et des ventes</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {painPoints.map((point) => (
          <div
            key={point.title}
            className="bg-accent rounded-[var(--radius)] p-8 text-center shadow-[var(--shadow-card)] border border-border"
          >
            <div className="text-4xl mb-4">{point.icon}</div>
            <h3 className="text-xl font-semibold text-text mb-3">
              {point.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">
              {point.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
