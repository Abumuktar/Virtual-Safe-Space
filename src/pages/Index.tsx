import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import AboutSection from "@/components/landing/AboutSection";
import MissionSection from "@/components/landing/MissionSection";
import FocusAreasSection from "@/components/landing/FocusAreasSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SDGSection from "@/components/landing/SDGSection";
import StatsSection from "@/components/landing/StatsSection";
import PartnersSection from "@/components/landing/PartnersSection";
import FAQSection from "@/components/landing/FAQSection";
import CTASection from "@/components/landing/CTASection";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
        <StatsSection />
        <MissionSection />
        <FocusAreasSection />
        <HowItWorksSection />
        <SDGSection />
        <PartnersSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
