"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS, AGENCY_LINKEDIN } from "@/lib/constants";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    portfolio: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://formspree.io/f/mojkjlbe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          company: formData.company,
          email: formData.email,
          portfolio: formData.portfolio,
          message: formData.message,
          type: "Demande 5 fiches gratuites",
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi.");
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Réessayez ou contactez-nous sur LinkedIn.");
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white text-sm text-gray-900";

  if (submitted) {
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
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4 font-serif">
          Testez gratuitement sur 5 de vos vins
        </h2>
        <p className="text-center text-white/80 mb-10">
          Envoyez-nous vos infos, on vous répond sous 2h en jour ouvré et on vous livre 5 fiches professionnelles sous 24h. Sans engagement.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-name" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
                Nom complet *
              </label>
              <input
                id="contact-name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jean Dupont"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-company" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
                Site internet *
              </label>
              <input
                id="contact-company"
                name="company"
                type="url"
                value={formData.company}
                onChange={handleChange}
                required
                placeholder="https://www.votresite.fr"
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="contact-email" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
                Email professionnel *
              </label>
              <input
                id="contact-email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jean@entreprise.fr"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="contact-portfolio" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
                Nombre de références
              </label>
              <select
                id="contact-portfolio"
                name="portfolio"
                value={formData.portfolio}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Sélectionnez</option>
                <option value="< 50">Moins de 50</option>
                <option value="50-100">50 - 100</option>
                <option value="100-300">100 - 300</option>
                <option value="300+">Plus de 300</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="contact-message" className="block text-xs font-semibold text-white/90 mb-1 uppercase tracking-wide">
              Message (optionnel)
            </label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              placeholder="Dites-nous en plus sur vos besoins..."
              className={inputClass + " resize-none"}
            />
          </div>

          {error && (
            <p className="text-red-200 text-sm text-center">{error}</p>
          )}

          <p className="text-white/70 text-xs text-center flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
            Vos informations sont confidentielles et ne seront jamais partagées.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white hover:bg-accent text-wine py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Envoi en cours..." : "Recevoir mes 5 fiches gratuites"}
          </button>
        </form>

        <p className="text-center text-white/60 text-sm mt-6">
          Vous pouvez aussi nous contacter directement sur{" "}
          <a
            href={AGENCY_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/90 underline hover:text-white"
          >
            LinkedIn
          </a>
        </p>
      </div>
    </SectionWrapper>
  );
}
