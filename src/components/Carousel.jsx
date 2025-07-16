import React, { useState, useEffect, useCallback } from 'react';

const Carousel = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState({});
  
  // Track loaded images
  const handleImageLoaded = useCallback((index) => {
    setImagesLoaded(prev => ({
      ...prev,
      [index]: true
    }));
  }, []);

  // Use useCallback to prevent recreation on every render
  const advanceSlide = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  // Simplified transition without nested timeouts
  useEffect(() => {
    const interval = setInterval(advanceSlide, 5000);
    return () => clearInterval(interval);
  }, [advanceSlide]);

  // Preload all carousel images
  useEffect(() => {
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image;
      img.onload = () => handleImageLoaded(index);
    });
  }, [images, handleImageLoaded]);

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            willChange: 'opacity',
            transform: 'translateZ(0)', // Force GPU acceleration
          }}
        >
          {/* Use actual <img> elements with proper loading attributes */}
          <img 
            src={image}
            alt={`Slide ${index + 1}`}
            className="w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            style={{
              opacity: imagesLoaded[index] ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out'
            }}
            onLoad={() => handleImageLoaded(index)}
          />
        </div>
      ))}
    </div>
  );
};

export default React.memo(Carousel);