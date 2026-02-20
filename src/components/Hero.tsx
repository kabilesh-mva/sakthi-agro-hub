import { useState, useEffect } from "react";
import { Phone, ShoppingCart, MessageCircle } from "lucide-react";
import callousedHands from "../assets/calloused-hands.webp";
import heroFarming from "../assets/hero-farming.jpg";
import CountUp from "./CountUp";

// Optimized audience content
const audienceContent = {
  farmers: {
    headline: "Your Pump at 4 AM, Guaranteed",
    subhead: "Reliable equipment that works when monsoons hit - backed by 24/7 field support",
    stats: [
      { value: "5,000+", label: "Happy Farmers" },
      { value: "98%", label: "First-Time Fix Rate" },
      { value: "24/7", label: "Field Support" },
    ],
    ctaColor: "#FF9800",
  },
  retailers: {
    headline: "Your Territory, Your Growth",
    subhead: "Exclusive dealer partnerships with high margins and same-day parts delivery",
    stats: [
      { value: "120+", label: "Authorized Dealers" },
      { value: "35%", label: "Avg. Margin" },
      { value: "48hrs", label: "Parts Delivery" },
    ],
    ctaColor: "#2E7D32",
  },
  manufacturers: {
    headline: "Quality Partnerships, Guaranteed Results",
    subhead: "Premium agricultural equipment manufacturing with strict quality standards",
    stats: [
      { value: "200+", label: "Manufacturing Partners" },
      { value: "99.5%", label: "Quality Score" },
      { value: "24/5", label: "Production Support" },
    ],
    ctaColor: "#2E7D32",
  },
  customers: {
    headline: "Your Agricultural Success, Our Mission",
    subhead: "Complete agricultural solutions with expert guidance and genuine parts",
    stats: [
      { value: "10,000+", label: "Satisfied Customers" },
      { value: "15+", label: "Years Experience" },
      { value: "99%", label: "Customer Satisfaction" },
    ],
    ctaColor: "#FF9800",
  },
};

const Hero = () => {
  const images = [callousedHands, heroFarming];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAudience, setSelectedAudience] = useState("farmers");

  // Rotate background images - slower interval for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentContent = audienceContent[selectedAudience as keyof typeof audienceContent];
  const whatsappLink = "https://wa.me/919443600205";
  const phoneLink = "tel:+919443600205";

  return (
    <div className="relative min-h-[85vh] w-full overflow-hidden bg-[#052e16]">
      {/* Optimized Background - CSS transition instead of framer-motion */}
      <div className="absolute inset-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-40" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052e16] via-[#052e16]/90 to-[#052e16]/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Audience Switcher - Simplified */}
          <div className="flex flex-wrap justify-center gap-2 mb-6">
            {Object.keys(audienceContent).map((audience) => (
              <button
                key={audience}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 capitalize ${
                  selectedAudience === audience
                    ? "bg-[#F9A300] text-black shadow-lg"
                    : "bg-white/10 text-white/80 hover:bg-white/20"
                }`}
                onClick={() => setSelectedAudience(audience)}
              >
                {audience}
              </button>
            ))}
          </div>

          {/* Headline - Simplified */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
              {currentContent.headline}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              {currentContent.subhead}
            </p>
          </div>

          {/* Stats - Optimized grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            {currentContent.stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10"
              >
                <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                  <CountUp value={stat.value} />
                </div>
                <div className="text-[#F9A300] text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* CTA Buttons - Simplified */}
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href={phoneLink}
              className="inline-flex items-center justify-center px-6 py-3 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
            >
              <Phone size={18} className="mr-2" />
              Call Now
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200"
            >
              <ShoppingCart size={18} className="mr-2" />
              View Products
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#25D366] hover:bg-[#128C7E] text-white font-semibold rounded-lg transition-all duration-200 shadow-lg"
            >
              <MessageCircle size={18} className="mr-2" />
              {currentContent.ctaColor === "#FF9800" ? "Chat on WhatsApp" : "Contact Us"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
