import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SplitSectionProps {
  id?: string;
  title: string;
  description: string[];
  image: string;
  imageAlt: string;
  caption?: string;
  reverse?: boolean;
  ctaText?: string;
}

export function SplitSection({
  id,
  title,
  description,
  image,
  imageAlt,
  caption,
  reverse = false,
  ctaText = "Read More"
}: SplitSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className="relative bg-mist-white py-[160px] px-6 overflow-hidden"
    >
      <div className="max-w-[1100px] mx-auto">
        <motion.div 
          className={cn(
            "flex flex-col items-center gap-12 md:gap-24",
            reverse ? "md:flex-row-reverse" : "md:flex-row"
          )}
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Image Side */}
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
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                style={{ filter: 'contrast(1.05) saturate(0.9) brightness(0.95)' }}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-1000 pointer-events-none" />
            </div>
            {caption && (
              <p className="mt-6 font-body text-[10px] text-mountain-black/40 uppercase tracking-[0.2em]">
                {caption}
              </p>
            )}
          </motion.div>

          {/* Text Side */}
          <div className="w-full md:w-[55%]">
            <motion.h2 
              variants={fadeIn}
              className="font-editorial text-[32px] md:text-[38px] lg:text-[42px] text-mountain-black leading-[1.2]"
            >
              {title}
            </motion.h2>

            {description.map((para, i) => (
              <motion.p 
                key={i}
                variants={fadeIn}
                className={cn(
                  "font-body text-[14px] text-mountain-black/75 leading-[1.8] max-w-[460px]",
                  i === 0 ? "mt-8" : "mt-6"
                )}
              >
                {para}
              </motion.p>
            ))}

            <motion.button
              variants={fadeIn}
              className="mt-12 px-10 py-4 rounded-full border border-mountain-black/20 text-mountain-black font-body text-[10px] font-medium uppercase tracking-[0.15em] transition-all duration-500 hover:bg-mountain-black hover:text-mist-white hover:border-mountain-black relative overflow-hidden group"
            >
              <span className="relative z-10">{ctaText}</span>
              <div className="absolute inset-0 bg-warm-cream/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
