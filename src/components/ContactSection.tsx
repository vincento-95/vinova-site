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
  const [bottlePreview, setBottlePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setBottlePreview(dataUrl);
    };
    reader.readAsDataURL(file);
  }

  function removeImage() {
    setBottlePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Store bottle image in localStorage before Stripe redirect
      if (bottlePreview) {
        localStorage.setItem("vinova_bottle_image", bottlePreview);
      } else {
        localStorage.removeItem("vinova_bottle_image");
      }

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
          extraInfo,
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
    <SectionWrapper id={SECTION_IDS.contact} bgColor="bg">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Générez votre <span className="text-wine">fiche technique</span>
      </h2>
      <p className="text-center text-text-secondary mb-12 max-w-xl mx-auto">
        Remplissez les informations connues.
        <br />
        Notre IA s&apos;occupe du reste pour créer votre fiche professionnelle.
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
        {/* Row 1: Nom du vin + Domaine */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="nomVin" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Nom du vin *
            </label>
            <input
              id="nomVin"
              type="text"
              value={nomVin}
              onChange={(e) => setNomVin(e.target.value)}
              required
              placeholder="Ex : Grand Vin 2018"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="domaine" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Domaine *
            </label>
            <input
              id="domaine"
              type="text"
              value={domaine}
              onChange={(e) => setDomaine(e.target.value)}
              required
              placeholder="Ex : Château Margaux"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 2: Cépages + Appellation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="cepages" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Cépage(s)
            </label>
            <input
              id="cepages"
              type="text"
              value={cepages}
              onChange={(e) => setCepages(e.target.value)}
              placeholder="Ex : Cabernet Sauvignon, Merlot"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="appellation" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Appellation / Région / Pays
            </label>
            <input
              id="appellation"
              type="text"
              value={appellation}
              onChange={(e) => setAppellation(e.target.value)}
              placeholder="Ex : Margaux, Bordeaux, France"
              className={inputClass}
            />
          </div>
        </div>

        {/* Row 3: Millésime + Alcool + Langue */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="millesime" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Millésime
            </label>
            <input
              id="millesime"
              type="text"
              value={millesime}
              onChange={(e) => setMillesime(e.target.value)}
              placeholder="Ex : 2018"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="alcool" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Degré d&apos;alcool
            </label>
            <input
              id="alcool"
              type="text"
              value={alcool}
              onChange={(e) => setAlcool(e.target.value)}
              placeholder="Ex : 13,5%"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="langue" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
              Langue
            </label>
            <select
              id="langue"
              value={langue}
              onChange={(e) => setLangue(e.target.value)}
              className={inputClass}
            >
              {LANGUES.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Extra info */}
        <div>
          <label htmlFor="extraInfo" className="block text-xs font-semibold text-text mb-1 uppercase tracking-wide">
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
            Photo de la bouteille
          </label>
          <div className="flex items-center gap-4">
            <label
              className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-dashed border-border hover:border-wine/50 transition text-sm text-text-secondary hover:text-wine"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              Choisir une image
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {bottlePreview && (
              <div className="relative">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={bottlePreview}
                  alt="Aperçu bouteille"
                  className="h-16 w-auto rounded border border-border"
                />
                <button
                  type="button"
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600"
                >
                  x
                </button>
              </div>
            )}
          </div>
          <p className="text-xs text-text-secondary mt-1">
            Optionnel — Le fond sera automatiquement supprimé.
          </p>
        </div>

        {error && (
          <p className="text-red-600 text-sm text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-wine hover:bg-wine-dark text-white py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--shadow-card)]"
        >
          {loading ? "Redirection vers le paiement..." : "Générer ma fiche pour 1 € seulement"}
        </button>

        <p className="text-center text-text-secondary text-xs">
          Paiement sécurisé par Stripe. Téléchargement immédiat après paiement.
        </p>
      </form>
    </SectionWrapper>
  );
}
