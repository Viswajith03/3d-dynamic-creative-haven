
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote, ArrowLeft, ArrowRight, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechGlobe Inc.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    content: "Nuevanex completely transformed our digital presence. Their strategic approach resulted in a 200% increase in engagement and a significant boost in conversions. The team's creativity and technical expertise are unmatched.",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CEO",
    company: "Innovate Solutions",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    content: "Working with Nuevanex has been a game-changer for our brand. They don't just deliver projects—they become partners in your success. Their holistic approach to digital marketing has helped us establish authority in a competitive market.",
  },
  {
    id: 3,
    name: "Priya Patel",
    role: "Founder",
    company: "Sustainable Living",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    content: "The creativity and strategy behind Nuevanex's campaigns are exceptional. They understood our eco-conscious brand perfectly and created messaging that resonated with our target audience. We've seen a 150% increase in customer acquisition.",
  },
  {
    id: 4,
    name: "David Rodriguez",
    role: "Sales Director",
    company: "Global Reach",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80",
    rating: 5,
    content: "Nuevanex delivered beyond our expectations. Their data-driven approach to our campaigns resulted in metrics that exceeded our goals. The team is responsive, professional, and genuinely invested in our success.",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };

  useEffect(() => {
    // Auto-advance testimonials every 8 seconds
    const interval = setInterval(() => {
      handleNext();
    }, 8000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  return (
    <section id="testimonials" className="py-20 bg-nuevanex-navy relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-80 h-80 bg-nuevanex-red/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-nuevanex-red/5 rounded-full blur-3xl"></div>
        <div className="hidden md:block absolute top-1/3 left-10 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "3s" }}></div>
        <div className="hidden md:block absolute bottom-1/3 right-10 w-2 h-2 bg-nuevanex-red rounded-full animate-ping opacity-75" style={{ animationDuration: "4s" }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 reveal">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-nuevanex-red/20 text-nuevanex-red mb-4">
            <MessageSquare className="mr-1 h-4 w-4" />
            Client Success Stories
          </span>
          <h2 className="section-title text-white mb-6">
            What Our <span className="text-nuevanex-red">Clients Say</span>
          </h2>
          <p className="text-lg text-white/80 max-w-3xl mx-auto">
            Don't just take our word for it. Here's what clients have to say about their experience working with Nuevanex.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto" ref={testimonialsRef}>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden relative">
                    <div className="absolute top-6 right-6 text-nuevanex-red">
                      <Quote className="h-12 w-12 opacity-20" />
                    </div>
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-center mb-6">
                        <div className="flex-shrink-0 mr-4">
                          <img 
                            src={testimonial.image} 
                            alt={testimonial.name} 
                            className="w-16 h-16 rounded-full object-cover border-2 border-nuevanex-red"
                          />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                          <p className="text-nuevanex-red">{testimonial.role}, {testimonial.company}</p>
                          <div className="flex mt-1">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-nuevanex-red text-nuevanex-red" />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-white/90 text-lg md:text-xl leading-relaxed">
                        "{testimonial.content}"
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === activeIndex ? "bg-nuevanex-red w-6" : "bg-white/30 hover:bg-white/50"
                }`}
                onClick={() => {
                  setActiveIndex(i);
                  setIsAnimating(true);
                  setTimeout(() => setIsAnimating(false), 500);
                }}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>
          
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1/2 md:translate-x-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-nuevanex-red hover:text-white hidden md:flex"
              onClick={handlePrev}
              disabled={isAnimating}
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Previous testimonial</span>
            </Button>
          </div>
          
          <div className="absolute top-1/2 right-0 transform -translate-y-1/2 translate-x-1/2 md:translate-x-0">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full bg-white/5 border border-white/10 backdrop-blur-sm text-white hover:bg-nuevanex-red hover:text-white hidden md:flex"
              onClick={handleNext}
              disabled={isAnimating}
            >
              <ArrowRight className="h-5 w-5" />
              <span className="sr-only">Next testimonial</span>
            </Button>
          </div>
        </div>
        
        <div className="text-center mt-12 reveal">
          <Button
            className="bg-nuevanex-red hover:bg-nuevanex-red/90 text-white transition-transform duration-300 hover:scale-105"
            onClick={() => {
              const contactSection = document.getElementById("contact");
              if (contactSection) {
                contactSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
          >
            Become Our Next Success Story
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
