
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

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

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="h-10 w-10 bg-nuevanex-red rounded-sm flex items-center justify-center text-white font-bold text-lg">
            N
          </div>
          <span className={cn(
            "font-bold text-xl transition-colors duration-300",
            isScrolled ? "text-nuevanex-dark" : "text-white"
          )}>
            NUEVANEX
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {["About", "Services", "Portfolio", "Blog", "Contact"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={cn(
                "underline-animation font-medium transition-colors duration-300",
                isScrolled ? "text-nuevanex-dark" : "text-white"
              )}
            >
              {item}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white">
            Get Free Consultation
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="md:hidden text-nuevanex-red"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg">
          <nav className="flex flex-col py-4">
            {["About", "Services", "Portfolio", "Blog", "Contact"].map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="px-6 py-3 text-nuevanex-dark hover:bg-nuevanex-light transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
            <div className="px-6 py-3">
              <Button className="w-full bg-nuevanex-red hover:bg-nuevanex-red/90 text-white">
                Get Free Consultation
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
