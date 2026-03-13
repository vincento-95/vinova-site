"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const faqs = [
  {
    question: "Comment fonctionne l'IA pour les notes de dégustation ?",
    answer:
      "Notre IA s'appuie sur les caractéristiques du cépage, de l'appellation et du millésime pour générer des notes de dégustation structurées (oeil, nez, bouche). Chaque fiche est unique. Vous validez et ajustez avant diffusion.",
  },
  {
    question: "Mes données sont-elles en sécurité ?",
    answer:
      "Oui. Vos données (liste de vins, logo, prix) sont stockées de manière sécurisée et ne sont jamais partagées. Nous ne revendons rien.",
  },
  {
    question: "Et si le résultat ne me plaît pas ?",
    answer:
      "C'est pour ça qu'on offre 5 fiches gratuites : vous jugez sur pièce avant de vous engager. Si une fiche ne convient pas, on la refait.",
  },
  {
    question: "Combien de temps pour recevoir mes fiches ?",
    answer:
      "La fiche à l'unité est instantanée. Pour un lot de 5 fiches test, comptez 24h. Pour un portefeuille complet, 3 à 5 jours ouvrés.",
  },
  {
    question: "Est-ce que ça marche pour les vins étrangers ?",
    answer:
      "Absolument. Notre IA couvre les vins français et internationaux. Nous gérons aussi la traduction en anglais, italien et espagnol (pack Premium).",
  },
  {
    question: "490 €/mois, c'est cher pour des fiches techniques.",
    answer:
      "Comparez avec le coût actuel : 30 min par fiche \u00d7 80 références = 40h de travail. Ou un graphiste à 30-50 €/fiche. Vinova est rentabilisé dès le premier mois.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="w-full flex items-center justify-between py-5 text-left gap-4 group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-medium text-text group-hover:text-wine transition-colors">
          {question}
        </span>
        <svg
          className={`w-5 h-5 text-text-secondary flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      {open && (
        <div className="pb-5 pr-8">
          <p className="text-text-secondary leading-relaxed text-sm">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <SectionWrapper id={SECTION_IDS.faq} bgColor="bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-14 font-serif">
        Questions <span className="text-wine">fréquentes</span>
      </h2>
      <div className="max-w-3xl mx-auto">
        {faqs.map((faq) => (
          <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </SectionWrapper>
  );
}
