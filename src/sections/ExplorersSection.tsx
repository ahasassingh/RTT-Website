import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ExplorersSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        bodyRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
        '-=0.8'
      )
      .fromTo(
        iconsRef.current?.children ?? [],
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.6'
      );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="explorers"
      className="relative bg-mist-white py-[160px] px-6"
    >
      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-editorial text-[32px] md:text-[38px] lg:text-[42px] text-mountain-black leading-[1.3] opacity-0"
        >
          A Getaway for Explorers
        </h2>

        {/* Body */}
        <p
          ref={bodyRef}
          className="mt-8 font-body text-[14px] text-mountain-black/80 leading-[1.7] max-w-[560px] opacity-0"
        >
          Royal Tour & Travels curates journeys for photographers, filmmakers,
          and soul-seekers who travel to feel alive. Disconnect from noise.
          Reconnect with the wild. Every expedition is designed for those who
          see the world as their canvas — misty mornings, mountain trails, and
          the silence between heartbeats.
        </p>

        {/* Three Icons */}
        <div ref={iconsRef} className="mt-16 flex items-start justify-center gap-16 md:gap-24">
          {/* Trekking */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-mountain-black/60">
                <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1" />
                <path d="M24 10L26 22H22L24 10Z" fill="currentColor" opacity="0.6" />
                <circle cx="24" cy="24" r="3" stroke="currentColor" strokeWidth="1" />
                <line x1="24" y1="27" x2="24" y2="38" stroke="currentColor" strokeWidth="1" />
                <line x1="24" y1="32" x2="18" y2="28" stroke="currentColor" strokeWidth="1" />
                <line x1="24" y1="32" x2="30" y2="28" stroke="currentColor" strokeWidth="1" />
                <line x1="24" y1="38" x2="19" y2="42" stroke="currentColor" strokeWidth="1" />
                <line x1="24" y1="38" x2="29" y2="42" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <span className="mt-4 font-body text-[11px] font-medium uppercase tracking-[0.12em] text-mountain-black/60">
              Trekking
            </span>
          </div>

          {/* Camping */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-mountain-black/60">
                <path d="M24 8L40 40H8L24 8Z" stroke="currentColor" strokeWidth="1" />
                <line x1="16" y1="28" x2="32" y2="28" stroke="currentColor" strokeWidth="1" />
                <rect x="20" y="28" width="8" height="12" stroke="currentColor" strokeWidth="1" />
                <circle cx="24" cy="20" r="2" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
            <span className="mt-4 font-body text-[11px] font-medium uppercase tracking-[0.12em] text-mountain-black/60">
              Camping
            </span>
          </div>

          {/* Adventures */}
          <div className="flex flex-col items-center group cursor-default">
            <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-mountain-black/60">
                <path d="M8 38L20 16L28 26L40 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8 38H40" stroke="currentColor" strokeWidth="1" opacity="0.4" />
                <circle cx="20" cy="16" r="2" fill="currentColor" />
                <circle cx="28" cy="26" r="2" fill="currentColor" />
                <circle cx="40" cy="10" r="2" fill="currentColor" />
              </svg>
            </div>
            <span className="mt-4 font-body text-[11px] font-medium uppercase tracking-[0.12em] text-mountain-black/60">
              Adventures
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}