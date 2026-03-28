"use client";

import { useState } from "react";
import ContactFormSection from "./ContactFormSection";
import ContactSection from "./ContactSection";

const TABS = [
  { id: "free", label: "5 fiches gratuites" },
  { id: "paid", label: "Fiche à 9 €" },
];

export default function FormCarousel() {
  const [activeTab, setActiveTab] = useState("free");

  return (
    <div>
      {/* Tab navigation */}
      <div className="flex justify-center gap-4 px-6 py-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-8 py-4 rounded-[var(--radius)] text-base font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-wine text-white shadow-lg scale-105"
                : "bg-white text-text border-2 border-border hover:border-wine/40 hover:text-wine"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: activeTab === "free" ? "translateX(0)" : "translateX(-100%)" }}
        >
          <div className="w-full flex-shrink-0">
            <ContactFormSection />
          </div>
          <div className="w-full flex-shrink-0">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
}
