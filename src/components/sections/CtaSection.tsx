
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeInUp, backgroundElements } from "@/utils/animationVariants";

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
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        variants={backgroundElements}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute top-1/4 right-10 w-2 h-2 bg-nuevanex-red rounded-full opacity-75"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 3, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 left-20 w-2 h-2 bg-nuevanex-red rounded-full opacity-75"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
        <motion.div 
          className="absolute top-2/3 right-1/4 w-2 h-2 bg-nuevanex-red rounded-full opacity-75"
          animate={{ 
            scale: [1, 2, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-4xl mx-auto text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-white mb-6 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Ready to Transform Your Brand's Digital Presence?
            <motion.span 
              className="absolute -bottom-2 left-0 w-full h-0.5 bg-nuevanex-red"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            />
          </motion.h2>
          <motion.p 
            className="text-lg text-white/90 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Let's collaborate to create innovative strategies and compelling campaigns
            that will elevate your brand and drive meaningful results.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <MotionButton 
              className="bg-white text-nuevanex-red hover:bg-white/90 text-lg px-8 py-6 rounded-md relative overflow-hidden group transform transition-transform duration-300"
              onClick={handleConsultation}
              animationVariant="cta"
            >
              <span className="relative z-10">Get Free Consultation</span>
              <span className="absolute inset-0 bg-gradient-to-r from-white to-white/80 transform scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500"></span>
            </MotionButton>
            <MotionButton 
              variant="outline" 
              className="border-nuevanex-red border-2 text-nuevanex-red hover:bg-nuevanex-red/10 text-lg px-8 py-6 rounded-md group transition-all duration-300 relative overflow-hidden"
              onClick={handleViewTestimonials}
              animationVariant="secondary"
            >
              <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                View Success Stories
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2, repeatType: "reverse" }}
                >
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </motion.span>
              </span>
              <span className="absolute inset-0 bg-nuevanex-red transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
            </MotionButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
