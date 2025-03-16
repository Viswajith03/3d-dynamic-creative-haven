
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  const handleConsultation = () => {
    // Scroll to contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
    console.log("CTA consultation button clicked");
  };

  const handleViewTestimonials = () => {
    // Scroll to testimonials section
    const testimonialsSection = document.getElementById("testimonials");
    if (testimonialsSection) {
      testimonialsSection.scrollIntoView({ behavior: "smooth" });
    } else {
      // If testimonials section doesn't exist yet, scroll to services as fallback
      const servicesSection = document.getElementById("services");
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: "smooth" });
      }
    }
    console.log("View testimonials button clicked");
  };

  return (
    <section id="cta" className="py-16 bg-nuevanex-dark relative overflow-hidden">
      {/* Animated particles in background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-10 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "3s" }}></div>
        <div className="absolute bottom-1/3 left-20 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "4s" }}></div>
        <div className="absolute top-2/3 right-1/4 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "5s" }}></div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block">
            Ready to Transform Your Brand's Digital Presence?
            <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-nuevanex-red"></span>
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Let's collaborate to create innovative strategies and compelling campaigns
            that will elevate your brand and drive meaningful results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-white text-nuevanex-red hover:bg-white/90 text-lg px-8 py-6 rounded-md relative overflow-hidden group transform transition-transform duration-300 hover:scale-105"
              onClick={handleConsultation}
            >
              <span className="relative z-10">Get Free Consultation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white to-white/80 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
            </Button>
            <Button 
              variant="outline" 
              className="border-nuevanex-red border-2 text-nuevanex-red hover:bg-nuevanex-red/10 text-lg px-8 py-6 rounded-md group transition-all duration-300 relative overflow-hidden"
              onClick={handleViewTestimonials}
            >
              <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                View Success Stories
                <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-nuevanex-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
