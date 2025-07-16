import React, { useEffect, useRef } from 'react';
import Navbar from './Navbar'
import Carousel from './Carousel';

// Image preloader component
const ImagePreloader = ({ images }) => {
  useEffect(() => {
    images.forEach(src => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);
  
  return null;
};

const Header = ({ contactSectionRef, servicesSectionRef }) => {
  // Images for carousel
  const images = [
    '/img_bg_1.jpg',
    '/img_bg_2.jpg',
    '/bg_5.jpg',
    '/hands2.jpg'
  ];

  const scrollToContact = () => {
    contactSectionRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  const scrollToServices = () => {
    servicesSectionRef.current.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };

  return (
    <div 
      className='relative w-full h-screen flex flex-col'
      id='Header'
    >
      {/* Preload critical images */}
      <ImagePreloader images={images.slice(0, 2)} />
      
      {/* Carousel Component */}
      <Carousel images={images} />
      
      {/* Enhanced dark overlay for better text visibility - gradient for depth */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"
        style={{ willChange: 'opacity' }}
      ></div>
      
      <Navbar />
      
      <div className="container mx-auto flex-grow flex items-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 relative z-10">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 rounded-lg max-w-md sm:max-w-lg text-left ml-0 mr-auto my-auto border-l-4 border-[#FFD700]">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 sm:mb-4">
            <span className="text-white drop-shadow-lg">Welcome to </span>
            <br className="md:hidden" />
            <span className="text-white drop-shadow-lg">Shadi<span className="text-white drop-shadow-lg">Wadi</span>Wale</span>
          </h1>
          <p className="text-white text-base sm:text-lg md:text-xl drop-shadow-lg font-medium bg-[#9b0e2b]/60 inline-block px-3 py-1 rounded">
            Shadi Aapki, Tension Hamari!
          </p>
          <div className="mt-6 sm:mt-8">
            <button 
              className="bg-[#9b0e2b] hover:bg-[#FFD700]/90 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-7 rounded-lg transition duration-300 shadow-lg hover:shadow-xl mr-3"
              onClick={scrollToContact}
            >
              Book Now
            </button>
            <button 
              className="bg-[#9b0e2b] hover:bg-[#FFD700]/90 text-white font-bold py-2.5 sm:py-3 px-5 sm:px-7 rounded-lg transition duration-300 shadow-lg hover:shadow-xl mr-3"
              onClick={scrollToServices}
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);