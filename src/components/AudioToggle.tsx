interface AudioToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

/** Botón discreto (arriba a la derecha) para activar/silenciar el pad ambiental. */
export default function AudioToggle({ enabled, onToggle }: AudioToggleProps) {
  return (
    <button
      type="button"
      className="audio-toggle"
      data-on={enabled}
      data-nav-ignore
      onClick={onToggle}
      aria-label={enabled ? 'Silenciar sonido' : 'Activar sonido'}
      aria-pressed={enabled}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M4 9v6h4l5 4V5L8 9H4z" />
        {enabled ? (
          <>
            <path d="M16.5 8.5a5 5 0 0 1 0 7" />
            <path d="M19 6a8 8 0 0 1 0 12" />
          </>
        ) : (
          <path d="M22 9l-6 6M16 9l6 6" />
        )}
      </svg>
    </button>
  );
}
