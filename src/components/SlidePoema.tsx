import { useEffect, useRef, useState, useCallback } from 'react';
import type { Slide } from '../data/poemas';
import MensajeOculto from './MensajeOculto';

interface Props {
  slide: Slide;
  isActive: boolean;
}

export default function SlidePoema({ slide, isActive }: Props) {
  const [mensajeVisible, setMensajeVisible] = useState(false);
  const [favorito, setFavorito] = useState(false);
  const [brilloLinea, setBrilloLinea] = useState<number | null>(null);
  const [linesVisible, setLinesVisible] = useState(false);
  const longPressTimer = useRef<number | null>(null);
  const lastTap = useRef<number>(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const vibracionHecha = useRef(false);

  // Vibration on entry
  useEffect(() => {
    if (isActive && slide.vibracionEntrada && !vibracionHecha.current) {
      vibracionHecha.current = true;
      if (navigator.vibrate) {
        navigator.vibrate([20, 30, 20]);
      }
    }
    if (!isActive) {
      vibracionHecha.current = false;
      setLinesVisible(false);
    }
  }, [isActive, slide.vibracionEntrada]);

  // Stagger lines on active
  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setLinesVisible(true), 150);
      return () => clearTimeout(timer);
    }
  }, [isActive]);

  const handleTouchStart = useCallback(() => {
    if (slide.fraseOculta) {
      longPressTimer.current = window.setTimeout(() => {
        setMensajeVisible(true);
      }, 600);
    }
  }, [slide.fraseOculta]);

  const handleTouchEnd = useCallback(() => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const now = Date.now();
    const diff = now - lastTap.current;
    lastTap.current = now;

    // Doble tap = favorito
    if (diff < 300) {
      setFavorito(true);
      if (navigator.vibrate) navigator.vibrate(10);
      setTimeout(() => setFavorito(false), 1200);
      return;
    }

    // Toque corto = brillo en línea cercana
    const rect = containerRef.current?.getBoundingClientRect();
    if (rect) {
      const relativeY = e.clientY - rect.top;
      const lineHeight = 36;
      const lineaIdx = Math.floor(relativeY / lineHeight);
      const nonEmptyLines = slide.contenido.filter((l) => l.trim() !== '');
      if (lineaIdx >= 0 && lineaIdx < nonEmptyLines.length) {
        setBrilloLinea(lineaIdx);
        if (navigator.vibrate) navigator.vibrate(5);
        setTimeout(() => setBrilloLinea(null), 400);
      }
    }
  }, [slide.contenido]);

  return (
    <>
      <div
        ref={containerRef}
        className="slide-container"
        style={{
          backgroundColor: 'var(--color-papel)',
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchEnd}
        onClick={handleClick}
      >
        {/* Estrella favorito */}
        {favorito && (
          <div className="absolute top-6 right-6 z-10 estrella-destello">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#C4A468">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        )}

        <div className="w-full max-w-[340px] px-8">
          {/* Título */}
          {slide.titulo && (
            <div className="poema-titulo text-left">
              {slide.titulo}
            </div>
          )}

          {/* Poema body */}
          <div className="poema-body text-left">
            {slide.contenido.map((linea, i) => {
              const isEmpty = linea.trim() === '';
              const visibleIndex = slide.contenido.slice(0, i).filter((l) => l.trim() !== '').length;
              const delay = isEmpty ? 0 : 0.08 * visibleIndex;

              return (
                <p
                  key={i}
                  className={`poema-linea ${isEmpty ? 'vacia' : ''} ${
                    brilloLinea === visibleIndex && !isEmpty ? 'vibracion-brillo' : ''
                  }`}
                  style={{
                    opacity: linesVisible || isEmpty ? (isEmpty ? 0 : 1) : 0,
                    transform: linesVisible || isEmpty ? 'translateY(0)' : 'translateY(12px)',
                    transition: isEmpty
                      ? 'none'
                      : `all 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
                  }}
                >
                  {isEmpty ? '\u00A0' : linea}
                </p>
              );
            })}
          </div>

          {/* Hint for hidden phrase */}
          {slide.fraseOculta && (
            <div className="press-hint text-left mt-8">
              Mantén presionado para revelar
            </div>
          )}
        </div>
      </div>

      <MensajeOculto
        mensaje={slide.fraseOculta || ''}
        visible={mensajeVisible}
        onClose={() => setMensajeVisible(false)}
      />
    </>
  );
}
