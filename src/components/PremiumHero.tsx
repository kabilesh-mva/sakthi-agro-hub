import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Phone, ShoppingCart, User } from "lucide-react";

// Import the images
import callousedHands from "../assets/calloused-hands.webp";
import heroFarming from "../assets/hero-farming.jpg";
import heroFarming4 from "../assets/hero-farming4.jpg";

// Import CSS
import "./PremiumHero.css";

// Import CountUp
import CountUp from "./CountUp";

// Import Ribbons
import Ribbons from "./Ribbons";

// Optimized Dust Particle System with reduced count and better performance
const DustParticleSystem = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Use device pixel ratio for sharp rendering
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
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

      constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = Math.random() * window.innerHeight;
        this.size = Math.random() * 1.5 + 0.5; // Smaller particles
        this.speedX = Math.random() * 0.3 - 0.15; // Slower movement
        this.speedY = Math.random() * 0.3 - 0.3; // Slow upward drift
        this.opacity = Math.random() * 0.08 + 0.02; // Very subtle
        this.color = `rgba(210, 180, 140, ${this.opacity})`;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        // Reset particles that go off screen
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
          this.x = Math.random() * window.innerWidth;
          this.y = Math.random() * window.innerHeight;
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

    // Create fewer particles for better performance
    const particles: Particle[] = [];
    const particleCount = Math.min(Math.floor(window.innerWidth / 15), 100); // Max 100 particles

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Throttled animation loop
    let animationFrameId: number;
    let lastTime = 0;
    const throttleMs = 16; // ~60fps cap

    const animate = (timestamp: number) => {
      if (!ctx) return;
      
      if (timestamp - lastTime >= throttleMs) {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        particles.forEach((particle) => {
          particle.update();
          particle.draw();
        });
        lastTime = timestamp;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate(0);

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
      style={{ willChange: "auto" }}
    />
  );
};

// Role-based content data
const roleContent = {
  farmers: {
    subtext:
      "Reliable pumps and sprayers that keep your fields running 24/7 — even when monsoons hit.",
    stats: [
      {
        value: "5000+",
        label: "Happy Farmers",
        sublabel: "Trusted across Tamil Nadu",
      },
      {
        value: "98%",
        label: "First-Time Fix Rate",
        sublabel: "Based on 2023 field audits",
      },
      {
        value: "24/7",
        label: "Field Support",
        sublabel: "Always-on service team",
      },
    ],
  },
  dealers: {
    subtext:
      "Fast-moving products, guaranteed availability, and dealer-first logistics you can count on.",
    stats: [
      {
        value: "150+",
        label: "Active Dealers",
        sublabel: "Growing dealer network",
      },
      {
        value: "48 hrs",
        label: "Restock Time",
        sublabel: "Fastest replenishment in TN",
      },
      {
        value: "10,000+",
        label: "Units Delivered",
        sublabel: "Proven supply reliability",
      },
    ],
  },
  retailers: {
    subtext:
      "Reliable products, high margins, and quick delivery to help you serve your customers better.",
    stats: [
      {
        value: "350+",
        label: "Retail Partners",
        sublabel: "Across Tamil Nadu",
      },
      {
        value: "30%",
        label: "Avg. Margin",
        sublabel: "High retailer profitability",
      },
      {
        value: "1 Day",
        label: "Delivery Assurance",
        sublabel: "Guaranteed dispatch window",
      },
    ],
  },
  mechanics: {
    subtext:
      "Durable parts, easy-to-service machines, and technical support that keeps your work effortless.",
    stats: [
      {
        value: "2000+",
        label: "Mechanics Supported",
        sublabel: "Statewide ecosystem",
      },
      {
        value: "1.5 hrs",
        label: "Avg. Repair Time",
        sublabel: "Based on workshop reports",
      },
      { value: "500+", label: "Spare Parts", sublabel: "Always in stock" },
    ],
  },
};

