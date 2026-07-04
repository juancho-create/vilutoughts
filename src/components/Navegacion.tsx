import { useCallback } from 'react';

interface Props {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
}

export default function Navegacion({ total, current, onNavigate }: Props) {
  const handlePrev = useCallback(() => {
    if (current > 0) {
      onNavigate(current - 1);
    }
  }, [current, onNavigate]);

  const handleNext = useCallback(() => {
    if (current < total - 1) {
      onNavigate(current + 1);
    }
  }, [current, onNavigate]);

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2">
      {/* Up arrow */}
      <button
        onClick={handlePrev}
        className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          opacity: current > 0 ? 0.4 : 0.1,
          backgroundColor: 'rgba(142, 122, 150, 0.1)',
        }}
        aria-label="Anterior"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E7A96" strokeWidth="1.5" strokeLinecap="round">
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex flex-col items-center gap-[6px] py-1">
        {Array.from({ length: Math.min(total, 30) }).map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className="rounded-full transition-all duration-400"
            style={{
              width: i === current ? '5px' : '3px',
              height: i === current ? '5px' : '3px',
              backgroundColor: i === current ? '#8E7A96' : 'rgba(142, 122, 150, 0.25)',
              borderRadius: '50%',
            }}
            aria-label={`Ir a slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Down arrow */}
      <button
        onClick={handleNext}
        className="w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          opacity: current < total - 1 ? 0.4 : 0.1,
          backgroundColor: 'rgba(142, 122, 150, 0.1)',
        }}
        aria-label="Siguiente"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#8E7A96" strokeWidth="1.5" strokeLinecap="round">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
    </div>
  );
}
