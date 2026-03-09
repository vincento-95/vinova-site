"use client";

import { useForm, ValidationError } from "@formspree/react";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

export default function ContactSection() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xplaceholder";
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <SectionWrapper id={SECTION_IDS.contact} bgColor="surface">
        <div className="text-center py-12">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="text-3xl font-bold text-text mb-4 font-serif">Merci !</h2>
          <p className="text-text-secondary text-lg max-w-md mx-auto">
            Nous reviendrons vers vous sous 24h avec vos 5 fiches d&apos;essai
            générées par notre IA.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={SECTION_IDS.contact} bgColor="surface">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-text mb-4 font-serif">
        Testez <span className="text-wine">gratuitement</span> avec 5 fiches
        de votre portefeuille
      </h2>
      <p className="text-center text-text-secondary mb-12 max-w-xl mx-auto">
        Envoyez-nous vos informations et nous vous renvoyons 5 fiches
        techniques générées par notre IA sous 24h.
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div>
          <label
            htmlFor="entreprise"
            className="block text-sm font-medium text-text mb-1"
          >
            Entreprise
          </label>
          <input
            id="entreprise"
            type="text"
            name="entreprise"
            required
            className="w-full px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white"
          />
          <ValidationError
            prefix="Entreprise"
            field="entreprise"
            errors={state.errors}
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-text mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </div>

        <div>
          <label
            htmlFor="vins"
            className="block text-sm font-medium text-text mb-1"
          >
            Vins pour lesquels vous souhaitez des fiches techniques
          </label>
          <textarea
            id="vins"
            name="vins"
            required
            rows={5}
            placeholder="Ex : Château Margaux 2018, Chablis Premier Cru 2020, Sancerre Blanc 2022…"
            className="w-full px-4 py-3 rounded-[var(--radius)] border border-border focus:ring-2 focus:ring-wine/30 focus:border-wine outline-none transition bg-white resize-y"
          />
          <ValidationError
            prefix="Vins"
            field="vins"
            errors={state.errors}
          />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-wine hover:bg-wine-dark text-white py-4 rounded-[var(--radius)] font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-[var(--shadow-card)]"
        >
          {state.submitting
            ? "Envoi en cours…"
            : "Recevoir mes 5 fiches gratuites"}
        </button>
      </form>
    </SectionWrapper>
  );
}
