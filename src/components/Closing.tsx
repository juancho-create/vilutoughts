import { motion, useReducedMotion } from 'framer-motion';
import { Monogram } from './FloralArt';

/** Pantalla final: solo el monograma sobre azul noche, respirando. Sin texto. */
export default function Closing() {
  const reduce = useReducedMotion();

  return (
    <div className="closing">
      <motion.div
        animate={reduce ? undefined : { scale: [1, 1.04, 1] }}
        transition={
          reduce
            ? undefined
            : { duration: 3, ease: 'easeInOut', repeat: Infinity }
        }
        style={{ opacity: 0.35 }}
      >
        <Monogram color="var(--night-text)" size={150} />
      </motion.div>
    </div>
  );
}
