
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeInUp, textVariants, letterVariants, backgroundElements, iconVariants } from "@/utils/animationVariants";

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
    console.log("View works button clicked");
  };

  // Text animation for the headline
  const headlineText = "Innovative Digital Solutions for Modern Brands";
  const headlineWords = headlineText.split(' ');

  return (
    <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-nuevanex-dark via-nuevanex-navy to-nuevanex-dark">
      {/* Animated background elements */}
      <motion.div 
        className="absolute inset-0 overflow-hidden"
        variants={backgroundElements}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="absolute top-20 left-[20%] w-20 h-20 bg-nuevanex-red/20 rounded-full blur-xl"
          animate={{ 
            y: [0, -20, 0], 
            opacity: [0.5, 0.8, 0.5] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 5, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute top-[30%] right-[10%] w-32 h-32 bg-white/10 rounded-full blur-xl"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.3, 0.6, 0.3] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 7, 
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="absolute bottom-[20%] left-[15%] w-24 h-24 bg-nuevanex-red/30 rounded-full blur-xl"
          animate={{ 
            y: [0, 20, 0], 
            opacity: [0.4, 0.7, 0.4] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 6, 
            ease: "easeInOut",
            delay: 2 
          }}
        />
        <motion.div 
          className="absolute top-[60%] right-[25%] w-16 h-16 bg-white/5 rounded-full blur-xl"
          animate={{ 
            y: [0, -15, 0], 
            opacity: [0.2, 0.5, 0.2] 
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 4, 
            ease: "easeInOut",
            delay: 1 
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <motion.div
          className="max-w-3xl"
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <motion.div 
            className="flex items-center mb-4 space-x-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <motion.span 
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nuevanex-red/10 text-nuevanex-red"
              whileHover={{ scale: 1.05 }}
            >
              <motion.span
                variants={iconVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Sparkles className="mr-1 h-4 w-4" />
              </motion.span>
              Innovative Marketing
            </motion.span>
          </motion.div>
          
          <motion.h1 
            className="hero-title text-white mb-6"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.span 
              className="text-nuevanex-red relative inline-block mr-2"
              variants={letterVariants}
              whileHover={{ scale: 1.05 }}
            >
              Innovative
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-nuevanex-red"></span>
            </motion.span>
            {headlineWords.slice(1).map((word, index) => (
              <motion.span
                key={index}
                className="inline-block mr-2"
                variants={letterVariants}
                custom={index + 1}
              >
                {word}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl"
            variants={fadeInUp}
            transition={{ delay: 0.3 }}
          >
            Nuevanex Digilab is a cutting-edge advertising and digital marketing agency based in Kochi, 
            specializing in innovative brand strategies, creative campaigns, and performance-driven digital solutions.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            variants={fadeInUp}
            transition={{ delay: 0.6 }}
          >
            <MotionButton 
              className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white text-lg px-8 py-6 rounded-md group transition-all duration-300"
              onClick={handleConsultation}
              animationVariant="cta"
            >
              <motion.span
                variants={iconVariants}
                className="inline-flex items-center"
              >
                <Zap className="mr-2 h-5 w-5" />
                Get Free Consultation
              </motion.span>
            </MotionButton>
            <MotionButton 
              variant="outline" 
              className="border-nuevanex-red border-2 text-nuevanex-red hover:bg-nuevanex-red/10 text-lg px-8 py-6 rounded-md group transition-all duration-300 relative overflow-hidden"
              onClick={handleViewWorks}
              animationVariant="secondary"
            >
              <span className="relative z-10 flex items-center group-hover:text-white transition-colors duration-300">
                View Our Works
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
      
      {/* Animated shapes */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-nuevanex-dark to-transparent"></div>
      <motion.div 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-nuevanex-red/5 rounded-full blur-3xl pointer-events-none"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut"
        }}
      />
    </section>
  );
};

export default HeroSection;
