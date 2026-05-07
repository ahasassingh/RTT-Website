import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { TornPaperEdge } from '../components/TornPaperEdge';

export function HeroSection() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.2 });

    tl.fromTo(
      logoRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    )
      .fromTo(
        navRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
        '-=0.4'
      )
      .fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

    // Parallax on scroll
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (imgRef.current) {
        imgRef.current.style.transform = `translateY(${scrollY * 0.3}px) scale(1.06)`;
      }
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${scrollY * 0.15}px)`;
        titleRef.current.style.opacity = String(Math.max(0, 1 - scrollY / 600));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      tl.kill();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative w-full min-h-[100dvh] overflow-hidden flex flex-col items-center justify-center"
    >
      {/* Background Image with Ken Burns */}
      <div className="absolute inset-0 z-0">
        <div
          ref={imgRef}
          className="absolute inset-0 will-change-transform"
          style={{
            animation: 'ken-burns 20s ease-in-out infinite alternate',
          }}
        >
          <img
            src="/images/hero-mountain.jpg"
            alt="Misty mountain landscape"
            className="w-full h-full object-cover"
            style={{ filter: 'contrast(1.05) brightness(0.95)' }}
          />
        </div>
        {/* Gradient overlay at bottom for transition */}
        <div
          className="absolute bottom-0 left-0 w-full h-[40%]"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Logo */}
        <div ref={logoRef} className="mb-4 opacity-0">
          <span className="font-editorial italic text-[16px] tracking-[0.08em] text-cloud-white">
            Royal Tour & Travels
          </span>
        </div>

        {/* Nav Links */}
        <div ref={navRef} className="flex items-center gap-8 mb-16 opacity-0">
          {['Home', 'Destinations', 'Open Trip', 'About'].map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(' ', '-')}`}
              className="relative font-body text-[11px] font-medium uppercase tracking-[0.18em] text-cloud-white/80 hover:text-cloud-white transition-all duration-300 group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-cloud-white group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>

        {/* Hero Title */}
        <h1
          ref={titleRef}
          className="font-hero text-[14vw] md:text-[10vw] lg:text-[8vw] text-cloud-white leading-[0.9] tracking-[0.05em] text-shadow-hero opacity-0"
        >
          ROYAL TRAVEL
        </h1>

        {/* CTA */}
        <button
          ref={ctaRef}
          className="mt-12 px-10 py-4 rounded-full border border-white/30 text-cloud-white font-body text-[10px] font-medium uppercase tracking-[0.15em] backdrop-blur-[10px] bg-transparent hover:bg-white/[0.15] hover:shadow-[0_0_20px_rgba(232,217,197,0.3)] transition-all duration-300 opacity-0"
          style={{
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          onClick={() => {
            document.getElementById('explorers')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          LET&apos;S GO
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="text-cloud-white"
          style={{ animation: 'bounce-chevron 2s ease-in-out infinite' }}
        >
          <path
            d="M5 8L10 13L15 8"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Torn Paper Transition at Bottom */}
      <TornPaperEdge flip fillColor="#F8F7F4" className="bottom-0" />
    </section>
  );
}