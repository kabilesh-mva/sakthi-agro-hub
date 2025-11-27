import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, ShoppingCart } from "lucide-react";

// Import the images
import callousedHands from "/src/assets/calloused-hands.webp";
import heroFarming from "/src/assets/hero-farming.jpg";
import heroFarming4 from "/src/assets/hero-farming4.jpg";

// Import CSS
import "./Hero.css";

// Import CountUp
import CountUp from "./CountUp";

// Import Ribbons
import Ribbons from "./Ribbons";

// Dust Particle System Component
const DustParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      color: string;
      resetPosition: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1; // Size between 1-3 pixels
        this.speedX = Math.random() * 0.5 - 0.25; // Slow horizontal movement
        this.speedY = Math.random() * 0.5 - 0.5; // Slow vertical movement (slightly upward)
        this.opacity = Math.random() * 0.1 + 0.05; // Very low opacity (0.05-0.15)
        this.color = `rgba(210, 180, 140, ${this.opacity})`; // Dusty beige color
        this.resetPosition = Math.random() * 100 + 50; // Random reset threshold
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Add some organic movement variation
        this.speedX += Math.random() * 0.05 - 0.025;
        this.speedY += Math.random() * 0.05 - 0.025;

        // Limit speed to prevent particles from moving too fast
        if (this.speedX > 0.5) this.speedX = 0.5;
        if (this.speedX < -0.5) this.speedX = -0.5;
        if (this.speedY > 0.5) this.speedY = 0.5;
        if (this.speedY < -0.5) this.speedY = -0.5;

        // Reset particles that go off screen
        if (
          this.x > canvas.width ||
          this.x < 0 ||
          this.y > canvas.height ||
          this.y < 0
        ) {
          if (Math.random() > 0.7) {
            // Only reset some particles to create variety
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
          }
        }

        // Occasionally reset particles for natural appearance
        if (Math.random() < 0.001) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    const particleCount = Math.floor(window.innerWidth / 8); // Adjust density based on screen width

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full pointer-events-none z-11"
    />
  );
};

// Audience-specific content data
const audienceContent = {
  farmers: {
    headline: "Your Pump at 4 AM, Guaranteed",
    subhead:
      "Reliable equipment that works when monsoons hit - backed by 24/7 field support across Tamil Nadu",
    stats: [
      { value: "5,000+", label: "Happy Farmers" },
      { value: "98%", label: "First-Time Fix Rate" },
      { value: "24/7", label: "Field Support" },
    ],
    ctaText: "Talk to Our Support Team",
    ctaColor: "#FF9800",
  },
  retailers: {
    headline: "Your Territory, Your Growth",
    subhead:
      "Exclusive dealer partnerships with high margins, training, and same-day parts delivery",
    stats: [
      { value: "120+", label: "Authorized Dealers" },
      { value: "35%", label: "Avg. Margin" },
      { value: "48hrs", label: "Parts Delivery" },
    ],
    ctaText: "Become a Dealer",
    ctaColor: "#2E7D32",
  },
  manufacturers: {
    headline: "Quality Partnerships, Guaranteed Results",
    subhead:
      "Premium agricultural equipment manufacturing with strict quality standards and bulk order support",
    stats: [
      { value: "200+", label: "Manufacturing Partners" },
      { value: "99.5%", label: "Quality Score" },
      { value: "24/5", label: "Production Support" },
    ],
    ctaText: "Partner With Us",
    ctaColor: "#2E7D32",
  },
  customers: {
    headline: "Your Agricultural Success, Our Mission",
    subhead:
      "Complete agricultural solutions with expert guidance, genuine parts, and reliable service",
    stats: [
      { value: "10,000+", label: "Satisfied Customers" },
      { value: "15+", label: "Years Experience" },
      { value: "9%", label: "Customer Satisfaction" },
    ],
    ctaText: "Get Quote Now",
    ctaColor: "#FF9800",
  },
};

// Custom hook to detect when an element is in the viewport
const useInView = (
  ref: React.RefObject<Element>,
  rootMargin: string = "0px"
) => {
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          setHasBeenInView(true);
        } else {
          setIsInView(false);
        }
      },
      { rootMargin }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, rootMargin]);

  return { isInView, hasBeenInView };
};

