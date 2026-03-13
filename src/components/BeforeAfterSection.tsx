"use client";

import { useState, useRef, useCallback } from "react";
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

function ComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative max-w-3xl mx-auto rounded-xl overflow-hidden shadow-[var(--shadow-card-lg)] border border-border select-none cursor-col-resize bg-white"
      style={{ aspectRatio: "3/4" }}
      onMouseMove={(e) => e.buttons === 1 && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After image (background) */}
      <div className="absolute inset-0 p-4 flex items-center justify-center">
        <Image
          src="/fiche-apres.png"
          alt="Fiche technique IA Vinova - après"
          fill
          className="object-contain p-4"
          draggable={false}
        />
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
      >
        <Image
          src="/fiche-avant.png"
          alt="Fiche technique classique - avant"
          fill
          className="object-contain p-4"
          draggable={false}
        />
      </div>

      {/* Slider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center">
          <span className="text-gray-500 text-sm font-bold">&lsaquo;&rsaquo;</span>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 bg-gray-800/70 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded z-10">
        Avant
      </div>
      <div className="absolute top-3 right-3 bg-wine/90 text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded z-10">
        Après — Vinova
      </div>

      {/* Hidden range input for accessibility */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPos}
        onChange={(e) => setSliderPos(Number(e.target.value))}
        className="absolute inset-0 w-full h-full opacity-0 cursor-col-resize z-30"
        aria-label="Comparer avant et après"
      />
    </div>
  );
}

export default function BeforeAfterSection() {
  return (
    <SectionWrapper id={SECTION_IDS.beforeAfter} bgColor="bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Le même vin.{" "}
        <span className="text-wine">Deux présentations.</span>
      </h2>
      <p className="text-center text-text-secondary mb-12">
        Faites glisser le curseur pour voir la transformation.
      </p>

      {/* Slider de comparaison */}
      <div className="mb-14">
        <ComparisonSlider />
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
