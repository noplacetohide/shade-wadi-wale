import React, { useState, useEffect, useCallback } from 'react';
import { throttle } from 'lodash'; // You'll need to install lodash

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }, 100), // Execute at most once every 100ms
    []
  );

  // Add scroll effect for navbar
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      handleScroll.cancel(); // Cancel any pending throttled calls
    };
  }, [handleScroll]);

  // Optimized navigation with smooth scrolling
  const handleNavClick = useCallback((e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
    // Close mobile menu if open
    if (isMenuOpen) setIsMenuOpen(false);
  }, [isMenuOpen]);

  return (
    <div 
      className={`fixed w-full z-20 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-sm shadow-lg' : 'bg-transparent'}`}
      style={{ willChange: 'background-color, box-shadow' }}
    >
      <div className='container mx-auto flex justify-between items-center py-3 sm:py-4 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32'>
        {/* Website Logo and Name */}
        <div className='flex items-center gap-2 sm:gap-3'>
          <img 
            src="/shadi-wadi-wale.svg" 
            alt="ShadiWadiWale Logo" 
            className="h-7 sm:h-8 md:h-10 w-auto drop-shadow-lg"
            width="40"
            height="40"
          />
          <span className='text-[#FFD700] font-bold text-lg sm:text-xl md:text-2xl drop-shadow-md'>
            ShadiWadiWale
          </span>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className='md:hidden text-white focus:outline-none bg-[#9b0e2b]/80 p-1 rounded'
          aria-label="Toggle menu"
        >
          {isMenuOpen ? 
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg> :
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          }
        </button>
        
        {/* Desktop Menu */}
        <nav className='hidden md:block'>
          <ul className='flex gap-5 lg:gap-7'>
            <li>
              <a 
                href="#Header" 
                onClick={(e) => handleNavClick(e, 'Header')}
                className='cursor-pointer text-white hover:text-[#FFD700] font-medium transition-colors relative after:content-[""] after:absolute after:h-0.5 after:w-0 after:left-0 after:-bottom-1 after:bg-[#FFD700] after:transition-all hover:after:w-full'
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#About" 
                onClick={(e) => handleNavClick(e, 'About')}
                className='cursor-pointer text-white hover:text-[#FFD700] font-medium transition-colors relative after:content-[""] after:absolute after:h-0.5 after:w-0 after:left-0 after:-bottom-1 after:bg-[#FFD700] after:transition-all hover:after:w-full'
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#Services" 
                onClick={(e) => handleNavClick(e, 'Services')}
                className='cursor-pointer text-white hover:text-[#FFD700] font-medium transition-colors relative after:content-[""] after:absolute after:h-0.5 after:w-0 after:left-0 after:-bottom-1 after:bg-[#FFD700] after:transition-all hover:after:w-full'
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')}
                className='cursor-pointer text-white hover:text-[#FFD700] font-medium transition-colors relative after:content-[""] after:absolute after:h-0.5 after:w-0 after:left-0 after:-bottom-1 after:bg-[#FFD700] after:transition-all hover:after:w-full'
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile Menu - Optimized with transform instead of max-height */}
      <div 
        className={`md:hidden absolute w-full bg-black/90 backdrop-blur-md transform transition-all duration-300 shadow-lg ${
          isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-[-10px] opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <nav className='container mx-auto px-4 py-2'>
          <ul className='flex flex-col text-white'>
            <li>
              <a 
                href="#Header" 
                onClick={(e) => handleNavClick(e, 'Header')} 
                className='block py-3 border-b border-[#9b0e2b]/40 hover:text-[#FFD700] hover:bg-[#9b0e2b]/10 px-3 transition-colors font-medium'
              >
                Home
              </a>
            </li>
            <li>
              <a 
                href="#About" 
                onClick={(e) => handleNavClick(e, 'About')} 
                className='block py-3 border-b border-[#9b0e2b]/40 hover:text-[#FFD700] hover:bg-[#9b0e2b]/10 px-3 transition-colors font-medium'
              >
                About Us
              </a>
            </li>
            <li>
              <a 
                href="#Services" 
                onClick={(e) => handleNavClick(e, 'Services')} 
                className='block py-3 border-b border-[#9b0e2b]/40 hover:text-[#FFD700] hover:bg-[#9b0e2b]/10 px-3 transition-colors font-medium'
              >
                Services
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                onClick={(e) => handleNavClick(e, 'contact')} 
                className='block py-3 hover:text-[#FFD700] hover:bg-[#9b0e2b]/10 px-3 transition-colors font-medium'
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default React.memo(Navbar);