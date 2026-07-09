import { useEffect, type CSSProperties } from 'react';
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'framer-motion';
import { nightProgressForIndex, screens, type Screen } from './data/poems';
import { usePageNav } from './hooks/usePageNav';
import { useAmbientAudio } from './hooks/useAmbientAudio';
import Cover from './components/Cover';
import Poem from './components/Poem';
import Breath from './components/Breath';
import Closing from './components/Closing';
import NavArrow from './components/NavArrow';
import PageIndicator from './components/PageIndicator';
import AudioToggle from './components/AudioToggle';

/* Colores para la transición día → noche (interpolación en RGB). */
const PAPER = [0xf4, 0xef, 0xe4];
const NIGHT = [0x13, 0x13, 0x20];
const INK = [0x23, 0x1f, 0x1a];
const NIGHT_TEXT = [0xd4, 0xcc, 0xbe];

/** Mezcla dos colores RGB y devuelve `#rrggbb`. */
function mix(a: number[], b: number[], t: number): string {
  const h = (n: number) => Math.round(n).toString(16).padStart(2, '0');
  return '#' + a.map((av, i) => h(av + (b[i] - av) * t)).join('');
}

/** Componente de contenido para cada tipo de pantalla. */
function renderScreen(screen: Screen) {
  switch (screen.kind) {
    case 'cover':
      return <Cover />;
    case 'poem':
      return <Poem title={screen.title} lines={screen.lines} />;
    case 'breath':
      return <Breath lines={screen.lines} author={screen.author} />;
    case 'closing':
      return <Closing />;
  }
}

export default function App() {
  const reduce = useReducedMotion();
  const nav = usePageNav(screens.length);
  const audio = useAmbientAudio();
  const { index, direction } = nav;

  const screen = screens[index];
  const night = nightProgressForIndex(index);
  const bg = mix(PAPER, NIGHT, night);
  const text = mix(INK, NIGHT_TEXT, night);

  // Sincroniza el color de la barra del navegador con la transición nocturna.
  useEffect(() => {
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', bg);
  }, [bg]);

  // Al llegar al cierre, el pad ambiental se desvanece en 3s.
  useEffect(() => {
    if (screen.kind === 'closing') audio.fadeOut(3);
    // Solo depende del tipo de pantalla; `audio.fadeOut` es estable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screen.kind]);

  // Evita el menú contextual en longpress (móvil).
  useEffect(() => {
    const onCtx = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', onCtx);
    return () => document.removeEventListener('contextmenu', onCtx);
  }, []);

  // Variantes del "pasar hoja": respetan dirección y prefers-reduced-motion.
  const pageVariants: Variants = reduce
    ? {
        enter: { opacity: 0 },
        center: { opacity: 1, transition: { duration: 0.25 } },
        exit: { opacity: 0, transition: { duration: 0.2 } },
      }
    : {
        enter: (dir: number) => ({
          y: dir >= 0 ? '100%' : '-100%',
          rotateX: dir >= 0 ? -6 : 6,
          opacity: 0,
        }),
        center: {
          y: 0,
          rotateX: 0,
          opacity: 1,
          transition: { delay: 0.08, duration: 0.55, ease: [0.4, 0, 0.2, 1] },
        },
        exit: (dir: number) => ({
          y: dir >= 0 ? '-100%' : '100%',
          rotateX: dir >= 0 ? 6 : -6,
          opacity: 0,
          transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
        }),
      };

  const stageStyle = {
    '--stage-bg': bg,
    '--stage-text': text,
  } as unknown as CSSProperties;

  const wrapperClass =
    'screen' +
    (screen.kind === 'breath'
      ? ' screen--breath'
      : screen.kind === 'closing'
        ? ' screen--closing'
        : '');

  return (
    <div className="stage" style={stageStyle}>
      <div className="paper-texture" />

      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={index}
          className={wrapperClass}
          custom={direction}
          variants={pageVariants}
          initial="enter"
          animate="center"
          exit="exit"
        >
          {renderScreen(screen)}
        </motion.div>
      </AnimatePresence>

      <AudioToggle enabled={audio.enabled} onToggle={audio.toggle} />

      {index >= 1 && index < screens.length - 1 && (
        <PageIndicator count={screens.length} index={index} />
      )}
      {index === 0 && <NavArrow onClick={nav.goNext} />}
    </div>
  );
}
