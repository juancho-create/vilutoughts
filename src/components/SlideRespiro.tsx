import { useEffect, useState, useRef } from 'react';
import type { Slide } from '../data/poemas';

interface Props {
  slide: Slide;
  isActive: boolean;
}

export default function SlideRespiro({ slide, isActive }: Props) {
  const [visible, setVisible] = useState(false);
  const vibracionHecha = useRef(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 200);
      if (!vibracionHecha.current) {
        vibracionHecha.current = true;
        if (navigator.vibrate) {
          navigator.vibrate([10, 20, 10]);
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
      <div className="w-full max-w-[300px] px-8 text-center">
        {/* Decorative quote mark */}
        <div
          style={{
            opacity: visible ? 0.15 : 0,
            transition: 'opacity 1.2s ease-out',
            marginBottom: '1.5rem',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8E7A96" strokeWidth="1">
            <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V21M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3" strokeLinecap="round" />
          </svg>
        </div>

        {/* Texto del respiro */}
        <div className="respiro-texto">
          {slide.contenido.map((linea, i) => (
            <p
              key={i}
              style={{
                opacity: visible ? 0.7 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(15px)',
                transition: `all 1s ease-out ${0.15 * i}s`,
                minHeight: linea.trim() === '' ? '0.6em' : 'auto',
              }}
            >
              {linea || '\u00A0'}
            </p>
          ))}
        </div>

        {/* Atribución */}
        <p
          className="respiro-autor"
          style={{
            opacity: visible ? 0.5 : 0,
            transition: 'opacity 1.5s ease-out 0.8s',
          }}
        >
          — {slide.autor}
        </p>

        {/* Decorative line */}
        <div
          className="mx-auto mt-10"
          style={{
            width: visible ? '40px' : '0px',
            height: '1px',
            backgroundColor: 'var(--color-violeta)',
            opacity: 0.2,
            transition: 'width 1.5s ease-out 1s',
          }}
        />
      </div>
    </div>
  );
}
