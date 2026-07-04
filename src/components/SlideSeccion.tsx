import { useEffect, useState, useRef } from 'react';
import type { Slide } from '../data/poemas';

interface Props {
  slide: Slide;
  isActive: boolean;
}

export default function SlideSeccion({ slide, isActive }: Props) {
  const [visible, setVisible] = useState(false);
  const vibracionHecha = useRef(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 100);
      if (!vibracionHecha.current) {
        vibracionHecha.current = true;
        if (navigator.vibrate) {
          navigator.vibrate(15);
        }
      }
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
      vibracionHecha.current = false;
    }
  }, [isActive]);

  return (
    <div
      className="slide-container"
      style={{ backgroundColor: 'var(--color-papel)' }}
    >
      <div className="text-center">
        {/* Número romano/árabigo */}
        <div
          className="seccion-numero"
          style={{
            opacity: visible ? 0.25 : 0,
            transform: visible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
            marginBottom: '0.75rem',
          }}
        >
          {slide.seccionTitulo}
        </div>

        {/* Título de la sección */}
        <div
          className="seccion-titulo"
          style={{
            opacity: visible ? 0.6 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(10px)',
            transition: 'all 0.8s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
          }}
        >
          {slide.seccionSubtitulo}
        </div>

        {/* Decorative line */}
        <div
          className="mx-auto mt-8"
          style={{
            width: visible ? '30px' : '0px',
            height: '1px',
            backgroundColor: 'var(--color-violeta)',
            opacity: 0.25,
            transition: 'width 1s ease-out 0.5s',
          }}
        />
      </div>
    </div>
  );
}
