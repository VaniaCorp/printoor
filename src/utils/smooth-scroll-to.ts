"use client";

import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollToPlugin);

/**
 * Smoothly scroll to a target element using GSAP ScrollToPlugin
 * @param target - CSS selector or element to scroll to
 * @param offset - Optional offset from the top of the target element (default: 100)
 */
export const smoothScrollTo = (target: string | Element, offset: number = 100) => {
  if (typeof window === "undefined") return;
  
  const selector = typeof target === "string" ? target : target;
  
  gsap.to(window, {
    duration: 1.2,
    scrollTo: { 
      y: selector, 
      offsetY: offset 
    },
    ease: "power2.inOut",
  });
};
