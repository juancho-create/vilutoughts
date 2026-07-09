import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * usePageNav — navegación página por página, como pasar hojas de un libro.
 *
 * Avanzar:   swipe hacia arriba (deltaY > 55), tap en la mitad inferior,
 *            ArrowDown, Space.
 * Retroceder: swipe hacia abajo, tap en la mitad superior, ArrowUp.
 *
 * Expone el índice actual y la dirección del último movimiento
 * (1 = adelante, -1 = atrás) para que la transición anime hacia el lado correcto.
 */

const SWIPE_THRESHOLD = 55; // px mínimos para contar como swipe vertical
const TAP_SLOP = 12; // px máximos de desplazamiento para seguir siendo "tap"

export interface PageNav {
  index: number;
  direction: number;
  count: number;
  goNext: () => void;
  goPrev: () => void;
  goTo: (i: number) => void;
}

export function usePageNav(count: number): PageNav {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  // Ref con el índice vivo para leerlo dentro de listeners sin re-suscribir.
  const indexRef = useRef(index);
  indexRef.current = index;

  const goTo = useCallback(
    (target: number) => {
      const clamped = Math.max(0, Math.min(count - 1, target));
      const current = indexRef.current;
      if (clamped === current) return;
      setDirection(clamped > current ? 1 : -1);
      setIndex(clamped);
    },
    [count],
  );

  const goNext = useCallback(() => goTo(indexRef.current + 1), [goTo]);
  const goPrev = useCallback(() => goTo(indexRef.current - 1), [goTo]);

  // Teclado ----------------------------------------------------------------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        goNext();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [goNext, goPrev]);

  // Punteros (táctil + mouse): distingue tap de swipe ----------------------
  useEffect(() => {
    let startX = 0;
    let startY = 0;
    let ignore = false; // el gesto empezó sobre un control interactivo

    const onDown = (e: PointerEvent) => {
      startX = e.clientX;
      startY = e.clientY;
      const target = e.target as Element | null;
      ignore = !!target?.closest('[data-nav-ignore]');
    };

    const onUp = (e: PointerEvent) => {
      if (ignore) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      // Swipe vertical
      if (Math.abs(dy) > SWIPE_THRESHOLD && Math.abs(dy) > Math.abs(dx)) {
        if (dy < 0) goNext(); // dedo sube → avanzar
        else goPrev(); // dedo baja → retroceder
        return;
      }

      // Tap: mitad inferior avanza, mitad superior retrocede
      if (Math.abs(dx) < TAP_SLOP && Math.abs(dy) < TAP_SLOP) {
        if (e.clientY > window.innerHeight / 2) goNext();
        else goPrev();
      }
    };

    window.addEventListener('pointerdown', onDown);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
    };
  }, [goNext, goPrev]);

  return { index, direction, count, goNext, goPrev, goTo };
}
