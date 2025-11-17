// SIZE: 4.5KB
import { useEffect, useRef, useState } from "react";

interface NetworkBackgroundProps {
  isActive?: boolean;
  audience?: "farmers" | "retailers" | "manufacturers" | "customers";
}

export const NetworkBackground = ({
  isActive = false, // Changed to false by default - will be activated by scroll
  audience,
}: NetworkBackgroundProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [animationCompleted, setAnimationCompleted] = useState(false);
  const [currentAudience, setCurrentAudience] = useState(audience);

  // PERFORMANCE: Animation speed adjusted for network conditions
  const getAnimationSpeed = () => {
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (
        connection?.effectiveType === "slow-2g" ||
        connection?.effectiveType === "2g"
      ) {
        return 1.5; // 50% slower for 2G
      }
    }
    return 1.0;
  };

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

    return () => {
      mediaQuery.removeEventListener("change", handleReducedMotion);
    };
  }, []);

  // PERFORMANCE: Only animate if window width > 375px
  const shouldAnimate =
    window.innerWidth > 375 && !isReducedMotion && !isLowPower;

  // Track audience changes for visual feedback
  useEffect(() => {
    if (audience !== currentAudience) {
      setCurrentAudience(audience);
      setAnimationCompleted(false); // Reset animation when audience changes
    }
  }, [audience, currentAudience]);

  // Determine active node based on audience
  const getActiveNodeColor = (nodeIndex: number) => {
    if (!currentAudience) return "#2E7D32";

    const activeNodes: Record<string, number[]> = {
      farmers: [0], // Node 1: Farmer hub (bottom left)
      retailers: [1], // Node 2: Retailer hub (mid-left)
      manufacturers: [2], // Node 3: Manufacturer hub (center)
      customers: [3], // Node 4: Customer hub (top-right)
    };

    const activeNodeIndexes = activeNodes[currentAudience] || [];
    return activeNodeIndexes.includes(nodeIndex) ? "#FF9800" : "#2E7D32";
  };

  // Get pathway color based on audience
  const getPathwayColor = () => {
    if (!currentAudience) return "#2E7D32";

    switch (currentAudience) {
      case "farmers":
      case "customers":
        return "#FF9800"; // Logo orange for farmer/customer focused
      case "retailers":
      case "manufacturers":
        return "#2E7D32"; // Logo green for retailer/manufacturing focused
      default:
        return "#2E7D32";
    }
  };

  // PERFORMANCE: Fallback for low power or reduced motion
  if (isLowPower || isReducedMotion) {
    return (
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #2E7D32 0%, #FF9800 100%)",
          opacity: 0.3,
        }}
      />
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 1 }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full network-overlay"
        style={{ opacity: isActive ? 0.6 : 0 }}
      >
        <defs>
          <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FF9800" stopOpacity="0.5" />
          </linearGradient>
          <filter id="blur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.5" />
          </filter>
        </defs>

        {/* Growth pathway (hidden initially) */}
        <path
          d="M150 650 Q 350 400, 600 500 T 1050 300"
          stroke={getPathwayColor()}
          strokeWidth="1.5"
          strokeDasharray="8 6"
          fill="none"
          opacity="0"
          className="network-pathway"
        />

        {/* Connection nodes (farmers = orange, system = green) */}
        <circle
          cx="150"
          cy="650"
          r="8"
          fill={getActiveNodeColor(0)}
          opacity="0.2"
          className="node-0"
        />
        <circle
          cx="350"
          cy="400"
          r="6"
          fill={getActiveNodeColor(1)}
          opacity="0.1"
          className="node-1"
        />
        <circle
          cx="600"
          cy="500"
          r="9"
          fill={getActiveNodeColor(2)}
          opacity="0.3"
          className="node-2"
        />
        <circle
          cx="1050"
          cy="300"
          r="7"
          fill={getActiveNodeColor(3)}
          opacity="0.2"
          className="node-3"
        />
      </svg>

      {/* Performance-optimized fallback for mobile */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a2e1a]/20 via-transparent to-transparent" />
    </div>
  );
};
