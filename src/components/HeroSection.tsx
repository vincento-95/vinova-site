import Image from "next/image";
import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="relative px-6 pt-28 pb-20 md:pt-36 md:pb-28 bg-bg overflow-hidden"
    >
      <div className="mx-auto max-w-6xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text leading-tight font-serif">
            Importateurs, négociants : vos fiches techniques vin générées en{" "}
            <span className="text-wine">30 secondes</span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-xl mx-auto lg:mx-0">
            Vos commerciaux méritent des fiches qui vendent. Notre IA génère des fiches techniques professionnelles avec dégustation, accords mets-vins et mise en page brandée. Testez gratuitement sur 5 de vos vins.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ScrollLink
              href={`#${SECTION_IDS.contactForm}`}
              className="inline-block bg-wine hover:bg-wine-dark text-white px-7 py-3.5 rounded-[var(--radius)] text-base font-medium transition-colors shadow-[var(--shadow-card)] text-center"
            >
              Demander mes 5 fiches gratuites
            </ScrollLink>
            <ScrollLink
              href={`#${SECTION_IDS.beforeAfter}`}
              className="inline-block border-2 border-wine text-wine hover:bg-wine hover:text-white px-7 py-3.5 rounded-[var(--radius)] text-base font-medium transition-colors text-center"
            >
              Voir un exemple
            </ScrollLink>
          </div>
          <p className="mt-6 text-sm text-text-secondary">
            <span className="text-wine">&#10003;</span> Sans engagement &middot;{" "}
            <span className="text-wine">&#10003;</span> Résultat en 24h &middot;{" "}
            <span className="text-wine">&#10003;</span> Compatible avec votre charte graphique
          </p>
        </div>

        {/* Right mockup */}
        <div className="flex-shrink-0 w-full max-w-sm lg:max-w-md">
          <div className="relative rounded-xl shadow-[var(--shadow-card-lg)] overflow-hidden border border-border bg-white">
            <Image
              src="/fiche-apres.png"
              alt="Exemple de fiche technique vin générée par FicheVin"
              width={800}
              height={1100}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
