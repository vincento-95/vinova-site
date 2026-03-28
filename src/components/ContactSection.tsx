"use client";

import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const LANGUES = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
  { code: "IT", label: "Italiano" },
  { code: "ES", label: "Español" },
];

export default function ContactSection() {
  const [nomVin, setNomVin] = useState("");
  const [domaine, setDomaine] = useState("");
  const [cepages, setCepages] = useState("");
  const [appellation, setAppellation] = useState("");
  const [millesime, setMillesime] = useState("");
  const [alcool, setAlcool] = useState("");
  const [langue, setLangue] = useState("FR");
  const [extraInfo, setExtraInfo] = useState("");
  const [vinification, setVinification] = useState("");
  const [colisage, setColisage] = useState("");
  const [coordonnees, setCoordonnees] = useState("");
  const [bottlePreview, setBottlePreview] = useState<string | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setBottlePreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setBottlePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function handleLogoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogoPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    setLogoPreview(null);
    if (logoInputRef.current) logoInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!bottlePreview) {
      setError("Veuillez ajouter une photo de la bouteille.");
      setLoading(false);
      return;
    }

    try {
      // Store images in localStorage for the success page
      if (bottlePreview) {
        localStorage.setItem("vinova_bottle_image", bottlePreview);
      } else {
        localStorage.removeItem("vinova_bottle_image");
      }
      if (logoPreview) {
        localStorage.setItem("fichevin_agency_logo", logoPreview);
      } else {
        localStorage.removeItem("fichevin_agency_logo");
      }
      if (coordonnees) {
        localStorage.setItem("fichevin_coordonnees", coordonnees);
      } else {
        localStorage.removeItem("fichevin_coordonnees");
      }

      // Store extra fields in localStorage for after payment
      if (vinification) localStorage.setItem("fichevin_vinification", vinification);
      if (colisage) localStorage.setItem("fichevin_colisage", colisage);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomVin,
          domaine,
          cepages,
          appellation,
          millesime,
          alcool,
          langue,
          extraInfo: [extraInfo, vinification ? `Vinification: ${vinification}` : '', colisage ? `Colisage: ${colisage}` : ''].filter(Boolean).join('\n'),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Erreur lors de la création du paiement.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white text-sm";

  return (
    <SectionWrapper id={SECTION_IDS.contact} bgColor="wine">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 font-serif">
        Générez votre fiche technique pour <span className="text-white/90">9 €</span>
      </h2>
      <p className="text-center text-white/80 mb-12 max-w-2xl mx-auto whitespace-nowrap">
        Remplissez les informations, payez en ligne, téléchargez votre fiche PDF instantanément.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
        {/* Row 1: Nom du vin + Domaine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nomVin" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Nom du vin *
            </label>
            <input id="nomVin" type="text" value={nomVin} onChange={(e) => setNomVin(e.target.value)} required placeholder="Ex : Grand Vin 2018" className={inputClass} />
          </div>
          <div>
            <label htmlFor="domaine" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Domaine *
            </label>
            <input id="domaine" type="text" value={domaine} onChange={(e) => setDomaine(e.target.value)} required placeholder="Ex : Château Margaux" className={inputClass} />
          </div>
        </div>

        {/* Row 2: Cépages + Appellation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cepages" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Cépage(s)
            </label>
            <input id="cepages" type="text" value={cepages} onChange={(e) => setCepages(e.target.value)} placeholder="Ex : Cabernet Sauvignon, Merlot" className={inputClass} />
          </div>
          <div>
            <label htmlFor="appellation" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Appellation / Région / Pays
            </label>
            <input id="appellation" type="text" value={appellation} onChange={(e) => setAppellation(e.target.value)} placeholder="Ex : Margaux, Bordeaux, France" className={inputClass} />
          </div>
        </div>

        {/* Row 3: Millésime + Alcool + Langue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="millesime" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Millésime
            </label>
            <input id="millesime" type="text" value={millesime} onChange={(e) => setMillesime(e.target.value)} placeholder="Ex : 2018" className={inputClass} />
          </div>
          <div>
            <label htmlFor="alcool" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Degré d&apos;alcool
            </label>
            <input id="alcool" type="text" value={alcool} onChange={(e) => setAlcool(e.target.value)} placeholder="Ex : 13,5%" className={inputClass} />
          </div>
          <div>
            <label htmlFor="langue" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Langue
            </label>
            <select id="langue" value={langue} onChange={(e) => setLangue(e.target.value)} className={inputClass}>
              {LANGUES.map((l) => (
                <option key={l.code} value={l.code}>{l.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Vinification / Élevage */}
        <div>
          <label htmlFor="vinification" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
            Vinification et élevage *
          </label>
          <textarea
            id="vinification"
            value={vinification}
            onChange={(e) => setVinification(e.target.value)}
            required
            rows={2}
            placeholder="Ex : Fermentation en cuve inox à température contrôlée, élevage 12 mois en fût de chêne français..."
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Colisage */}
        <div>
          <label htmlFor="colisage" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
            Colisage / Conditionnement *
          </label>
          <textarea
            id="colisage"
            value={colisage}
            onChange={(e) => setColisage(e.target.value)}
            required
            rows={2}
            placeholder="Ex : 6 bouteilles par carton, 60 cartons par palette EUR, 50 cartons par palette US..."
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Coordonnées importateur */}
        <div>
          <label htmlFor="coordonnees" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
            Vos coordonnées *
          </label>
          <textarea
            id="coordonnees"
            value={coordonnees}
            onChange={(e) => setCoordonnees(e.target.value)}
            required
            rows={2}
            placeholder="Ex : Nom de votre entreprise — Contact — Téléphone — Email — Adresse"
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Extra info */}
        <div>
          <label htmlFor="extraInfo" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
            Informations supplémentaires
          </label>
          <textarea
            id="extraInfo"
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
            rows={3}
            placeholder="Informations complémentaires sur le vin, le domaine, la vinification..."
            className={inputClass + " resize-none"}
          />
        </div>

        {/* Bottle image upload */}
        <div>
          <label className="block text-xs font-semibold text-text mb-2 uppercase tracking-wide">
            Photo de la bouteille *
          </label>
          <div className="flex items-center gap-3">
            <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-dashed border-border hover:border-wine/50 transition text-sm text-text-secondary hover:text-wine">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Choisir une image
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {bottlePreview && (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={bottlePreview} alt="Aperçu bouteille" className="h-16 w-auto rounded border border-border" />
                <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600">x</button>
              </div>
            )}
          </div>
          <p className="text-xs text-white/60 mt-1">Le fond sera automatiquement supprimé.</p>
        </div>

        {error && (
          <p className="text-red-200 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-white hover:bg-accent text-wine py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Redirection vers le paiement..." : "Générer ma fiche pour 9 €"}
        </button>
      </form>
    </SectionWrapper>
  );
}
