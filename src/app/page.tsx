import { Suspense } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";
import CustomModelSection from "@/components/CustomModelSection";
import Footer from "@/components/Footer";
import GenerationModal from "@/components/GenerationModal";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <BeforeAfterSection />
        <HowItWorksSection />
        <ContactSection />
        <CustomModelSection />
      </main>
      <Footer />
      <Suspense>
        <GenerationModal />
      </Suspense>
    </>
  );
}
