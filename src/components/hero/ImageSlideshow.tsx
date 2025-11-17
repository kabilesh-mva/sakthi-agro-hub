import { useState, useEffect } from "react";

// Import the images
import callousedHands from "/src/assets/calloused-hands.webp";
import heroFarming from "/src/assets/hero-farming.jpg";
import heroFarming4 from "/src/assets/hero-farming4.jpg";

interface ImageSlideshowProps {
  currentAudience?: "farmers" | "retailers" | "manufacturers" | "customers";
}

const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ currentAudience }) => {
  const images = [callousedHands, heroFarming, heroFarming4];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [loaded, setLoaded] = useState(false);

  // Update image index based on audience changes, cycling to next image
  useEffect(() => {
    // Cycle to next image when audience changes
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [currentAudience, images.length]);

  // Preload images to ensure they're available
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((img) => {
        return new Promise((resolve, reject) => {
          const image = new Image();
          image.onload = resolve;
          image.onerror = reject;
          image.src = img;
        });
      });

      try {
        await Promise.all(imagePromises);
        setLoaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setLoaded(true); // Still proceed if there's an error
      }
    };

    preloadImages();
  }, [images]);

  return (
    <div className="absolute inset-0 overflow-hidden z-0 image-slideshow-container">
      {/* Main background images */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`image-slideshow-bg ${
            index === currentIndex ? "" : "inactive"
          }`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      {/* Atmospheric layers */}
      {/* Mist layer near horizon */}
      <div className="absolute inset-0 z-10 pointer-events-none mist-layer-gradient"></div>

      {/* Foreground darkening */}
      <div className="absolute inset-0 z-20 pointer-events-none foreground-darkening-gradient"></div>

      {/* Light rays effect */}
      <div className="absolute inset-0 z-15 pointer-events-none light-rays-gradient"></div>
    </div>
  );
};

export default ImageSlideshow;
