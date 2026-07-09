import { useEffect, useRef } from 'react';
import { track } from '@vercel/analytics';

/**
 * useVisitTracking — complementa Vercel Web Analytics (que ya reporta
 * visitantes, dispositivo, SO y navegador de forma nativa) con lo único que
 * no trae de fábrica: cuánto tiempo se queda cada visita.
 *
 * Envía un evento personalizado `time_on_book` al salir de la página, con la
 * duración agrupada en rangos legibles desde el panel de Vercel → Analytics
 * → Events. También marca `reached_closing` la primera vez que se llega a la
 * última pantalla, para saber si la lectura se completó.
 */

function bucketSeconds(seconds: number): string {
  if (seconds < 30) return '0–30s';
  if (seconds < 60) return '30–60s';
  if (seconds < 180) return '1–3 min';
  if (seconds < 300) return '3–5 min';
  if (seconds < 600) return '5–10 min';
  return '10+ min';
}

export function useVisitTracking(reachedClosing: boolean) {
  const startedAt = useRef(Date.now());
  const closingSent = useRef(false);

  useEffect(() => {
    const sendDuration = () => {
      const seconds = Math.round((Date.now() - startedAt.current) / 1000);
      track('time_on_book', { duration: bucketSeconds(seconds) });
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') sendDuration();
    };

    window.addEventListener('pagehide', sendDuration);
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => {
      window.removeEventListener('pagehide', sendDuration);
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    if (reachedClosing && !closingSent.current) {
      closingSent.current = true;
      track('reached_closing');
    }
  }, [reachedClosing]);
}
