import React from 'react';

const About = () => {
  return (
    <div className='w-full py-16 bg-white' id='About'>
      <div className='container mx-auto px-4 sm:px-6 md:px-12 lg:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 items-center'>
          {/* Text Content - Left Side */}
          <div className='text-left space-y-6'>
            <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight'>
              🚀 BIG FAT INDIAN WEDDING? WE GOT YOU! 🎉
            </h1>
            
            <div className='w-24 h-1 bg-[#FFD700]'></div>
            
            <p className='text-gray-700 text-lg'>
            Planning a wedding is fun… until it’s NOT. Too many decisions, too many phone calls, and SO MUCH STRESS? Ugh. 
            But don’t worry, bestie, we got your back! At ShadiWadiWale, we handle everything—venue, décor, food, music, 
            and those last-minute panics—so you can just vibe, enjoy, and say I do without a headache! 💍✨
            </p>
            
            {/* <p className='text-gray-700 text-lg'>
              From lavish ceremonies to intimate gatherings, our team of experienced planners handles 
              everything with precision and care. We believe that your wedding should reflect your 
              personality and dreams, which is why we customize every aspect to align with your vision.
            </p> */}
            
            <div className='bg-gray-50 p-6 rounded-lg border-l-4 border-[#AA0000] shadow-sm'>
              <h3 className='font-semibold text-xl mb-2'>The Problem We Solve</h3>
              <p className='text-gray-600'>
                "Weddings should be about love, laughter, and killer dance moves, NOT stress and endless planning chaos. 
                Finding the perfect venue, coordinating vendors, and staying within budget is a NIGHTMARE! But guess what? 
                We make it a dream. From start to finish, we take care of it ALL. So, you just show up and slay. 😎🔥"
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
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Wedding Ceremony Placeholder";
                    }}
                  />
                </div>
                
                <div className='rounded-lg overflow-hidden shadow-md h-40'>
                  <img 
                    src="/mehdi.jpg" 
                    alt="Wedding Decor" 
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/200";
                      e.target.alt = "Wedding Decor Placeholder";
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
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/200";
                      e.target.alt = "Wedding Couple Placeholder";
                    }}
                  />
                </div>
                
                <div className='rounded-lg overflow-hidden shadow-md h-64'>
                  <img 
                    src="/rings.jpg" 
                    alt="Wedding Celebration" 
                    className='w-full h-full object-cover'
                    onError={(e) => {
                      e.target.src = "/api/placeholder/400/300";
                      e.target.alt = "Wedding Celebration Placeholder";
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

export default About;