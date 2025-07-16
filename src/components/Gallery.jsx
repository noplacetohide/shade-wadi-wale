import React, { useState, useCallback, useEffect, useRef } from 'react';
import { throttle } from 'lodash'; // You'll need to install: npm install lodash

const Gallery = () => {
  // Sample gallery images - replace these with your actual event images
  //Gallery thumbnails: 600px width is ideal
  //Maintain aspect ratio
  //Full-size (for lightbox): 1200-1600px width is usually sufficient
  const galleryImages = [
    {
      id: 1,
      src: "/mehdi.jpg", 
      alt: "Traditional Wedding Ceremony",
      category: "ceremony",
      width: 600,
      height: 400
    },
    {
      id: 2,
      src: "/bride.jpg",
      alt: "Elegant Reception Decor",
      category: "decor",
      width: 600,
      height: 400
    },
    {
      id: 3,
      src: "/img_1.jpg",
      alt: "Outdoor Wedding Setup",
      category: "venue",
      width: 600,
      height: 400
    },
    {
      id: 4,
      src: "/img_2.jpg",
      alt: "Catering Arrangement",
      category: "catering",
      width: 600,
      height: 400
    },
    {
      id: 5,
      src: "/img_3.jpg",
      alt: "Wedding Entertainment",
      category: "entertainment",
      width: 600,
      height: 400
    },
    {
      id: 6,
      src: "/rings.jpg",
      alt: "Themed Wedding Celebration",
      category: "theme",
      width: 600,
      height: 400
    },
    {
      id: 7,
      src: "/hands2.jpg",
      alt: "Bridal Preparations",
      category: "ceremony",
      width: 600,
      height: 400
    },
    {
      id: 8,
      src: "/img_bg_1.jpg",
      alt: "Venue Lighting Setup",
      category: "decor",
      width: 600,
      height: 400
    }
  ];

  // Filter categories
  const categories = [
    { id: "all", name: "All Events" },
    { id: "ceremony", name: "Ceremonies" },
    { id: "decor", name: "Decorations" },
    { id: "venue", name: "Venues" },
    { id: "catering", name: "Catering" },
    { id: "entertainment", name: "Entertainment" },
    { id: "theme", name: "Themed Events" }
  ];

  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedImage, setSelectedImage] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [containerWidth, setContainerWidth] = useState(0);
  const galleryRef = useRef(null);
  const imageCache = useRef(new Set());
  const [loadedImages, setLoadedImages] = useState({});

  // Image loading queue system
  const imageQueue = useRef([]);
  const loadingImages = useRef(new Set());
  const maxConcurrentLoads = 3;

  const loadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      if (imageCache.current.has(src)) {
        resolve(src);
        return;
      }
      
      const img = new Image();
      img.onload = () => {
        imageCache.current.add(src);
        setLoadedImages(prev => ({ ...prev, [src]: true }));
        resolve(src);
      };
      img.onerror = reject;
      img.src = src;
    });
  }, []);

  const processQueue = useCallback(() => {
    if (imageQueue.current.length === 0 || loadingImages.current.size >= maxConcurrentLoads) return;
    
    const nextSrc = imageQueue.current.shift();
    loadingImages.current.add(nextSrc);
    
    loadImage(nextSrc).then(() => {
      loadingImages.current.delete(nextSrc);
      processQueue();
    }).catch(() => {
      loadingImages.current.delete(nextSrc);
      processQueue();
    });
  }, [loadImage]);

  const queueImage = useCallback((src) => {
    if (!imageQueue.current.includes(src) && !loadingImages.current.has(src) && !imageCache.current.has(src)) {
      imageQueue.current.push(src);
      processQueue();
    }
  }, [processQueue]);

  // Filter images based on active category - memoized to prevent recalculation
  const filteredImages = React.useMemo(() => {
    return activeCategory === "all" 
      ? galleryImages 
      : galleryImages.filter(img => img.category === activeCategory);
  }, [activeCategory]);

  // Handle category change - memoized to prevent recreation
  const handleCategoryChange = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []);

  // Handle image click to open modal - memoized
  const openModal = useCallback((imageId) => {
    const image = galleryImages.find(img => img.id === imageId);
    if (image) {
      queueImage(image.src);
      setSelectedImage(image);
    }
  }, [galleryImages, queueImage]);

  // Handle close modal - memoized
  const closeModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  // Intersection Observer to detect when gallery is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        
        // Preload visible images when gallery becomes visible
        if (entry.isIntersecting) {
          filteredImages.slice(0, 8).forEach(image => {
            queueImage(image.src);
          });
        }
      },
      { threshold: 0.1, rootMargin: '200px 0px' }
    );
    
    const currentRef = galleryRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [filteredImages, queueImage]);

  // Measure container width for responsive grid - throttled to improve performance
  useEffect(() => {
    const handleResize = throttle(() => {
      if (galleryRef.current) {
        setContainerWidth(galleryRef.current.offsetWidth);
      }
    }, 200);

    handleResize(); // Initial measurement
    window.addEventListener('resize', handleResize);
    
    return () => {
      handleResize.cancel(); // Cancel any pending throttled calls
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Setup individual image observers for lazy loading
  useEffect(() => {
    const imgObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.dataset.src;
            if (src) {
              queueImage(src);
              imgObserver.unobserve(img);
            }
          }
        });
      },
      { rootMargin: '200px 0px' }
    );

    // Cleanup function
    return () => {
      imgObserver.disconnect();
    };
  }, [queueImage]);

  // Image component with lazy loading
  const LazyImage = useCallback(({ image, onClick }) => {
    const imgRef = useRef(null);
    const [isLoaded, setIsLoaded] = useState(false);
    
    useEffect(() => {
      const currentImg = imgRef.current;
      
      if (currentImg) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              queueImage(image.src);
              observer.unobserve(currentImg);
            }
          },
          { rootMargin: '200px 0px' }
        );
        
        observer.observe(currentImg);
        
        return () => {
          observer.unobserve(currentImg);
        };
      }
    }, [image.src]);
    
    return (
      <div
        ref={imgRef}
        className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-64"
        onClick={onClick}
      >
        {/* Placeholder while loading */}
        {!loadedImages[image.src] && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
        
        {/* Gradient overlay that appears on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#9b0e2b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
        
        {/* Gold border that appears on hover */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-20"></div>
        
        <img
          src={loadedImages[image.src] ? image.src : 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'} // Tiny transparent placeholder
          data-src={image.src}
          alt={image.alt}
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${
            loadedImages[image.src] ? 'opacity-100' : 'opacity-0'
          }`}
          width={image.width}
          height={image.height}
        />
        
        {/* Caption that slides up on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
          <p className="text-white font-medium text-sm">{image.alt}</p>
        </div>
      </div>
    );
  }, [loadedImages, queueImage]);

  return (
    <div 
      className={`w-full py-20 bg-gray-50 transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} 
      id="Gallery"
      ref={galleryRef}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-12 lg:px-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 relative inline-block">
            Our Event Gallery
            <span className="block text-lg md:text-xl text-[#9b0e2b] mt-2 font-medium">
              Picture-perfect moments from our vendors because seeing is believing! 📸✨
            </span>
            <div className="w-24 h-1 bg-[#FFD700] mx-auto mt-4"></div>
          </h2>
        </div>

        {/* Filter Categories - Optimized with memo */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition duration-300 ${
                activeCategory === category.id
                  ? "bg-[#9b0e2b] text-white shadow-md"
                  : "bg-white text-gray-800 hover:bg-[#9b0e2b]/10 border border-gray-200"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid - Using CSS Grid with optimized image loading */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <LazyImage 
              key={image.id} 
              image={image} 
              onClick={() => openModal(image.id)}
            />
          ))}
        </div>

        {/* Optimized Lightbox Modal with proper transitions */}
        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 animate-fadeIn" 
            onClick={closeModal}
            style={{ willChange: 'opacity' }}
          >
            <div 
              className="relative max-w-4xl w-full animate-scaleIn" 
              onClick={(e) => e.stopPropagation()}
              style={{ willChange: 'transform' }}
            >
              {/* Close button */}
              <button 
                className="absolute -top-12 right-0 text-white hover:text-[#FFD700] text-xl transition duration-300"
                onClick={closeModal}
                aria-label="Close modal"
              >
                ✕ Close
              </button>
              
              <div className="bg-white rounded-lg overflow-hidden">
                {loadedImages[selectedImage.src] ? (
                  <img 
                    src={selectedImage.src} 
                    alt={selectedImage.alt} 
                    className="w-full h-auto" 
                    width={selectedImage.width}
                    height={selectedImage.height}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 animate-pulse"></div>
                )}
                <div className="p-4 border-t border-gray-200">
                  <h3 className="font-bold text-xl text-gray-800">{selectedImage.alt}</h3>
                  <p className="text-gray-600 mt-1">
                    {categories.find(cat => cat.id === selectedImage.category)?.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(Gallery);