'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { primaryFont } from '@/app/fonts';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div
        className={`font-jawbreak uppercase ${primaryFont.className} bg-bannerbg text-bannertext text-center py-1 md:py-3 font-bold md:text-2xl text-xl tracking-wide`}
      >
        Limited Time Offer!
      </div>
      <header className="w-full bg-white text-black shadow-sm">
        <div className="w-full max-w-[1240px] mx-auto px-6 md:px-12 lg:px-20 bg-white">
          <div className="flex justify-between items-stretch">
            {/* Left Side: Hamburger Menu */}
            <div className="flex items-center justify-start w-[20%] sm:pl-0">
              <div className="relative">
                <button
                  className="p-2 text-black focus:outline-none bg-transparent border-none hover:bg-transparent relative z-50"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                  aria-expanded={isMenuOpen}
                >
                  <Image
                    src="/contentimages/hamburgermobile.webp"
                    alt="Open Menu"
                    width={24}
                    height={24}
                    className="w-6 h-6 object-contain"
                    style={{ minWidth: '24px', minHeight: '24px' }}
                  />
                </button>

                <div
                  className={`${isMenuOpen ? 'block' : 'hidden'} 
  fixed left-0 top-20 right-0 w-screen sm:absolute sm:left-0 sm:right-auto sm:top-[calc(100%+0.2rem)] sm:w-48 bg-white rounded-b-sm shadow-lg py-2 z-40`}
                >
                  <Link
                    href="#benefits"
                    className="block px-4 py-2 text-black hover:text-black bg-[#f9f9f9] text-base font-medium sm:bg-transparent sm:hover:bg-[#f9f9f9]"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Benefits
                  </Link>
                  <Link
                    href="#faqs"
                    className="block px-4 py-2 text-black hover:bg-[#f9f9f9] hover:text-black text-base font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    FAQs
                  </Link>
                </div>
              </div>
            </div>

            {/* Center: Logo */}
            <div className="w-auto sm:w-[40%] flex items-center justify-center mx-4 sm:mx-0">
              <div className="bg-white flex items-center justify-center py-2 px-6 sm:px-4 sm:w-full">
                <div className="h-8 w-20 sm:h-[60px] sm:w-[160px] relative">
                  <Image
                    src="/contentimages/VNSH-logow.avif"
                    alt="VNSH Holster"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Right Side: Cart Icon */}
            <div className="flex items-center justify-end w-[20%] sm:pr-0">
              <div className="w-10 h-10 flex items-center justify-center">
                <Image
                  src="/contentimages/cartmobile.webp"
                  alt="Shopping Cart"
                  width={28}
                  height={28}
                  className="w-6 h-6 object-contain"
                  style={{
                    minWidth: '28px',
                    minHeight: '28px',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
