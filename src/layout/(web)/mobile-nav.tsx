"use client";

import { Icon } from "@iconify/react";
import { nav_details, socials } from "./_data";
import Link from "next/link";
import Image from "next/image";
import useDeviceSize from "@/hooks/useDeviceSize";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { smoother } from "@/utils/smooth-scroll";
import { smoothScrollTo } from "@/utils/smooth-scroll-to";
import { useCallback, useEffect } from "react";

type MobileNavigationProps = {
  isOpen: boolean;
  onClose: () => void;
}

gsap.registerPlugin(useGSAP);

export default function MobileNavigation({ isOpen, onClose }: MobileNavigationProps) {
  const { isMobile } = useDeviceSize();

  useGSAP(() => {
    if (typeof window === "undefined") return;
    smoother?.paused(isOpen);
  }, [isOpen]);

  // Prevent body scrolling when mobile nav is open
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    if (isOpen) {
      // Store current scroll position
      const scrollY = window.scrollY;
      
      // Prevent scrolling
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
    } else {
      // Restore scrolling
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      
      // Restore scroll position
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup function to ensure scroll is restored if component unmounts
    return () => {
      if (isOpen) {
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        if (scrollY) {
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    };
  }, [isOpen]);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    smoothScrollTo(`#${link}`);
    onClose(); // Close mobile nav after clicking
  }, [onClose]);

  return (
    <menu className={`fixed top-0 left-0 w-full h-screen flex flex-col bg-white z-50 transition-all duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <button
        type="button"
        className="!absolute top-7 right-5 flex items-center gap-3 up-animation-black !border !border-black"
        onClick={onClose}
      >
        <span className="sr-only">Close</span>
        <Icon icon="mingcute:fault-line" width={24} height={24} />
        CLOSE
      </button>

      <nav className="w-full flex flex-col gap-8 px-6 py-8 mt-32">
        {nav_details.map((item, idx) => (
          <Link
            key={idx}
            href={`#${item?.link}`}
            onClick={(e) => handleNavClick(e, item?.link)}
            className="w-max uppercase text-4xl font-semibold font-gesit-sans transition-colors duration-300 text-black"
          >
            <span className="sr-only">{item?.title}</span>
            {item?.title}
          </Link>
        ))}
      </nav>

      <section
        className="relative w-full h-full bg-[url('/images/footer-img.webp')] bg-cover bg-center bg-no-repeat px-6 py-8 flex items-end"
      >
        <aside className="w-max space-y-12">
          <Image
            src={'/logo-black.webp'}
            alt="Printoor"
            title="Printoor"
            aria-label="Printoor"
            aria-labelledby="Printoor"
            width={isMobile ? 114 : 150}
            height={isMobile ? 32 : 43}
            className="w-max object-cover"
          />

          <div role="navigation" aria-label="Socials Display" className="w-full flex items-center justify-between">
            {socials.map((item, idx) => (
              <Link
                href={`#${item?.link}`}
                key={idx}
                title={item?.icon}
                aria-label={item?.icon}
                aria-labelledby={item?.icon}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-cream transition-all duration-150 ease-in-out hover:bg-black hover:text-cream"
              >
                <span className="sr-only">{item?.icon}</span>
                <Icon icon={item?.icon} width={24} height={24} />
              </Link>
            ))}
          </div>

          <span className="font-geist-sans opacity-70">
            &copy; {new Date().getFullYear()} &ndash; All rights reserved.
          </span>
        </aside>
      </section>
    </menu>
  )
}
