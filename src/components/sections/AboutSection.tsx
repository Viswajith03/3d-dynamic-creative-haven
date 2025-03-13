
import { useRef, useEffect } from "react";

const AboutSection = () => {
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
    <section id="about" className="py-20 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="section-title mb-6 reveal">
            How and Why <span className="text-nuevanex-red">Nuevanex Digilab</span> Was Founded
          </h2>
          <p className="text-lg text-gray-700 reveal">
            Nuevanex Digilab was founded with a vision to revolutionize the advertising 
            and digital marketing landscape by combining creativity with data-driven strategies. 
            Recognizing the growing need for brands to establish a strong online presence, 
            we set out to bridge the gap between traditional advertising and modern digital marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="reveal">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-nuevanex-red to-nuevanex-dark opacity-90"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
                <p className="text-center">
                  At Nuevanex Digilab, our mission is to empower businesses with innovative 
                  advertising and digital marketing solutions that drive growth, engagement, 
                  and brand success. We blend creativity, technology, and data-driven strategies 
                  to craft impactful campaigns that connect brands with their audiences in meaningful ways.
                </p>
              </div>
            </div>
          </div>

          <div className="reveal">
            <div className="relative h-[400px] rounded-xl overflow-hidden shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-br from-nuevanex-dark to-nuevanex-navy opacity-90"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8">
                <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                <p className="text-center">
                  Our vision is to be a leading digital marketing and advertising agency that 
                  transforms brands through cutting-edge strategies and creative excellence. 
                  We aim to redefine the industry by setting new benchmarks in innovation, 
                  performance, and customer satisfaction, helping businesses thrive in the 
                  ever-evolving digital landscape.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center reveal">
          <p className="text-xl text-gray-700 italic">
            "At Nuevanex Digilab, we believe in storytelling powered by technology, 
            ensuring that every campaign we create leaves a lasting impression."
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
