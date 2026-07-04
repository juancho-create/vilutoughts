import { useEffect, useState } from 'react';

interface Props {
  mensaje: string;
  visible: boolean;
  onClose: () => void;
}

export default function MensajeOculto({ mensaje, visible, onClose }: Props) {
  const [mostrando, setMostrando] = useState(false);

  useEffect(() => {
    if (visible) {
      setMostrando(true);
      // Triple vibración al revelar
      if (navigator.vibrate) {
        navigator.vibrate([15, 20, 15, 20, 15]);
      }
    } else {
      const timer = setTimeout(() => setMostrando(false), 500);
      return () => clearTimeout(timer);
    }
  }, [visible]);

  if (!mostrando || !mensaje) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-8"
      onClick={onClose}
      onTouchEnd={(e) => {
        e.preventDefault();
        onClose();
      }}
      style={{
        backgroundColor: `rgba(242, 236, 217, ${visible ? 0.94 : 0})`,
        backdropFilter: visible ? 'blur(4px)' : 'none',
        transition: 'background-color 0.5s ease, backdrop-filter 0.5s ease',
      }}
    >
      <div
        className="max-w-[280px] text-center px-8 py-10"
        style={{
          border: '1.5px dashed rgba(142, 122, 150, 0.35)',
          borderRadius: '4px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1) translateY(0)' : 'scale(0.92) translateY(10px)',
          transition: 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative icon */}
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="mx-auto mb-5">
          <circle cx="12" cy="12" r="10" stroke="#C4A468" strokeWidth="0.8" opacity="0.4" />
          <circle cx="12" cy="12" r="4" stroke="#C4A468" strokeWidth="0.6" opacity="0.5" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="#C4A468" strokeWidth="0.4" opacity="0.3" />
        </svg>

        <p className="font-cormorant italic text-tinta leading-relaxed" style={{ fontSize: 'clamp(1.05rem, 3.2vw, 1.2rem)', lineHeight: 1.9 }}>
          {mensaje}
        </p>

        <p className="text-violeta mt-6" style={{ fontSize: '0.65rem', opacity: 0.35, letterSpacing: '0.05em', fontStyle: 'italic' }}>
          Soltar para cerrar
        </p>
      </div>
    </div>
  );
}
