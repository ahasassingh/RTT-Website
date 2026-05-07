import { cn } from '@/lib/utils';

interface TornDividerProps {
  className?: string;
  fillColor?: string;
  flip?: boolean;
}

export function TornDivider({ className, fillColor = '#F8F7F4', flip = false }: TornDividerProps) {
  return (
    <div 
      className={cn(
        "absolute left-0 w-full h-24 pointer-events-none z-10",
        flip ? "bottom-0" : "top-0",
        className
      )}
      style={{ transform: flip ? 'rotate(180deg)' : 'none' }}
    >
      <svg
        viewBox="0 0 1000 100"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <filter id="torn-edge">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="1" />
          <feDisplacementMap in="SourceGraphic" scale="20" />
        </filter>
        <path
          d="M0,0 L1000,0 L1000,50 Q500,80 0,50 Z"
          fill={fillColor}
          filter="url(#torn-edge)"
        />
      </svg>
    </div>
  );
}
