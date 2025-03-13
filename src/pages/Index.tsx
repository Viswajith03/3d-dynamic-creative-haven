
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import UniqueSection from "@/components/sections/UniqueSection";
import CtaSection from "@/components/sections/CtaSection";
import ContactSection from "@/components/sections/ContactSection";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { setupScrollAnimation, setupSmoothScroll } from "@/utils/scrollAnimation";

const Index = () => {
  useEffect(() => {
    // Set up scroll animations and smooth scrolling
    const cleanup = setupScrollAnimation();
    setupSmoothScroll();
    
    return cleanup;
  }, []);

  return (
    <div className="min-h-screen">
      <Header />
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <ParticlesBackground quantity={75} />
      </div>
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <UniqueSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
