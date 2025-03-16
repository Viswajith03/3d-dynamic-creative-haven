
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
import { setupSmoothScroll } from "@/utils/scrollAnimation";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  useEffect(() => {
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
      <motion.div 
        className="min-h-screen"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <Header />
        <motion.div 
          className="fixed inset-0 -z-10 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <ParticlesBackground quantity={75} />
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
