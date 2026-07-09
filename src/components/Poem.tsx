import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface PoemProps {
  title?: string;
  lines: string[];
}

/**
 * Un poema: título opcional (italic dorado) y versos alineados a la izquierda,
 * centrados en pantalla. Cada verso entra con fade-in escalonado.
 * Nunca hace scroll interno: el tamaño usa clamp(14px, 3.8vw, 19px).
 */
export default function Poem({ title, lines }: PoemProps) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: reduce ? 0 : 0.04,
        delayChildren: reduce ? 0 : 0.15,
      },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 6 },
    show: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.5, ease: 'easeOut' } },
  };

  return (
    <motion.div
      className="poem"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {title && (
        <motion.h2 className="poem__title" variants={item}>
          {title}
        </motion.h2>
      )}
      <div className="poem__body">
        {lines.map((line, i) =>
          line === '' ? (
            <span key={i} className="poem__spacer" aria-hidden="true" />
          ) : (
            <motion.span key={i} className="poem__line" variants={item}>
              {line}
            </motion.span>
          ),
        )}
      </div>
    </motion.div>
  );
}
