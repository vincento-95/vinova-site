import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";
import UploadIcon from "./icons/UploadIcon";
import LightningIcon from "./icons/LightningIcon";
import DocumentIcon from "./icons/DocumentIcon";

const steps = [
  {
    Icon: UploadIcon,
    step: "1",
    title: "Envoyez-moi votre liste de vins",
    description:
      "Transmettez votre catalogue existant, dans n'importe quel format : Excel, PDF, ou même un simple email.",
  },
  {
    Icon: LightningIcon,
    step: "2",
    title: "L'IA génère vos fiches en 30 secondes",
    description:
      "Notre moteur analyse, structure et met en forme chaque fiche avec les informations clés de chaque vin.",
  },
  {
    Icon: DocumentIcon,
    step: "3",
    title: "Recevez vos PDF prêts à envoyer",
    description:
      "Des fiches techniques professionnelles, aux couleurs de votre marque, prêtes à transmettre à vos clients.",
  },
];

export default function HowItWorksSection() {
  return (
    <SectionWrapper id={SECTION_IDS.howItWorks} bgColor="surface">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-16 font-serif">
        3 étapes, <span className="text-wine">zéro effort</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-12">
        {steps.map((s) => (
          <div key={s.step} className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mb-6">
              <s.Icon className="w-8 h-8 text-wine" />
            </div>
            <div className="text-sm font-bold text-wine uppercase tracking-wider mb-2">
              Étape {s.step}
            </div>
            <h3 className="text-xl font-semibold text-text mb-3">
              {s.title}
            </h3>
            <p className="text-text-secondary leading-relaxed">{s.description}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
