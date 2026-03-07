import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import BeforeAfterSection from "@/components/BeforeAfterSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ProblemSection />
        <BeforeAfterSection />
        <HowItWorksSection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
