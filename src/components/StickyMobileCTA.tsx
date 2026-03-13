"use client";

import { useState, useEffect } from "react";
import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

export default function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const hero = document.getElementById(SECTION_IDS.hero);
      const contactForm = document.getElementById(SECTION_IDS.contactForm);

      if (!hero || !contactForm) return;

      const heroBottom = hero.getBoundingClientRect().bottom;
      const contactTop = contactForm.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Show after hero is scrolled past, hide when contact form is in view
      setVisible(heroBottom < 0 && contactTop > windowHeight * 0.5);
    }

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-3 bg-white/95 backdrop-blur-sm border-t border-border">
      <ScrollLink
        href={`#${SECTION_IDS.contactForm}`}
        className="block text-center bg-wine hover:bg-wine-dark text-white py-3 rounded-[var(--radius)] font-medium transition-colors text-sm"
      >
        5 fiches gratuites &rarr;
      </ScrollLink>
    </div>
  );
}
