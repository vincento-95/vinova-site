"use client";

import { useState } from "react";
import Link from "next/link";
import ScrollLink from "./ScrollLink";
import { AGENCY_NAME, SECTION_IDS } from "@/lib/constants";

const navLinks = [
  { label: "Problème", href: `#${SECTION_IDS.problem}` },
  { label: "Solution", href: `#${SECTION_IDS.beforeAfter}` },
  { label: "Tarifs", href: `#${SECTION_IDS.pricing}` },
  { label: "Témoignages", href: `#${SECTION_IDS.testimonials}` },
  { label: "FAQ", href: `#${SECTION_IDS.faq}` },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[rgba(255,255,255,0.92)] backdrop-blur-[14px] border-b border-border">
      <nav className="mx-auto max-w-6xl flex items-center justify-between px-6 h-14">
        <ScrollLink
          href={`#${SECTION_IDS.hero}`}
          className="text-lg font-semibold text-wine font-serif"
        >
          {AGENCY_NAME}
        </ScrollLink>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => (
            <ScrollLink
              key={link.href}
              href={link.href}
              className="text-sm text-text-secondary hover:text-wine transition-colors"
            >
              {link.label}
            </ScrollLink>
          ))}
          <Link
            href="/e-label"
            className="text-sm text-text-secondary hover:text-wine transition-colors font-medium"
          >
            E-Label
          </Link>
          <Link
            href="/blog"
            className="text-sm text-text-secondary hover:text-wine transition-colors"
          >
            Blog
          </Link>
          <ScrollLink
            href={`#${SECTION_IDS.contactForm}`}
            className="ml-2 bg-wine hover:bg-wine-dark text-white px-5 py-2 rounded-[var(--radius)] text-sm font-medium transition-colors"
          >
            5 fiches gratuites
          </ScrollLink>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          className="lg:hidden p-2 text-text-secondary hover:text-wine transition-colors"
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
        <div className="lg:hidden bg-[rgba(255,255,255,0.95)] backdrop-blur-[14px] border-b border-border px-6 pb-4">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <ScrollLink
                key={link.href}
                href={link.href}
                className="text-sm text-text-secondary hover:text-wine transition-colors py-1"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </ScrollLink>
            ))}
            <Link
              href="/e-label"
              className="text-sm text-text-secondary hover:text-wine transition-colors py-1 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              E-Label
            </Link>
            <Link
              href="/blog"
              className="text-sm text-text-secondary hover:text-wine transition-colors py-1"
              onClick={() => setMobileMenuOpen(false)}
            >
              Blog
            </Link>
            <ScrollLink
              href={`#${SECTION_IDS.contactForm}`}
              className="bg-wine hover:bg-wine-dark text-white px-5 py-2.5 rounded-[var(--radius)] text-sm font-medium transition-colors text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              5 fiches gratuites
            </ScrollLink>
          </div>
        </div>
      )}
    </header>
  );
}
