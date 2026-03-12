"use client";

import { useState } from "react";
import SectionWrapper from "./SectionWrapper";

export default function CustomModelSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);

    // Simple mailto fallback — can be replaced with an API route or Formspree later
    try {
      await fetch("https://formspree.io/f/mojkjlbe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          message: "Demande de modèle de fiche personnalisé",
        }),
      });
    } catch {
      // Continue even if Formspree fails
    }

    setSubmitted(true);
    setLoading(false);
  }

  return (
    <SectionWrapper bgColor="surface">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-4 font-serif">
          Vous souhaitez un modèle <span className="text-wine">personnalisé</span> avec votre logo et vos couleurs ?
        </h2>
        <p className="text-text-secondary mb-8">
          Laissez-nous votre adresse e-mail et nous vous recontacterons.
        </p>

        {submitted ? (
          <div className="bg-surface border border-border rounded-[var(--radius)] px-6 py-5">
            <p className="text-wine font-semibold text-lg">Merci !</p>
            <p className="text-text-secondary text-sm mt-1">
              Nous avons bien reçu votre demande et reviendrons vers vous rapidement.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="votre@email.com"
              className="flex-1 px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white text-sm"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-wine hover:bg-wine-dark text-white px-6 py-3 rounded-[var(--radius)] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm"
            >
              {loading ? "Envoi..." : "Être recontacté"}
            </button>
          </form>
        )}
      </div>
    </SectionWrapper>
  );
}
