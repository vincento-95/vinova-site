"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const improvements = [
  "Dégustation structurée : oeil, nez, bouche",
  "Accords mets-vins développés",
  "Température de service précise",
  "Potentiel de garde",
  "Mise en page professionnelle avec votre logo",
];

function ComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(80);
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto-slide animation when section comes into view
  useEffect(() => {
    if (!containerRef.current || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          setTimeout(() => {
            const start = 80;
            const end = 50;
            const duration = 1200;
            const startTime = performance.now();

            function animate(currentTime: number) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Ease out cubic
              const eased = 1 - Math.pow(1 - progress, 3);
              setSliderPos(start + (end - start) * eased);
              if (progress < 1) requestAnimationFrame(animate);
            }
            requestAnimationFrame(animate);
          }, 500);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasAnimated]);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
    setHasAnimated(true);
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
          src="/fiche-exemple.png"
          alt="Fiche technique IA FicheVin - après"
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
        className="absolute top-0 bottom-0 w-1 bg-wine/80 shadow-lg z-20 pointer-events-none"
        style={{ left: `${sliderPos}%`, transform: "translateX(-50%)" }}
      >
        {/* Handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-wine rounded-full shadow-xl flex items-center justify-center gap-1 animate-pulse-slow">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gray-900/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
        <svg className="w-3.5 h-3.5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
        Avant
      </div>
      <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-wine/90 text-white text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full z-10">
        <svg className="w-3.5 h-3.5 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
        Après — FicheVin
      </div>

      {/* Hidden range input for accessibility */}
      <input
        type="range"
        min={0}
        max={100}
        value={sliderPos}
        onChange={(e) => { setSliderPos(Number(e.target.value)); setHasAnimated(true); }}
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
        <h3 className="text-lg font-semibold text-text mb-4 font-serif">Ce qui change avec FicheVin :</h3>
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
