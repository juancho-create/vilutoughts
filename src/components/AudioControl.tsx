import { useState, useRef, useEffect, useCallback } from 'react';

export default function AudioControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [iniciado, setIniciado] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const sourcesRef = useRef<AudioNode[]>([]);

  const crearSonidoAmbiente = useCallback(() => {
    if (audioContextRef.current) return;

    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    const gainNode = ctx.createGain();
    gainNode.connect(ctx.destination);
    gainNode.gain.value = 0;
    gainNodeRef.current = gainNode;

    // Sonido de lluvia suave/jardín - frecuencias suaves y textura
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 220;

    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 330;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.15;
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 80;
    lfo.connect(lfoGain);
    lfoGain.connect(osc2.frequency);
    lfo.start();

    // Ruido blanco suave para textura de lluvia
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.03;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = buffer;
    noise.loop = true;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.3;
    noise.connect(noiseGain);
    noiseGain.connect(gainNode);
    noise.start();

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    osc1.start();
    osc2.start();
    sourcesRef.current = [osc1, osc2, lfo, noise];
  }, []);

  const fadeIn = useCallback(() => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    const gain = gainNodeRef.current.gain;
    gain.cancelScheduledValues(audioContextRef.current.currentTime);
    gain.linearRampToValueAtTime(0.06, audioContextRef.current.currentTime + 3);
  }, []);

  const fadeOut = useCallback(() => {
    if (!gainNodeRef.current || !audioContextRef.current) return;
    const gain = gainNodeRef.current.gain;
    gain.cancelScheduledValues(audioContextRef.current.currentTime);
    gain.linearRampToValueAtTime(0, audioContextRef.current.currentTime + 2);
  }, []);

  const toggleAudio = useCallback(() => {
    if (!iniciado) {
      setIniciado(true);
      crearSonidoAmbiente();
      setIsPlaying(true);
      setTimeout(() => fadeIn(), 100);
    } else if (isPlaying) {
      fadeOut();
      setIsPlaying(false);
    } else {
      fadeIn();
      setIsPlaying(true);
    }
  }, [iniciado, isPlaying, crearSonidoAmbiente, fadeIn, fadeOut]);

  // Cleanup
  useEffect(() => {
    return () => {
      sourcesRef.current.forEach((src) => {
        try {
          if ('stop' in src && typeof (src as any).stop === 'function') {
            (src as any).stop();
          }
        } catch (e) { /* ignore */ }
      });
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      className="fixed top-4 left-4 z-50 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
      style={{
        backgroundColor: isPlaying ? 'rgba(107, 122, 94, 0.15)' : 'rgba(142, 122, 150, 0.1)',
        border: `1px solid ${isPlaying ? 'rgba(107, 122, 94, 0.3)' : 'rgba(142, 122, 150, 0.2)'}`,
      }}
      aria-label={isPlaying ? 'Silenciar audio' : 'Reproducir audio'}
    >
      {isPlaying ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6B7A5E" strokeWidth="1.5" strokeLinecap="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#6B7A5E" fillOpacity="0.2" />
          <line x1="23" y1="9" x2="17" y2="15" />
          <line x1="17" y1="9" x2="23" y2="15" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8E7A96" strokeWidth="1.5" strokeLinecap="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" fill="#8E7A96" fillOpacity="0.15" />
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
        </svg>
      )}
    </button>
  );
}
