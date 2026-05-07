import type { Variants } from 'framer-motion';

export const EASE = [0.16, 1, 0.3, 1];

export const fadeIn: Variants = {
  initial: {
    opacity: 0,
    y: 40,
  },
  animate: (custom?: { reducedMotion?: boolean }) => ({
    opacity: 1,
    y: custom?.reducedMotion ? 0 : 0,
    transition: {
      duration: 0.8,
      ease: EASE,
    },
  }),
};

export const staggerContainer: Variants = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
