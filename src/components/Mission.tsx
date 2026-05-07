import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/motion';
import { FogOverlay } from './FogOverlay';
import { TornDivider } from './TornDivider';

export function Mission() {
  return (
    <section
      id="about"
      className="relative bg-mist-white py-[200px] px-6 overflow-hidden"
    >
      {/* Problem 3: Atmospheric Blending */}
      <FogOverlay opacity={0.2} speed={0.1} />
      
      <div className="max-w-[1100px] mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.h2
            variants={fadeIn}
            className="font-editorial text-[36px] md:text-[42px] lg:text-[48px] text-mountain-black leading-[1.2]"
          >
            Our Mission Is Inspiration
          </motion.h2>

          <motion.p
            variants={fadeIn}
            className="mt-10 font-body text-[16px] font-light text-mountain-black/70 leading-[1.9] max-w-[580px] mx-auto"
          >
            We exist to transform how you experience the world. No crowded
            tourist trails. No rushed itineraries. Only carefully crafted
            journeys that linger in your memory long after you return home. We
            believe travel should slow you down, open your eyes, and leave you
            changed.
          </motion.p>
          
          <motion.div
            variants={fadeIn}
            className="mt-16 w-px h-24 bg-gradient-to-b from-mountain-black/20 to-transparent mx-auto"
          />
        </motion.div>
      </div>

      {/* Transition to footer or next section */}
      <TornDivider flip fillColor="#5F7C8A" className="bottom-0" />
    </section>
  );
}
