import { useEffect, useState } from 'react';
import FirmaSVG from './FirmaSVG';

interface Props {
  isActive: boolean;
}

export default function Portada({ isActive }: Props) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isActive) {
      const timer = setTimeout(() => setVisible(true), 200);
      return () => clearTimeout(timer);
    } else {
      setVisible(false);
    }
  }, [isActive]);

  return (
    <div className="slide-container" style={{ backgroundColor: 'var(--color-papel)' }}>
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src="/images/portada-jardin.jpg"
          alt="Jardín de violetas"
          className="w-full h-full object-cover"
          style={{ filter: 'brightness(0.92)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, rgba(242,236,217,0.2) 0%, rgba(242,236,217,0.55) 50%, rgba(242,236,217,0.95) 85%, rgba(242,236,217,1) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 text-center">
        {/* Firma SVG */}
        <div
          className="mb-8"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1.2s ease-out 0.3s',
          }}
        >
          <FirmaSVG size={140} triggerOnView={false} />
        </div>

        {/* Title */}
        <h1
          className="font-whisper text-tinta mb-3"
          style={{
            fontSize: 'clamp(2.2rem, 7vw, 3.2rem)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'all 1s ease-out 0.8s',
          }}
        >
          Para Violeta del Mar
        </h1>

        {/* Subtitle */}
        <p
          className="font-cormorant italic text-tinta"
          style={{
            fontSize: '1rem',
            opacity: visible ? 0.55 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(15px)',
            transition: 'all 1s ease-out 1.3s',
          }}
        >
          Un cuaderno de poemas
        </p>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 bounce-infinito"
          style={{
            opacity: visible ? 0.35 : 0,
            transition: 'opacity 1s ease-out 2s',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8E7A96" strokeWidth="1.5" strokeLinecap="round">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
}
