import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-farming.jpg";

export const Hero = () => {
  return (
    <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Agricultural Equipment"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-bold text-primary-foreground mb-6">
            Empowering Farmers Since 2012
          </h1>
          <p className="text-xl md:text-2xl text-primary-foreground/90 mb-8">
            Your trusted partner for agricultural equipment, machinery sales, expert service, and genuine spare parts.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8"
              asChild
            >
              <a href="/products" className="flex items-center gap-2">
                View Products
                <ArrowRight className="h-5 w-5" />
              </a>
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-primary-foreground/10 text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8"
              asChild
            >
              <a href="tel:+919876543210" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Call Now
              </a>
            </Button>

            <Button 
              size="lg" 
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-lg px-8"
              asChild
            >
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-5 w-5" />
                WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
