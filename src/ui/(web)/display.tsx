"use client";

import { Icon } from "@iconify/react";
import { image_display } from "./_data";
import Image from "next/image";
import { useState, useCallback, useMemo, useRef } from "react";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function Display() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { isMobile } = useDeviceSize();
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragDeltaRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  // Calculate dimensions and visible images
  const { imageWidth, imageHeight, gap, maxIndex } = useMemo(() => {
    const imageWidth = isMobile ? 270 : 470;
    const imageHeight = isMobile ? 270 : 470;
    const gap = 12; // 3 * 4px (gap-3 in Tailwind = 0.75rem = 12px)
    
    // Calculate how many images can fit in the viewport
    // Assuming container padding and accounting for gaps
    const containerPadding = isMobile ? 24 : 48; // px-3 (12px) or px-6 (24px) on each side
    const availableWidth = typeof window !== 'undefined' 
      ? window.innerWidth - containerPadding 
      : isMobile ? 350 : 1200; // fallback values
    
    const visibleImages = Math.floor((availableWidth + gap) / (imageWidth + gap));
    const maxIndex = Math.max(0, image_display.length - visibleImages);
    
    return { imageWidth, imageHeight, gap, visibleImages, maxIndex };
  }, [isMobile]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(maxIndex, prev + 1));
  }, [maxIndex]);

  // Touch event handlers
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    isDragging.current = true;
    dragDeltaRef.current = 0;
    // Disable transition during drag for buttery movement
    if (trackRef.current) {
      trackRef.current.classList.add("transition-none");
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.targetTouches[0].clientX;
    const delta = touchEndX.current - touchStartX.current;
    dragDeltaRef.current = delta;
    // Apply transform with rAF to keep 60fps
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!trackRef.current) return;
      const unit = imageWidth + gap;
      const base = -currentIndex * unit;
      // Soft bounds resistance
      const maxTranslate = 0;
      const minTranslate = -maxIndex * unit;
      let next = base + delta;
      if (next > maxTranslate) {
        next = maxTranslate + (next - maxTranslate) * 0.2;
      } else if (next < minTranslate) {
        next = minTranslate + (next - minTranslate) * 0.2;
      }
      trackRef.current.style.transform = `translateX(${next}px)`;
    });
  }, [currentIndex, gap, imageWidth, maxIndex]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.classList.remove("transition-none");
    }
    const delta = dragDeltaRef.current || (touchEndX.current - touchStartX.current);
    const unit = imageWidth + gap;
    const shift = Math.round(-delta / unit); // positive when dragging left
    if (shift !== 0) {
      setCurrentIndex(prev => {
        const next = Math.min(maxIndex, Math.max(0, prev + shift));
        return next;
      });
    }

    // Reset positions
    touchStartX.current = 0;
    touchEndX.current = 0;
    dragDeltaRef.current = 0;
  }, [gap, imageWidth, maxIndex]);

  // Mouse event handlers for desktop drag support
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    touchStartX.current = e.clientX;
    dragDeltaRef.current = 0;
    if (trackRef.current) {
      trackRef.current.classList.add("transition-none");
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
    const delta = touchEndX.current - touchStartX.current;
    dragDeltaRef.current = delta;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      if (!trackRef.current) return;
      const unit = imageWidth + gap;
      const base = -currentIndex * unit;
      const maxTranslate = 0;
      const minTranslate = -maxIndex * unit;
      let next = base + delta;
      if (next > maxTranslate) {
        next = maxTranslate + (next - maxTranslate) * 0.2;
      } else if (next < minTranslate) {
        next = minTranslate + (next - minTranslate) * 0.2;
      }
      trackRef.current.style.transform = `translateX(${next}px)`;
    });
  }, [currentIndex, gap, imageWidth, maxIndex]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging.current) return;
    isDragging.current = false;
    if (trackRef.current) {
      trackRef.current.classList.remove("transition-none");
    }
    const delta = dragDeltaRef.current || (touchEndX.current - touchStartX.current);
    const unit = imageWidth + gap;
    const shift = Math.round(-delta / unit);
    if (shift !== 0) {
      setCurrentIndex(prev => {
        const next = Math.min(maxIndex, Math.max(0, prev + shift));
        return next;
      });
    }
    // Reset positions
    touchStartX.current = 0;
    touchEndX.current = 0;
    dragDeltaRef.current = 0;
  }, [gap, imageWidth, maxIndex]);

  const handleMouseLeave = useCallback(() => {
    if (isDragging.current) {
      isDragging.current = false;
      touchStartX.current = 0;
      touchEndX.current = 0;
      dragDeltaRef.current = 0;
      if (trackRef.current) {
        trackRef.current.classList.remove("transition-none");
      }
    }
  }, []);

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex >= maxIndex;

  return (
    <section role="region" aria-label="Display" id="browse-portfolio" className="w-full h-[35em] md:h-[56.25em] bg-cream px-3 py-12 md:px-6 md:py-22 space-y-3">
      <header className="w-full flex items-end justify-between">
        <h3 className="w-full max-w-xs md:max-w-5xl font-geist-sans">
          We pride ourselves in efficiency and effectiveness in quality prints delivery
        </h3>
        <aside className="flex items-center gap-1">
          <button
            type="button"
            className="action-button"
            title="Previous"
            aria-label="Previous"
            onClick={handlePrevious}
            disabled={isAtStart}
          >
            <span className="sr-only">Previous</span>
            <Icon icon="mdi:arrow-left" width={20} height={20} />
          </button>
          <button
            type="button"
            className="action-button"
            title="Next"
            aria-label="Next"
            onClick={handleNext}
            disabled={isAtEnd}
          >
            <span className="sr-only">Next</span>
            <Icon icon="mdi:arrow-right" width={20} height={20} />
          </button>
        </aside>
      </header>

      <section 
        role="region" 
        aria-label="Display Images" 
        className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="h-full flex gap-3 transition-transform duration-300 ease-out pointer-events-none"
          ref={trackRef}
          style={{ 
            width: `${image_display.length * (imageWidth + gap) - gap}px`,
            transform: `translateX(-${currentIndex * (imageWidth + gap)}px)` 
          }}
        >
          {image_display.map((item, idx) => (
            <div 
              key={item} 
              className="flex-shrink-0 overflow-hidden rounded-sm" 
              style={{ width: `${imageWidth}px`, height: `${imageHeight + (isMobile ? 70 : 170)}px` }}
              aria-label={`Display Image ${idx + 1}`} 
              aria-labelledby={`Display Image ${idx + 1}`}
            >
              <Image
                src={item}
                alt={`Display Image ${idx + 1}`}
                width={imageWidth}
                height={imageHeight}
                aria-label={`Display Image ${idx + 1}`}
                aria-labelledby={`Display Image ${idx + 1}`}
                loading="lazy"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
