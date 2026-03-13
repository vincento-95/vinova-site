import Link from "next/link";
import { AGENCY_NAME } from "@/lib/constants";

export const metadata = {
  title: `Politique de confidentialité | ${AGENCY_NAME}`,
};

export default function PolitiqueConfidentialite() {
  return (
    <main className="min-h-screen bg-bg pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-wine text-sm hover:underline mb-8 inline-block">
          &larr; Retour à l&apos;accueil
        </Link>
        <h1 className="text-3xl font-bold text-text mb-8 font-serif">Politique de confidentialité</h1>
        <div className="prose prose-sm text-text-secondary space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-text">Collecte des données</h2>
            <p>
              {AGENCY_NAME} collecte les données personnelles que vous nous transmettez volontairement via nos formulaires de contact (nom, email, entreprise). Ces données sont utilisées uniquement pour répondre à vos demandes.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text">Utilisation des données</h2>
            <p>
              Vos données ne sont jamais revendues à des tiers. Elles sont stockées de manière sécurisée et utilisées exclusivement dans le cadre de notre relation commerciale.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text">Vos droits</h2>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez-nous via notre formulaire de contact.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text">Cookies</h2>
            <p>
              Ce site utilise uniquement des cookies techniques nécessaires à son fonctionnement. Aucun cookie publicitaire ou de tracking n&apos;est utilisé.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
