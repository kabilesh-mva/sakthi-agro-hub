import { Button } from "@/components/ui/button";
import { Phone, MessageCircle, ArrowRight, CheckCircle } from "lucide-react";
import heroImage1 from "@/assets/panoramic-shot-agrucultural-field-with-rays-sun-shining-through-clouds.jpg";
import heroImage2 from "@/assets/large-green-rice-field-with-green-rice-plants-rows.jpg";
import heroImage3 from "@/assets/hardworking-young-farmer-operating-motor-cultivator-prepare-soil-new-seedlings-organic-food-farm.jpg";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [heroImage1, heroImage2, heroImage3];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Images with Enhanced Overlay */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 ${index === currentImageIndex ? 'block' : 'hidden'}`}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1.1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={image}
              alt={`Agricultural Field ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#2E7D32]/90 via-[#1B5E20]/80 to-[#2E7D32]/90" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Trust Badge Strip */}
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-1 text-primary-foreground/90 text-sm sm:text-base font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-300" />
                ISO Certified
              </div>
              <div className="flex items-center gap-1 text-primary-foreground/90 text-sm sm:text-base font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-300" />
                10,000+ Products Serviced
              </div>
              <div className="flex items-center gap-1 text-primary-foreground/90 text-sm sm:text-base font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-300" />
                Pan-India Delivery
              </div>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-2 leading-tight">
              Empowering 5,000+ Farmers with Reliable Agro Solutions Since 2012
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 mb-2 sm:mb-4 max-w-2xl mx-auto sm:mx-0">
              Trusted by Farmers and Dealers for Quality Sprayers, Pumps, and Engines Since 2012
            </p>
            <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 mb-4 sm:mb-8 max-w-3xl mx-auto sm:mx-0">
              Your trusted partner for agricultural equipment, machinery sales, expert service, and genuine spare parts.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center sm:justify-start"
          >
            <Button 
              size="sm"
              className="bg-[#FF6F00] hover:bg-[#E65100] text-white text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto"
              asChild
            >
              <a href="/products" className="flex items-center gap-2">
                View Products
                <ArrowRight className="h-4 sm:h-5 w-4 sm:w-5" />
              </a>
            </Button>
            
            <Button 
              size="sm"
              className="bg-[#2E7D32] hover:bg-[#1B5E20] text-white text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto"
              asChild
            >
              <a href="tel:+919443600205" className="flex items-center gap-2">
                <Phone className="h-4 sm:h-5 w-4 sm:w-5" />
                Call Now
              </a>
            </Button>

            <Button 
              size="sm"
              className="bg-[#25D366] hover:bg-[#20ba5a] text-white text-base sm:text-lg px-4 sm:px-6 py-2 sm:py-3 w-full sm:w-auto"
              asChild
            >
              <a 
                href="https://wa.me/919443600205" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2"
              >
                <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                WhatsApp
              </a>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
