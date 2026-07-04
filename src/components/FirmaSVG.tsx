import { useEffect, useRef, useState } from 'react';

interface Props {
  size?: number;
  className?: string;
  triggerOnView?: boolean;
}

export default function FirmaSVG({ size = 200, className = '', triggerOnView = true }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [animado, setAnimado] = useState(false);
  const [fillOpacity, setFillOpacity] = useState(0);

  useEffect(() => {
    if (!triggerOnView) {
      setAnimado(true);
      setTimeout(() => setFillOpacity(1), 2500);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !animado) {
            setAnimado(true);
            setTimeout(() => setFillOpacity(1), 2500);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, [animado, triggerOnView]);

  // Flor de violeta estilizada con tallo y hojas
  const pathData = `
    M 100 110
    C 100 110, 95 90, 100 80
    C 105 70, 110 60, 100 50
    C 95 45, 85 45, 80 50
    C 75 55, 75 65, 80 70
    C 82 72, 85 72, 87 70
    C 90 65, 90 58, 87 53
    M 100 50
    C 105 45, 115 45, 120 50
    C 125 55, 125 65, 120 70
    C 118 72, 115 72, 113 70
    C 110 65, 110 58, 113 53
    M 100 50
    C 100 42, 98 35, 100 30
    C 102 25, 106 22, 110 25
    C 114 28, 112 35, 108 38
    C 104 40, 100 38, 100 35
    M 100 50
    C 96 48, 92 45, 88 42
    C 84 38, 82 32, 86 28
    C 90 24, 96 28, 98 33
    C 100 38, 98 44, 96 48
    M 100 50
    C 104 48, 108 45, 112 42
    C 116 38, 118 32, 114 28
    C 110 24, 104 28, 102 33
    C 100 38, 102 44, 104 48
    M 100 50
    C 100 55, 98 60, 95 62
    C 92 64, 90 62, 90 58
    C 90 54, 94 52, 98 52
    M 100 80
    C 85 75, 70 78, 60 85
    C 55 88, 52 85, 55 80
    C 60 72, 75 68, 90 72
    M 100 80
    C 115 75, 130 78, 140 85
    C 145 88, 148 85, 145 80
    C 140 72, 125 68, 110 72
    M 100 90
    C 90 95, 80 100, 75 105
    M 100 90
    C 110 95, 120 100, 125 105
  `;

  const totalLength = 800; // Aproximado

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 200 120"
      width={size}
      height={size * 0.6}
      className={className}
      style={{ overflow: 'visible' }}
    >
      <path
        d={pathData}
        fill="none"
        stroke="#6B7A5E"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          strokeDasharray: totalLength,
          strokeDashoffset: animado ? 0 : totalLength,
          transition: 'stroke-dashoffset 2.5s ease-in-out',
        }}
      />
      <path
        d={pathData}
        fill="rgba(107, 122, 94, 0.1)"
        stroke="none"
        style={{
          opacity: fillOpacity,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </svg>
  );
}
