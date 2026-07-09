interface NavArrowProps {
  onClick: () => void;
}

/** Flecha inferior con pulse que invita a avanzar. */
export default function NavArrow({ onClick }: NavArrowProps) {
  return (
    <button
      type="button"
      className="nav-arrow"
      onClick={onClick}
      aria-label="Siguiente página"
      data-nav-ignore
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>
  );
}
