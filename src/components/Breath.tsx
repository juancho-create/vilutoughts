import { motion, useReducedMotion } from 'framer-motion';

interface BreathProps {
  lines: string[];
  author: string;
}

/** Respiro literario: una cita en italic con su atribución, sobre papel oscuro. */
export default function Breath({ lines, author }: BreathProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="breath"
      initial={{ opacity: 0, y: reduce ? 0 : 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.9, ease: 'easeOut', delay: 0.15 }}
    >
      <p className="breath__text">
        {lines.map((line, i) => (
          <span key={i}>
            {line}
            {i < lines.length - 1 && <br />}
          </span>
        ))}
      </p>
      <div className="breath__author">
        <span className="breath__seal" aria-hidden="true" />
        <span className="breath__name">{author}</span>
      </div>
    </motion.div>
  );
}
