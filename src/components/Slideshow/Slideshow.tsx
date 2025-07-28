'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Slideshow: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
    {
      image: '/contentimages/VNSH_LaserStrike_HeroDesktop.webp',
      alt: 'Hero slide',
    },
    {
      image: '/contentimages/VNSH_LaserStrike_5Desktop.webp',
      alt: 'Laser Strike 5',
    },
    {
      image: '/contentimages/VNSH_LaserStrike_4Desktop.webp',
      alt: 'Image 3',
    },
    {
      image: '/contentimages/VNSH_LaserStrike_3Desktop.webp',
      alt: 'Laser Strike 3',
    },
    {
      image: '/contentimages/VNSH_LaserStrike_2Desktop.webp',
      alt: 'Laser Strike 2',
    },
    {
      image: '/contentimages/VNSH_LaserStrike_1Desktop.webp',
      alt: 'Laser Strike 2',
    },
    {
      image: '/contentimages/HolsterHero2.webp',
      alt: 'Image 6',
    },
    {
      image: '/contentimages/Desktop3.webp',
      alt: 'Image 7',
    },
  ];

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    // No-op
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-[80rem] mx-auto px-0 sm:px-4">
      {/* Main Row: New Image & Carousel */}
      <div className="flex flex-col md:flex-row items-center justify-center w-full gap-0 md:gap-0 p-0 m-0">
        {/* New Image */}
        <div className="flex-1 flex items-center justify-center h-full w-full p-0 m-0 mb-0 pb-0">
          <img
            src="/contentimages/VNSH_LaserStrike_1DesktopNew.webp"
            alt="Laser Strike Beside Carousel"
            className="w-full h-auto max-h-[600px] object-contain p-0 m-0"
            style={{ padding: 0, margin: 0 }}
          />
        </div>
        {/* Carousel */}
        <div className="flex-1 flex items-center justify-center h-full">
          <div className="relative w-full overflow-hidden p-0 m-0 mb-0 pb-0" style={{ padding: 0, margin: 0, marginBottom: 0, paddingBottom: 0 }}>
            <div
              className="flex transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div style={{ transform: index === 1 ? 'scale(0.90)' : undefined, display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="w-full h-auto max-h-[440px] md:max-h-[500px] object-contain mx-auto p-0 m-0 block"
                      loading="lazy"
                      style={{ padding: 0, margin: 0, display: 'block' }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={prevSlide}
              className="text-xl sm:text-2xl absolute left-0 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#000000CC] text-white p-2 sm:p-3 rounded-none transition-all backdrop-blur-sm"
              aria-label="Previous slide"
            >
              ❮
            </button>
            <button
              onClick={nextSlide}
              className="text-xl sm:text-2xl absolute right-0 top-1/2 transform -translate-y-1/2 bg-transparent hover:bg-[#000000CC] text-white p-2 sm:p-3 rounded-none transition-all backdrop-blur-sm"
              aria-label="Next slide"
            >
              ❯
            </button>
          </div>
        </div>
      </div>
      {/* Thumbnails Centered Below */}
      <div className="flex justify-center space-x-3 sm:space-x-2 md:space-x-3 p-2 w-full max-w-[900px] mt-2 mb-0 overflow-x-auto">
        {slides.map((slide, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-8 h-6 sm:w-12 sm:h-9 md:w-20 md:h-14 overflow-visible transition-all bg-transparent p-0 border-0 ${
              currentSlide === index ? 'ring-1 ring-gray-300' : 'opacity-70 hover:opacity-100'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          >
            <img
              src={slide.image}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover rounded-none"
              loading="lazy"
              style={{ borderRadius: 0 }}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Slideshow;
