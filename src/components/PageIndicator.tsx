interface PageIndicatorProps {
  count: number;
  index: number;
}

/** Puntitos de posición dentro del cuaderno. */
export default function PageIndicator({ count, index }: PageIndicatorProps) {
  return (
    <div className="page-indicator" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className={
            'page-indicator__dot' +
            (i === index ? ' page-indicator__dot--active' : '')
          }
        />
      ))}
    </div>
  );
}
