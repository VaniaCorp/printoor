"use client";

import { useState, useEffect, useCallback } from 'react';

interface ScrollNavState {
  isVisible: boolean;
  isDarkBg: boolean;
  scrollY: number;
}

export default function useScrollNav() {
  const [state, setState] = useState<ScrollNavState>({
    isVisible: true,
    isDarkBg: false,
    scrollY: 0,
  });

  const handleScroll = useCallback(() => {
    setState(prevState => {
      const currentScrollY = window.scrollY;
      const scrollDelta = currentScrollY - prevState.scrollY;
      
      // Determine if we're on a dark section (hero section or other dark backgrounds)
      const heroSection = document.querySelector('main');
      const displaySection = document.querySelector('[aria-label="Display"]');
      
      let isDarkBg = false;
      
      if (heroSection && displaySection) {
        const heroRect = heroSection.getBoundingClientRect();
        const displayRect = displaySection.getBoundingClientRect();
        
        // If hero is still visible or we're before the display section
        isDarkBg = heroRect.bottom > 100 || displayRect.top > 0;
      }
      
      // Show/hide logic
      let isVisible = true;
      
      if (currentScrollY > 100) { // Only start hiding after scrolling past initial area
        if (scrollDelta > 0 && Math.abs(scrollDelta) > 5) {
          // Scrolling down - hide navbar
          isVisible = false;
        } else if (scrollDelta < -10) {
          // Scrolling up with some threshold - show navbar
          isVisible = true;
        } else {
          // Maintain current visibility state for small movements
          isVisible = prevState.isVisible;
        }
      }
      
      return {
        isVisible,
        isDarkBg,
        scrollY: currentScrollY,
      };
    });
  }, []);

  useEffect(() => {
    let ticking = false;
    
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [handleScroll]);

  return {
    isVisible: state.isVisible,
    isDarkBg: state.isDarkBg,
  };
}
