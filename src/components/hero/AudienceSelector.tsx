// SIZE: 3.5KB
import { Users, Store, Factory, Home, Phone } from "lucide-react";

interface AudienceSelectorProps {
  currentAudience: "farmers" | "retailers" | "manufacturers" | "customers";
  onAudienceChange: (
    audience: "farmers" | "retailers" | "manufacturers" | "customers"
  ) => void;
}

const audienceConfig = {
  farmers: { icon: Users, label: "Farmers", color: "#FF9800" },
  retailers: { icon: Store, label: "Retailers", color: "#2E7D32" },
  manufacturers: { icon: Factory, label: "Manufacturers", color: "#2E7D32" },
  customers: { icon: Home, label: "Customers", color: "#FF9800" },
};

export const AudienceSelector = ({
  currentAudience,
  onAudienceChange,
}: AudienceSelectorProps) => {
  const audiences = Object.keys(audienceConfig) as Array<
    keyof typeof audienceConfig
  >;

  return (
    <div className="flex items-center justify-center space-x-1 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-2 py-1 md:px-3 md:py-2 border border-white/20">
      {audiences.map((audience) => {
        const Icon = audienceConfig[audience].icon;
        const isActive = currentAudience === audience;

        return (
          <button
            key={audience}
            type="button"
            onClick={() => onAudienceChange(audience)}
            className={`
              relative p-2 md:p-3 rounded-full transition-all duration-300 min-w-[48px] min-h-[48px]
              ${
                isActive
                  ? "bg-white/20 scale-110"
                  : "hover:bg-white/10 active:scale-95"
              }
            `}
            aria-label={audienceConfig[audience].label}
            aria-pressed={isActive}
          >
            <Icon
              size={20}
              className={`
                transition-colors duration-300
                ${isActive ? "text-white" : "text-white/70"}
              `}
            />

            {/* Active state pulse effect */}
            {isActive && (
              <div
                className="audience-selector-pulse-effect"
                style={
                  {
                    backgroundColor: audienceConfig[audience].color,
                    "--audience-color": audienceConfig[audience].color,
                  } as React.CSSProperties
                }
              />
            )}

            {/* Active state border */}
            <div
              className={`
                audience-selector-border
                ${isActive ? "active" : ""}
              `}
              style={
                {
                  "--audience-color": audienceConfig[audience].color,
                } as React.CSSProperties
              }
            />
          </button>
        );
      })}
    </div>
  );
};

// Mobile swipeable version with enhanced feedback
export const MobileAudienceSelector = ({
  currentAudience,
  onAudienceChange,
}: AudienceSelectorProps) => {
  const audiences = Object.keys(audienceConfig) as Array<
    keyof typeof audienceConfig
  >;

  // Get the audience color for visual feedback
  const getAudienceColor = () => {
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

  return (
    <div className="flex overflow-x-auto space-x-2 pb-2 hide-scrollbar">
      {audiences.map((audience) => {
        const Icon = audienceConfig[audience].icon;
        const isActive = currentAudience === audience;

        return (
          <button
            key={audience}
            type="button"
            onClick={() => onAudienceChange(audience)}
            className={`
              flex-shrink-0 p-3 rounded-full transition-all duration-300 relative
              ${isActive ? "bg-white/20 scale-110" : "hover:bg-white/10"}
            `}
            aria-label={audienceConfig[audience].label}
            aria-pressed={isActive}
          >
            <Icon
              size={20}
              className={`
                transition-colors duration-300
                ${isActive ? "text-white" : "text-white/70"}
              `}
            />
            {/* Visual feedback for active state */}
            {isActive && (
              <div
                className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                style={{ backgroundColor: getAudienceColor() }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

// Add scrollbar hiding styles
const scrollbarStyles = `
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
`;

// Inject styles if not already present
if (typeof document !== "undefined") {
  const styleId = "audience-selector-styles";
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = scrollbarStyles;
    document.head.appendChild(style);
  }
}
