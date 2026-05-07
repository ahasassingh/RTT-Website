import { motion, useScroll, useTransform } from 'framer-motion';

interface FogOverlayProps {
  opacity?: number;
  speed?: number;
  zIndex?: number;
}

export function FogOverlay({ opacity = 0.4, speed = 0.05, zIndex = 5 }: FogOverlayProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, -200 * speed]);

  return (
    <motion.div
      className="absolute inset-0 pointer-events-none select-none"
      style={{ zIndex, opacity, y }}
    >
      <div 
        className="absolute inset-0 w-[200%] h-full"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'drift 60s linear infinite alternate',
          transform: 'translateX(-25%)',
        }}
      />
      <div 
        className="absolute inset-0 w-[200%] h-full"
        style={{
          background: 'radial-gradient(circle at 30% 60%, rgba(255,255,255,0.4) 0%, transparent 60%)',
          filter: 'blur(100px)',
          animation: 'drift 45s linear infinite alternate-reverse',
          transform: 'translateX(-10%)',
        }}
      />
      
      <style>{`
        @keyframes drift {
          from { transform: translateX(-25%) translateY(0); }
          to { transform: translateX(0%) translateY(-20px); }
        }
      `}</style>
    </motion.div>
  );
}
