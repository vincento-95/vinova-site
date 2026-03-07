"use client";

import { useForm, ValidationError } from "@formspree/react";
import SectionWrapper from "./SectionWrapper";
import { SECTION_IDS } from "@/lib/constants";

const referenceOptions = [
  "Moins de 50",
  "50 – 100",
  "100 – 200",
  "200 – 300",
  "Plus de 300",
];

export default function ContactSection() {
  const formId = process.env.NEXT_PUBLIC_FORMSPREE_ID || "xplaceholder";
  const [state, handleSubmit] = useForm(formId);

  if (state.succeeded) {
    return (
      <SectionWrapper id={SECTION_IDS.contact} bgColor="white">
        <div className="text-center py-12">
          <div className="text-5xl mb-6">✓</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Merci !</h2>
          <p className="text-gray-600 text-lg max-w-md mx-auto">
            Nous reviendrons vers vous sous 24h avec vos 5 fiches d&apos;essai
            générées par notre IA.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id={SECTION_IDS.contact} bgColor="white">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
        Testez <span className="text-wine">gratuitement</span> avec 5 fiches
        de votre portefeuille
      </h2>
      <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
        Envoyez-nous vos informations et nous vous renvoyons 5 fiches
        techniques générées par notre IA sous 24h.
      </p>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-6">
        <div>
          <label
            htmlFor="nom"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nom
          </label>
          <input
            id="nom"
            type="text"
            name="nom"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/50 focus:border-wine outline-none transition bg-white"
          />
          <ValidationError prefix="Nom" field="nom" errors={state.errors} />
        </div>

        <div>
          <label
            htmlFor="entreprise"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Entreprise
          </label>
          <input
            id="entreprise"
            type="text"
            name="entreprise"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/50 focus:border-wine outline-none transition bg-white"
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
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/50 focus:border-wine outline-none transition bg-white"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
          />
        </div>

        <div>
          <label
            htmlFor="references"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nombre de références
          </label>
          <select
            id="references"
            name="references"
            required
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wine/50 focus:border-wine outline-none transition bg-white"
          >
            <option value="">Sélectionnez…</option>
            {referenceOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <ValidationError
            prefix="Références"
            field="references"
            errors={state.errors}
          />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full bg-wine hover:bg-wine-dark text-white py-4 rounded-lg font-medium text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {state.submitting
            ? "Envoi en cours…"
            : "Recevoir mes 5 fiches gratuites"}
        </button>
      </form>
    </SectionWrapper>
  );
}
