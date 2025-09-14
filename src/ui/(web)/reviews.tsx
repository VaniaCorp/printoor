"use client";

import { reviews_details } from "./_data";

export default function Reviews() {
  return (
    <section role="region" aria-label="Reviews" className="relative w-full h-full max-h-[32.5em] md:max-h-[45em] bg-white flex flex-col items-center justify-center">
      <div className="w-max space-y-1">
        <p className="text-xs md:text-base font-geist-sans uppercase opacity-70 text-center font-semibold">OUR PROOF OF WORK</p>
        <h2 className="font-playfair-display-italic italic">
          <span>Real Stories.</span>&nbsp;
          <span>Real Prints</span>
        </h2>
      </div>

      <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-between py-12 md:py-22 overflow-hidden">
        <div className="flex items-center justify-center gap-5 md:gap-10">
          {reviews_details.top.map((item, idx) => (
            <span
              key={idx}
              className={`relative group w-56 md:w-full md:max-w-56 gap-5 flex flex-col px-4 py-3 rounded-2xl bg-cream transition-all duration-150 ease-in-out hover:bg-black hover:text-cream ${idx%2 === 0 ? "md:-mt-24 hover:translate-y-6" : "-mt-12 md:mt-0 hover:-translate-y-6"}`}
            >
              <p className="text-base md:text-xs xl:text-base">{item.text}</p>
              <small className="uppercase opacity-60">{item.author}</small>
              <div className={`absolute bg-cream group-hover:bg-black ease-in-out duration-150 triangle rounded-sm ${idx%2 === 0 ? "-top-5 left-0" : "-bottom-5 right-0 scale-y-[-1]"}`}></div>
            </span>
          ))}
        </div>
        <div className="flex items-center justify-center gap-5 md:gap-10">
          {reviews_details.bottom.map((item, idx) => (
            <span
              key={idx}
              className={`relative group w-56 md:w-full md:max-w-56 gap-5 flex flex-col px-4 py-3 rounded-2xl bg-cream transition-all duration-150 ease-in-out hover:bg-black hover:text-cream ${idx%2 === 0 ? "md:-mt-24 hover:translate-y-6" : "md:mt-0 hover:-translate-y-6"}`}
            >
              <p className="text-base md:text-xs xl:text-base">{item.text}</p>
              <small className="uppercase opacity-60">{item.author}</small>
              <div className={`absolute bg-cream group-hover:bg-black ease-in-out duration-150 triangle rounded-sm ${idx%2 === 0 ? "-top-5 right-0" : "-bottom-5 left-0 scale-y-[-1]"}`}></div>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
