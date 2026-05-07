import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TornPaperEdge } from '../components/TornPaperEdge';

gsap.registerPlugin(ScrollTrigger);

export function MissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 70%',
        toggleActions: 'play none none none',
      },
    });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, scale: 0.97 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      bodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-mist-white py-[160px] px-6 overflow-hidden"
    >
      {/* Subtle fog texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: 'url(/images/fog-texture.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'soft-light',
        }}
      />

      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center relative z-10">
        <h2
          ref={headingRef}
          className="font-editorial text-[36px] md:text-[42px] lg:text-[48px] text-mountain-black leading-[1.2] opacity-0"
        >
          Our Mission Is Inspiration
        </h2>

        <p
          ref={bodyRef}
          className="mt-8 font-body text-[16px] font-light text-mountain-black/75 leading-[1.8] max-w-[520px] opacity-0"
        >
          We exist to transform how you experience the world. No crowded
          tourist trails. No rushed itineraries. Only carefully crafted
          journeys that linger in your memory long after you return home. We
          believe travel should slow you down, open your eyes, and leave you
          changed.
        </p>
      </div>

      {/* Torn Paper Transition at Bottom */}
      <TornPaperEdge flip fillColor="#5F7C8A" className="bottom-0" />
    </section>
  );
}