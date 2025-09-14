"use client";

import { Icon } from "@iconify/react";
import { image_display } from "./_data";
import Image from "next/image";
import { useState, useCallback } from "react";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function Display() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const { isMobile } = useDeviceSize();

  const handlePrevious = useCallback(() => {
    setCurrentIndex(prev => Math.max(0, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(image_display.length - 1, prev + 1));
  }, []);

  const isAtStart = currentIndex === 0;
  const isAtEnd = currentIndex === image_display.length - 1;

  return (
    <section role="region" aria-label="Display" className="w-full h-[35em] md:h-[56.25em] bg-cream px-3 py-12 md:px-6 md:py-22 space-y-3">
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

      <section role="region" aria-label="Display Images" className="w-full h-full overflow-hidden">
        <div
          className="w-full h-full flex gap-3 transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / image_display.length)}%)` }}
        >
          {image_display.map((item, idx) => (
            <div key={item} className="flex-shrink-0" aria-label={`Display Image ${idx + 1}`} aria-labelledby={`Display Image ${idx + 1}`}>
              <Image
                src={item}
                alt={`Display Image ${idx + 1}`}
                width={isMobile ? 270 : 470}
                height={isMobile ? 270 : 470}
                aria-label={`Display Image ${idx + 1}`}
                aria-labelledby={`Display Image ${idx + 1}`}
                className="object-cover"
                priority={idx === currentIndex}
              />
            </div>
          ))}
        </div>
      </section>
    </section>
  )
}
