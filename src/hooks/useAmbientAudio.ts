import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useAmbientAudio — pad ambiental casi imperceptible con Web Audio API.
 *
 * Tres osciladores sine (174.6 / 261.6 / 349.2 Hz) sumados, pasados por un
 * lowpass (~800 Hz) y un gain master muy bajo (0.025). El AudioContext se crea
 * recién tras la interacción del usuario (políticas de autoplay). Si nunca se
 * activa, todo el cuaderno funciona en silencio.
 */

const BASE_GAIN = 0.025;
const FREQS = [174.6, 261.6, 349.2];

interface AudioRefs {
  ctx: AudioContext;
  master: GainNode;
  oscillators: OscillatorNode[];
}

export interface AmbientAudio {
  enabled: boolean;
  toggle: () => void;
  /** Desvanece el pad a 0 en `seconds` (usado al llegar al cierre). */
  fadeOut: (seconds?: number) => void;
}

export function useAmbientAudio(): AmbientAudio {
  const [enabled, setEnabled] = useState(false);
  const refs = useRef<AudioRefs | null>(null);

  /** Crea el grafo de audio la primera vez (siempre tras un gesto del usuario). */
  const ensureGraph = useCallback((): AudioRefs => {
    if (refs.current) return refs.current;

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 800;

    const oscillators = FREQS.map((f) => {
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = f;
      osc.connect(lowpass);
      osc.start();
      return osc;
    });

    lowpass.connect(master);
    master.connect(ctx.destination);

    refs.current = { ctx, master, oscillators };
    return refs.current;
  }, []);

  const rampTo = useCallback((value: number, seconds: number) => {
    const graph = refs.current;
    if (!graph) return;
    const now = graph.ctx.currentTime;
    const g = graph.master.gain;
    g.cancelScheduledValues(now);
    g.setValueAtTime(g.value, now);
    g.linearRampToValueAtTime(value, now + seconds);
  }, []);

  const toggle = useCallback(() => {
    if (!enabled) {
      const graph = ensureGraph();
      void graph.ctx.resume();
      rampTo(BASE_GAIN, 1.2);
      setEnabled(true);
    } else {
      rampTo(0, 0.8);
      setEnabled(false);
    }
  }, [enabled, ensureGraph, rampTo]);

  const fadeOut = useCallback(
    (seconds = 3) => {
      if (!refs.current) return;
      rampTo(0, seconds);
      setEnabled(false);
    },
    [rampTo],
  );

  // Limpieza: cerrar el contexto al desmontar.
  useEffect(() => {
    return () => {
      const graph = refs.current;
      if (graph) {
        graph.oscillators.forEach((o) => {
          try {
            o.stop();
          } catch {
            /* ya detenido */
          }
        });
        void graph.ctx.close();
        refs.current = null;
      }
    };
  }, []);

  return { enabled, toggle, fadeOut };
}
