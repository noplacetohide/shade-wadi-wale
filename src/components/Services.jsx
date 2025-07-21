import React, { forwardRef } from 'react';

const Services = forwardRef((props, ref) => {
  // Service card data
  const services = [
    {
      icon: '💖',
      title: 'Full Wedding Planning',
      description: 'We do EVERYTHING. You just chill and enjoy your special day while we handle all the details.',
    },
    {
      icon: '🏛',
      title: 'Venue Selection',
      description: 'No more Google searches, we find THE perfect spot that matches your vision and budget!',
    },
    {
      icon: '🎪',
      title: 'Tent & Decoration',
      description: 'Aesthetic décor that matches your vibe. We transform spaces into magical settings for your celebration.',
    },
    {
      icon: '🍽',
      title: 'Catering',
      description: 'Good food = happy guests. Period. Our curated menu options will delight everyone at your wedding.',
    },
    {
      icon: '🎧',
      title: 'DJ & Live Music',
      description: 'Bangers? Check. Emotional background music? Double-check. We keep the energy perfect all day.',
    },
    {
      icon: '🎭',
      title: 'Personalized Wedding Themes',
      description: "Let's make your wedding as unique as your love story with custom themes that reflect your personality!",
    }
  ];

  // Why ShadiWadiWale reasons
  const reasons = [
    {
      text: 'Zero stress, only fun vibes'
    },
    {
      text: 'Trusted vendors, top-notch services'
    },
    {
      text: 'Pocket-friendly yet LIT weddings'
    },
    {
      text: 'Weddings as unique as you!'
    }
  ];

  // Steps data
  const steps = [
    {
      icon: '✅',
      text: 'Tell Us Your Vibe – Share your dream wedding goals.'
    },
    {
      icon: '✅',
      text: 'Get a Custom Plan – We send you a proposal, tailored to YOU.'
    },
    {
      icon: '✅',
      text: 'Lock It & Relax – Confirm & let us work the magic while you sip on chai.'
    }
  ];

  return (
    <div ref={ref} className='w-full py-20 bg-gray-50' id='Services'>
      <div className='w-full py-20 bg-gray-50' id='Services'>
        <div className='container mx-auto px-4 sm:px-6 md:px-12 lg:px-20'>
          <div className='text-center mb-16'>
            <h2 className='text-3xl md:text-4xl font-bold text-gray-800 relative inline-block'>
              What We Offer
              <span className='block text-lg md:text-xl text-[#9b0e2b] mt-2 font-medium'>Your Wedding Dream Team</span>
              <div className='w-24 h-1 bg-[#FFD700] mx-auto mt-4'></div>
            </h2>
          </div>
                
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8'>
            {services.map((service, index) => (
              <div 
                key={index} 
                className='bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 border-t-4 border-[#9b0e2b] group relative transform hover:-translate-y-2'
              >
                {/* Top border animation */}
                <div className='absolute top-0 left-0 w-0 h-1 bg-[#FFD700] transition-all duration-500 group-hover:w-full'></div>
                
                {/* Left border animation */}
                <div className='absolute top-0 left-0 w-1 h-0 bg-[#FFD700] transition-all duration-500 group-hover:h-full delay-100'></div>
                
                {/* Bottom border animation */}
                <div className='absolute bottom-0 right-0 w-0 h-1 bg-[#FFD700] transition-all duration-500 group-hover:w-full'></div>
                
                {/* Right border animation */}
                <div className='absolute top-0 right-0 w-1 h-0 bg-[#FFD700] transition-all duration-500 group-hover:h-full delay-100'></div>
                
                <div className='p-6 relative z-10'>
                  <div className='flex items-center gap-4 mb-4'>
                    <div className='w-12 h-12 bg-[#9b0e2b] rounded-full flex items-center justify-center shadow-md text-xl group-hover:scale-110 transition-transform duration-300'>
                      <span>{service.icon}</span>
                    </div>
                    <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#9b0e2b] transition-colors duration-300'>{service.title}</h3>
                  </div>
                  <p className='text-gray-600 group-hover:text-gray-800 transition-colors duration-300'>{service.description}</p>
                </div>
                
                {/* Subtle background effect */}
                <div className='absolute inset-0 bg-gradient-to-br from-[#9b0e2b]/0 to-[#FFD700]/0 group-hover:from-[#9b0e2b]/5 group-hover:to-[#FFD700]/5 transition-all duration-500'></div>
              </div>
            ))}
          </div>

          {/* Why ShadiWadiWale Section */}
          <div className='mt-16 mb-16'>
            <div className='bg-white rounded-lg p-8 shadow-lg border-b-4 border-[#9b0e2b]'>
              <div className='text-center mb-8'>
                <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>
                  Why ShadiWadiWale?
                  <div className='w-16 h-1 bg-[#FFD700] mx-auto mt-3'></div>
                </h2>
              </div>
              
              <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'>
                {reasons.map((reason, index) => (
                  <div 
                    key={index} 
                    className='bg-gradient-to-r from-[#9b0e2b]/5 to-[#FFD700]/5 p-6 rounded-lg text-center hover:shadow-md transition-all duration-500 border-l-2 border-[#9b0e2b] hover:border-l-4 hover:bg-gradient-to-r hover:from-[#9b0e2b]/10 hover:to-[#FFD700]/10 transform hover:-translate-y-1'
                  >
                    <div className='text-3xl mb-2'>{reason.icon}</div>
                    <p className='font-medium text-gray-800'>{reason.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Steps Section */}
          <div className='mt-16 text-center'>
            <div className='bg-gradient-to-r from-[#9b0e2b]/10 to-[#FFD700]/10 rounded-lg p-8 border-l-4 border-[#9b0e2b] shadow-md'>
              <h3 className='text-2xl font-bold text-gray-800 mb-6'>
                Plan Your Wedding in Just 3 Easy Steps!
                <div className='w-16 h-1 bg-[#FFD700] mx-auto mt-3'></div>
              </h3>
              
              <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-6 mt-8'>
                {steps.map((step, index) => (
                  <div key={index} className='flex-1 relative'>
                    {/* Step connector */}
                    {index < steps.length - 1 && (
                      <div className='hidden md:block absolute top-8 -right-3 w-6 h-0.5 bg-[#FFD700]'></div>
                    )}
                    
                    <div className='bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-500 border-b-2 border-[#9b0e2b] hover:border-b-4 group transform hover:-translate-y-1'>
                      <div className='w-10 h-10 bg-[#9b0e2b] rounded-full flex items-center justify-center text-white font-bold mx-auto mb-4 group-hover:scale-110 transition-transform duration-300'>
                        {index + 1}
                      </div>
                      <p className='font-medium text-gray-800 group-hover:text-[#9b0e2b] transition-colors duration-300'>
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className='mt-8'>
                <a href="#Contact" className='bg-[#9b0e2b] hover:bg-[#FFD700] text-white hover:text-gray-800 font-medium py-3 px-8 rounded-lg transition-all duration-500 shadow-md hover:shadow-lg inline-block transform hover:-translate-y-1'>
                  Get Started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default React.memo(Services);