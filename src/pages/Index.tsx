
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

// Create empty sections for navigation (these will be properly implemented later)
const PortfolioSection = () => <section id="portfolio" className="py-20 bg-white"><div className="container mx-auto px-4"><h2 className="section-title text-center mb-6">Our <span className="text-nuevanex-red">Portfolio</span></h2><p className="text-center mb-8">Coming soon! Our portfolio section is under development.</p></div></section>;

const BlogSection = () => <section id="blog" className="py-20 bg-nuevanex-light"><div className="container mx-auto px-4"><h2 className="section-title text-center mb-6">Our <span className="text-nuevanex-red">Blog</span></h2><p className="text-center mb-8">Our blog is coming soon with industry insights and marketing tips.</p></div></section>;

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
        <PortfolioSection />
        <UniqueSection />
        <BlogSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
