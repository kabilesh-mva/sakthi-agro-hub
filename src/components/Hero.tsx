// SIZE: 6.8KB
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { NetworkBackground } from "./hero/NetworkBackground";
import { AnimatedBackgroundElements } from "./hero/AnimatedBackgroundElements";
import ImageSlideshow from "./hero/ImageSlideshow";
import {
  AudienceSelector,
  MobileAudienceSelector,
} from "./hero/AudienceSelector";
import { StatsGrid, SimpleStatsGrid } from "./hero/StatsGrid";
import { audienceContent } from "./hero/audienceContent";
import { ParallaxLayer } from "./hero/ParallaxContainer";
import { CinematicEffects } from "./hero/CinematicEffects";
import {
  Phone,
  MessageCircle,
  Users,
  Store,
  Factory,
  Home,
} from "lucide-react";
import "./Hero.css";

// Define the audience type
type Audience = "farmers" | "retailers" | "manufacturers" | "customers";

export const Hero = () => {
  const [currentAudience, setCurrentAudience] = useState<Audience>("farmers");
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [networkAnimationActive, setNetworkAnimationActive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isMobile, setIsMobile] = useState(false);
  const [areStatsComplete, setAreStatsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-10%" });
  const areStatsInView = useInView(statsRef, { once: false, margin: "-20%" });

  // Auto-switch audiences after stats animation completes with 5 second delay
  useEffect(() => {
    const audiences: Audience[] = [
      "farmers",
      "retailers",
      "manufacturers",
      "customers",
    ];
    let currentIndex = audiences.indexOf(currentAudience); // Start from current audience

    let switchTimeout: NodeJS.Timeout;

    const switchAudience = () => {
      currentIndex = (currentIndex + 1) % audiences.length;
      setCurrentAudience(audiences[currentIndex]);
      setAreStatsComplete(false); // Reset stats complete flag for new audience
    };

    // Function to set up the next switch after stats animation completes
    const scheduleNextSwitch = () => {
      // Clear any existing timeout
      if (switchTimeout) clearTimeout(switchTimeout);

      // Schedule the next audience switch after 3 seconds once stats are complete
      switchTimeout = setTimeout(() => {
        switchAudience();
      }, 3000); // Wait 3 seconds after stats animation completes
    };

    // Watch for when stats are complete and schedule next switch
    if (areStatsComplete) {
      scheduleNextSwitch();
    }

    return () => {
      if (switchTimeout) clearTimeout(switchTimeout);
    };
  }, [currentAudience, areStatsComplete]); // Add dependencies

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(mediaQuery.matches);

    const handleReducedMotion = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };

    mediaQuery.addEventListener("change", handleReducedMotion);

    // Check network conditions
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g"
      ) {
        setIsLowPower(true);
      }
    }

    // Check if mobile
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotion);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Mouse position tracking for desktop field lines
  useEffect(() => {
    if (isMobile || isReducedMotion || isLowPower) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect) {
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [isMobile, isReducedMotion, isLowPower]);

  // Activate network animation when hero enters viewport
  useEffect(() => {
    if (isInView && !isReducedMotion && !isLowPower) {
      // NETWORK: Animation speed adjusted for 2G
      const animationSpeed =
        "connection" in navigator &&
        (navigator as any).connection?.effectiveType === "slow-2g"
          ? 1.5
          : 1.0;

      // Animate pathway after a short delay to ensure DOM is ready
      setTimeout(() => {
        setNetworkAnimationActive(true);
      }, 500);
    }
  }, [isInView, isReducedMotion, isLowPower]);

  // Get current audience content
  const content = audienceContent[currentAudience];

  // WhatsApp number for farmers
  const getWhatsAppLink = () => {
    if (currentAudience === "farmers") {
      // Assuming there's a contact number in the project
      return "https://wa.me/919443600205"; // Using the number from Index.tsx
    }
    return "https://wa.me/919443600205";
  };

  // Determine if we should use animated or simple components
  const useAnimatedComponents = !isReducedMotion && !isLowPower;

  // PERFORMANCE: Background opacity adjustment based on audience for readability
  const getBackgroundOpacity = () => {
    if (currentAudience === "farmers" || currentAudience === "customers") {
      return 0.7; // More readable for orange-focused audience
    }
    return 0.9; // Default for green-focused audience
  };

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a2e1a]/85 via-transparent to-transparent hero-container"
    >
      {/* Image Slideshow - Main background */}
      <ImageSlideshow currentAudience={currentAudience} />

      {/* Cinematic effects */}
      <CinematicEffects />

      {/* Gradient overlay for text readability */}
      <div
        className={`absolute inset-0 bg-gradient-to-b from-[#0a2e1a]/85 via-transparent to-transparent z-10 hero-gradient-overlay ${currentAudience}`}
      />

      {/* Main content container */}
      <div className="relative z-20 min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto w-full">
          {/* Audience Selector - Desktop - Always visible, popup on hover */}
          <div
            className="hidden md:flex justify-center mb-8 transition-all duration-500"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <div
              className={`transition-all duration-300 ${
                hovered ? "opacity-100 scale-100" : "opacity-70 scale-95"
              }`}
            >
              <div
                className={`audience-selector flex rounded-full p-2 mb-8 ${
                  isMobile ? "w-full justify-around" : "w-fit mx-auto"
                }`}
              >
                {["farmers", "retailers", "manufacturers", "customers"].map(
                  (role) => (
                    <button
                      key={role}
                      onClick={() => setCurrentAudience(role as Audience)}
                      className={`flex items-center rounded-full px-3 py-2 transition-all ${
                        currentAudience === role
                          ? "bg-white text-[#FF9800] shadow-lg"
                          : "hover:bg-white/10 text-white/70"
                      }`}
                    >
                      <div className="w-5 h-5 mr-2">
                        {role === "farmers" && (
                          <Users
                            className={
                              currentAudience === role ? "text-[#FF9800]" : ""
                            }
                          />
                        )}
                        {role === "retailers" && (
                          <Store
                            className={
                              currentAudience === role ? "text-[#FF9800]" : ""
                            }
                          />
                        )}
                        {role === "manufacturers" && (
                          <Factory
                            className={
                              currentAudience === role ? "text-[#FF9800]" : ""
                            }
                          />
                        )}
                        {role === "customers" && (
                          <Home
                            className={
                              currentAudience === role ? "text-[#FF9800]" : ""
                            }
                          />
                        )}
                      </div>
                      {!isMobile && (
                        <span
                          className={`text-sm font-medium ${
                            currentAudience === role ? "font-bold" : ""
                          }`}
                        >
                          {role.charAt(0).toUpperCase() + role.slice(1)}
                        </span>
                      )}
                    </button>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Mobile Audience Selector - Always visible */}
          <div className="md:hidden mb-8 opacity-100">
            <div className="audience-selector flex rounded-full p-2 mb-8 w-full justify-around">
              {["farmers", "retailers", "manufacturers", "customers"].map(
                (role) => (
                  <button
                    key={role}
                    onClick={() => setCurrentAudience(role as Audience)}
                    className={`flex items-center rounded-full px-3 py-2 transition-all ${
                      currentAudience === role
                        ? "bg-white text-[#FF9800] shadow-lg"
                        : "hover:bg-white/10 text-white/70"
                    }`}
                  >
                    <div className="w-5 h-5 mr-2">
                      {role === "farmers" && (
                        <Users
                          className={
                            currentAudience === role ? "text-[#FF9800]" : ""
                          }
                        />
                      )}
                      {role === "retailers" && (
                        <Store
                          className={
                            currentAudience === role ? "text-[#FF9800]" : ""
                          }
                        />
                      )}
                      {role === "manufacturers" && (
                        <Factory
                          className={
                            currentAudience === role ? "text-[#FF9800]" : ""
                          }
                        />
                      )}
                      {role === "customers" && (
                        <Home
                          className={
                            currentAudience === role ? "text-[#FF9800]" : ""
                          }
                        />
                      )}
                    </div>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Main content with master tagline */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Micro-line above title */}
            <motion.div
              className="text-sm sm:text-base text-white/80 mb-4 tracking-wide"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Trusted by Farmers, Dealers & Service Teams Across Tamil Nadu
            </motion.div>

            <ParallaxLayer speed={0.3} className="mb-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight tracking-tight">
                Where Indian Agriculture{" "}
                <span className="text-[#FF9F1C] inline-block">Never Stops</span>
              </h1>
            </ParallaxLayer>

            {/* Dynamic content based on audience - wrapped in content wrapper for stability */}
            <div className="content-wrapper mb-8">
              <div key={currentAudience} className="content-item active">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-white mb-4 leading-tight">
                  {content.headline}
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                  {content.subhead}
                </p>
              </div>
            </div>

            {/* Stats Grid - Ref for scroll-triggered animation */}
            <motion.div
              ref={statsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={areStatsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-12 stats-grid-container ml-auto mr-0"
            >
              {useAnimatedComponents ? (
                <StatsGrid
                  key={currentAudience} // Add key to force re-render when audience changes
                  stats={content.stats}
                  audience={currentAudience}
                  onStatsComplete={() => setAreStatsComplete(true)}
                />
              ) : (
                <SimpleStatsGrid
                  key={currentAudience} // Add key to force re-render when audience changes
                  stats={content.stats}
                  audience={currentAudience}
                />
              )}
            </motion.div>

            {/* Primary CTA - WhatsApp for farmers, others as appropriate */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className={`cta-button ${currentAudience}`}
              >
                {currentAudience === "farmers" && (
                  <MessageCircle size={20} className="mr-2" />
                )}
                {content.ctaText}
                {(content.ctaText.includes("View") ||
                  content.ctaText.includes("Get") ||
                  content.ctaText.includes("Become") ||
                  content.ctaText.includes("Partner")) && (
                  <span className="arrow">→</span>
                )}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Additional decorative elements for visual interest */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  );
};

export default Hero;
