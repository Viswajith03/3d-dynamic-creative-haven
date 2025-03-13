
import { Button } from "@/components/ui/button";
import Scene from "@/components/three/Scene";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-nuevanex-dark via-nuevanex-navy to-nuevanex-dark">
      {/* 3D Background */}
      <Scene type="hero" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-3xl">
          <div className={`transform transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h1 className="hero-title text-white mb-6">
              <span className="text-nuevanex-red">Innovative</span> Digital Solutions for Modern Brands
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
              Nuevanex Digilab is a cutting-edge advertising and digital marketing agency based in Kochi, 
              specializing in innovative brand strategies, creative campaigns, and performance-driven digital solutions.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white text-lg px-8 py-6 rounded-md">
                Get Free Consultation
              </Button>
              <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-md">
                View Our Works
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-nuevanex-dark/80 to-transparent z-[1]"></div>
    </section>
  );
};

export default HeroSection;
