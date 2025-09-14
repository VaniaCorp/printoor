"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { showcase_details } from "./_data";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);
export default function Showcase() {
  const [index, setIndex] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  const triggerDistortion = () => {
    if (!turbRef.current || !dispRef.current) return;

    gsap.fromTo(
      dispRef.current,
      { attr: { scale: 0 } },
      {
        attr: { scale: 60 },
        duration: 0.6,
        ease: "power3.inOut",
        yoyo: true,
        repeat: 1,
      }
    );
    gsap.fromTo(
      turbRef.current,
      { attr: { baseFrequency: 0.001 } },
      {
        attr: { baseFrequency: 0.08 },
        duration: 0.6,
        ease: "power3.inOut",
        yoyo: true,
        repeat: 1,
      }
    );

    // fade animation for the article image
    if (imgRef.current) {
      gsap.fromTo(
        imgRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.7, ease: "power2.inOut" }
      );
    }
  };

  const nextSlide = () => {
    triggerDistortion();
    setIndex((prev) => (prev + 1) % showcase_details.length);
  };
  const prevSlide = () => {
    triggerDistortion();
    setIndex((prev) =>
      prev === 0 ? showcase_details.length - 1 : prev - 1
    );
  };

  // autoplay
  useGSAP(() => {
    const timer = setInterval(() => nextSlide(), 7000);
    return () => clearInterval(timer);
  }, []);

  // tap zones: only 7% inward edges are active
  const handleEdgeClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const edgeZone = rect.width * 0.07;
    if (x < edgeZone) {
      prevSlide();
    } else if (x > rect.width - edgeZone) {
      nextSlide();
    }
  };

  const current = showcase_details[index];

  // just to show how you’d scope GSAP to this component
  useGSAP(
    () => {
      // initial fade-in for the article image on mount
      if (imgRef.current) {
        gsap.fromTo(
          imgRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6, ease: "power2.inOut" }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      role="region"
      aria-label="Showcase"
      className="relative w-full h-full max-h-[43.75em] md:max-h-[55em] overflow-hidden select-none cursor-pointer"
      onClick={handleEdgeClick}
    >
      {/* SVG filter definition */}
      <svg className="absolute w-0 h-0">
        <filter id="liquid-distort">
          <feTurbulence
            ref={turbRef}
            type="turbulence"
            baseFrequency="0.001"
            numOctaves="3"
            result="turb"
          />
          <feDisplacementMap
            ref={dispRef}
            in2="turb"
            in="SourceGraphic"
            scale="0"
          />
        </filter>
      </svg>

      <div className="absolute inset-0 w-full h-full">
        <picture className="absolute inset-0 w-full h-full blur-xs">
          <source
            srcSet={current.bg_desktop}
            media="(min-width: 768px)"
            style={{ filter: "url(#liquid-distort)" }}
          />
          <source
            srcSet={current.bg_mobile}
            media="(max-width: 767px)"
            style={{ filter: "url(#liquid-distort)" }}
          />
          <img
            src={current.bg_desktop}
            alt=""
            className="w-full h-full object-cover blur-sm"
            style={{ filter: "url(#liquid-distort)" }}
          />
        </picture>
      </div>

      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <div className="relative w-full max-w-[21.563em] md:max-w-[39em] bg-white p-3 md:p-6 flex flex-col space-y-6">
          <Image
            ref={imgRef}
            src={current.image}
            alt={`Showcase ${index + 1}`}
            width={600}
            height={400}
            priority
            className="w-full h-auto object-cover"
          />
          <article className="flex flex-col items-center justify-center gap-2">
            <small className="uppercase opacity-70 font-semibold">
              BRANDING & MERCH SHOP
            </small>
            <h3 className="font-playfair-display-italic italic">
              Visit our Merch Store
            </h3>
            <p className="uppercase text-center opacity-70 text-xs md:text-base">
              STAY JIGGY AND STYLED UP. We understand budget sensitivity and are
              happy to help everyone regardless of projector customer size.
            </p>
            <button
              type="button"
              className="px-4 py-3 rounded-full !border-2 !border-black hover:!border-2 font-semibold mt-6 !cursor-not-allowed disabled:opacity-50 disabled:cursor-not-allowed"
              disabled
            >
              COMING SOON
            </button>
          </article>
        </div>
      </div>
    </section>
  );
}
