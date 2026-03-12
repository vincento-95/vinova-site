import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 md:pt-40 md:pb-28 bg-bg"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text leading-tight max-w-4xl font-serif">
        FICHES TECHNIQUES VIN générées en{" "}
        <span className="text-wine">30 secondes</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-text-secondary max-w-2xl leading-relaxed">
        <span className="font-bold text-text text-xl md:text-2xl">Automatisez</span> la création de vos fiches techniques.
        <br />
        Concentrez-vous sur ce qui compte : <span className="font-bold text-text text-xl md:text-2xl">vendre</span> vos vins.
      </p>
      <ScrollLink
        href={`#${SECTION_IDS.contact}`}
        className="mt-10 inline-block bg-wine hover:bg-wine-dark text-white px-8 py-4 rounded-[var(--radius)] text-lg font-medium transition-colors shadow-[var(--shadow-card)]"
      >
        Générez votre fiche technique
      </ScrollLink>
    </section>
  );
}
