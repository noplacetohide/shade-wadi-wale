import React, { Suspense, lazy, useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';

// Lazy load components that aren't needed immediately
const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const ContactSection = lazy(() => import('./components/ContactSection'));
const Gallery = lazy(() => import('./components/Gallery'));
const Footer = lazy(() => import('./components/Footer'));

// Loading component
const LoadingFallback = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9b0e2b]"></div>
  </div>
);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const contactSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);

  useEffect(() => {
    // Simulate loading critical resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center">
        <img 
          src="/shadi-wadi-wale.svg" 
          alt="ShadiWadiWale Logo" 
          className="h-20 w-auto mb-4 animate-pulse"
        />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD700]"></div>
        <p className="text-white mt-4 text-lg">Loading ShadiWadiWale...</p>
      </div>
    );
  }

  return (
    <div className="App">
      <Header 
        contactSectionRef={contactSectionRef}
        servicesSectionRef={servicesSectionRef}
      />
      <Suspense fallback={<LoadingFallback />}>
        <About />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Services ref={servicesSectionRef} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Gallery />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <ContactSection ref={contactSectionRef} />
      </Suspense>
      <Suspense fallback={<LoadingFallback />}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;