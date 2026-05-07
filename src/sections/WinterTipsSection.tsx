import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function WinterTipsSection() {
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
      textRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      imageRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 1, ease: 'power3.out' },
      '-=0.7'
    );

    // Parallax on image
    gsap.to(imageRef.current, {
      y: -30,
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
      id="destinations"
      className="relative bg-mist-white py-[160px] px-6"
    >
      <div className="max-w-[1100px] mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
          {/* Left: Text */}
          <div ref={textRef} className="w-full md:w-[55%] opacity-0">
            <h2 className="font-editorial text-[32px] md:text-[38px] lg:text-[42px] text-mountain-black leading-[1.3]">
              Tips For Travelling In
              <br />
              Winter Season
            </h2>

            <p className="mt-8 font-body text-[14px] text-mountain-black/80 leading-[1.7] max-w-[420px]">
              Winter travel is an entirely different art form. The cold demands
              respect, and the mountains reward those who come prepared.
              Layering is everything — start with moisture-wicking base layers,
              add insulating mid-layers, and finish with a windproof shell.
            </p>

            <p className="mt-4 font-body text-[14px] text-mountain-black/80 leading-[1.7] max-w-[420px]">
              Pack merino wool, not cotton. Bring hand warmers. And remember —
              the best winter moments happen when you stop rushing and let the
              silence settle around you. Sunrise over snow peaks is worth every
              frozen finger.
            </p>

            <button
              className="btn-pill-outline-dark mt-8"
              style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
            >
              READ MORE
            </button>
          </div>

          {/* Right: Image */}
          <div ref={imageRef} className="w-full md:w-[45%] opacity-0">
            <div
              className="relative overflow-hidden"
              style={{
                maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 85%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 85%)',
              }}
            >
              <img
                src="/images/winter-forest.jpg"
                alt="Snowy winter forest"
                className="w-full h-auto object-cover"
                style={{ filter: 'contrast(1.02) saturate(0.9)' }}
                loading="lazy"
              />
            </div>
            <p className="mt-4 font-body text-[11px] text-fog-gray tracking-[0.05em]">
              Swiss Alps, December
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}