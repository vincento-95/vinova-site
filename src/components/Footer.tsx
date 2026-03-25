import Link from "next/link";
import { AGENCY_NAME, AGENCY_LINKEDIN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-text text-border py-12 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-white font-semibold text-lg font-serif">{AGENCY_NAME}</p>
            <p className="text-sm mt-1 text-text-secondary">
              Solutions IA pour importateurs et négociants de vin
            </p>
            <p className="text-xs mt-2 text-text-secondary flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Données hébergées en Europe. Conforme RGPD.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm items-center">
            <a
              href="mailto:contact@fichevin.fr"
              className="hover:text-white transition-colors"
            >
              contact@fichevin.fr
            </a>
            <a
              href={AGENCY_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary">
          <p>
            &copy; {new Date().getFullYear()} {AGENCY_NAME}. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">
              Mentions légales
            </Link>
            <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors">
              Politique de confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
