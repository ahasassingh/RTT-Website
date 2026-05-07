import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeIn, staggerContainer, EASE } from '@/lib/motion';

export function AdventureSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Problem 2: Cinematic Scroll Parallax
  const imageY = useTransform(scrollYProgress, [0, 1], [40, -40]);

  return (
    <section
      ref={sectionRef}
      id="open-trip"
      className="relative bg-mist-white py-[160px] px-6 overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div 
          className="flex flex-col-reverse md:flex-row items-center gap-12 md:gap-16"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left: Image with Parallax and Hover zoom */}
          <motion.div 
            className="w-full md:w-[45%]"
            variants={fadeIn}
            style={{ y: imageY }}
          >
            <div
              className="relative overflow-hidden group rounded-sm"
              style={{
                maskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 95%)',
                WebkitMaskImage: 'radial-gradient(ellipse 90% 85% at 50% 50%, black 40%, transparent 95%)',
              }}
              data-cursor="hover"
            >
              <motion.img
                src="/images/adventure-trek.jpg"
                alt="Solo traveler hiking"
                className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ filter: 'contrast(1.05) saturate(0.9) brightness(0.95)' }}
                loading="lazy"
              />
              {/* Subtle overlay bloom on hover */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-1000 pointer-events-none" />
            </div>
            <p className="mt-6 font-body text-[10px] text-mountain-black/40 uppercase tracking-[0.2em]">
              Himalayas, October
            </p>
          </motion.div>

          {/* Right: Text with Editorial Reveal */}
          <div className="w-full md:w-[55%]">
            <motion.h2 
              variants={fadeIn}
              className="font-editorial text-[32px] md:text-[38px] lg:text-[42px] text-mountain-black leading-[1.2]"
            >
              The Art of Slowing Down
              <br />
              In a Fast-Paced World
            </motion.h2>

            <motion.p 
              variants={fadeIn}
              className="mt-8 font-body text-[14px] text-mountain-black/75 leading-[1.8] max-w-[460px]"
            >
              The best journeys are the ones where planning fades into the
              background and experience takes the lead. Travel lighter — a
              single carry-on forces you to choose what truly matters. Travel
              slower — the most memorable moments happen in the spaces between
              destinations.
            </motion.p>

            <motion.p 
              variants={fadeIn}
              className="mt-6 font-body text-[14px] text-mountain-black/75 leading-[1.8] max-w-[460px]"
            >
              Embrace the unplanned. Wake up without an alarm.
              The freedom of exploration is not in checking boxes — it is in
              losing yourself and finding something you did not know you were
              looking for.
            </motion.p>

            <motion.button
              variants={fadeIn}
              className="mt-12 px-10 py-4 rounded-full border border-mountain-black/20 text-mountain-black font-body text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-500 hover:bg-mountain-black hover:text-mist-white hover:border-mountain-black relative overflow-hidden group"
            >
              <span className="relative z-10">Read the Journal</span>
              <div className="absolute inset-0 bg-warm-cream/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
