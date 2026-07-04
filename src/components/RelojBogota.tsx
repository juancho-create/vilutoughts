import { useState, useEffect } from 'react';

export default function RelojBogota() {
  const [hora, setHora] = useState('');

  useEffect(() => {
    const actualizar = () => {
      const ahora = new Date();
      const formatter = new Intl.DateTimeFormat('es-CO', {
        timeZone: 'America/Bogota',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setHora(formatter.format(ahora));
    };

    actualizar();
    const interval = setInterval(actualizar, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-violeta text-sm font-cormorant tracking-wide">
      Bogotá — {hora}
    </span>
  );
}
