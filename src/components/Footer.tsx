import { AGENCY_NAME, AGENCY_EMAIL, AGENCY_LINKEDIN } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="bg-text text-border py-12 px-6">
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <p className="text-white font-semibold text-lg font-serif">{AGENCY_NAME}</p>
          <p className="text-sm mt-1 text-text-secondary">Solutions IA pour le négoce de vin</p>
        </div>
        <div className="flex gap-6 text-sm">
          <a
            href={`mailto:${AGENCY_EMAIL}`}
            className="hover:text-white transition-colors"
          >
            {AGENCY_EMAIL}
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
        <p className="text-xs text-text-secondary">
          © {new Date().getFullYear()} {AGENCY_NAME}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
