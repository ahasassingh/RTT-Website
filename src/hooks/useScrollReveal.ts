import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
  stagger?: number;
  scale?: number;
  start?: string;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement>(options: ScrollRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const {
      y = 30,
      x = 0,
      duration = 1,
      delay = 0,
      stagger = 0.15,
      scale,
      start = 'top 80%',
      ease = 'power3.out',
    } = options;

    const children = el.children.length > 0 ? Array.from(el.children) : [el];

    gsap.set(children, { opacity: 0, y, x });
    if (scale !== undefined) {
      gsap.set(children, { scale });
    }

    const tween = gsap.to(children, {
      opacity: 1,
      y: 0,
      x: 0,
      scale: scale !== undefined ? 1 : undefined,
      duration,
      delay,
      stagger,
      ease,
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: 'play none none none',
      },
    });

    return () => {
      tween.kill();
    };
  }, []);

  return ref;
}