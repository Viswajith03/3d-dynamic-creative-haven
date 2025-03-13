
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef, useEffect } from "react";
import Scene from "@/components/three/Scene";

const services = [
  {
    title: "Branding & Identity",
    description: "Logo Design, Brand Strategy, Visual Identity, Brand Guidelines",
    icon: "✨",
  },
  {
    title: "Digital Marketing",
    description: "SEO, PPC, Social Media Marketing, Content Marketing, Email Campaigns",
    icon: "📊",
  },
  {
    title: "Creative & Design",
    description: "Graphic Design, UI/UX Design, Video Production, Content Creation",
    icon: "🎨",
  },
  {
    title: "Media Planning & Buying",
    description: "TV, Radio, Print, Digital Ads, OOH Advertising",
    icon: "📱",
  },
  {
    title: "Public Relations",
    description: "Press Releases, Media Relations, Crisis Management, Influencer Marketing",
    icon: "🔊",
  },
  {
    title: "Web Development",
    description: "Website Design, E-commerce Development, CMS Implementation, Maintenance",
    icon: "💻",
  },
];

const ServicesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

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

  return (
    <section id="services" className="py-20 relative bg-nuevanex-light overflow-hidden">
      {/* Decorative 3D Background with reduced opacity */}
      <div className="absolute inset-0 opacity-10">
        <Scene type="background" />
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
              <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden border-none shadow">
                <div className="absolute top-0 left-0 w-1 h-full bg-nuevanex-red"></div>
                <CardHeader>
                  <div className="text-3xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                  <CardDescription className="text-gray-600">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button variant="link" className="text-nuevanex-red p-0 hover:underline">
                    Learn More →
                  </Button>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 reveal">
          <Button className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white text-lg px-8 py-6 rounded-md">
            Discover All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
