import React from "react";

interface ServiceIconProps {
  type: "repair" | "warranty" | "parts" | "maintenance" | "support" | "installation";
  size?: number;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({
  type,
  size = 56,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className="flex items-center justify-center"
    >
      {type === "repair" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 2 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
          />
          <path
            d="M12 6L14 10L18 12L14 14L12 18L10 14L6 12L10 10L12 6Z"
            fill="currentColor"
          />
        </svg>
      )}
      {type === "warranty" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.97 19.78 12 20.93V12H5C5.21 8.16 7.74 4.98 12 4.09V11.99Z"
            fill="currentColor"
          />
        </svg>
      )}
      {type === "parts" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 6H16V4C16 2.9 15.1 2.9 14 2H10C8.9 2 8 2.9 8 4V6H4C2.9 6 2 6.9 2 8V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM10 4H14V6H10V4ZM20 18H4V8H20V18Z"
            fill="currentColor"
          />
          <path
            d="M12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"
            fill="currentColor"
          />
        </svg>
      )}
      {type === "maintenance" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 2 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z"
            fill="currentColor"
          />
          <path
            d="M12 8V12L15 14"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      )}
      {type === "support" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 15.5C18.8 15.5 17.65 15.3 16.59 14.93C16.22 14.8 15.83 14.89 15.56 15.16L14.5 16.22C11.87 14.9 9.1 12.13 7.78 9.5L8.84 8.44C9.11 8.17 9.2 7.78 9.07 7.41C8.7 6.35 8.5 5.2 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z"
            fill="currentColor"
          />
        </svg>
      )}
      {type === "installation" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.14 12.94C19.16 12.65 19.16 12.33 19.16 12C19.16 11.68 19.16 11.35 19.14 11.06L21.41 9.29C21.61 9.13 21.66 8.85 21.52 8.62L19.38 4.92C19.24 4.69 18.96 4.62 18.72 4.73L16.05 5.81C15.51 5.39 14.92 5.03 14.28 4.74L13.88 1.91C13.84 1.65 13.63 1.46 13.37 1.46H9.09C8.83 1.46 8.62 1.65 8.59 1.91L8.19 4.74C7.55 5.03 6.96 5.39 6.42 5.81L3.75 4.73C3.51 4.63 3.23 4.69 3.09 4.92L0.95 8.62C0.81 8.85 0.86 9.13 1.06 9.29L3.33 11.06C3.31 11.35 3.31 11.67 3.31 12C3.31 12.33 3.31 12.65 3.33 12.94L1.06 14.71C0.86 14.87 0.81 15.15 0.95 15.38L3.09 19.08C3.23 19.31 3.51 19.37 3.75 19.27L6.42 18.19C6.96 18.61 7.55 18.97 8.19 19.26L8.59 22.09C8.62 22.35 8.83 22.54 9.09 22.54H13.37C13.63 22.54 13.84 22.35 13.88 22.09L14.28 19.26C14.92 18.97 15.51 18.61 16.05 18.19L18.72 19.27C18.96 19.36 19.24 19.31 19.38 19.08L21.52 15.38C21.66 15.15 21.61 14.87 21.41 14.71L19.14 12.94ZM11.23 15.54C9.28 15.54 7.7 13.96 7.7 12C7.7 10.04 9.28 8.46 11.23 8.46C13.18 8.46 14.77 10.04 14.77 12C14.77 13.96 13.18 15.54 11.23 15.54Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};
