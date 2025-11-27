import React from "react";

interface ServiceIconProps {
  type: "repair" | "warranty" | "parts" | "maintenance" | "field-support";
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
            d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1LZM12 11.99H19C18.47 16.11 15.97 19.78 12 20.93V12H5C5.21 8.16 7.74 4.98 12 4.09V11.99Z"
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
            d="M12 8V4L8 8H12ZM12 8L16 12L20 8H16V4L12 8ZM12 8L8 12L4 8H8V4L12 8ZM12 8L16 12L20 8H16V4L12 8ZM12 8L8 12L4 8H8V4L12 8ZM12 8L16 12L20 8H16V4L12 8Z"
            fill="currentColor"
          />
          <path
            d="M12 16C14.21 16 16 14.21 16 12C16 9.79 14.21 8 12 8C9.79 8 8 9.79 8 12C8 14.21 9.79 16 12 16Z"
            fill="currentColor"
          />
        </svg>
      )}
      {type === "field-support" && (
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20 15.5C18.8 15.5 17.65 15.3 16.59 14.93C16.22 14.8 15.83 14.89 15.56 15.16L14.5 16.22C11.87 14.9 9.1 12.13 7.78 9.5L8.84 8.44C9.11 8.17 9.2 7.78 9.07 7.41C8.7 6.35 8.5 5.2 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3.45 3 4C3 13.39 10.61 21 20 21C20.5 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z"
            fill="currentColor"
          />
        </svg>
      )}
    </div>
  );
};
