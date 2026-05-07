import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FogOverlay } from './FogOverlay';
import { TornDivider } from './TornDivider';
import { EASE } from '@/lib/motion';

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Problem 2: Parallax System
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const fogY = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative w-full h-[100dvh] overflow-hidden bg-mountain-black flex flex-col items-center justify-center"
    >
      {/* 1. BACKGROUND PLANE */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: bgY }}
      >
        <img
          src="/images/hero-mountain.jpg"
          alt="Misty mountain landscape"
          className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1] brightness-[0.8]"
        />
        {/* Subtle dark vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />
      </motion.div>

      {/* 2. MIDGROUND TYPOGRAPHY PLANE */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Logo/Brand */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mb-6"
        >
          <span className="font-editorial italic text-[16px] tracking-[0.08em] text-cloud-white/80">
            Royal Tour & Travels
          </span>
        </motion.div>

        {/* Hero Title with atmospheric masking */}
        <div className="relative group">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, ease: EASE, delay: 0.2 }}
            className="font-hero text-[14vw] md:text-[10vw] lg:text-[8vw] text-cloud-white leading-[0.9] tracking-[0.05em] select-none"
            style={{
              textShadow: '0 10px 40px rgba(0,0,0,0.5)',
              maskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 95%)',
            }}
          >
            ROYAL TRAVEL
          </motion.h1>
        </div>

        {/* 3. FOREGROUND ATMOSPHERIC PLANE (Part 1 - Drifting near text) */}
        <FogOverlay speed={0.2} opacity={0.3} zIndex={15} />

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          className="mt-16 px-12 py-5 rounded-full border border-white/20 text-cloud-white font-body text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-[8px] bg-white/5 hover:bg-white/15 hover:border-white/40 transition-all duration-500 group relative overflow-hidden"
          onClick={() => {
            document.getElementById('explorers')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="relative z-10">Discover More</span>
          <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
        </motion.button>
      </motion.div>

      {/* 3. FOREGROUND ATMOSPHERIC PLANE (Part 2 - Global) */}
      <motion.div className="absolute inset-0 z-[20] pointer-events-none" style={{ y: fogY }}>
        <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-mist-white via-transparent to-transparent opacity-40" />
      </motion.div>

      {/* Torn Divider at Transition */}
      <TornDivider flip className="bottom-0" />
    </section>
  );
}
