
import { useEffect } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServicesSection";
import UniqueSection from "@/components/sections/UniqueSection";
import CtaSection from "@/components/sections/CtaSection";
import ContactSection from "@/components/sections/ContactSection";
import TeamSection from "@/components/sections/TeamSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { ParticlesBackground } from "@/components/ui/particles-background";
import { setupScrollAnimation, setupSmoothScroll } from "@/utils/scrollAnimation";

const Index = () => {
  useEffect(() => {
    // Set up scroll animations and smooth scrolling
    const cleanup = setupScrollAnimation();
    setupSmoothScroll();
    
    // Check if there's a hash in the URL and scroll to that section
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 500);
      }
    }
    
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
        <TeamSection />
        <TestimonialsSection />
        <UniqueSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
