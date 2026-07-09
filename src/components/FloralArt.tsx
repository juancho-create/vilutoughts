import { motion, useReducedMotion } from 'framer-motion';

/**
 * FloralArt — arte botánico dibujado 100% en SVG inline (sin imágenes externas).
 *  - <Monogram/>: monograma floral que se dibuja con animación de trazo.
 *  - <Spray/>:    ramillete de violetas y helechos, línea fina, para la portada.
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

interface SprayProps {
  className?: string;
  style?: React.CSSProperties;
}

/** Ramillete decorativo (violetas + helechos) para la parte superior de la portada. */
export function Spray({ className, style }: SprayProps) {
  return (
    <svg
      width="220"
      height="120"
      viewBox="0 0 220 120"
      fill="none"
      className={className}
      style={style}
      aria-hidden="true"
    >
      <g
        stroke="var(--violet)"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      >
        {/* Helecho izquierdo */}
        <path d="M40 110 C 46 84, 52 60, 54 34" />
        <path d="M50 82 C 40 78, 34 80, 32 86" />
        <path d="M52 68 C 42 64, 36 66, 34 72" />
        <path d="M53 54 C 45 50, 40 52, 38 58" />
        <path d="M54 42 C 48 39, 44 41, 42 46" />
        {/* Helecho derecho */}
        <path d="M180 110 C 174 84, 168 60, 166 34" />
        <path d="M170 82 C 180 78, 186 80, 188 86" />
        <path d="M168 68 C 178 64, 184 66, 186 72" />
        <path d="M167 54 C 175 50, 180 52, 182 58" />
        <path d="M166 42 C 172 39, 176 41, 178 46" />
      </g>

      {/* Violetas (tres blossoms) */}
      <g strokeWidth="0.9" strokeLinejoin="round">
        {[
          { x: 92, y: 40 },
          { x: 110, y: 30 },
          { x: 128, y: 42 },
        ].map((p, i) => (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <path
              d="M0 -6 C -7 -12, -13 -7, -9 -1 C -4 3, 3 1, 0 -6 Z"
              stroke="var(--violet)"
              fill="rgba(139,123,168,0.08)"
            />
            <path
              d="M0 -6 C 7 -12, 13 -7, 9 -1 C 4 3, -3 1, 0 -6 Z"
              stroke="var(--violet)"
              fill="rgba(139,123,168,0.08)"
            />
            <path
              d="M-8 2 C -14 6, -10 13, -3 11 C 1 9, -2 3, -8 2 Z"
              stroke="var(--violet)"
              fill="rgba(139,123,168,0.08)"
            />
            <path
              d="M8 2 C 14 6, 10 13, 3 11 C -1 9, 2 3, 8 2 Z"
              stroke="var(--violet)"
              fill="rgba(139,123,168,0.08)"
            />
            <circle cx="0" cy="3" r="1.4" fill="var(--gold)" stroke="none" />
            <path d="M0 6 C 0 14, 0 22, -2 30" stroke="#6B7A5E" fill="none" />
          </g>
        ))}
      </g>
    </svg>
  );
}
