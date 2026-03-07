import ScrollLink from "./ScrollLink";
import { SECTION_IDS } from "@/lib/constants";

export default function HeroSection() {
  return (
    <section
      id={SECTION_IDS.hero}
      className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 bg-cream"
    >
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-4xl">
        Fiches techniques vin générées en{" "}
        <span className="text-wine">30 secondes</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
        Pour les importateurs et négociants qui gèrent 50 à 300 références.
        Automatisez la création de vos fiches et concentrez-vous sur ce qui
        compte : vendre vos vins.
      </p>
      <ScrollLink
        href={`#${SECTION_IDS.contact}`}
        className="mt-10 inline-block bg-wine hover:bg-wine-dark text-white px-8 py-4 rounded-lg text-lg font-medium transition-colors"
      >
        Tester gratuitement — 5 fiches offertes
      </ScrollLink>
    </section>
  );
}
