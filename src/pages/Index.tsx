
import { useEffect, useState } from "react";
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
import { CustomCursor } from "@/components/ui/custom-cursor";
import { setupSmoothScroll } from "@/utils/scrollAnimation";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const isMobile = useIsMobile();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    
    // Set up smooth scrolling
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
    
    // Mark as loaded after small delay for animations
    setTimeout(() => setIsLoaded(true), 100);
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // Page transitions
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.3 
      } 
    }
  };

  return (
    <AnimatePresence mode="wait">
      {/* Only show custom cursor on non-mobile devices and when reduced motion is not preferred */}
      {!isMobile && !reducedMotion && <CustomCursor />}
      
      <motion.div 
        className="min-h-screen"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <Header />
        
        {/* Particle background with optimizations for mobile/reduced motion */}
        <motion.div 
          className="fixed inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isLoaded ? 1 : 0 }}
          transition={{ duration: 1 }}
        >
          <ParticlesBackground 
            quantity={isMobile || reducedMotion ? 30 : 75} 
            maxSpeed={reducedMotion ? 0.1 : 0.5}
          />
        </motion.div>
        
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
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
