import React, { useState, useEffect, useRef } from 'react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const totalImages = 4;
  const sectionRef = useRef(null);
  
  // Handle image load
  const handleImageLoad = () => {
    setImagesLoaded(prev => prev + 1);
  };
  
  // Intersection Observer for section visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once visible, no need to observe anymore
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div 
      className={`w-full py-16 bg-white transition-opacity duration-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      id='About'
      ref={sectionRef}
    >
      <div className='container mx-auto px-4 sm:px-6 md:px-12 lg:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          {/* Text Content - Left Side */}
          <div className='text-left space-y-6'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight'>
              BIG FAT INDIAN WEDDING? WE GOT YOU!
            </h1>
            
            <div className='w-24 h-1 bg-[#FFD700]'></div>
            
            <p className='text-gray-700 text-lg'>
              Planning a wedding is fun… until it's NOT. Too many decisions, too many phone calls, and SO MUCH STRESS? Ugh. 
              But don't worry, bestie, we got your back! At ShadiWadiWale, we handle everything—venue, décor, food, music, 
              and those last-minute panics—so you can just vibe, enjoy, and say I do without a headache!
            </p>
            
            <div className='bg-gray-50 p-6 rounded-lg border-l-4 border-[#AA0000] shadow-sm'>
              <h3 className='font-semibold text-xl mb-2'>The Problem We Solve</h3>
              <p className='text-gray-600'>
                "Weddings should be about love, laughter, and killer dance moves, NOT stress and endless planning chaos. 
                Finding the perfect venue, coordinating vendors, and staying within budget is a NIGHTMARE! But guess what? 
                We make it a dream. From start to finish, we take care of it ALL. So, you just show up and slay."
              </p>
            </div>
          </div>
          
          {/* Image Gallery - Right Side (hidden on small screens) */}
          <div className='hidden md:block'>
            <div className='grid grid-cols-2 gap-4'>
              <div className='space-y-4'>
                <div className='rounded-lg overflow-hidden shadow-md h-64'>
                  <img 
                    src="/haldi.jpg" 
                    alt="Indian Wedding Ceremony" 
                    className='w-full h-full object-cover'
                    loading="lazy"
                    width="400"
                    height="300"
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Wedding Ceremony Placeholder";
                      handleImageLoad();
                    }}
                  />
                </div>
                
                <div className='rounded-lg overflow-hidden shadow-md h-40'>
                  <img 
                    src="/mehdi.jpg" 
                    alt="Wedding Decor" 
                    className='w-full h-full object-cover'
                    loading="lazy"
                    width="400"
                    height="200"
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/200";
                      e.target.alt = "Wedding Decor Placeholder";
                      handleImageLoad();
                    }}
                  />
                </div>
              </div>
              
              <div className='space-y-4 mt-8'>
                <div className='rounded-lg overflow-hidden shadow-md h-40'>
                  <img 
                    src="/sahera.jpg" 
                    alt="Wedding Couple" 
                    className='w-full h-full object-cover'
                    loading="lazy"
                    width="400"
                    height="200"
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/200";
                      e.target.alt = "Wedding Couple Placeholder";
                      handleImageLoad();
                    }}
                  />
                </div>
                
                <div className='rounded-lg overflow-hidden shadow-md h-64'>
                  <img 
                    src="/rings.jpg" 
                    alt="Wedding Celebration" 
                    className='w-full h-full object-cover'
                    loading="lazy"
                    width="400"
                    height="300"
                    onLoad={handleImageLoad}
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Wedding Celebration Placeholder";
                      handleImageLoad();
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(About);