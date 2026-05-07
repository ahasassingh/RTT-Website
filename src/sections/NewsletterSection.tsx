import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function NewsletterSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');

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
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }
    ).fromTo(
      socialsRef.current?.children ?? [],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[160px] px-6 overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/ocean-wave.jpg"
          alt="Dramatic ocean wave"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.65) contrast(1.05)' }}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center relative z-10">
        {/* Newsletter Block */}
        <div ref={contentRef} className="opacity-0">
          <h2 className="font-editorial text-[30px] md:text-[36px] text-cloud-white leading-[1.3]">
            Subscribe to Our Newsletter
          </h2>
          <p className="mt-4 font-body text-[14px] text-fog-gray leading-[1.7]">
            Get the best content delivered straight into your inbox.
          </p>

          {/* Email Input */}
          <div className="mt-8 relative inline-flex items-center w-full max-w-[380px]">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full h-[52px] pl-6 pr-14 rounded-full bg-white/[0.08] border border-white/20 text-cloud-white placeholder:text-fog-gray/70 font-body text-[14px] outline-none backdrop-blur-[10px] transition-all duration-300 focus:border-white/40 focus:bg-white/[0.12]"
            />
            <button
              className="absolute right-2 w-10 h-10 rounded-full flex items-center justify-center text-warm-cream hover:bg-white/[0.15] transition-all duration-300"
              aria-label="Subscribe"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="mt-16 flex items-center gap-6">
          <div ref={socialsRef} className="flex items-center gap-6">
            {/* Instagram */}
            <a
              href="#"
              className="text-cloud-white/70 hover:text-cloud-white hover:scale-110 transition-all duration-200"
              aria-label="Instagram"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="5" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </a>

            {/* Facebook */}
            <a
              href="#"
              className="text-cloud-white/70 hover:text-cloud-white hover:scale-110 transition-all duration-200"
              aria-label="Facebook"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>

            {/* Twitter/X */}
            <a
              href="#"
              className="text-cloud-white/70 hover:text-cloud-white hover:scale-110 transition-all duration-200"
              aria-label="Twitter"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.5L8 4H4z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer */}
        <p className="mt-16 font-body text-[11px] text-fog-gray/50 tracking-[0.05em]">
          Royal Tour & Travels
        </p>
      </div>
    </section>
  );
}