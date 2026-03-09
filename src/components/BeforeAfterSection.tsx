"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const highlights = [
  {
    before: "Fiche Word générique sans mise en forme",
    after: "Fiche PDF brandée avec votre identité",
  },
  {
    before: "Données copiées-collées, erreurs fréquentes",
    after: "Données structurées et vérifiées par l'IA",
  },
  {
    before: "Mise en page manuelle, résultat inégal",
    after: "Design professionnel et cohérent",
  },
];

export default function BeforeAfterSection() {
  return (
    <SectionWrapper id={SECTION_IDS.beforeAfter} bgColor="bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Le même vin.{" "}
        <span className="text-wine">Deux présentations.</span>
      </h2>
      <p className="text-center text-text-secondary mb-12">
        Comparez la version classique et la version générée par notre IA.
      </p>

      {/* Comparatif visuel */}
      <div className="grid md:grid-cols-2 gap-6 mb-12 max-w-5xl mx-auto">
        {/* Avant */}
        <div className="relative">
          <div className="absolute -top-3 left-4 bg-gray-400 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
            Avant
          </div>
          <div className="border-2 border-gray-300 rounded-xl overflow-hidden shadow-sm bg-white opacity-80">
            <Image
              src="/fiche-avant.png"
              alt="Fiche technique classique - avant"
              width={800}
              height={1100}
              className="w-full h-auto"
            />
          </div>
        </div>

        {/* Après */}
        <div className="relative">
          <div className="absolute -top-3 left-4 bg-wine text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full z-10">
            Après — Version IA
          </div>
          <div className="border-2 border-wine/30 rounded-xl overflow-hidden shadow-lg">
            <Image
              src="/fiche-apres.png"
              alt="Fiche technique IA Vinova - après"
              width={800}
              height={1100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>

      {/* Points clés */}
      <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        {highlights.map((h, i) => (
          <div key={i} className="text-center">
            <div className="text-text-secondary text-sm line-through mb-2">
              {h.before}
            </div>
            <div className="text-wine font-semibold text-sm">
              {h.after}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
