import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-[200px] px-6 overflow-hidden"
    >
      {/* 1. BACKGROUND PLANE - Problem 2: Extremely slow parallax */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="/images/ocean-wave.jpg"
          alt="Dramatic ocean wave"
          className="w-full h-[120%] object-cover grayscale-[0.3] brightness-[0.5]"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          {/* Problem 4: Editorial Reveals */}
          <motion.h2
            variants={fadeIn}
            className="font-editorial text-[30px] md:text-[36px] lg:text-[42px] text-cloud-white leading-[1.3]"
          >
            Stay within the Journey
          </motion.h2>
          
          <motion.p
            variants={fadeIn}
            className="mt-6 font-body text-[14px] text-fog-gray/80 leading-[1.7] max-w-[400px] mx-auto"
          >
            Subscribe to receive carefully curated travel editorials and hidden destination guides.
          </motion.p>

          {/* Problem 5: Premium Hover Interactions (Input & Button) */}
          <motion.div 
            variants={fadeIn}
            className="mt-12 relative inline-flex items-center w-full max-w-[420px]"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className="w-full h-[56px] pl-8 pr-16 rounded-full bg-white/[0.05] border border-white/10 text-cloud-white placeholder:text-fog-gray/40 font-body text-[14px] outline-none backdrop-blur-[12px] transition-all duration-500 focus:border-white/30 focus:bg-white/[0.1] focus:ring-1 focus:ring-white/20"
            />
            <button
              className="absolute right-2 w-12 h-12 rounded-full flex items-center justify-center text-warm-cream hover:bg-white/10 transition-all duration-500 group"
              aria-label="Subscribe"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </motion.div>

          {/* Problem 5: Social Icons Glow */}
          <motion.div 
            variants={fadeIn}
            className="mt-20 flex items-center gap-10"
          >
            {['Instagram', 'Facebook', 'Twitter'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-cloud-white/40 hover:text-cloud-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] transition-all duration-500"
                aria-label={social}
              >
                <SocialIcon name={social} />
              </a>
            ))}
          </motion.div>

          <motion.p 
            variants={fadeIn}
            className="mt-24 font-body text-[10px] text-fog-gray/30 uppercase tracking-[0.25em]"
          >
            &copy; 2026 Royal Tour & Travels — Editorial
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

function SocialIcon({ name }: { name: string }) {
  if (name === 'Instagram') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    );
  }
  if (name === 'Facebook') {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4l6.5 8L4 20h2l5.5-6.8L16 20h4l-6.8-8.5L20 4h-2l-5.2 6.5L8 4H4z" />
    </svg>
  );
}
