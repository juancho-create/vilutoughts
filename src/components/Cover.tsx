import { motion, useReducedMotion } from 'framer-motion';
import { Monogram, Spray } from './FloralArt';

/** Portada: ramillete, monograma que se dibuja, y el título. Fade-in de 2.5s. */
export default function Cover() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="screen cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.4 : 2.5, ease: 'easeOut' }}
    >
      <Spray className="cover__spray" />
      <Monogram draw size={140} className="cover__monogram" />
      <h1 className="cover__title">Para Violeta del Mar</h1>
      <p className="cover__subtitle">Un cuaderno de poemas</p>
    </motion.div>
  );
}
