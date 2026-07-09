import { motion, useReducedMotion } from 'framer-motion';

/**
 * FloralArt — <Monogram/>: una violeta dibujada en SVG inline, línea fina,
 * con animación de trazo opcional. Es el sello del cuaderno (pantalla final).
 *
 * Anatomía de violeta real: dos pétalos superiores, dos laterales y uno
 * inferior más amplio; centro dorado; tallo curvado con dos hojas
 * acorazonadas, como las de la portada.
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

const VIOLET_PATHS = [
  // Pétalo superior izquierdo
  'M58 44 C 52 30, 40 30, 42 41 C 43 49, 53 50, 58 44 Z',
  // Pétalo superior derecho
  'M62 44 C 68 30, 80 30, 78 41 C 77 49, 67 50, 62 44 Z',
  // Pétalo lateral izquierdo
  'M56 48 C 44 44, 35 52, 42 60 C 48 65, 56 57, 56 48 Z',
  // Pétalo lateral derecho
  'M64 48 C 76 44, 85 52, 78 60 C 72 65, 64 57, 64 48 Z',
  // Pétalo inferior (el más amplio, típico de la violeta)
  'M60 52 C 50 58, 50 72, 60 74 C 70 72, 70 58, 60 52 Z',
  // Tallo (curva suave hacia abajo)
  'M60 74 C 62 84, 58 92, 60 104',
  // Hoja izquierda (acorazonada)
  'M59 86 C 48 82, 40 87, 43 95 C 49 100, 58 94, 59 86 Z',
  // Hoja derecha (acorazonada, un poco más abajo)
  'M61 94 C 72 90, 80 95, 77 103 C 71 108, 62 102, 61 94 Z',
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
      {VIOLET_PATHS.map((d, i) => (
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
              ? { duration: 1.4, delay: 0.3 + i * 0.22, ease: 'easeInOut' }
              : undefined
          }
        />
      ))}
      {/* Centro de la flor */}
      <motion.circle
        cx={60}
        cy={48}
        r={2}
        fill="var(--gold)"
        initial={shouldDraw ? { opacity: 0 } : false}
        animate={shouldDraw ? { opacity: 1 } : undefined}
        transition={shouldDraw ? { duration: 0.6, delay: 2.1 } : undefined}
      />
    </svg>
  );
}
