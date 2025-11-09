import { Button } from "@/components/ui/button";
import { ArrowRight, Phone, MessageCircle } from "lucide-react";
import heroImage1 from "@/assets/hero-farming.jpg";
import heroImage2 from "@/assets/hero-farming2.jpg";
import heroImage3 from "@/assets/hero-farming3.jpg";
import heroImage4 from "@/assets/hero-farming4.jpg";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const images = [heroImage1, heroImage2, heroImage3, heroImage4];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Parallax effect for background
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Image rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 500); // Duration of transition animation
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section
      ref={heroRef}
      className="relative h-screen min-h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900"
    >
      {/* Background Images with transition effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{
              opacity: index === currentImageIndex ? 1 : 0,
              scale: index === currentImageIndex ? 1 : 1.1,
            }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{ zIndex: index === currentImageIndex ? 10 : 1 }}
          >
            <img
              src={image}
              alt={`Agricultural equipment in early morning light ${index + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: `translate(${mousePosition.x * 0.01}px, ${
                  mousePosition.y * 0.01
                }px)`,
              }}
            />
          </motion.div>
        ))}
        {/* Dark-to-transparent gradient overlay from left to right */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent"></div>
      </div>

      {/* Image indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentImageIndex(index);
                setIsTransitioning(false);
              }, 500);
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentImageIndex ? "bg-white" : "bg-white/50"
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>

      {/* Container with max-width */}
      <div className="container mx-auto px-4 relative z-20 max-w-6xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8 w-full">
          {/* Left-aligned text content */}
          <div className="w-full lg:w-1/2 text-left text-white space-y-8 lg:text-left lg:mx-auto lg:max-w-3xl">
            {/* Frosted glass badges row */}
            <motion.div
              className="flex flex-wrap justify-start gap-3 lg:justify-start"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {[
                "ISO Certified",
                "10,000+ Products Serviced",
                "Pan-India Delivery",
                "Authorized Dealers",
              ].map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/20 hover:transform hover:translate-y-[-2px] transition-transform duration-300"
                >
                  <svg
                    className="w-4 h-4 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-sm font-medium">{badge}</span>
                </div>
              ))}
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight lg:text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Empowering{" "}
              <span className="text-[#7BC67E] font-extrabold drop-shadow-lg">
                5,000+
              </span>{" "}
              Farmers
              <br />
              with{" "}
              <span className="text-[#A3E635] font-extrabold drop-shadow-lg">
                Reliable Agro
              </span>{" "}
              Solutions
              <span className="text-[#FFD43B] font-extrabold drop-shadow-lg animate-pulse">
                {" "}
                Since 2012
              </span>
            </motion.h1>

            {/* Supporting text */}
            <motion.div
              className="space-y-4 mt-6 lg:text-left"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <p className="text-base sm:text-lg opacity-85 leading-relaxed">
                Trusted by Farmers and Dealers for Quality Sprayers, Pumps, and
                Engines Since 2012.
              </p>
              <p className="text-base sm:text-lg opacity-85 leading-relaxed">
                Your trusted partner for agricultural equipment, machinery
                sales, expert service, and genuine spare parts.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row justify-start gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[150px]"
              >
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 font-medium transition-all duration-300">
                  <span>View Products</span>
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[150px]"
              >
                <Button className="w-full bg-orange-400 hover:bg-orange-500 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 font-medium transition-all duration-300">
                  <Phone className="w-5 h-5" />
                  <span>Call Now</span>
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[150px]"
              >
                <Button className="w-full bg-green-500 hover:bg-green-60 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 font-medium transition-all duration-300">
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </Button>
              </motion.div>
            </motion.div>

            {/* Scroll hint arrow */}
            <motion.div
              className="mt-12 flex flex-col items-start text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: isVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <div className="animate-bounce mb-2">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7m7 7V3"
                  />
                </svg>
              </div>
              <span className="text-sm">Scroll to explore</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
