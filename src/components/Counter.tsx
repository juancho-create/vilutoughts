import { useEffect, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion';
import { COUNTER_START } from '../data/poems';

/** Hora real de Bogotá en formato HH:MM. */
function bogotaTime(): string {
  return new Intl.DateTimeFormat('es-CO', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: 'America/Bogota',
  }).format(new Date());
}

const DAYS = Math.floor(
  (Date.now() - new Date(COUNTER_START).getTime()) / 86_400_000,
);

/**
 * Contador de días desde el 20 de junio de 2025, con la hora de Bogotá arriba.
 * La primera vez que se monta, el número anima de 0 al valor real en 1.2s.
 */
export default function Counter() {
  const reduce = useReducedMotion();
  const [clock, setClock] = useState(bogotaTime);

  // Actualiza la hora cada minuto.
  useEffect(() => {
    const id = window.setInterval(() => setClock(bogotaTime()), 60_000);
    return () => window.clearInterval(id);
  }, []);

  // Anima el número 0 → DAYS.
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.floor(v).toString());
  useEffect(() => {
    if (reduce) {
      count.set(DAYS);
      return;
    }
    const controls = animate(count, DAYS, { duration: 1.2, ease: 'easeOut' });
    return () => controls.stop();
  }, [count, reduce]);

  return (
    <div className="counter">
      <div className="counter__clock">Bogotá — {clock}</div>
      <motion.div className="counter__number">{rounded}</motion.div>
      <div className="counter__label">Días</div>
      <p className="counter__lines">
        Hace {DAYS} días no sabía que existías.
        <br />
        Hoy no puedo dejar de pensarte.
      </p>
    </div>
  );
}
