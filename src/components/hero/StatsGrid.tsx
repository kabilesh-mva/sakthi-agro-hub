import { motion, useInView } from "framer-motion";
import { useState, useEffect, useRef } from "react";

interface Stat {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: Stat[];
  audience: "farmers" | "retailers" | "manufacturers" | "customers";
  onStatsComplete?: () => void;
}

// Function to extract numeric value from string
const extractNumericValue = (value: string): number => {
  // Handle special values that shouldn't be treated as numbers to animate
  if (value === "24/7") return 0; // Special case - don't animate this value
  if (value === "24/7 Field Support" || value === "24/7 Market Support")
    return 0; // Don't animate special time formats

  // Extract the numeric part from the string (e.g., "5,000+" -> 5000, "98%" -> 98)
  const numericPart = value.replace(/[^\d.]/g, "");
  const numValue = parseFloat(numericPart);
  return isNaN(numValue) ? 0 : numValue;
};

// Function to extract suffix from value (e.g., "+", "%", "/7")
const extractSuffix = (value: string): string => {
  // Find any non-numeric characters at the end
  const match = value.match(/[\D\s]+$/);
  return match ? match[0].trim() : "";
};

// Function to determine if value has decimals
const hasDecimals = (value: string): boolean => {
  const numericPart = value.replace(/[^\d.]/g, "");
  return numericPart.includes(".");
};

// Easing function (easeOutQuart)
function easeOutQuart(t: number): number {
  return 1 - Math.pow(1 - t, 4);
}

