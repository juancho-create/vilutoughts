import { motion, useReducedMotion } from 'framer-motion';

/**
 * FloralArt — <Monogram/>: monograma floral dibujado en SVG inline,
 * con animación de trazo opcional (usado en el cierre).
 */

interface MonogramProps {
  /** Si true, dibuja el trazo (stroke-dashoffset) al montar. */
  draw?: boolean;
  /** Color del trazo (por defecto, el acento violeta). */
  color?: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

// Trazos del monograma: una "V" botánica con hojas y una violeta arriba.
const MONOGRAM_PATHS = [
  // Tallo izquierdo de la V
  'M40 34 C 44 58, 52 74, 60 92',
  // Tallo derecho de la V
  'M80 34 C 76 58, 68 74, 60 92',
  // Hoja izquierda
  'M46 52 C 34 50, 28 56, 30 64 C 40 64, 46 60, 46 52 Z',
  // Hoja derecha
  'M74 52 C 86 50, 92 56, 90 64 C 80 64, 74 60, 74 52 Z',
  // Pétalos de la violeta (arriba, centro)
  'M60 30 C 52 22, 44 26, 46 34 C 50 40, 58 38, 60 30 Z',
  'M60 30 C 68 22, 76 26, 74 34 C 70 40, 62 38, 60 30 Z',
  'M60 30 C 56 20, 64 20, 60 30 Z',
  // Frond central que sube
  'M60 30 C 60 24, 60 18, 60 12',
];

export function Monogram({
  draw = false,
  color = 'var(--violet)',
  size = 128,
  className,
  style,
}: MonogramProps) {
  const reduce = useReducedMotion();
  const shouldDraw = draw && !reduce;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      {MONOGRAM_PATHS.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={1.1}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldDraw ? { pathLength: 0, opacity: 0 } : false}
          animate={shouldDraw ? { pathLength: 1, opacity: 1 } : undefined}
          transition={
            shouldDraw
              ? { duration: 1.6, delay: 0.3 + i * 0.18, ease: 'easeInOut' }
              : undefined
          }
        />
      ))}
      {/* Centro de la violeta */}
      <motion.circle
        cx={60}
        cy={31}
        r={1.6}
        fill="var(--gold)"
        initial={shouldDraw ? { opacity: 0 } : false}
        animate={shouldDraw ? { opacity: 1 } : undefined}
        transition={shouldDraw ? { duration: 0.6, delay: 1.9 } : undefined}
      />
    </svg>
  );
}