const PremiumHero = () => {
  const images = [callousedHands, heroFarming, heroFarming4];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedRole, setSelectedRole] = useState("farmers");

  // Rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  // Automate role switching (Slideshow effect)
  useEffect(() => {
    const roles = Object.keys(roleContent);
    const interval = setInterval(() => {
      setSelectedRole((prevRole) => {
        const currentIndex = roles.indexOf(prevRole);
        const nextIndex = (currentIndex + 1) % roles.length;
        return roles[nextIndex];
      });
    }, 5000); // Switch role every 5 seconds (allows time to read stats)

    return () => clearInterval(interval);
  }, []);

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

  // Get current role content
  const currentRoleContent =
    roleContent[selectedRole as keyof typeof roleContent];

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
      x: normalizedX * sensitivity * (elementType === "lightRay" ? 100 : 1),
      y: normalizedY * sensitivity * (elementType === "lightRay" ? 100 : 1),
    };
  };

  return (
    <div
      ref={heroRef}
      className="relative min-h-[90vh] w-full overflow-hidden flex items-center"
    >
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

        {/* Brand Gradient Overlay - Left aligned for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#052e16] via-[#052e16]/80 to-transparent z-10 pointer-events-none"></div>

        {/* Bottom gradient for stats visibility */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#052e16] to-transparent z-10 pointer-events-none"></div>
      </div>

      {/* Main content */}
      <DustParticleSystem />

      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12">
        {/* Left Column: Text Content */}
        <div className="w-full lg:w-1/2 text-left space-y-8">
          {/* Role Switcher */}
          <motion.div
            className="flex flex-wrap gap-2 mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {Object.keys(roleContent).map((role) => (
              <button
                key={role}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 capitalize border ${
                  selectedRole === role
                    ? "bg-[#F9A300] border-[#F9A300] text-black shadow-[0_0_15px_rgba(249,163,0,0.4)]"
                    : "bg-white/5 border-white/20 text-white/80 hover:bg-white/10 hover:border-white/40"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                {role}
              </button>
            ))}
          </motion.div>

          {/* Micro-label */}
          <motion.div
            className="flex items-center gap-3 text-sm sm:text-base text-[#F9A300] font-semibold tracking-wide uppercase"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="w-8 h-[2px] bg-[#F9A300]"></span>
            Trusted by Farmers Since 2012
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-[1.1] tracking-tight mb-6">
              Where Indian <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F9A300] to-[#FF6F00] drop-shadow-sm">
                Agriculture
              </span>{" "}
              <br />
              Connects
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
              {currentRoleContent.subtext}
            </p>
          </motion.div>

          {/* Primary CTA Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a
              href={phoneLink}
              className="inline-flex items-center justify-center px-8 py-4 bg-[#2E7D32] hover:bg-[#1B5E20] text-white font-bold text-base rounded-lg shadow-lg hover:shadow-[#2E7D32]/40 transform hover:-translate-y-1 transition-all duration-300 border border-[#4CAF50]/30 group"
              onClick={createRipple}
            >
              <Phone
                size={20}
                className="mr-2 group-hover:rotate-12 transition-transform"
              />
              Call Now
            </a>
            <a
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-lg backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 group"
              onClick={createRipple}
            >
              <ShoppingCart
                size={20}
                className="mr-2 group-hover:translate-x-1 transition-transform"
              />
              View Products
            </a>
          </motion.div>
        </div>

        {/* Right Column: Stats & Visuals */}
        <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-end space-y-6 mt-8 lg:mt-0">
          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg"
            key={selectedRole}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.8 }}
          >
            {currentRoleContent.stats.map((stat, index) => (
              <motion.div
                key={index}
                className={`rounded-xl p-5 relative overflow-hidden border border-white/10 bg-black/20 backdrop-blur-md hover:bg-black/30 transition-all duration-300 group ${
                  index === 2 ? "sm:col-span-2" : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                {/* Metallic shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>

                <div className="relative z-10">
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-1 flex items-baseline gap-1">
                    <CountUp
                      value={stat.value}
                      key={`${selectedRole}-${index}`}
                    />
                  </div>
                  <div className="text-[#F9A300] text-sm font-semibold uppercase tracking-wider mb-1">
                    {stat.label}
                  </div>
                  <div className="text-gray-400 text-xs">{stat.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Badge / Extra Info */}
          <motion.div
            className="flex items-center gap-4 bg-white/5 backdrop-blur-sm px-6 py-3 rounded-full border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex -space-x-3">
              {/* Placeholder avatars or icons */}
              <div className="w-8 h-8 rounded-full bg-gray-600 border-2 border-[#052e16] flex items-center justify-center text-white">
                <User size={14} />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-500 border-2 border-[#052e16] flex items-center justify-center text-white">
                <User size={14} />
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-[#052e16] flex items-center justify-center text-white">
                <User size={14} />
              </div>
            </div>
            <div className="text-sm text-gray-300">
              <span className="text-white font-bold">10k+</span> Farmers
              Connected
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PremiumHero;
