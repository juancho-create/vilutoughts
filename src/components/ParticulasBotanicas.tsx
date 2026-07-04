import { useEffect, useRef, useCallback } from 'react';

interface Particula {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  tipo: 'polen' | 'petalo' | 'luciernaga';
  rotacion: number;
  rotSpeed: number;
  id: number;
  subeConScroll: boolean;
  fase: number;
  yBase: number;
}

interface Props {
  seccionMar?: boolean;
}

export default function ParticulasBotanicas({ seccionMar = false }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particulasRef = useRef<Particula[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const seccionMarRef = useRef(seccionMar);

  // Keep ref in sync
  useEffect(() => {
    seccionMarRef.current = seccionMar;
  }, [seccionMar]);

  const crearParticulas = useCallback((width: number, height: number) => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cantidad = reducedMotion ? 0 : 35;
    const particulas: Particula[] = [];

    for (let i = 0; i < cantidad; i++) {
      const tipo = i < 12 ? 'polen' : i < 25 ? 'petalo' : 'luciernaga';
      const y = Math.random() * height;
      particulas.push({
        x: Math.random() * width,
        y,
        yBase: y,
        size: tipo === 'polen' ? 1 + Math.random() * 2 : tipo === 'petalo' ? 3 + Math.random() * 3 : 1.5 + Math.random() * 1.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: 0.05 + Math.random() * 0.15,
        opacity: tipo === 'luciernaga' ? 0.1 + Math.random() * 0.25 : 0.12 + Math.random() * 0.3,
        tipo,
        rotacion: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.008,
        id: i,
        subeConScroll: Math.random() < 0.25,
        fase: Math.random() * Math.PI * 2,
      });
    }
    return particulas;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';

      if (particulasRef.current.length === 0) {
        particulasRef.current = crearParticulas(window.innerWidth, window.innerHeight);
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      particulasRef.current.forEach((p) => {
        const dx = p.x - touch.clientX;
        const dy = p.y - touch.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 70) {
          const fuerza = 25 * (1 - dist / 70);
          p.speedX += (dx / (dist || 1)) * fuerza * 0.08;
          p.speedY += (dy / (dist || 1)) * fuerza * 0.08;
        }
      });
    };

    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const coloresPetalosMar = ['#8E7A96', '#7A9AA8', '#C4A468'];
    const coloresPetalosJardin = ['#8E7A96', '#D4A5A5', '#C4A468'];

    const animate = (time: number) => {
      lastTimeRef.current = time;
      const esMar = seccionMarRef.current;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      particulasRef.current.forEach((p) => {
        // Movimiento suave
        p.x += p.speedX + Math.sin(time * 0.0003 + p.fase) * 0.12;
        p.y += p.speedY + Math.sin(time * 0.0005 + p.fase * 1.5) * 0.08;
        p.rotacion += p.rotSpeed;

        // Decaimiento de velocidad extra
        p.speedX *= 0.998;
        p.speedY *= 0.998;

        // Wrap around
        if (p.x < -20) p.x = window.innerWidth + 20;
        if (p.x > window.innerWidth + 20) p.x = -20;
        if (p.y < -20) p.y = window.innerHeight + 20;
        if (p.y > window.innerHeight + 20) p.y = -20;

        // Dibujar
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotacion);

        if (p.tipo === 'polen') {
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 164, 104, ${p.opacity})`;
          ctx.fill();
        } else if (p.tipo === 'petalo') {
          ctx.beginPath();
          ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
          const colors = esMar ? coloresPetalosMar : coloresPetalosJardin;
          const hex = colors[p.id % colors.length];
          const r = parseInt(hex.slice(1, 3), 16);
          const g = parseInt(hex.slice(3, 5), 16);
          const b = parseInt(hex.slice(5, 7), 16);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${p.opacity})`;
          ctx.fill();
        } else if (p.tipo === 'luciernaga') {
          const pulse = 0.08 + 0.6 * (0.5 + 0.5 * Math.sin(time * 0.0025 + p.fase * 2.5));
          ctx.beginPath();
          ctx.arc(0, 0, p.size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 164, 104, ${pulse})`;
          ctx.fill();
          // Glow
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 4, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(196, 164, 104, ${pulse * 0.06})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [crearParticulas]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    />
  );
}
