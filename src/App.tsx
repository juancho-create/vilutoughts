import { useEffect, useState, useRef, useCallback } from 'react';
import { slidesContenido } from './data/poemas';
import type { Slide } from './data/poemas';
import ParticulasBotanicas from './components/ParticulasBotanicas';
import Portada from './components/Portada';
import PantallaContador from './components/PantallaContador';
import SlidePoema from './components/SlidePoema';
import SlideRespiro from './components/SlideRespiro';
import SlideSeccion from './components/SlideSeccion';
import SlideCierre from './components/SlideCierre';
import Navegacion from './components/Navegacion';
import AudioControl from './components/AudioControl';

// Combina portada, contador y todos los slides de contenido
const allSlides: Slide[] = [
  { id: '__portada', tipo: 'portada', contenido: [] },
  { id: '__contador', tipo: 'contador', contenido: [] },
  ...slidesContenido,
];

export default function App() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [seccionMar, setSeccionMar] = useState(false);
  const isNavigating = useRef(false);

  // Detectar slide activo con IntersectionObserver
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigating.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            if (!isNaN(idx)) {
              setActiveIndex(idx);
            }
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    const children = container.querySelectorAll('[data-index]');
    children.forEach((child) => observer.observe(child));

    return () => observer.disconnect();
  }, []);

  // Transición al mar basada en slide activo
  useEffect(() => {
    // Encontrar índices de sección VIII y cierre
    const idxVIII = allSlides.findIndex((s) => s.id === 'sec-VIII');
    const idxCierre = allSlides.findIndex((s) => s.id === 'cierre-final');

    if (activeIndex >= idxVIII && activeIndex < idxCierre) {
      const progress = (activeIndex - idxVIII) / (idxCierre - idxVIII);
      setSeccionMar(progress > 0.2);
    } else if (activeIndex >= idxCierre) {
      setSeccionMar(true);
    } else {
      setSeccionMar(false);
    }
  }, [activeIndex]);

  // Navegación programática
  const navigateTo = useCallback((index: number) => {
    const container = scrollRef.current;
    if (!container) return;

    isNavigating.current = true;
    const children = container.querySelectorAll('[data-index]');
    const target = children[index] as HTMLElement;
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveIndex(index);
    }
    setTimeout(() => {
      isNavigating.current = false;
    }, 600);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        if (activeIndex < allSlides.length - 1) navigateTo(activeIndex + 1);
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        if (activeIndex > 0) navigateTo(activeIndex - 1);
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeIndex, navigateTo]);

  // Touch swipe navigation
  useEffect(() => {
    let touchStartY = 0;
    let touchEndY = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY;
      const diff = touchStartY - touchEndY;
      if (Math.abs(diff) > 60) {
        if (diff > 0 && activeIndex < allSlides.length - 1) {
          navigateTo(activeIndex + 1);
        } else if (diff < 0 && activeIndex > 0) {
          navigateTo(activeIndex - 1);
        }
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [activeIndex, navigateTo]);

  const currentSlide = allSlides[activeIndex];

  return (
    <div className="h-[100svh] w-full relative overflow-hidden" style={{ touchAction: 'pan-y' }}>
      {/* Partículas botánicas - SIEMPRE activas */}
      <ParticulasBotanicas seccionMar={seccionMar} />

      {/* Audio control */}
      <AudioControl />

      {/* Contenedor snap scroll */}
      <div ref={scrollRef} className="snap-scroll w-full h-full relative">
        {allSlides.map((slide, index) => (
          <div key={slide.id} data-index={index} className="w-full">
            {slide.tipo === 'portada' && <Portada isActive={activeIndex === index} />}
            {slide.tipo === 'contador' && <PantallaContador isActive={activeIndex === index} />}
            {slide.tipo === 'seccion' && <SlideSeccion slide={slide} isActive={activeIndex === index} />}
            {slide.tipo === 'poema' && <SlidePoema slide={slide} isActive={activeIndex === index} />}
            {slide.tipo === 'respiro' && <SlideRespiro slide={slide} isActive={activeIndex === index} />}
            {slide.tipo === 'cierre' && <SlideCierre isActive={activeIndex === index} />}
          </div>
        ))}
      </div>

      {/* Navegación lateral */}
      <Navegacion
        total={allSlides.length}
        current={activeIndex}
        onNavigate={navigateTo}
      />

      {/* Indicador de sección actual (subtle) */}
      <div
        className="fixed bottom-5 left-0 right-0 text-center z-40 pointer-events-none"
        style={{
          opacity: currentSlide?.seccionNumero ? 0.25 : 0,
          transition: 'opacity 0.5s ease',
        }}
      >
        <span className="text-violeta font-cormorant text-xs tracking-[0.15em]">
          {currentSlide?.tipo === 'poema' || currentSlide?.tipo === 'respiro'
            ? `— ${currentSlide.seccionNumero} —`
            : ''}
        </span>
      </div>
    </div>
  );
}
