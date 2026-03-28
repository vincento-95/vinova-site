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
      <div className="flex justify-center gap-2 px-6 -mb-20 md:-mb-28 pt-10 relative z-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? "bg-wine text-white shadow-md"
                : "bg-white text-text-secondary border border-border hover:border-wine/30 hover:text-wine"
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
