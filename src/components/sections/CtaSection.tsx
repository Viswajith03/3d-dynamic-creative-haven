
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const CtaSection = () => {
  return (
    <section className="py-16 bg-nuevanex-red">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Brand's Digital Presence?
          </h2>
          <p className="text-lg text-white/90 mb-8">
            Let's collaborate to create innovative strategies and compelling campaigns
            that will elevate your brand and drive meaningful results.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-white text-nuevanex-red hover:bg-white/90 text-lg px-8 py-6 rounded-md">
              Get Free Consultation
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-md">
              View Our Portfolio
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
