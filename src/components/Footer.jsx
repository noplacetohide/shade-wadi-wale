import React from 'react'

const Footer = () => {
  return (
    <footer className='bg-gray-900 text-white' id='Contact'>
      <div className='container mx-auto px-4 sm:px-6 md:px-12 lg:px-20'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12'>
          {/* Company Info */}
          <div>
            <h3 className='text-xl font-bold mb-4'>ShadiWadiWale</h3>
            <p className='text-gray-400'>Shadi Aapki, Tension Hamari!.</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Quick Links</h3>
            <ul className='space-y-2'>
              <li><a href="#Header" className='text-gray-400 hover:text-[#FFD700] transition-colors'>Home</a></li>
              <li><a href="#About" className='text-gray-400 hover:text-[#FFD700] transition-colors'>About</a></li>
              <li><a href="#Services" className='text-gray-400 hover:text-[#FFD700] transition-colors'>Services</a></li>
              <li><a href="#Contact" className='text-gray-400 hover:text-[#FFD700] transition-colors'>Contact</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Contact Us</h3>
            <ul className='space-y-2 text-gray-400'>
              <li>123 Wedding Street, City</li>
              <li>info@shadiwadiwale.com</li>
              <li>+91 123 456 7890</li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Stay Updated</h3>
            <p className='text-gray-400 mb-2'>Subscribe to our newsletter</p>
            <div className='flex'>
              <input 
                type="email" 
                placeholder="Your email" 
                className='p-2 w-full rounded-l-md focus:outline-none text-gray-800' 
              />
              <button className='bg-[#FFD700] text-gray-900 rounded-r-md px-3 font-medium'>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className='border-t border-gray-800 py-6 text-center text-gray-400'>
          <p>© {new Date().getFullYear()} ShadiWadiWale. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer