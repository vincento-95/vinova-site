"use client";

import { useState, useRef } from "react";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS, AGENCY_LINKEDIN } from "@/lib/constants";

const LANGUES = [
  { code: "FR", label: "Français" },
  { code: "EN", label: "English" },
  { code: "IT", label: "Italiano" },
  { code: "ES", label: "Español" },
];

export default function UnifiedFormSection() {
  const [mode, setMode] = useState<"free" | "paid">("free");

  // Free form state
  const [freeData, setFreeData] = useState({
    name: "", company: "", email: "", portfolio: "", message: "",
  });
  const [freeSubmitted, setFreeSubmitted] = useState(false);
  const [freeLoading, setFreeLoading] = useState(false);
  const [freeError, setFreeError] = useState("");

  // Paid form state
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
  const [paidLoading, setPaidLoading] = useState(false);
  const [paidError, setPaidError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  function handleFreeChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFreeData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleFreeSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFreeLoading(true);
    setFreeError("");
    try {
      const res = await fetch("https://formspree.io/f/mojkjlbe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...freeData, type: "Demande 5 fiches gratuites" }),
      });
      if (!res.ok) throw new Error("Erreur lors de l'envoi.");
      setFreeSubmitted(true);
    } catch {
      setFreeError("Une erreur est survenue. Réessayez ou contactez-nous sur LinkedIn.");
    } finally {
      setFreeLoading(false);
    }
  }

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

  async function handlePaidSubmit(e: React.FormEvent) {
    e.preventDefault();
    setPaidLoading(true);
    setPaidError("");

    if (!bottlePreview) {
      setPaidError("Veuillez ajouter une photo de la bouteille.");
      setPaidLoading(false);
      return;
    }

    try {
      if (bottlePreview) localStorage.setItem("vinova_bottle_image", bottlePreview);
      else localStorage.removeItem("vinova_bottle_image");
      if (logoPreview) localStorage.setItem("fichevin_agency_logo", logoPreview);
      else localStorage.removeItem("fichevin_agency_logo");
      if (coordonnees) localStorage.setItem("fichevin_coordonnees", coordonnees);
      else localStorage.removeItem("fichevin_coordonnees");
      if (vinification) localStorage.setItem("fichevin_vinification", vinification);
      if (colisage) localStorage.setItem("fichevin_colisage", colisage);

      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nomVin, domaine, cepages, appellation, millesime, alcool, langue,
          extraInfo: [extraInfo, vinification ? `Vinification: ${vinification}` : '', colisage ? `Colisage: ${colisage}` : ''].filter(Boolean).join('\n'),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur lors de la création du paiement.");
      window.location.href = data.url;
    } catch (err) {
      setPaidError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setPaidLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white text-sm text-gray-900";

  if (freeSubmitted && mode === "free") {
    return (
      <SectionWrapper id={SECTION_IDS.contactForm} bgColor="wine">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 font-serif">Merci !</h2>
          <p className="text-white/90 text-lg">
            Nous avons bien reçu votre demande. Vous recevrez vos 5 fiches gratuites sous 24h.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={SECTION_IDS.contactForm} bgColor="wine">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-3 font-serif">
          Créez vos fiches techniques
        </h2>
        <p className="text-center text-white/70 mb-8 text-sm">
          Choisissez la formule qui vous convient.
        </p>

        {/* Toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white/10 rounded-[var(--radius)] p-1 backdrop-blur-sm border border-white/20">
            <button
              type="button"
              onClick={() => setMode("free")}
              className={`px-6 py-3 rounded-[calc(var(--radius)-4px)] text-sm font-semibold transition-all ${
                mode === "free"
                  ? "bg-white text-wine shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Tester gratuitement
              <span className="block text-xs font-normal mt-0.5 opacity-70">5 fiches offertes</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("paid")}
              className={`px-6 py-3 rounded-[calc(var(--radius)-4px)] text-sm font-semibold transition-all ${
                mode === "paid"
                  ? "bg-white text-wine shadow-md"
                  : "text-white/80 hover:text-white"
              }`}
            >
              Générer maintenant
              <span className="block text-xs font-normal mt-0.5 opacity-70">9 € par fiche</span>
            </button>
          </div>
        </div>

        {/* FREE FORM */}
        {mode === "free" && (
          <form onSubmit={handleFreeSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Nom complet *</label>
                <input id="contact-name" name="name" type="text" value={freeData.name} onChange={handleFreeChange} required placeholder="Jean Dupont" className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-company" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Site internet *</label>
                <input id="contact-company" name="company" type="url" value={freeData.company} onChange={handleFreeChange} required placeholder="https://www.votresite.fr" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-email" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Email professionnel *</label>
                <input id="contact-email" name="email" type="email" value={freeData.email} onChange={handleFreeChange} required placeholder="jean@entreprise.fr" className={inputClass} />
              </div>
              <div>
                <label htmlFor="contact-portfolio" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Nombre de références</label>
                <select id="contact-portfolio" name="portfolio" value={freeData.portfolio} onChange={handleFreeChange} className={inputClass}>
                  <option value="">Sélectionnez</option>
                  <option value="< 50">Moins de 50</option>
                  <option value="50-100">50 - 100</option>
                  <option value="100-300">100 - 300</option>
                  <option value="300+">Plus de 300</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="contact-message" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Message (optionnel)</label>
              <textarea id="contact-message" name="message" value={freeData.message} onChange={handleFreeChange} rows={3} placeholder="Dites-nous en plus sur vos besoins..." className={inputClass + " resize-none"} />
            </div>

            {freeError && <p className="text-red-200 text-sm text-center">{freeError}</p>}

            <p className="text-white/60 text-xs text-center flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              Vos informations sont confidentielles et ne seront jamais partagées.
            </p>

            <button type="submit" disabled={freeLoading} className="w-full bg-white hover:bg-accent text-wine py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {freeLoading ? "Envoi en cours..." : "Recevoir mes 5 fiches gratuites"}
            </button>

            <p className="text-white/50 text-xs text-center mt-3">
              Nous vous contacterons pour récupérer les photos de vos bouteilles et finaliser vos fiches.
            </p>
          </form>
        )}

        {/* PAID FORM */}
        {mode === "paid" && (
          <form onSubmit={handlePaidSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nomVin" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Nom du vin *</label>
                <input id="nomVin" type="text" value={nomVin} onChange={(e) => setNomVin(e.target.value)} required placeholder="Ex : Grand Vin 2018" className={inputClass} />
              </div>
              <div>
                <label htmlFor="domaine" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Domaine *</label>
                <input id="domaine" type="text" value={domaine} onChange={(e) => setDomaine(e.target.value)} required placeholder="Ex : Château Margaux" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="cepages" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Cépage(s)</label>
                <input id="cepages" type="text" value={cepages} onChange={(e) => setCepages(e.target.value)} placeholder="Ex : Cabernet Sauvignon, Merlot" className={inputClass} />
              </div>
              <div>
                <label htmlFor="appellation" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Appellation / Région / Pays</label>
                <input id="appellation" type="text" value={appellation} onChange={(e) => setAppellation(e.target.value)} placeholder="Ex : Margaux, Bordeaux, France" className={inputClass} />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="millesime" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Millésime</label>
                <input id="millesime" type="text" value={millesime} onChange={(e) => setMillesime(e.target.value)} placeholder="Ex : 2018" className={inputClass} />
              </div>
              <div>
                <label htmlFor="alcool" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Degré d&apos;alcool</label>
                <input id="alcool" type="text" value={alcool} onChange={(e) => setAlcool(e.target.value)} placeholder="Ex : 13,5%" className={inputClass} />
              </div>
              <div>
                <label htmlFor="langue" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Langue</label>
                <select id="langue" value={langue} onChange={(e) => setLangue(e.target.value)} className={inputClass}>
                  {LANGUES.map((l) => <option key={l.code} value={l.code}>{l.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="vinification" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Vinification et élevage *</label>
              <textarea id="vinification" value={vinification} onChange={(e) => setVinification(e.target.value)} required rows={2} placeholder="Ex : Fermentation en cuve inox à température contrôlée, élevage 12 mois en fût de chêne français..." className={inputClass + " resize-none"} />
            </div>
            <div>
              <label htmlFor="colisage" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Colisage / Conditionnement *</label>
              <textarea id="colisage" value={colisage} onChange={(e) => setColisage(e.target.value)} required rows={2} placeholder="Ex : 6 bouteilles par carton, 60 cartons par palette EUR, 50 cartons par palette US..." className={inputClass + " resize-none"} />
            </div>
            <div>
              <label htmlFor="coordonnees" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Vos coordonnées *</label>
              <textarea id="coordonnees" value={coordonnees} onChange={(e) => setCoordonnees(e.target.value)} required rows={2} placeholder="Ex : Nom de votre entreprise — Contact — Téléphone — Email — Adresse" className={inputClass + " resize-none"} />
            </div>
            <div>
              <label htmlFor="extraInfo" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">Informations supplémentaires</label>
              <textarea id="extraInfo" value={extraInfo} onChange={(e) => setExtraInfo(e.target.value)} rows={3} placeholder="Informations complémentaires sur le vin, le domaine, la vinification..." className={inputClass + " resize-none"} />
            </div>

            {/* Bottle image upload */}
            <div>
              <label className="block text-xs font-semibold text-white/90 mb-2 uppercase tracking-wide">Photo de la bouteille *</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-dashed border-white/30 hover:border-white/60 transition text-sm text-white/70 hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Choisir une image
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                {bottlePreview && (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bottlePreview} alt="Aperçu bouteille" className="h-16 w-auto rounded border border-white/30" />
                    <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600">x</button>
                  </div>
                )}
              </div>
              <p className="text-xs text-white/50 mt-1">Le fond sera automatiquement supprimé.</p>
            </div>

            {/* Logo upload */}
            <div>
              <label className="block text-xs font-semibold text-white/90 mb-2 uppercase tracking-wide">Logo de votre entreprise (optionnel)</label>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-[var(--radius)] border border-dashed border-white/30 hover:border-white/60 transition text-sm text-white/70 hover:text-white">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                  </svg>
                  Choisir un logo
                  <input ref={logoInputRef} type="file" accept="image/*" onChange={handleLogoChange} className="hidden" />
                </label>
                {logoPreview && (
                  <div className="relative">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={logoPreview} alt="Aperçu logo" className="h-16 w-auto rounded border border-white/30" />
                    <button type="button" onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none hover:bg-red-600">x</button>
                  </div>
                )}
              </div>
            </div>

            {paidError && <p className="text-red-200 text-sm text-center">{paidError}</p>}

            <button type="submit" disabled={paidLoading} className="w-full bg-white hover:bg-accent text-wine py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
              {paidLoading ? "Redirection vers le paiement..." : "Générer ma fiche pour 9 €"}
            </button>
          </form>
        )}

        <p className="text-center text-white/50 text-sm mt-6">
          Vous pouvez aussi nous contacter directement sur{" "}
          <a href={AGENCY_LINKEDIN} target="_blank" rel="noopener noreferrer" className="text-white/80 underline hover:text-white">
            LinkedIn
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
}
