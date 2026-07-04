import { useEffect, useRef, useState } from 'react';
import { FECHA_INICIO } from '../data/poemas';
import RelojBogota from './RelojBogota';
import FirmaSVG from './FirmaSVG';

interface Props {
  isActive: boolean;
}

export default function PantallaContador({ isActive }: Props) {
  const [dias, setDias] = useState(0);
  const [diasMostrados, setDiasMostrados] = useState(0);
  const [visible, setVisible] = useState(false);
  const animIniciada = useRef(false);

  useEffect(() => {
    const hoy = new Date();
    const diff = Math.floor((hoy.getTime() - FECHA_INICIO.getTime()) / (1000 * 60 * 60 * 24));
    setDias(Math.max(0, diff));
  }, []);

  useEffect(() => {
    if (isActive && !animIniciada.current) {
      setVisible(true);
      animIniciada.current = true;

      // Conteo animado
      const duracion = 2500;
      const inicio = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - inicio) / duracion, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDiasMostrados(Math.floor(eased * dias));

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setDiasMostrados(dias);
        }
      };

      requestAnimationFrame(animate);
    }
    if (!isActive) {
      animIniciada.current = false;
      setVisible(false);
      setDiasMostrados(0);
    }
  }, [isActive, dias]);

  return (
    <div className="slide-container" style={{ backgroundColor: 'var(--color-papel)' }}>
      {/* Reloj Bogotá */}
      <div
        className="absolute top-6 left-0 right-0 text-center"
        style={{
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.8s ease-out 0.3s',
        }}
      >
        <RelojBogota />
      </div>

      <div className="text-center max-w-[300px]">
        {/* Número grande */}
        <div
          className="text-tinta"
          style={{
            fontSize: 'clamp(4.5rem, 14vw, 7rem)',
            fontWeight: 600,
            lineHeight: 1,
            opacity: visible ? 1 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.85)',
            transition: 'all 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {diasMostrados}
        </div>

        <p
          className="text-violeta font-cormorant tracking-[0.2em] uppercase mt-3 mb-10"
          style={{
            fontSize: '0.75rem',
            opacity: visible ? 0.5 : 0,
            transition: 'opacity 0.8s ease-out 0.5s',
          }}
        >
          días
        </p>

        {/* Texto */}
        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out 1s',
          }}
        >
          <p className="font-cormorant italic text-tinta leading-relaxed mb-2" style={{ fontSize: '1.15rem', opacity: 0.9 }}>
            Hace {dias} días no sabía que existías.
          </p>
          <p className="font-cormorant italic text-tinta leading-relaxed" style={{ fontSize: '1.15rem', opacity: 0.9 }}>
            Hoy no puedo dejar de pensarte.
          </p>
        </div>

        {/* Firma pequeña */}
        <div
          className="mt-10 flex justify-center"
          style={{
            opacity: visible ? 1 : 0,
            transition: 'opacity 1s ease-out 1.8s',
          }}
        >
          <FirmaSVG size={80} />
        </div>
      </div>
    </div>
  );
}
