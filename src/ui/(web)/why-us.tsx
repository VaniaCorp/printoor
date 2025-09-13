"use client";

import { Icon } from "@iconify/react/dist/iconify.js";
import { why_us_details } from "./_data";

export default function WhyUs() {
  return (
    <section role="region" aria-label="Why Us" id="why-us" className="relative w-full h-full max-h-[43.75em] md:max-h-[55em] flex flex-col items-center justify-center">
      <div className="absolute inset-0 bg-black/70"></div>

      <h3 className="text-white z-10 mb-12 md:mb-24 italic font-playfair-display-italic md:not-italic md:font-geist-sans">
        Why our customers love us
      </h3>

      <article className="w-full max-w-3xl text-white z-10 space-y-3 md:space-y-6 px-3 md:px-0">
        {why_us_details.map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 md:gap-6">
            <Icon icon={item.icon} width={48} height={48} />
            <div>
              <h5>{item.title}</h5>
              <p className="text-xs md:text-base font-light">{item.description}</p>
            </div>
          </div>
        ))}
      </article>
    </section>
  )
}
