import { SECTION_IDS } from "@/lib/constants";

const stats = [
  {
    value: "30 sec",
    label: "Temps de génération d'une fiche",
    icon: (
      <svg className="w-7 h-7 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    ),
  },
  {
    value: "500+",
    label: "Références traitées par nos clients",
    icon: (
      <svg className="w-7 h-7 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    value: "40h",
    label: "Économisées par portefeuille de 80 vins",
    icon: (
      <svg className="w-7 h-7 text-wine" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
      </svg>
    ),
  },
];

export default function StatsSection() {
  return (
    <section id={SECTION_IDS.stats} className="py-12 md:py-16 px-6 bg-wine">
      <div className="mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
        {stats.map((stat) => (
          <div key={stat.value} className="flex flex-col items-center text-center text-white">
            <div className="w-14 h-14 bg-white/15 rounded-full flex items-center justify-center mb-3">
              <div className="[&_svg]:text-white">{stat.icon}</div>
            </div>
            <p className="text-3xl md:text-4xl font-bold font-serif">{stat.value}</p>
            <p className="text-sm text-white/80 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
