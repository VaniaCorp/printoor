"use client";
import { useGSAP } from "@gsap/react";
import { about_details } from "./_data";
import { Icon } from "@iconify/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function AboutUs() {
  const [isHovered, setIsHovered] = useState(false);

  useGSAP(() => {
    const animText = document.querySelectorAll(".anim-hero");
    if (animText.length) {
      animText.forEach(item => {
        const splitText = new SplitText(item, { type: "chars, words" });
        gsap.set(splitText.chars, {
          scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none",
          },
          opacity: 0,
          yPercent: 100,
        });
        gsap.to(splitText.chars, {
          opacity: 1,
          yPercent: 0,
          stagger: 0.009,
          duration: 0.8,
          ease: "power3.out",
        })
      })
    }
  }, []);
  return (
    <section role="region" aria-label="About Us" className="w-full h-full max-h-[43.75em] md:max-h-[55em] flex flex-col md:flex-row items-start gap-8 md:gap-46 md:justify-center bg-white px-3 pt-24 md:px-6 md:py-22">
      <aside className="space-y-6">
        <h2 className="w-full max-w-[7em] md:max-w-md leading-none anim-hero">
          Your design.
          Our print.
          Perfect merch
        </h2>

        <button
          type="button"
          className="flex items-center gap-3 !border !border-black up-animation-black hover:!border"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="sr-only">Get Started</span>
          <Icon icon="mdi:whatsapp" width={20} height={20} className={`transition-transform duration-300 ${isHovered ? "-translate-x-100" : "translate-x-0"}`} />
          <span className={`transition-transform duration-300 whitespace-nowrap ${isHovered ? "-translate-x-5" : "-translate-x-0"}`}>GET STARTED</span>
          <Icon icon="mdi:whatsapp" width={20} height={20} className={`transition-transform duration-300 ${isHovered ? "-translate-x-3" : "translate-x-100"}`} />
        </button>
      </aside>
      <article className="w-full md:max-w-xl flex flex-col gap-3">
        {about_details.map((item, idx) => (
          <div
            key={idx}
            className={`py-3 md:py-6 space-y-2 md:space-y-4 ${idx !== about_details.length - 1 ? " border-b border-black border-dashed" : ""}`}
          >
            <h3 className="font-playfair-display-italic italic !font-medium anim-hero">{item.title}</h3>
            <p className="font-geist-sans text-xs md:text-sm uppercase opacity-55">{item.description}</p>
          </div>
        ))}
      </article>
    </section>
  )
}
