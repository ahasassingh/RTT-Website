import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AdventureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      imageRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      textRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );

    // Parallax on image
    gsap.to(imageRef.current, {
      y: -25,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="open-trip"
      className="relative bg-mist-white py-[160px] px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Image */}
          <div ref={imageRef} className="w-full md:w-[45%] opacity-0">
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 85%)',
              }}
            >
              <img
                src="/images/adventure-trek.jpg"
                alt="Solo traveler hiking misty mountain trail"
                className="w-full h-auto object-cover"
                style={{ filter: 'contrast(1.02) saturate(0.95)' }}
                loading="lazy"
              />
            </div>
            <p className="mt-4 font-body text-[11px] text-fog-gray tracking-[0.05em]">
              Himalayas, October
            </p>
          </div>

          {/* Right: Text */}
          <div ref={textRef} className="w-full md:w-[55%] opacity-0">
            <h2 className="font-editorial text-[32px] md:text-[38px] lg:text-[42px] text-mountain-black leading-[1.3]">
              Easy Way To Make
              <br />
              Travel Faster
            </h2>

            <p className="mt-8 font-body text-[14px] text-mountain-black/80 leading-[1.7] max-w-[420px]">
              The best journeys are the ones where planning fades into the
              background and experience takes the lead. Travel lighter — a
              single carry-on forces you to choose what truly matters. Travel
              slower — the most memorable moments happen in the spaces between
              destinations.
            </p>

            <p className="mt-4 font-body text-[14px] text-mountain-black/80 leading-[1.7] max-w-[420px]">
              Embrace the unplanned. Talk to locals. Wake up without an alarm.
              The freedom of exploration is not in checking boxes — it is in
              losing yourself and finding something you did not know you were
              looking for.
            </p>

            <button
              className="btn-pill-outline-dark mt-8"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              READ MORE
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}