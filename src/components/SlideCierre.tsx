import { useEffect, useState, useRef } from 'react';

interface Props {
  isActive: boolean;
}

export default function SlideCierre({ isActive }: Props) {
  const [visible, setVisible] = useState(false);
  const [drawn, setDrawn] = useState(false);
  const vibracionHecha = useRef(false);

  useEffect(() => {
    if (isActive) {
      setVisible(true);
      const drawTimer = setTimeout(() => setDrawn(true), 400);
      if (!vibracionHecha.current) {
        vibracionHecha.current = true;
        if (navigator.vibrate) {
          navigator.vibrate([15, 40, 15]);
        }
      }
      return () => clearTimeout(drawTimer);
    } else {
      setVisible(false);
      setDrawn(false);
      vibracionHecha.current = false;
    }
  }, [isActive]);

  return (
    <div
      className="slide-container"
      style={{
        backgroundColor: visible ? '#D4DDE5' : '#F2ECD9',
        transition: 'background-color 2.5s ease',
      }}
    >
      <div
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'scale(1)' : 'scale(0.7)',
          transition: 'all 2s cubic-bezier(0.22, 1, 0.36, 1) 0.2s',
        }}
      >
        <svg
          width="120"
          height="72"
          viewBox="0 0 200 120"
          fill="none"
          style={{ overflow: 'visible' }}
        >
          {/* Flor de violeta estilizada - tallo y hojas */}
          <path
            d="M100 110 C100 110, 98 95, 100 85 C102 75, 105 65, 100 55"
            stroke="#6B7A5E"
            strokeWidth="1.8"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: drawn ? 0 : 60,
              transition: 'stroke-dashoffset 2s ease-in-out 0.3s',
            }}
          />
          {/* Hoja izquierda */}
          <path
            d="M100 90 C85 82, 70 78, 60 85 C55 88, 58 82, 65 76 C72 70, 88 72, 100 82"
            stroke="#6B7A5E"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 80,
              strokeDashoffset: drawn ? 0 : 80,
              transition: 'stroke-dashoffset 1.8s ease-in-out 0.6s',
            }}
          />
          {/* Hoja derecha */}
          <path
            d="M100 85 C115 77, 130 73, 140 80 C145 83, 142 77, 135 71 C128 65, 112 67, 100 77"
            stroke="#6B7A5E"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 80,
              strokeDashoffset: drawn ? 0 : 80,
              transition: 'stroke-dashoffset 1.8s ease-in-out 0.8s',
            }}
          />
          {/* Pétalos */}
          <path
            d="M100 55 C92 48, 82 48, 78 55 C74 62, 80 68, 88 66 C92 64, 96 60, 100 55"
            stroke="#8E7A96"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: drawn ? 0 : 60,
              transition: 'stroke-dashoffset 1.5s ease-in-out 1s',
            }}
          />
          <path
            d="M100 55 C108 48, 118 48, 122 55 C126 62, 120 68, 112 66 C108 64, 104 60, 100 55"
            stroke="#8E7A96"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 60,
              strokeDashoffset: drawn ? 0 : 60,
              transition: 'stroke-dashoffset 1.5s ease-in-out 1.1s',
            }}
          />
          <path
            d="M100 55 C96 46, 94 38, 100 32 C106 26, 112 30, 110 38 C108 44, 104 50, 100 55"
            stroke="#8E7A96"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: drawn ? 0 : 50,
              transition: 'stroke-dashoffset 1.5s ease-in-out 1.2s',
            }}
          />
          <path
            d="M100 55 C104 46, 106 38, 100 32 C94 26, 88 30, 90 38 C92 44, 96 50, 100 55"
            stroke="#8E7A96"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: 50,
              strokeDashoffset: drawn ? 0 : 50,
              transition: 'stroke-dashoffset 1.5s ease-in-out 1.3s',
            }}
          />
          {/* Centro */}
          <circle
            cx="100"
            cy="55"
            r="3"
            fill="#C4A468"
            opacity={drawn ? 0.6 : 0}
            style={{ transition: 'opacity 1s ease-in-out 1.8s' }}
          />
        </svg>
      </div>
    </div>
  );
}
