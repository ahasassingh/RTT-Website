import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/motion';

interface EditorialSectionProps {
  id?: string;
  title: string;
  description: string;
  features: {
    icon: React.ReactNode;
    label: string;
  }[];
}

export function EditorialSection({ id, title, description, features }: EditorialSectionProps) {
  return (
    <section
      id={id}
      className="relative bg-mist-white py-[160px] px-6 overflow-hidden"
    >
      <motion.div 
        className="max-w-[1100px] mx-auto flex flex-col items-center text-center"
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        {/* Problem 4: Editorial Reveals */}
        <motion.h2
          variants={fadeIn}
          className="font-editorial text-[32px] md:text-[38px] lg:text-[42px] text-mountain-black leading-[1.3]"
        >
          {title}
        </motion.h2>

        <motion.p
          variants={fadeIn}
          className="mt-8 font-body text-[14px] text-mountain-black/80 leading-[1.7] max-w-[560px]"
        >
          {description}
        </motion.p>

        <motion.div 
          className="mt-16 flex items-start justify-center gap-16 md:gap-24"
          variants={staggerContainer}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeIn}
              className="flex flex-col items-center group cursor-default"
            >
              {/* Problem 5: Premium Hovers */}
              <div className="w-12 h-12 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                {feature.icon}
              </div>
              <span className="mt-4 font-body text-[11px] font-medium uppercase tracking-[0.2em] text-mountain-black/60 transition-colors duration-500 group-hover:text-mountain-black">
                {feature.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
