import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import ProblemSection from "@/components/ProblemSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import PricingSection from "@/components/PricingSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import AboutSection from "@/components/AboutSection";
import FAQSection from "@/components/FAQSection";
import ContactFormSection from "@/components/ContactFormSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import GenerationModal from "@/components/GenerationModal";
import ScrollAnimations from "@/components/ScrollAnimations";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <ProblemSection />
        <BeforeAfterSection />
        <PricingSection />
        <FAQSection />
        <ContactFormSection />
        <ContactSection />
      </main>
      <Footer />
      <Suspense>
        <GenerationModal />
      </Suspense>
      <ScrollAnimations />
      <StickyMobileCTA />
    </>
  );
}
