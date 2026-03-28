"use client";

import { useState } from "react";
import ContactFormSection from "./ContactFormSection";
import ContactSection from "./ContactSection";

export default function FormCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative">
      {/* Left arrow */}
      {activeIndex > 0 && (
        <button
          onClick={() => setActiveIndex(0)}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white border border-border rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="Formulaire précédent"
        >
          <svg className="w-6 h-6 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

      {/* Right arrow */}
      {activeIndex < 1 && (
        <button
          onClick={() => setActiveIndex(1)}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 hover:bg-white border border-border rounded-full flex items-center justify-center shadow-lg transition-colors"
          aria-label="Formulaire suivant"
        >
          <svg className="w-6 h-6 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          <div className="w-full flex-shrink-0">
            <ContactFormSection />
          </div>
          <div className="w-full flex-shrink-0">
            <ContactSection />
          </div>
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-3 py-6">
        {[0, 1].map((i) => (
          <button
            key={i}
            onClick={() => setActiveIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              activeIndex === i ? "bg-wine scale-110" : "bg-border hover:bg-wine/40"
            }`}
            aria-label={i === 0 ? "5 fiches gratuites" : "Fiche à 9 €"}
          />
        ))}
      </div>
    </div>
  );
}
