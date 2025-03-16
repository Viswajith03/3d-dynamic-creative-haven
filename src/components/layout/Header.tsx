
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { MotionButton } from "@/components/ui/motion-button";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConsultation = () => {
    scrollToSection("contact");
    // Add analytics tracking if needed
    console.log("Consultation button clicked");
  };

  // Navigation animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -5 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    }),
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  // Mobile menu animation variants
  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    },
    exit: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const mobileNavItemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  const navItems = [
    { name: "About", id: "about" },
    { name: "Services", id: "services" }, 
    { name: "Testimonials", id: "testimonials" }, 
    { name: "Contact", id: "contact" }
  ];

  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/" className="flex items-center">
            <motion.img 
              src="/lovable-uploads/6f4dd44a-7253-4d40-b53a-8949ddd9f253.png" 
              alt="Nuevanex Logo" 
              className="h-12"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            />
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navItems.map((item, index) => (
            <motion.button 
              key={item.name} 
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "underline-animation font-medium transition-colors duration-300",
                isScrolled ? "text-nuevanex-dark" : "text-white"
              )}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              custom={index}
            >
              {item.name}
            </motion.button>
          ))}
        </nav>

        <motion.div 
          className="hidden md:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <MotionButton 
            className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white"
            onClick={handleConsultation}
          >
            Get Free Consultation
          </MotionButton>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-nuevanex-red"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.button>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg overflow-hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col py-4">
              {navItems.map((item, index) => (
                <motion.button 
                  key={item.name} 
                  onClick={() => scrollToSection(item.id)}
                  className="px-6 py-3 text-nuevanex-dark hover:bg-nuevanex-light transition-colors text-left"
                  variants={mobileNavItemVariants}
                  custom={index}
                  whileHover={{ x: 5 }}
                >
                  {item.name}
                </motion.button>
              ))}
              <motion.div 
                className="px-6 py-3"
                variants={mobileNavItemVariants}
                custom={navItems.length}
              >
                <Button 
                  className="w-full bg-nuevanex-red hover:bg-nuevanex-red/90 text-white"
                  onClick={handleConsultation}
                >
                  Get Free Consultation
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
