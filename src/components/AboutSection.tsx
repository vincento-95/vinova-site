import SectionWrapper from "./SectionWrapper";

export default function AboutSection() {
  return (
    <SectionWrapper bgColor="surface">
      <div className="max-w-3xl mx-auto text-center">
        <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
          </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text mb-6 font-serif">
          Qui est derrière <span className="text-wine">Vinova</span> ?
        </h2>
        <p className="text-text-secondary leading-relaxed mb-4">
          Vinova est née d&apos;un constat simple : les importateurs et négociants de vin passent un temps fou sur des tâches administratives qui n&apos;apportent aucune valeur. Fiches techniques, catalogues, mises à jour — autant de temps perdu qui pourrait servir à vendre.
        </p>
        <p className="text-text-secondary leading-relaxed mb-6">
          Notre mission : rendre chaque vin aussi bien présenté qu&apos;il mérite de l&apos;être, en une fraction du temps.
        </p>
        <p className="text-sm text-wine font-medium">
          Basé en France. Spécialisé exclusivement dans le secteur du vin.
        </p>
      </div>
    </SectionWrapper>
  );
}
