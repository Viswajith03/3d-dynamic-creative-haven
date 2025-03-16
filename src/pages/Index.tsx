
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
import Scene from "@/components/three/Scene";

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
          {/* 3D Product Showcase Section */}
          <section id="showcase" className="py-20 bg-gradient-to-br from-nuevanex-dark via-nuevanex-navy to-nuevanex-dark overflow-hidden">
            <div className="container mx-auto px-4">
              <motion.div 
                className="text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="section-title text-white mb-4">Interactive Experience</h2>
                <p className="text-gray-300 max-w-2xl mx-auto">
                  Explore our digital solutions through this interactive 3D experience. 
                  Hover and click on elements to see them come to life.
                </p>
              </motion.div>
              
              <div className="h-[500px] w-full mb-12">
                <Scene type="product" />
              </div>
            </div>
          </section>
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
