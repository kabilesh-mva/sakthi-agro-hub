import React, { useEffect, useRef } from "react";

interface CinematicEffectsProps {
  isActive?: boolean;
}

export const CinematicEffects: React.FC<CinematicEffectsProps> = ({
  isActive = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const styleId = "cinematic-effects-styles";

  // Add styles to document head
  useEffect(() => {
    let styleElement = document.getElementById(styleId) as HTMLStyleElement;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      styleElement.innerHTML = `
        @keyframes drift {
          0% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
          25% {
            transform: translate(10px, -10px);
          }
          50% {
            transform: translate(20px, 20px);
            opacity: 0.3;
          }
          75% {
            transform: translate(-10px, 10px);
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
        }

        .light-rays {
          background: radial-gradient(
            ellipse at top,
            rgba(255, 255, 255, 0.15) 0%,
            transparent 70%
          );
        }

        .mist-layer {
          background: linear-gradient(
            to top,
            rgba(25, 255, 255, 0.2) 0%,
            transparent 100%
          );
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11.81 2.19c1.6 1.9 2.49 4.45 2.49 7.16 0 5.8-4.7-10.49-10.49-10.49s-10.49 4.7-10.49 10.49c0 2.71.83 5.26 2.49 7.16l-1.9 6.31h8.16v8.16l6.31-1.9c1.9 1.66 4.45 2.49 7.16 2.49 5.8 0 10.49-4.7 10.49-10.49 0-2.71-.83-5.26-2.49-7.16l1.9-6.31h-8.16v-8.16l-6.31 1.9zm-6.31 12.62c-2.73 0-4.94-2.21-4.94-4.94s2.21-4.94 4.94-4.94 4.94 2.21 4.94 4.94-2.21 4.94-4.94 4.94z' fill='white' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
      `;
      document.head.appendChild(styleElement);
    }

    return () => {
      // Clean up styles when component unmounts
      if (styleElement && styleElement.parentNode) {
        styleElement.parentNode.removeChild(styleElement);
      }
    };
  }, []);

  // Create drifting dust particles
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const particles: HTMLElement[] = [];

    // Create 20-30 dust particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement("div");
      particle.className = "dust-particle";
      particle.style.position = "absolute";
      particle.style.width = `${Math.random() * 3 + 1}px`;
      particle.style.height = `${Math.random() * 3 + 1}px`;
      particle.style.backgroundColor = "rgba(255, 255, 255, 0.3)";
      particle.style.borderRadius = "50%";
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.top = `${Math.random() * 100}%`;
      particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
      particle.style.zIndex = "10";
      particle.style.pointerEvents = "none";

      // Add subtle animation
      const duration = Math.random() * 20 + 10; // 10-30 seconds
      const delay = Math.random() * 5; // 0-5 second delay
      particle.style.animation = `drift ${duration}s linear ${delay}s infinite`;

      container.appendChild(particle);
      particles.push(particle);
    }

    // Clean up particles when component unmounts
    return () => {
      particles.forEach((particle) => {
        if (particle.parentNode) {
          particle.parentNode.removeChild(particle);
        }
      });
    };
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none cinematic-effects-container"
    >
      {/* Light rays effect */}
      <div className="light-rays absolute inset-0 opacity-20"></div>

      {/* Mist effect near horizon */}
      <div className="mist-layer absolute bottom-0 left-0 right-0 h-1/3 opacity-30"></div>
    </div>
  );
};

export default CinematicEffects;