// Format number with locale-aware thousands separator
function formatNumber(value: number, decimals: number = 0): string {
  return Number(value).toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export const StatsGrid = ({
  stats,
  audience,
  onStatsComplete,
}: StatsGridProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-30%" });
  const [animationTriggered, setAnimationTriggered] = useState(false);
  const [completedStats, setCompletedStats] = useState(0);

  const getAudienceColor = (): string => {
    // Use consistent orange color for all audiences
    return "#FF9F1C"; // Warm orange for all audiences
  };

  // Trigger animation when the stats container is in view
  useEffect(() => {
    if (isInView && !animationTriggered) {
      setAnimationTriggered(true);
    }
  }, [isInView, animationTriggered]);

  // Call onStatsComplete when all stats are completed
  useEffect(() => {
    if (
      completedStats > 0 &&
      completedStats ===
        stats.filter((stat) => stat.value && stat.label).length &&
      onStatsComplete
    ) {
      // Add a small delay to ensure animations are fully complete
      const timer = setTimeout(() => {
        onStatsComplete();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [completedStats, stats, onStatsComplete]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Increased stagger for better visual effect
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.8 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const itemTransition = {
    type: "spring" as const,
    stiffness: 100,
    damping: 10,
  };

  return (
    <motion.div
      ref={containerRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {stats
        .filter((stat) => stat.value && stat.label)
        .map((stat, index) => (
          <StatCardWithAnimation
            key={index}
            stat={stat}
            index={index}
            audience={audience}
            itemVariants={itemVariants}
            itemTransition={itemTransition}
            getAudienceColor={getAudienceColor}
            isInView={isInView && animationTriggered}
            onComplete={() => setCompletedStats((prev) => prev + 1)}
          />
        ))}
    </motion.div>
  );
};

// Individual stat card component with counter animation
const StatCardWithAnimation = ({
  stat,
  index,
  audience,
  itemVariants,
  itemTransition,
  getAudienceColor,
  isInView,
  onComplete,
}: {
  stat: Stat;
  index: number;
  audience: "farmers" | "retailers" | "manufacturers" | "customers";
  itemVariants: any;
  itemTransition: any;
  getAudienceColor: () => string;
  isInView: boolean;
  onComplete?: () => void;
}) => {
  const statRef = useRef<HTMLDivElement>(null);
  const [displayValue, setDisplayValue] = useState("0");
  const [animationKey, setAnimationKey] = useState(1); // Key to force re-animation on audience change, starting at 1 to allow animation

  // Extract numeric value, suffix, and check for decimals
  const finalValue = extractNumericValue(stat.value);
  const suffix = extractSuffix(stat.value);
  const decimals = hasDecimals(stat.value) ? 1 : 0;
  const isSpecialValue = stat.value === "24/7"; // Flag for special values that shouldn't be animated

  // Reset animation when audience changes (using key prop pattern)
  useEffect(() => {
    // For special values like "24/7", display them directly without animation
    if (isSpecialValue) {
      setDisplayValue(stat.value); // Directly show the special value
      if (onComplete) onComplete(); // Mark as complete immediately
    } else {
      // Reset for numeric values
      setDisplayValue("0");
      // Trigger animation by updating the animation key
      setAnimationKey((prev) => prev + 1);
    }
  }, [audience, stat.value, isSpecialValue, onComplete]); // Reset when audience changes

  // Animation effect - only runs when animationKey changes for non-special values
  useEffect(() => {
    if (isSpecialValue || !isInView) return; // Don't animate if special value or not in view

    // Start the animation
    const startValue = 0;
    const duration = 2500; // Duration for the animation
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Custom easing function that slows down as it approaches the target
      let eased = progress;
      if (progress < 0.7) {
        // Fast initial animation
        eased = easeOutQuart(progress * 1.4); // Speed up the first part
      } else {
        // Slow down as we approach the end
        const slowProgress = (progress - 0.7) / 0.3; // Normalize to 0-1 for the last 30%
        eased = 0.7 + easeOutQuart(slowProgress) * 0.3; // Apply easing to the last 30%
      }

      const currentValue = startValue + (finalValue - startValue) * eased;

      if (progress < 1) {
        setDisplayValue(formatNumber(currentValue, decimals) + suffix);
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Ensure final exact value
        setDisplayValue(formatNumber(finalValue, decimals) + suffix);
        // Mark this stat as completed
        if (onComplete) onComplete();
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Cleanup function to cancel animation if component unmounts
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [
    animationKey, // Animation runs when animationKey changes
    isSpecialValue,
    isInView,
    finalValue,
    suffix,
    decimals,
    onComplete,
  ]);

  return (
    <motion.div
      ref={statRef}
      variants={itemVariants}
      transition={{ ...itemTransition, delay: index * 0.2 }} // Add delay per item
      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border-white/20 hover:bg-white/15 transition-all duration-300 relative overflow-hidden stat-card glass-effect" /* Enhanced glass effect */
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      role="group"
      aria-labelledby={`stat-${index}-label`}
    >
      {/* Decorative corner accents */}
      <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/30"></div>
      <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/30"></div>
      <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/30"></div>
      <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/30"></div>

      {/* Animated value with proper data attributes and accessibility */}
      <div
        className="text-3xl md:text-4xl font-bold mb-2 min-w-[6ch] inline-block stat-value-text"
        data-target={finalValue}
        data-suffix={suffix}
        data-decimals={decimals}
        aria-hidden="true"
      >
        {displayValue}
      </div>
      <div
        id={`stat-${index}-label`}
        className="text-white/90 text-sm md:text-base font-medium mb-3"
      >
        {stat.label}
      </div>

      {/* Verified trust markers */}
      <div className="text-xs text-white/70 flex justify-center items-center gap-1">
        <span>✓</span> <span>Verified</span>
      </div>

      {/* Underline effect that changes based on audience */}
      <div className="absolute bottom-0 left-0 h-0.5 transition-all duration-500 stat-underline stat-underline-hidden" />
    </motion.div>
  );
};

// Simple version without animations for reduced motion or low power
export const SimpleStatsGrid = ({ stats, audience }: StatsGridProps) => {
  const getAudienceColor = () => {
    // Use consistent orange color for all audiences
    return "#FF9F1C"; // Warm orange for all audiences
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
      {/* Updated spacing for better visual hierarchy */}
      {stats
        .filter((stat) => stat.value && stat.label)
        .map((stat, index) => (
          <div
            key={index}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 relative overflow-hidden stat-card glass-effect" /* Enhanced glass effect */
            role="group"
            aria-labelledby={`simple-stat-${index}-label`}
          >
            {/* Decorative corner accents */}
            <div className="absolute top-2 left-2 w-3 h-3 border-l-2 border-t-2 border-white/30"></div>
            <div className="absolute top-2 right-2 w-3 h-3 border-r-2 border-t-2 border-white/30"></div>
            <div className="absolute bottom-2 left-2 w-3 h-3 border-l-2 border-b-2 border-white/30"></div>
            <div className="absolute bottom-2 right-2 w-3 h-3 border-r-2 border-b-2 border-white/30"></div>

            <div className="text-3xl md:text-4xl font-bold mb-2 stat-value-text">
              {stat.value}
            </div>
            <div
              id={`simple-stat-${index}-label`}
              className="text-white/90 text-sm md:text-base font-medium mb-3"
            >
              {stat.label}
            </div>

            {/* Verified trust markers */}
            <div className="text-xs text-white/70 flex justify-center items-center gap-1">
              <span>✓</span> <span>Verified</span>
            </div>

            {/* Underline effect that changes based on audience */}
            <div className="absolute bottom-0 left-0 h-0.5 w-full transition-all duration-500 stat-underline simple-stat-underline" />
          </div>
        ))}
    </div>
  );
};
