"use client";

import useDeviceSize from "@/hooks/useDeviceSize";
import Image from "next/image";
import { footer_links, socials } from "./_data";
import Link from "next/link";
import { Icon } from "@iconify/react";

export default function Footer() {
  const { isMobile } = useDeviceSize();

  return (
    <footer role="contentinfo" aria-label="Footer" className="relative w-full mx-auto h-full px-6 py-8 md:py-24 md:px-20 space-y-6 flex flex-col-reverse md:flex-row items-start md:justify-between bg-[url('/images/footer-img.svg')] bg-cover bg-center bg-no-repeat">
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

        <div role="navigation" aria-label="Socials Display" className="w-full md:w-max flex items-center justify-between md:gap-8">
          {socials.map((item, idx) => (
            <Link
              href={item?.link}
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
      <section className="w-max grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-20">
        {footer_links.map((item, idx) => (
          <div key={idx} className="space-y-3">
            <p className="uppercase text-sm md:text-base font-geist-sans opacity-70">{item?.section}</p>
            <div className="flex flex-col gap-3">
              {item?.links.map((link, idx) => (
                <Link
                  key={idx}
                  // href={link?.href}
                  href={""}
                  title={link?.title}
                  aria-label={link?.title}
                  aria-labelledby={link?.title}
                  className="text-base md:text-lg font-medium font-geist-sans hover:underline whitespace-nowrap"
                >
                  <span className="sr-only">{link?.title}</span>
                  {link?.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>

      <form
        className="relative w-full max-w-md h-max mb-6 md:mb-0 md:h-[32.25em] space-y-3 px-6 py-8 bg-cream rounded-2xl"
      >
        <p className="uppercase text-sm md:text-base font-geist-sans">CONTACT US</p>

        <h4 className="font-medium font-playfair-display-italic italic opacity-55">
          Seeking personalized support? Request a call from our team
        </h4>

        <section className="w-full flex flex-col gap-3">
          <span>
            <label htmlFor="name" className="w-max uppercase text-xs opacity-60">Your name</label>
            <span className="sr-only">Your name</span>
            <input type="text" name="name" id="name" aria-label="Your name" aria-labelledby="Your name" />
          </span>
          <span>
            <label htmlFor="email" className="w-max uppercase text-xs opacity-60">Email Address</label>
            <span className="sr-only">Email Address</span>
            <input type="email" name="email" id="email" aria-label="Email Address" aria-labelledby="Email Address" />
          </span>
        </section>

        <button
          type="button"
          className="up-animation-black !border-2 !border-black"
          title="SEND A MAIL"
          aria-label="SEND A MAIL"
          aria-labelledby="SEND A MAIL"
        >
          <span className="sr-only">SEND A MAIL</span>
          SEND A MAIL
        </button>
      </form>
    </footer>
  )
}
