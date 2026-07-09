import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useAmbientAudio — dos pistas reales (Ólafur Arnalds) que se funden entre sí:
 * "Particles" acompaña la lectura, "Epilogue" toma el relevo hacia el final.
 *
 * El cruce entre ambas sigue la misma curva que ya oscurece el papel hacia la
 * noche (`night`, 0→1): así el oído y la vista cambian juntos, sin que sea un
 * efecto aparte. El AudioContext se crea recién tras el gesto del usuario
 * (políticas de autoplay). Si nunca se activa, el cuaderno queda en silencio.
 */

const MASTER_GAIN = 0.8;
const PARTICLES_SRC = '/audio/particles.mp3';
const EPILOGUE_SRC = '/audio/epilogue.mp3';

/** Curva de cruce: Particles domina hasta bien entrada la transición nocturna,
 *  y Epilogue toma el relevo cerca del cierre (coherente con nightProgress). */
function crossfadeCurve(night: number): number {
  const t = Math.min(1, Math.max(0, (night - 0.3) / 0.6));
  return t * t * (3 - 2 * t);
}

interface AudioGraph {
  ctx: AudioContext;
  master: GainNode;
  particlesEl: HTMLAudioElement;
  epilogueEl: HTMLAudioElement;
  particlesGain: GainNode;
  epilogueGain: GainNode;
}

export interface AmbientAudio {
  enabled: boolean;
  toggle: () => void;
}

export function useAmbientAudio(night: number): AmbientAudio {
  const [enabled, setEnabled] = useState(false);
  const refs = useRef<AudioGraph | null>(null);
  const nightRef = useRef(night);
  nightRef.current = night;

  const rampGain = useCallback((gain: GainNode, ctx: AudioContext, value: number, seconds: number) => {
    const now = ctx.currentTime;
    gain.gain.cancelScheduledValues(now);
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(value, now + seconds);
  }, []);

  /** Crea el grafo de audio la primera vez (siempre tras un gesto del usuario). */
  const ensureGraph = useCallback((): AudioGraph => {
    if (refs.current) return refs.current;

    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);

    const makeTrack = (src: string, initialGain: number) => {
      const el = new Audio(src);
      el.loop = true;
      el.crossOrigin = 'anonymous';
      const gain = ctx.createGain();
      gain.gain.value = initialGain;
      ctx.createMediaElementSource(el).connect(gain).connect(master);
      return { el, gain };
    };

    const t = crossfadeCurve(nightRef.current);
    const particles = makeTrack(PARTICLES_SRC, 1 - t);
    const epilogue = makeTrack(EPILOGUE_SRC, t);

    refs.current = {
      ctx,
      master,
      particlesEl: particles.el,
      epilogueEl: epilogue.el,
      particlesGain: particles.gain,
      epilogueGain: epilogue.gain,
    };
    return refs.current;
  }, []);

  const toggle = useCallback(() => {
    if (!enabled) {
      const graph = ensureGraph();
      void graph.ctx.resume();
      void graph.particlesEl.play();
      void graph.epilogueEl.play();
      rampGain(graph.master, graph.ctx, MASTER_GAIN, 1.2);
      setEnabled(true);
    } else {
      const graph = refs.current;
      if (graph) {
        rampGain(graph.master, graph.ctx, 0, 0.8);
        const { particlesEl, epilogueEl } = graph;
        window.setTimeout(() => {
          particlesEl.pause();
          epilogueEl.pause();
        }, 850);
      }
      setEnabled(false);
    }
  }, [enabled, ensureGraph, rampGain]);

  // Sigue la curva de cruce cada vez que cambia `night` (avance de página).
  useEffect(() => {
    const graph = refs.current;
    if (!graph) return;
    const t = crossfadeCurve(night);
    rampGain(graph.particlesGain, graph.ctx, 1 - t, 1.2);
    rampGain(graph.epilogueGain, graph.ctx, t, 1.2);
  }, [night, rampGain]);

  // Limpieza: pausar y cerrar el contexto al desmontar.
  useEffect(() => {
    return () => {
      const graph = refs.current;
      if (graph) {
        graph.particlesEl.pause();
        graph.epilogueEl.pause();
        void graph.ctx.close();
        refs.current = null;
      }
    };
  }, []);

  return { enabled, toggle };
}
