
import { useRef, useEffect } from "react";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Innovation at the Core",
    description: "We embrace the latest trends, technologies, and data-driven strategies to craft unique and impactful campaigns."
  },
  {
    title: "Client-Centric Approach",
    description: "Every brand has a unique story, and we take the time to understand our clients' vision, goals, and challenges."
  },
  {
    title: "Creativity Meets Strategy",
    description: "We don't just create visually appealing campaigns—we ensure they are backed by research and consumer insights."
  },
  {
    title: "Transparent & Ethical Practices",
    description: "Honesty and integrity are at the heart of everything we do. We believe in clear communication and ethical marketing."
  },
  {
    title: "Teamwork & Collaboration",
    description: "Our team thrives on a collaborative spirit where ideas flow freely, and every member contributes to crafting exceptional campaigns."
  },
  {
    title: "Results-Driven Mindset",
    description: "Success for us is not just about creativity—it's about delivering real, tangible outcomes for our clients."
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
              className="reveal bg-white/5 rounded-lg p-6 backdrop-blur-sm hover:bg-white/10 transition-colors"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 text-nuevanex-red">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <p className="text-xl text-gray-300 italic">
            "At Nuevanex Digilab, we don't just market brands—we create experiences, build connections, 
            and drive success in the digital world. 🚀"
          </p>
        </div>
      </div>
    </section>
  );
};

export default UniqueSection;
