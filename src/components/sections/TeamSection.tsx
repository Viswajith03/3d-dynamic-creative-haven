
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Linkedin, Mail, ArrowRight } from "lucide-react";

const teamMembers = [
  {
    id: 1,
    name: "Abhijith",
    role: "Founder & CEO",
    image: "/lovable-uploads/abhijith.png",
    bio: "Visionary leader with over 10 years of experience in digital marketing, specializing in innovative brand strategies and business growth.",
    socialLinks: {
      linkedin: "#",
      email: "#",
    },
  },
  {
    id: 2,
    name: "Hridik",
    role: "Design Head",
    image: "/lovable-uploads/hridik.png",
    bio: "Creative genius with an eye for detail and aesthetics, transforming brand concepts into stunning visual experiences.",
    socialLinks: {
      linkedin: "#",
      email: "#",
    },
  },
  {
    id: 3,
    name: "Viswajith",
    role: "Tech Head",
    image: "/lovable-uploads/viswajith.png",
    bio: "Technology enthusiast with expertise in web development, digital platforms and implementing cutting-edge technical solutions.",
    socialLinks: {
      linkedin: "https://www.linkedin.com/in/nairviswajith/",
      email: "#",
    },
  },
];

const TeamSection = () => {
  return (
    <section id="team" className="py-20 bg-gradient-to-b from-nuevanex-dark to-nuevanex-navy relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-64 h-64 bg-nuevanex-red/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-nuevanex-red/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 reveal">
          <h2 className="section-title text-white mb-6">
            Meet Our <span className="text-nuevanex-red">Team</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            The brilliant minds behind Nuevanex's innovative digital solutions. 
            Our leadership team combines creativity, technical expertise, and strategic vision.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="reveal" 
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <Card className="bg-nuevanex-navy/40 backdrop-blur-sm border border-white/10 overflow-hidden group hover:border-nuevanex-red/50 transition-all duration-500 h-full">
                <div className="relative overflow-hidden">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-nuevanex-navy">
                    <div className="w-full h-96 md:h-80 relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-t from-nuevanex-navy to-transparent z-10"></div>
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-105"
                      />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full p-6 z-20">
                    <h3 className="text-2xl font-bold text-white group-hover:text-nuevanex-red transition-colors duration-300">{member.name}</h3>
                    <p className="text-nuevanex-red font-medium mt-1">{member.role}</p>
                  </div>
                </div>
                <CardContent className="mt-2 p-6">
                  <p className="text-white/80 mb-6">{member.bio}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-3">
                      <a href={member.socialLinks.linkedin} className="text-white/70 hover:text-nuevanex-red transition-colors">
                        <Linkedin size={20} />
                      </a>
                      <a href={`mailto:${member.socialLinks.email}`} className="text-white/70 hover:text-nuevanex-red transition-colors">
                        <Mail size={20} />
                      </a>
                    </div>
                    <a href="#" className="text-nuevanex-red flex items-center text-sm underline-animation">
                      Learn more <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
