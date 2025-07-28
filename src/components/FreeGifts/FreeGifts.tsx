import React, { useState, useRef, useCallback, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    src: '/contentimages/RFAKitImage.webp',
    alt: 'Image 1',
  },
  {
    src: '/contentimages/SuperNovaImage.webp',
    alt: 'Image 2',
  },
  {
    src: '/contentimages/DefenderImage.webp',
    alt: 'Image 3',
  },
  {
    src: '/contentimages/EverglowImage.webp',
    alt: 'Image 4',
  },
  {
    src: '/contentimages/RFImage.webp',
    alt: 'Image 5',
  },
  {
    src: '/contentimages/ESBImage.webp',
    alt: 'Image 6',
  },
  {
    src: '/contentimages/ShockwaveImage.webp',
    alt: 'Image 7',
  },
];

const FreeGifts: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const autoSlideRef = useRef<NodeJS.Timeout | null>(null);
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);
  const [isAutoSliding, setIsAutoSliding] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const startX = useRef(0);
  const INACTIVITY_TIMEOUT = 5000;

  // Move slide with bounds
  const moveSlide = useCallback((direction: number) => {
    setCurrent(prev => {
      let next = prev + direction;
      if (next < 0) return slides.length - 1;
      if (next >= slides.length) return 0;
      return next;
    });
    resetInactivityTimer();
  }, []);

  // Auto slide logic
  const startAutoSlide = useCallback(() => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    setIsAutoSliding(true);
    autoSlideRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length);
    }, 1000);
  }, []);

  const stopAutoSlide = useCallback(() => {
    setIsAutoSliding(false);
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      startAutoSlide();
    }, INACTIVITY_TIMEOUT);
  }, [startAutoSlide]);

  // Handle interaction (pause auto, reset inactivity)
  const handleInteraction = useCallback(() => {
    stopAutoSlide();
    resetInactivityTimer();
  }, [stopAutoSlide, resetInactivityTimer]);

  // Start auto-slide after 5s
  useEffect(() => {
    const timer = setTimeout(() => {
      startAutoSlide();
    }, INACTIVITY_TIMEOUT);
    return () => {
      clearTimeout(timer);
      stopAutoSlide();
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [startAutoSlide, stopAutoSlide]);

  // Add event listeners for interaction
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener('click', handleInteraction);
    track.addEventListener('mouseenter', handleInteraction);
    track.addEventListener('touchstart', handleInteraction);
    // Swipe support
    const onTouchStart = (e: TouchEvent) => {
      startX.current = e.touches[0].clientX;
      handleInteraction();
    };
    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const delta = endX - startX.current;
      if (delta < -50) moveSlide(1);
      else if (delta > 50) moveSlide(-1);
    };
    track.addEventListener('touchstart', onTouchStart);
    track.addEventListener('touchend', onTouchEnd);
    return () => {
      track.removeEventListener('click', handleInteraction);
      track.removeEventListener('mouseenter', handleInteraction);
      track.removeEventListener('touchstart', handleInteraction);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchend', onTouchEnd);
    };
  }, [handleInteraction, moveSlide]);

  return (
    <div className="w-full flex flex-col items-center mt-8 px-4">
      <div className="relative w-full max-w-4xl mx-auto overflow-hidden">
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 p-0 flex items-center justify-center bg-[#333] hover:bg-black font-bold text-2xl rounded-full shadow-2xl"
          onClick={() => moveSlide(-1)}
          aria-label="Previous Gift"
        >
          ❮
        </button>
        <div
          ref={trackRef}
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slides.map((slide, idx) => (
            <div key={slide.src} className="min-w-full flex items-center justify-center px-0 py-0">
              <Image
                src={slide.src}
                alt={slide.alt}
                width={1280}
                height={640}
                className="object-contain bg-white"
                {...(idx === 0 ? { priority: true } : { loading: 'lazy' })}
              />
            </div>
          ))}
        </div>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-11 h-11 p-0 flex items-center justify-center bg-[#333] hover:bg-black font-bold text-2xl rounded-full shadow-2xl"
          onClick={() => moveSlide(1)}
          aria-label="Next Gift"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

export default FreeGifts;
