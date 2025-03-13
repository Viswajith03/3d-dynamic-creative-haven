
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const Footer = () => {
  const [email, setEmail] = useState("");
  const { toast } = useToast();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@') && email.includes('.')) {
      toast({
        title: "Newsletter Subscription Successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      console.log("Subscribed with email:", email);
      setEmail("");
    } else {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform: string) => {
    console.log(`Clicked on ${platform} social link`);
    // In a real implementation, these would navigate to actual social media profiles
  };

  return (
    <footer className="bg-nuevanex-dark text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo and About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="h-10 w-10 bg-nuevanex-red rounded-sm flex items-center justify-center text-white font-bold text-lg">
                N
              </div>
              <span className="font-bold text-xl">NUEVANEX</span>
            </div>
            <p className="text-gray-300 mb-4">
              A cutting-edge advertising and digital marketing agency based in Kochi, specializing in innovative brand strategies and creative campaigns.
            </p>
            <div className="flex space-x-4">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <button
                  key={social}
                  onClick={() => handleSocialClick(social)}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-nuevanex-red transition-colors"
                >
                  <span className="sr-only">{social}</span>
                  <div className="w-5 h-5" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { name: "About Us", id: "about" },
                { name: "Services", id: "services" },
                { name: "Portfolio", id: "portfolio" },
                { name: "Team", id: "about" },
                { name: "Blog", id: "blog" },
                { name: "Contact", id: "contact" }
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.id)}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-nuevanex-red shrink-0 mt-0.5" />
                <span className="text-gray-300">Kochi, Kerala, India</span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-nuevanex-red shrink-0" />
                <a href="tel:+911234567890" className="text-gray-300 hover:text-white transition-colors">+91 12345 67890</a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-nuevanex-red shrink-0" />
                <a href="mailto:info@nuevanex.com" className="text-gray-300 hover:text-white transition-colors">info@nuevanex.com</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-bold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to receive updates on our latest projects and marketing insights.
            </p>
            <form onSubmit={handleSubscribe} className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border-white/20 text-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Button type="submit" className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 mt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Nuevanex Digilab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
