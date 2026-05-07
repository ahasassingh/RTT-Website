interface TornPaperEdgeProps {
  flip?: boolean;
  fillColor?: string;
  className?: string;
}

export function TornPaperEdge({ flip = false, fillColor = '#F8F7F4', className = '' }: TornPaperEdgeProps) {
  // Generate a jagged torn edge path
  const points: string[] = [];
  const width = 100;
  const segments = 40;
  
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * width;
    const baseY = 0;
    const randomJag = Math.sin(i * 2.7) * 3 + Math.cos(i * 1.3) * 2 + (Math.random() - 0.5) * 2;
    const y = baseY + randomJag;
    points.push(`${x},${y}`);
  }
  
  const pathD = `M0,20 L${points.join(' L')} L100,20 L100,25 L0,25 Z`;

  return (
    <div
      className={`absolute left-0 w-full h-[60px] overflow-hidden pointer-events-none ${className}`}
      style={{
        top: flip ? 'auto' : 0,
        bottom: flip ? 0 : 'auto',
        transform: flip ? 'rotate(180deg)' : 'none',
      }}
    >
      <svg
        viewBox="0 0 100 25"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <path d={pathD} fill={fillColor} />
      </svg>
    </div>
  );
}