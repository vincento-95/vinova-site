"use client";

import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const improvements = [
  "Dégustation structurée : oeil, nez, bouche",
  "4 accords mets-vins développés",
  "Température de service précise",
  "Potentiel de garde",
  "Mise en page professionnelle avec votre logo",
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
      <div className="grid md:grid-cols-2 gap-6 mb-14 max-w-5xl mx-auto items-end">
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

      {/* Liste des améliorations */}
      <div className="max-w-2xl mx-auto bg-accent rounded-[var(--radius-lg)] p-8 border border-border">
        <h3 className="text-lg font-semibold text-text mb-4 font-serif">Ce qui change avec Vinova :</h3>
        <ul className="space-y-3">
          {improvements.map((item) => (
            <li key={item} className="flex items-start gap-3 text-text-secondary">
              <span className="text-wine font-bold mt-0.5">&#10003;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </SectionWrapper>
  );
}
