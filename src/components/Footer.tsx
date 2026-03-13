import Link from "next/link";
import { AGENCY_NAME, AGENCY_EMAIL, AGENCY_LINKEDIN } from "@/lib/constants";

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
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-6 text-sm items-center">
            <a
              href={AGENCY_LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              LinkedIn
            </a>
            {AGENCY_EMAIL && (
              <a
                href={`mailto:${AGENCY_EMAIL}`}
                className="hover:text-white transition-colors"
              >
                {AGENCY_EMAIL}
              </a>
            )}
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
