import { motion, useReducedMotion } from 'framer-motion';
import coverArt from '../assets/portada.jpg';

/** Portada: ilustración botánica (violetas y helechos) y el título. Fade-in de 2.5s. */
export default function Cover() {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className="screen cover"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0.4 : 2.5, ease: 'easeOut' }}
    >
      <div className="cover__art-frame">
        <img className="cover__art" src={coverArt} alt="" aria-hidden="true" />
      </div>
      <h1 className="cover__title">Para Violeta del Mar</h1>
      <p className="cover__subtitle">Un cuaderno de poemas</p>
      <p className="cover__dedication">
        Para abrirse de noche,
        <br />
        como todo lo que importa.
      </p>
    </motion.div>
  );
}
