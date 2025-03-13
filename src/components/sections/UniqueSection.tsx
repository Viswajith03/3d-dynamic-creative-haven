
import { useRef, useEffect } from "react";
import { CheckCircle, Sparkles, Award, Target, Users, TrendingUp, MessageSquare, Heart } from "lucide-react";

const features = [
  {
    title: "Innovation at the Core",
    description: "We embrace the latest trends, technologies, and data-driven strategies to craft unique and impactful campaigns.",
    icon: <Sparkles className="h-8 w-8" />
  },
  {
    title: "Client-Centric Approach",
    description: "Every brand has a unique story, and we take the time to understand our clients' vision, goals, and challenges.",
    icon: <Users className="h-8 w-8" />
  },
  {
    title: "Creativity Meets Strategy",
    description: "We don't just create visually appealing campaigns—we ensure they are backed by research and consumer insights.",
    icon: <Target className="h-8 w-8" />
  },
  {
    title: "Transparent & Ethical Practices",
    description: "Honesty and integrity are at the heart of everything we do. We believe in clear communication and ethical marketing.",
    icon: <CheckCircle className="h-8 w-8" />
  },
  {
    title: "Teamwork & Collaboration",
    description: "Our team thrives on a collaborative spirit where ideas flow freely, and every member contributes to crafting exceptional campaigns.",
    icon: <MessageSquare className="h-8 w-8" />
  },
  {
    title: "Results-Driven Mindset",
    description: "Success for us is not just about creativity—it's about delivering real, tangible outcomes for our clients.",
    icon: <TrendingUp className="h-8 w-8" />
  },
];

const UniqueSection = () => {
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
    <section id="unique" className="py-20 bg-nuevanex-dark text-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nuevanex-red/20 text-nuevanex-red mb-4">
            <Award className="mr-1 h-4 w-4" />
            What Sets Us Apart
          </span>
          <h2 className="section-title mb-6">
            What Makes <span className="text-nuevanex-red">Nuevanex Digilab</span> Unique
          </h2>
          <p className="text-lg text-gray-300">
            At Nuevanex Digilab, we believe that innovation, collaboration, and results-driven 
            creativity define who we are. Our agency culture is built on a foundation of passion, 
            adaptability, and a relentless pursuit of excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="reveal bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 border border-transparent hover:border-nuevanex-red/20 group"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 text-nuevanex-red transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 group-hover:text-nuevanex-red transition-colors duration-300">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <div className="relative inline-block">
            <p className="text-xl text-gray-300 italic">
              "At Nuevanex Digilab, we don't just market brands—we create experiences, build connections, 
              and drive success in the digital world. <Heart className="inline-block h-5 w-5 text-nuevanex-red animate-pulse" />"
            </p>
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-nuevanex-red/50 rounded-full"></div>
          </div>
        </div>
      </div>
      
      {/* Background animated elements */}
      <div className="absolute top-1/4 right-10 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "3s" }}></div>
      <div className="absolute bottom-1/4 left-10 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "4s" }}></div>
    </section>
  );
};

export default UniqueSection;