const Hero = () => {
  const images = [callousedHands, heroFarming4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAudience, setSelectedAudience] = useState("farmers");

  // Ref for stats section to detect when it's in view
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const { hasBeenInView: statsSectionVisible } = useInView(
    statsSectionRef,
    "-100px"
  );

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // WhatsApp link
  const whatsappLink = "https://wa.me/919443600205";
  const phoneLink = "tel:+919443600205";

  // Ripple effect function
  const createRipple = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const button = e.currentTarget;
    const circle = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${
      e.clientX - button.getBoundingClientRect().left - radius
    }px`;
    circle.style.top = `${
      e.clientY - button.getBoundingClientRect().top - radius
    }px`;
    circle.classList.add("ripple");

    const ripple = button.getElementsByClassName("ripple")[0];
    if (ripple) {
      ripple.remove();
    }

    button.appendChild(circle);
  };

  // Get current audience content
  const currentAudienceContent =
    audienceContent[selectedAudience as keyof typeof audienceContent];

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (heroRef.current && e.touches.length > 0) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.touches[0].clientX - rect.left,
          y: e.touches[0].clientY - rect.top,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Calculate cursor-based offsets for wind effect
  const calculateWindOffset = (
    elementType: "lightRay" | "fog" | "glassCard",
    baseOffset: number = 0
  ) => {
    if (!heroRef.current) return { x: 0, y: 0 };

    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Normalize mouse position relative to center (-1 to 1)
    const normalizedX = (mousePosition.x - centerX) / centerX;
    const normalizedY = (mousePosition.y - centerY) / centerY;

    // Apply different sensitivities based on element type
    let sensitivity = 1;
    switch (elementType) {
      case "lightRay":
        sensitivity = 0.02; // 1-2 degrees rotation
        break;
      case "fog":
        sensitivity = 3; // 3-5px movement
        break;
      case "glassCard":
        sensitivity = 1; // 1px movement
        break;
    }

    return {
      x: normalizedX * sensitivity * (elementType === "lightRay" ? 10 : 1),
      y: normalizedY * sensitivity * (elementType === "lightRay" ? 100 : 1),
    };
  };

  return (
    <div ref={heroRef} className="relative min-h-[90vh] w-full overflow-hidden">
      {/* Background Image Slideshow */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {images.map((image, index) => (
          <motion.div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat ${
              index === currentIndex ? "opacity-100 z-0" : "opacity-0 z-[-1]"
            }`}
            style={{ backgroundImage: `url(${image})` }}
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0 }}
            transition={{ duration: 1.5 }}
          />
        ))}

        {/* Atmospheric effects */}
        {/* Mist layer with wind motion */}
        {/* Mist layer - Removed */}
        {/* <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(255,255,0.1)] to-transparent z-10 pointer-events-none"
          style={{
            transform: `translate(${calculateWindOffset("fog").x}px, ${
              calculateWindOffset("fog").y
            }px)`,
          }}
        ></div> */}

        {/* Vignette effect - Removed */}
        {/* <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0.4)_100%)] z-10 pointer-events-none"></div> */}

        {/* Dark overlay for text readability - Removed as per user request */}
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#000]/[0.3] to-[#000]/[0.7] z-10 pointer-events-none"></div> */}
      </div>

      {/* Lens flare effect - Removed */}
      {/* <div className="absolute inset-0 z-14 pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-white/20 to-transparent rounded-full blur-3xl"></div>
      </div> */}

      {/* Cinematic light rays effect - removed sliding vertical dividers, keeping wind motion */}
      {/* Cinematic light rays effect - Removed */}
      {/* <div
        className="absolute inset-0 z-15 pointer-events-none opacity-20"
        style={{
          transform: `rotate(${calculateWindOffset("lightRay").x}deg) rotateY(${
            calculateWindOffset("lightRay").y
          }deg)`,
        }}
      >
        <div className="absolute top-0 left-1/4 w-1 h-full bg-gradient-to-b from-white/30 to-transparent"></div>
        <div className="absolute top-0 left-3/4 w-1 h-full bg-gradient-to-b from-white/30 to-transparent"></div>
      </div> */}

      {/* Main content */}
      {/* Dust Particle System */}
      <DustParticleSystem />
      <div className="relative z-20 min-h-[90vh] flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        {/* Ribbon cursor effect - positioned inside the content div to align with mouse tracking */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <Ribbons
            baseThickness={30}
            colors={["#F9A300", "#2E7D32"]}
            speedMultiplier={0.5}
            maxAge={500}
            enableFade={false}
            enableShaderEffect={true}
          />
        </div>
        <div className="max-w-6xl mx-auto w-full text-center">
          {/* Audience Switcher */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {Object.keys(audienceContent).map((audience) => (
              <button
                key={audience}
                className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition-all duration-30 capitalize ${
                  selectedAudience === audience
                    ? "bg-[#1D6F3D] text-white shadow-lg transform scale-105"
                    : "bg-white/20 text-white/90 hover:bg-white/30"
                }`}
                onClick={() => setSelectedAudience(audience)}
              >
                {audience}
              </button>
            ))}
          </motion.div>

          {/* Micro-label */}
          <motion.div
            className="text-sm sm:text-base text-white/80 mb-6 tracking-wide font-medium"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted by Farmers, Dealers & Retailers Across Tamil Nadu
          </motion.div>

          {/* Radial gradient specifically behind headline */}
          <div className="relative mb-6">
            <div className="absolute -inset-8 z-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,0.15)_0%,transparent_70%)] rounded-2xl blur-xl"></div>
            <motion.div
              className="relative z-10 bg-black/20 backdrop-blur-sm rounded-3xl p-6 sm:p-10 border border-white/10 shadow-xl inline-block max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 leading-tight tracking-tight drop-shadow-[0_2px_8px_rgba(0,0,0.25)]">
                {currentAudienceContent.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 max-w-3xl mx-auto drop-shadow-[0_1px_4px_rgba(0,0,0,0.25)]">
                {currentAudienceContent.subhead}
              </p>
            </motion.div>
          </div>

          {/* Stats Section */}
          <motion.div
            ref={statsSectionRef}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto mb-12"
            key={selectedAudience} // Add key to trigger re-animation when audience changes
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
          >
            {currentAudienceContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`rounded-2xl p-6 relative overflow-hidden stat-card ${
                  statsSectionVisible ? "animate" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }} // Staggered animation with slide-up effect
                whileHover={{ scale: 1.03 }}
                style={{
                  transform: `translate(${
                    calculateWindOffset("glassCard").x
                  }px, ${calculateWindOffset("glassCard").y}px)`,
                }}
              >
                <div className="stat-card-inner relative z-10">
                  {/* Decorative corner accents */}
                  <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/30"></div>
                  <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/30"></div>
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/30"></div>
                  <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/30"></div>

                  <div className="stat-card-content">
                    {/* Stat value with animation */}
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                      <CountUp
                        value={stat.value}
                        key={`${selectedAudience}-${index}`}
                      />
                    </div>
                    <div className="text-white/90 text-base md:text-lg font-medium mb-1">
                      {stat.label}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <a
              href={phoneLink}
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] hover:from-[#1B5E20] hover:to-[#0D3B1B] text-white font-bold text-base rounded-full shadow-3xl hover:shadow-3xl transform hover:scale-105 transition-all duration-30 border-2 border-transparent hover:border-[#154d26] min-w-[200px] relative overflow-hidden group"
              onClick={createRipple}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#2E7D32] to-[#1B5E20] opacity-0 group-hover:opacity-100 transition-opacity duration-30"></span>
              <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-out"></span>
              <Phone size={20} className="mr-2" />
              Call Now
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#F9A300] to-[#FF6F00] hover:from-[#e08e00] hover:to-[#E6510] text-white font-bold text-base rounded-full shadow-3xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#d48200] min-w-[200px] relative overflow-hidden group"
              onClick={createRipple}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#F9A300] to-[#FF6F00] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-out"></span>
              <ShoppingCart size={20} className="mr-2" />
              View Products
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-[#25D366] to-[#128C7E] hover:from-[#1da851] hover:to-[#075e54] text-white font-bold text-base rounded-full shadow-3xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 border-2 border-transparent hover:border-[#1a7c4c] min-w-[200px] relative overflow-hidden group"
              onClick={createRipple}
              style={{ backgroundColor: currentAudienceContent.ctaColor }}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-[#25D366] to-[#128C7E] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 rounded-full transition-transform duration-700 ease-out"></span>
              <MessageCircle size={20} className="mr-2" />
              {currentAudienceContent.ctaText}
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
