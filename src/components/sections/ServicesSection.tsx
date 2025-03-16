
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { Zap, MousePointerClick, Layers, Target, RotateCw, Rocket } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { MotionCard } from "@/components/ui/motion-card";
import { MotionButton } from "@/components/ui/motion-button";
import { fadeInUp, staggerContainer, iconVariants } from "@/utils/animationVariants";

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
      <motion.div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute -top-20 -right-20 w-64 h-64 bg-nuevanex-red/5 rounded-full"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.7, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute -bottom-32 -left-20 w-96 h-96 bg-nuevanex-red/5 rounded-full"
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.6, 0.4]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/4 w-2 h-2 bg-nuevanex-red rounded-full"
          animate={{ 
            scale: [1, 3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute top-2/3 left-1/4 w-2 h-2 bg-nuevanex-red rounded-full"
          animate={{ 
            scale: [1, 3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute top-1/4 left-1/3 w-2 h-2 bg-nuevanex-red rounded-full"
          animate={{ 
            scale: [1, 3, 1],
            opacity: [0.5, 0, 0.5]
          }}
          transition={{ 
            repeat: Infinity,
            duration: 5,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </motion.div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.h2 
            className="section-title mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Our <motion.span 
                  className="text-nuevanex-red"
                  initial={{ opacity: 0.5 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >Services</motion.span>
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-700"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            We offer a comprehensive range of advertising and digital marketing services
            to help your business stand out and succeed in today's competitive landscape.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, index) => (
            <MotionCard 
              key={service.id} 
              className="h-full hover:shadow-lg transition-all duration-300 overflow-hidden border-none shadow group"
              delay={index}
            >
              <div className="absolute top-0 left-0 w-1 h-full bg-nuevanex-red transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-500"></div>
              <CardHeader>
                <motion.div 
                  className="mb-4 text-nuevanex-red"
                  variants={iconVariants}
                  whileHover="hover"
                >
                  {service.icon}
                </motion.div>
                <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                <CardDescription className="text-gray-600">{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Button 
                    variant="link" 
                    className="text-nuevanex-red p-0 hover:underline group"
                    onClick={() => handleLearnMore(service.title, service.id)}
                  >
                    Learn More 
                    <motion.span 
                      className="inline-block"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
                    >
                      →
                    </motion.span>
                  </Button>
                </motion.div>
              </CardContent>
            </MotionCard>
          ))}
        </motion.div>

        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <MotionButton 
            className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white text-lg px-8 py-6 rounded-md relative overflow-hidden group"
            onClick={handleDiscoverAll}
          >
            <span className="relative z-10">Discover All Services</span>
            <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            <span className="absolute inset-0 bg-nuevanex-red/90 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left delay-75"></span>
          </MotionButton>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
