import React from "react";

interface AnimatedBackgroundElementsProps {
  isActive?: boolean;
  audience?: "farmers" | "retailers" | "manufacturers" | "customers";
}

export const AnimatedBackgroundElements = ({
  isActive = true,
  audience,
}: AnimatedBackgroundElementsProps) => {
  // Determine colors based on audience
  const getAudienceColor = () => {
    if (!audience) return "#2E7D32";

    switch (audience) {
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

  const audienceColor = getAudienceColor();

  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
    >
      {/* Floating agricultural elements */}
      <div
        className="absolute top-1/4 left-1/4 w-16 h-16 rounded-full opacity-20 animate-float"
        style={{
          backgroundColor: audienceColor,
          animationDelay: "0s",
        }}
      />

      <div
        className="absolute top-1/3 right-1/3 w-12 h-12 rounded-full opacity-15 animate-float"
        style={{
          backgroundColor: audienceColor,
          animationDelay: "1s",
        }}
      />

      <div
        className="absolute bottom-1/4 left-1/3 w-10 h-10 rounded-full opacity-10 animate-float"
        style={{
          backgroundColor: audienceColor,
          animationDelay: "2s",
        }}
      />

      <div
        className="absolute top-1/5 right-1/4 w-8 h-8 rounded-full opacity-25 animate-float"
        style={{
          backgroundColor: audienceColor,
          animationDelay: "0.5s",
        }}
      />

      {/* Floating abstract shapes */}
      <div
        className="absolute top-2/5 left-2/5 w-20 h-8 opacity-10 rounded-full animate-float"
        style={{
          backgroundColor: audienceColor,
          animationDelay: "1.5s",
          transform: "rotate(45deg)",
        }}
      />

      <div
        className="absolute bottom-1/3 right-2/5 w-14 h-14 opacity-15 rounded-full animate-float"
        style={{
          backgroundColor: audienceColor,
          animationDelay: "2.5s",
        }}
      />

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF9800]/5 to-transparent animate-gradient-move" />
      <div
        className="absolute inset-0 bg-gradient-to-l from-transparent via-[#2E7D32]/5 to-transparent animate-gradient-move"
        style={{ animationDelay: "5s" }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-float"
          style={{
            width: `${Math.random() * 10 + 2}px`,
            height: `${Math.random() * 10 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            backgroundColor: audienceColor,
            opacity: Math.random() * 0.1 + 0.05,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 5 + 5}s`,
          }}
        />
      ))}
    </div>
  );
};
