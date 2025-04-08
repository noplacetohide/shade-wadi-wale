import React, { useState } from 'react';

const Gallery = () => {
  // Sample gallery images - replace these with your actual event images
  const galleryImages = [
    {
      id: 1,
      src: "/mehdi.jpg", // Replace with your actual image paths
      alt: "Traditional Wedding Ceremony",
      category: "ceremony"
    },
    {
      id: 2,
      src: "/bride.jpg",
      alt: "Elegant Reception Decor",
      category: "decor"
    },
    {
      id: 3,
      src: "/img_1.jpg",
      alt: "Outdoor Wedding Setup",
      category: "venue"
    },
    {
      id: 4,
      src: "/img_2.jpg",
      alt: "Catering Arrangement",
      category: "catering"
    },
    {
      id: 5,
      src: "/img_3.jpg",
      alt: "Wedding Entertainment",
      category: "entertainment"
    },
    {
      id: 6,
      src: "/rings.jpg",
      alt: "Themed Wedding Celebration",
      category: "theme"
    },
    {
      id: 7,
      src: "/hands2.jpg",
      alt: "Bridal Preparations",
      category: "ceremony"
    },
    {
      id: 8,
      src: "/img_bg_1.jpg",
      alt: "Venue Lighting Setup",
      category: "decor"
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

  // Filter images based on active category
  const filteredImages = activeCategory === "all" 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory);

  // Handle category change
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };

  // Handle image click to open modal
  const openModal = (imageId) => {
    setSelectedImage(galleryImages.find(img => img.id === imageId));
  };

  // Handle close modal
  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="w-full py-20 bg-gray-50" id="Gallery">
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

        {/* Filter Categories */}
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => openModal(image.id)}
            >
              {/* Gradient overlay that appears on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#9b0e2b]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
              
              {/* Gold border that appears on hover */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-[#FFD700] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 z-20"></div>
              
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Caption that slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-10">
                <p className="text-white font-medium text-sm">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>

        {/* "View More" button */}
        {/* <div className="mt-12 text-center">
          <button className="bg-white border-2 border-[#9b0e2b] text-[#9b0e2b] hover:bg-[#9b0e2b] hover:text-white font-medium py-3 px-8 rounded-lg transition duration-300">
            View More Events
          </button>
        </div> */}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4" onClick={closeModal}>
            <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Close button */}
              <button 
                className="absolute -top-12 right-0 text-white hover:text-[#FFD700] text-xl transition duration-300"
                onClick={closeModal}
              >
                ✕ Close
              </button>
              
              <div className="bg-white rounded-lg overflow-hidden">
                <img 
                  src={selectedImage.src} 
                  alt={selectedImage.alt} 
                  className="w-full h-auto" 
                />
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

export default Gallery;