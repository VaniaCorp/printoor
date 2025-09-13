"use client";
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Icon } from '@iconify/react';
import useDeviceSize from '@/hooks/useDeviceSize';

gsap.registerPlugin(useGSAP, SplitText, ScrollTrigger);

export default function Hero() {
  const { isMobile } = useDeviceSize();

  useGSAP(() => {
    // Create master timeline
    const masterTL = gsap.timeline({
      scrollTrigger: {
        trigger: '.hero-content',
        start: 'top 80%',
        toggleActions: "play none none none",
      }
    });

    // Split text elements
    const textElements = document.querySelectorAll('.split-text');
    const splitTexts: SplitText[] = [];

    // Process all text elements and store SplitText instances
    textElements.forEach(text => {
      const splitText = new SplitText(text, {
        type: 'chars, words',
      });
      splitTexts.push(splitText);
      
      // Set initial state for chars
      gsap.set(splitText.chars, {
        opacity: 0,
        yPercent: 200,
      });
    });

    // Animate text elements sequentially with overlap
    splitTexts.forEach((splitText, index) => {
      masterTL.to(splitText.chars, {
        opacity: 1,
        yPercent: 0,
        stagger: 0.01,
        duration: 0.8,
        ease: 'power3.out',
      }, index * 0.3); // Overlap animations by starting each 0.3s after the previous
    });

    // Paragraph reveal animation - starts after text animations
    const paragraphContainer = document.querySelector('.paragraph-container');
    const revealCover = document.querySelector('.reveal-cover');
    const paragraphText = document.querySelector('.paragraph-text');

    if (paragraphContainer && revealCover && paragraphText) {
      // Set initial states
      gsap.set(paragraphText, {
        yPercent: 100,
        opacity: 0,
      });
      
      gsap.set(revealCover, {
        xPercent: 0,
      });

      // Add paragraph animation to timeline
      masterTL.to(paragraphText, {
        yPercent: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out',
      }, "-=0.4") // Start 0.4s before the previous animation ends
      .to(revealCover, {
        xPercent: -100,
        duration: 1,
        ease: 'power3.inOut',
      }, "-=0.6"); // Start 0.6s before the previous animation ends
    }

    // Cleanup function
    return () => {
      splitTexts.forEach(splitText => splitText.revert());
      masterTL.kill();
    };
  }, [])

  return (
    <main className='relative w-full h-screen max-h-[75em] bg-black/20 flex items-center'>
      <section className='px-6 md:px-24'>
        <div className='hero-content flex flex-col'>
          {isMobile ? (
            <>
              <span className='sr-only'>Shaping Design Visions into Reality Through Prints</span>
              <div className="text-container">
                <h1 className='split-text text-white'>Shaping</h1>
              </div>
              <div className="text-container">
                <h1 className='split-text text-white'>Design Visions</h1>
              </div>
              <div className="text-container">
                <h1 className='split-text text-white'>into Reality</h1>
              </div>
              <div className="text-container">
                <h1 className='split-text font-playfair-display-italic italic text-white'>Through Prints</h1>
              </div>

              <div className='paragraph-container relative mt-6 overflow-hidden'>
                <p className='paragraph-text text-white/50 text-sm font-geist-sans uppercase'>
                  From t-shirts to mugs, we bring your ideas to life with high-quality printing & designs.
                </p>
                <div className='reveal-cover absolute inset-0 bg-black/20'></div>
              </div>
              <span className='sr-only'>From t-shirts to mugs, we bring your ideas to life with high-quality printing & designs.</span>
            </>
          ) : (
            <>
              <span className='sr-only'>Shaping Design Visions into Reality Through Prints</span>
              <div className="text-container">
                <h1 className='split-text text-white'>Shaping Design</h1>
              </div>
              <div className="text-container">
                <h1 className='split-text text-white'>Visions into Reality</h1>
              </div>
              <div className="text-container">
                <h1 className='split-text font-playfair-display-italic italic text-white'>Through Prints</h1>
              </div>

              <div className='paragraph-container relative mt-6 overflow-hidden'>
                <p className='paragraph-text text-white/50 text-base font-geist-sans uppercase'>
                  From t-shirts to mugs, we bring your ideas to life with high-quality printing & designs.
                </p>
                <div className='reveal-cover absolute inset-0 bg-black/20'></div>
              </div>
              <span className='sr-only'>From t-shirts to mugs, we bring your ideas to life with high-quality printing & designs.</span>
            </>
          )}
        </div>

        <button
          type="button"
          title='PLACE ORDER'
          aria-label='PLACE ORDER'
          aria-labelledby='PLACE ORDER'
          className='up-animation-black flex items-center gap-2 mt-6'
        >
          <span className='sr-only'>PLACE ORDER</span>
          <Icon icon="mdi:whatsapp" width={20} height={20} />
          PLACE ORDER
        </button>
      </section>

      <div className='absolute bottom-10 right-7 flex items-center gap-2 text-white'>
        <span>SCROLL TO EXPLORE</span>
        <Icon icon="iconamoon:mouse-thin" width={48} height={48} className='animate-bounce' />
      </div>
    </main>
  )
}
