import React, { useState } from "react";
import { motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Sample images for the gallery
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "/src/assets/hero-farming.jpg",
      alt: "Our shop front",
      title: "Our Modern Facility",
    },
    {
      id: 2,
      src: "/src/assets/hero-farming2.jpg",
      alt: "Workshop area",
      title: "Professional Workshop",
    },
    {
      id: 3,
      src: "/src/assets/hero-farming3.jpg",
      alt: "Service team",
      title: "Expert Service Team",
    },
    {
      id: 4,
      src: "/src/assets/hero-farming4.jpg",
      alt: "Equipment display",
      title: "Equipment Display Area",
    },
    {
      id: 5,
      src: "/large-green-rice-field-with-green-rice-plants-rows.jpg",
      alt: "Field service",
      title: "Field Service",
    },
    {
      id: 6,
      src: "/panoramic-shot-agrucultural-field-with-rays-sun-shining-through-clouds.jpg",
      alt: "Agricultural field",
      title: "Agricultural Field",
    },
  ];

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setSelectedImage(images[index].id);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      className="py-20 bg-gradient-to-br from-green-50 to-blue-50"
      id="gallery"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="text-4xl font-bold mb-4 text-gray-800"
            style={{ color: "#1E7A3C" }}
          >
            Gallery
          </h2>
          <p
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{ color: "#3B3B3B" }}
          >
            Take a look at our shop, workshop, and service team in action
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative overflow-hidden rounded-xl shadow-lg cursor-pointer group"
              onClick={() => openLightbox(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-bold text-lg">{image.title}</h3>
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-2">
                  <span className="text-white text-sm font-medium">View</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
            <div className="relative w-full max-w-6xl">
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                <X className="h-6 w-6" />
              </button>

              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition-all"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <img
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                className="max-h-[80vh] w-auto mx-auto object-contain"
              />

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center">
                <h3 className="text-xl font-bold">
                  {images[currentImageIndex].title}
                </h3>
                <p className="text-sm text-gray-300 mt-1">
                  {currentImageIndex + 1} of {images.length}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
