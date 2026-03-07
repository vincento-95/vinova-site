"use client";

import { useState } from "react";
import ScrollLink from "./ScrollLink";
import { AGENCY_NAME, SECTION_IDS } from "@/lib/constants";

const navLinks = [
  { label: "Problème", href: `#${SECTION_IDS.problem}` },
  { label: "Solution", href: `#${SECTION_IDS.beforeAfter}` },
  { label: "Méthode", href: `#${SECTION_IDS.howItWorks}` },
  { label: "Tarifs", href: `#${SECTION_IDS.pricing}` },
  { label: "Contact", href: `#${SECTION_IDS.contact}` },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream/90 backdrop-blur-sm border-b border-gray-200/50">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
        <ScrollLink
          href={`#${SECTION_IDS.hero}`}
          className="text-lg font-semibold text-wine"
        >
          {AGENCY_NAME}
        </ScrollLink>

        {/* Desktop nav */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href}
              className="text-sm text-gray-600 hover:text-wine transition-colors"
            >
              {link.label}
            </ScrollLink>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="md:hidden p-2 text-gray-600 hover:text-wine transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu de navigation"
        >
          {mobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-cream/95 backdrop-blur-sm border-b border-gray-200/50 px-6 pb-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="text-sm text-gray-600 hover:text-wine transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
