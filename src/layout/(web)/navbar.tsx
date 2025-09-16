"use client";

import Image from "next/image";
import { nav_details } from "./_data";
import Link from "next/link";
import { Icon } from "@iconify/react";
import useDeviceSize from "@/hooks/useDeviceSize";
import useScrollNav from "@/hooks/useScrollNav";
import MobileNavigation from "./mobile-nav";
import { useCallback, useState } from "react";
import { smoothScrollTo } from "@/utils/smooth-scroll-to";

export default function Navbar() {
  const { isMobile } = useDeviceSize();
  const { isVisible, isDarkBg } = useScrollNav();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, link: string) => {
    e.preventDefault();
    smoothScrollTo(`#${link}`);
  }, []);

  return (
    <menu
      className={`fixed left-1/2 -translate-x-1/2 w-full max-w-[120em] h-max mx-auto backdrop-blur-lg flex items-center px-6 py-8 z-50 transition-all duration-300 ease-in-out
        ${isVisible ? 'top-0' : '-top-32'} ${isDarkBg ? 'bg-white/10' : 'bg-black/80'
        }`}
    >
      <Image
        src={"/logo-white.webp"}
        width={isMobile ? 114 : 149}
        height={isMobile ? 32 : 42.07}
        alt="Printoor"
        title="Printoor"
        aria-label="Printoor"
        aria-labelledby="Printoor"
        className="object-cover transition-opacity duration-300"
      />

      {isMobile ? (
        <button
          type="button"
          className="ml-auto text-xs up-animation-black"
          title="MENU"
          aria-label="MENU"
          aria-labelledby="MENU"
          onClick={handleOpen}
        >
          <span className="sr-only">MENU</span>
          MENU
        </button>
      ) : (
        <>
          <nav className="w-max ml-24 xl:ml-56 flex items-center gap-6">
            {nav_details.map((item, idx) => (
              <Link
                key={idx}
                href={`#${item?.link}`}
                onClick={(e) => handleNavClick(e, item?.link)}
                className={`whitespace-nowrap uppercase text-sm font-semibold font-gesit-sans transition-colors duration-300 text-white`}
                title={item?.title}
                aria-label={item?.title}
                aria-labelledby={item?.title}
              >
                <span className="sr-only">{item?.title}</span>
                {item?.title}
              </Link>
            ))}
          </nav>

          <aside className="w-max flex items-center ml-auto">
            <button
              type="button"
              className="whitespace-nowrap up-animation-black"
              title="CONTACT US"
              aria-label="CONTACT US"
              aria-labelledby="CONTACT US"
            >
              <span className="sr-only">CONTACT US</span>
              CONTACT US</button>
            <button
              type="button"
              className="up-animation-black !rounded-full !p-3"
              title="WHATSAPP"
              aria-label="WHATSAPP"
              aria-labelledby="WHATSAPP"
            >
              <span className="sr-only">WHATSAPP</span>
              <Icon icon="mdi:whatsapp" width={20} height={20} />
            </button>
          </aside>
        </>
      )}

      <MobileNavigation isOpen={isOpen} onClose={handleOpen} />
    </menu>
  )
}
