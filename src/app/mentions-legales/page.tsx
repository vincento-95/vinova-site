import Link from "next/link";
import { AGENCY_NAME } from "@/lib/constants";

export const metadata = {
  title: `Mentions légales | ${AGENCY_NAME}`,
};

export default function MentionsLegales() {
  return (
    <main className="min-h-screen bg-bg pt-24 pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-wine text-sm hover:underline mb-8 inline-block">
          &larr; Retour à l&apos;accueil
        </Link>
        <h1 className="text-3xl font-bold text-text mb-8 font-serif">Mentions légales</h1>
        <div className="prose prose-sm text-text-secondary space-y-6">
          <section>
            <h2 className="text-lg font-semibold text-text">Éditeur du site</h2>
            <p>
              {AGENCY_NAME}<br />
              Page en cours de rédaction.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold text-text">Hébergement</h2>
            <p>
              Ce site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
