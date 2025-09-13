"use client";

import Image from "next/image";
import { nav_details } from "./_data";
import Link from "next/link";
import { Icon } from "@iconify/react";
import useDeviceSize from "@/hooks/useDeviceSize";

export default function Navbar() {
  const { isMobile } = useDeviceSize();

  return (
    <menu className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-[120em] h-max mx-auto bg-white/10 backdrop-blur-lg flex items-center px-6 py-8 z-50">
      <Image
        src={"/logo-white.webp"}
        width={isMobile ? 114 : 149}
        height={isMobile ? 32 : 42.07}
        alt="Printoor"
        title="Printoor"
        aria-label="Printoor"
        aria-labelledby="Printoor"
        className="object-cover border"
      />

      {isMobile ? (
        <button
          type="button"
          className="ml-auto text-xs up-animation-black"
          title="MENU"
          aria-label="MENU"
          aria-labelledby="MENU"
        >
          <span className="sr-only">MENU</span>
          MENU
        </button>
      ) : (
        <>
          <nav className="w-max ml-56 flex items-center gap-6">
            {nav_details.map((item, idx) => (
              <Link
                key={idx}
                href={`#${item?.link}`}
                className="whitespace-nowrap text-white uppercase text-sm font-semibold font-gesit-sans"
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
    </menu>
  )
}
