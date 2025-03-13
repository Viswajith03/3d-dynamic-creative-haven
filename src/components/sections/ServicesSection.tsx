
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import { Zap, MousePointerClick, Layers, Target, RotateCw, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const services = [
  {
    title: "Branding & Identity",
    description: "Logo Design, Brand Strategy, Visual Identity, Brand Guidelines",
    icon: <Layers className="h-8 w-8" />,
    id: "branding-identity"
  },
  {
    title: "Digital Marketing",
    description: "SEO, PPC, Social Media Marketing, Content Marketing, Email Campaigns",
    icon: <Target className="h-8 w-8" />,
    id: "digital-marketing"
  },
  {
    title: "Creative & Design",
    description: "Graphic Design, UI/UX Design, Video Production, Content Creation",
    icon: <Zap className="h-8 w-8" />,
    id: "creative-design"
  },
  {
    title: "Media Planning & Buying",
    description: "TV, Radio, Print, Digital Ads, OOH Advertising",
    icon: <MousePointerClick className="h-8 w-8" />,
    id: "media-planning"
  },
  {
    title: "Public Relations",
    description: "Press Releases, Media Relations, Crisis Management, Influencer Marketing",
    icon: <RotateCw className="h-8 w-8" />,
    id: "public-relations"
  },
  {
    title: "Web Development",
    description: "Website Design, E-commerce Development, CMS Implementation, Maintenance",
    icon: <Rocket className="h-8 w-8" />,
    id: "web-development"
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const handleLearnMore = (service: string, id: string) => {
    // Show toast notification for now, can be updated to navigate to service details page
    toast({
      title: "Service Selected",
      description: `You selected ${service}. We'll provide more details soon.`,
    });
    console.log(`Learn more about ${service}`);
  };

  const handleDiscoverAll = () => {
    // Navigate to services page or expand services section
    toast({
      title: "Discover All Services",
      description: "Exploring all our services. Please wait while we load the details.",
    });
    
    // For now, just scroll through the services section
    if (sectionRef.current) {
      window.scrollBy({
        top: 100,
        behavior: 'smooth'
      });
    }
    console.log("Discover all services clicked");
  };

  return (
    <section id="services" className="py-20 relative bg-nuevanex-light overflow-hidden" ref={sectionRef}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-nuevanex-red/5 rounded-full"></div>
        <div className="absolute -bottom-32 -left-20 w-96 h-96 bg-nuevanex-red/5 rounded-full"></div>
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-nuevanex-red rounded-full animate-ping" style={{ animationDuration: "3s" }}></div>
        <div className="absolute top-2/3 left-1/4 w-2 h-2 bg-nuevanex-red rounded-full animate-ping" style={{ animationDuration: "4s" }}></div>
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-nuevanex-red rounded-full animate-ping" style={{ animationDuration: "5s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16 reveal">
          <h2 className="section-title mb-6">
            Our <span className="text-nuevanex-red">Services</span>
          </h2>
          <p className="text-lg text-gray-700">
            We offer a comprehensive range of advertising and digital marketing services
            to help your business stand out and succeed in today's competitive landscape.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="reveal" style={{ transitionDelay: `${index * 0.1}s` }}>
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 overflow-hidden border-none shadow group">
                <div className="absolute top-0 left-0 w-1 h-full bg-nuevanex-red transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
                <CardHeader>
                  <div className="mb-4 text-nuevanex-red transition-transform duration-300 group-hover:scale-110">{service.icon}</div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    variant="link" 
                    className="text-nuevanex-red p-0 hover:underline group"
                    onClick={() => handleLearnMore(service.title, service.id)}
                  >
                    Learn More 
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button 
            className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white text-lg px-8 py-6 rounded-md relative overflow-hidden group"
            onClick={handleDiscoverAll}
          >
            <span className="relative z-10">Discover All Services</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute inset-0 bg-nuevanex-red/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
