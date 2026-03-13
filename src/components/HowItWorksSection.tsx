import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const steps = [
  {
    step: "1",
    title: "Envoyez-nous votre liste de vins",
    description:
      "Un simple Excel ou copier-coller suffit : nom, domaine, cépage, appellation. Même incomplet, on s'adapte.",
    icon: (
      <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
      </svg>
    ),
  },
  {
    step: "2",
    title: "Notre IA génère vos fiches",
    description:
      "Dégustation, accords, mise en page brandée avec votre logo. Chaque fiche est unique — jamais de copier-coller entre deux vins.",
    icon: (
      <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    step: "3",
    title: "Validez et distribuez",
    description:
      "Vous recevez vos fiches PDF prêtes à envoyer. Vos commerciaux ont enfin des outils qui vendent.",
    icon: (
      <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
];

export default function HowItWorksSection() {
  return (
    <SectionWrapper id={SECTION_IDS.howItWorks} bgColor="surface">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        3 étapes, <span className="text-wine">zéro effort</span>
      </h2>
      <p className="text-center text-text-secondary mb-16 max-w-xl mx-auto">
        De votre liste de vins à des fiches professionnelles prêtes à distribuer.
      </p>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((s) => (
          <div key={s.step} className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-6">
              {s.icon}
            </div>
            <div className="text-sm font-bold text-wine uppercase tracking-wider mb-2">
              Étape {s.step}
            </div>
            <h3 className="text-xl font-semibold text-text mb-3">
              {s.title}
            </h3>
            <p className="text-text-secondary leading-relaxed text-sm">{s.description}</p>
          </div>
        ))}
      </div>

      {/* Video placeholder */}
      <div className="mt-16 max-w-xl mx-auto">
        <div className="relative bg-gradient-to-br from-[#2d2d2d] to-[#1a1a1a] rounded-[var(--radius-lg)] overflow-hidden" style={{ aspectRatio: "16/9" }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white/80">
            <div className="w-16 h-16 bg-wine/80 rounded-full flex items-center justify-center mb-4 hover:bg-wine transition-colors">
              <svg className="w-7 h-7 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <p className="text-sm font-medium">Voir Vinova en action</p>
            <p className="text-xs text-white/50 mt-1">Démo disponible bientôt</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
