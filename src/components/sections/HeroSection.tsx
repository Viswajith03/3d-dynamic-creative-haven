
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleConsultation = () => {
    // Scroll to contact section for consultation
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    console.log("Hero consultation button clicked");
  };

  const handleViewWorks = () => {
    // Scroll to portfolio/works section
    const portfolioSection = document.getElementById("portfolio");
    if (portfolioSection) {
      portfolioSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If portfolio section doesn't exist yet, scroll to services as fallback
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    console.log("View works button clicked");
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-nuevanex-dark via-nuevanex-navy to-nuevanex-dark">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-[20%] w-20 h-20 bg-nuevanex-red/20 rounded-full blur-xl animate-float"></div>
        <div className="absolute top-[30%] right-[10%] w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-[20%] left-[15%] w-24 h-24 bg-nuevanex-red/30 rounded-full blur-xl animate-float" style={{ animationDelay: "2s" }}></div>
        <div className="absolute top-[60%] right-[25%] w-16 h-16 bg-white/5 rounded-full blur-xl animate-float" style={{ animationDelay: "1s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="flex items-center mb-4 space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nuevanex-red/10 text-nuevanex-red">
                <Sparkles className="mr-1 h-4 w-4" />
                Innovative Marketing
              </span>
            </div>
            
            <h1 className="hero-title text-white mb-6">
              <span className="text-nuevanex-red relative inline-block">
                Innovative
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-nuevanex-red"></span>
              </span> Digital Solutions for Modern Brands
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl animate-fade-in" style={{ animationDelay: "0.3s" }}>
              Nuevanex Digilab is a cutting-edge advertising and digital marketing agency based in Kochi, 
              specializing in innovative brand strategies, creative campaigns, and performance-driven digital solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.6s" }}>
              <Button 
                className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white text-lg px-8 py-6 rounded-md group transition-all duration-300 hover:translate-y-[-5px]"
                onClick={handleConsultation}
              >
                <Zap className="mr-2 h-5 w-5 group-hover:animate-pulse" />
                Get Free Consultation
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-md group transition-all duration-300"
                onClick={handleViewWorks}
              >
                View Our Works
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Animated shapes */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-nuevanex-dark to-transparent"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nuevanex-red/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;
