/* ==========================================================================
   data/poems.ts
   Todo el contenido del cuaderno, como una lista ordenada de pantallas.
   Reordenar o añadir un poema es tan simple como mover/insertar un objeto aquí.

   Convención: dentro de `lines`, una cadena vacía ('') marca el fin de una
   estrofa (línea en blanco). Cada string no vacío es un verso.
   ========================================================================== */

export type Screen =
  | { kind: 'cover' }
  | { kind: 'poem'; title?: string; lines: string[] }
  | { kind: 'breath'; lines: string[]; author: string }
  | { kind: 'closing' };

export const screens: Screen[] = [
  { kind: 'cover' },

  // 1 — Bogotá (parte 1)
  {
    kind: 'poem',
    title: 'Bogotá',
    lines: [
      'No sé qué motivo me trajo hasta aquí,',
      'no recuerdo cómo llegué,',
      'hace tiempo, pero ya no recuerdo.',
      '',
      'Bogotá, ciudad fría,',
      'pero tus brazos fueron calientes.',
      'Y aunque todo esto ha sido intermitente,',
      'puedo sentirte como una constante.',
      '',
      '¿Qué quiere esta presencia?',
      'Duda para amar, quiero saber más de vos.',
      'Aunque no supe ser buen conversador,',
      'intento escribirte.',
    ],
  },

  // 2 — Bogotá (parte 2)
  {
    kind: 'poem',
    lines: [
      'Bogotá, ciudad fría,',
      'pero en tus ojos hubo compañía.',
      'En tus ojos vi la luna.',
      '',
      'Vos preguntás qué hiciera,',
      'yo creo que creo,',
      'como yo quiero creer',
      'que fue difícil conocerte',
      'y espero que no sea fácil',
      'perdernos.',
    ],
  },

  // 3 — El clima de tu voz
  {
    kind: 'poem',
    title: 'El clima de tu voz',
    lines: [
      'Bogotá amanece fría casi siempre.',
      'Yo ya aprendí a vivir con eso.',
      '',
      'Lo que no esperaba',
      'era que tu voz',
      'también tuviera clima propio,',
      'y que fuera distinto.',
    ],
  },

  // 4 — (sin título) Manos frías
  {
    kind: 'poem',
    lines: [
      'Bogotá tiene la culpa',
      'de mis manos frías.',
      'Vos tenés la culpa',
      'de que ya no me importe.',
    ],
  },

  // 5 — Casualidad (parte 1)
  {
    kind: 'poem',
    title: 'Casualidad',
    lines: [
      'Te conocí por casualidad',
      'y esa misma casualidad',
      'ahora tiene un motivo y tiene un nombre.',
      '',
      'Es difícil pensar en la distancia',
      'cuando estamos tan cerca,',
      'cuando el tiempo no nos sobra.',
      'Sentirte tan cerca es tan difícil.',
    ],
  },

  // 6 — Casualidad (parte 2)
  {
    kind: 'poem',
    lines: [
      'Aunque no hablemos,',
      'me preguntás si te extraño',
      'y claro que sí.',
      'No te preguntés si yo te extraño',
      'por miedo a morir en una respuesta falsa.',
      '',
      'Prefiero una respuesta verdadera,',
      'aunque me cueste creerte,',
      'aunque sea más difícil no pensarte.',
      '',
      'Pero la vida es como es',
      'y todo nos lleva al mismo punto:',
      'no estamos juntos.',
    ],
  },

  // 7 — Primera vez que escribí tu nombre
  {
    kind: 'poem',
    title: 'Primera vez que escribí tu nombre',
    lines: [
      'La primera vez que escribí tu nombre',
      'no sabía que iba a costarme tanto',
      'no escribir nada más.',
    ],
  },

  // 8 — Tu nombre en la lista
  {
    kind: 'poem',
    title: 'Tu nombre en la lista',
    lines: [
      'Guardé tu nombre en el teléfono',
      'sin apellido,',
      'sin apodo,',
      'solo tu nombre,',
      'como si no hiciera falta',
      'nada más para encontrarte.',
    ],
  },

  // 9 — (sin título) Flor y mar
  {
    kind: 'poem',
    lines: [
      'Tu nombre tiene una flor',
      'y tiene el mar.',
      'Yo no sé de flores',
      'y le tengo miedo al mar.',
      'Pero acá estoy:',
      'regando esto todos los días,',
      'aprendiendo a nadar.',
    ],
  },

  // 10 — Lo que no sé de vos
  {
    kind: 'poem',
    title: 'Lo que no sé de vos',
    lines: [
      'No sé tu comida favorita,',
      'no sé cómo eras de niña,',
      'no sé casi nada de vos.',
      'Pero ya sé que quiero saberlo,',
      'aunque no sepa todavía',
      'para qué.',
    ],
  },

  // 11 — Tu risa
  {
    kind: 'poem',
    title: 'Tu risa',
    lines: [
      'Esta semana fue dura,',
      'no te voy a mentir.',
      'Pero tu risa',
      'fue lo único que no tuve que esforzarme',
      'para que me gustara.',
    ],
  },

  // 12 — (sin título)
  {
    kind: 'poem',
    lines: [
      'No soy de los que escriben',
      'poemas fáciles,',
      'pero con vos',
      'hasta lo difícil',
      'se me ocurre rápido.',
    ],
  },

  // 13 — Una semana no es nada
  {
    kind: 'poem',
    title: 'Una semana no es nada',
    lines: [
      'Una semana no es nada,',
      'lo sé,',
      'lo repito para que se me grabe.',
      'Pero el cuerpo no entiende de calendarios',
      'y el cuerpo, con vos,',
      'ya tiene sus propias razones.',
    ],
  },

  // 14 — (sin título) «escribiendo…»
  {
    kind: 'poem',
    lines: [
      'Cuando aparece «escribiendo…»',
      'debajo de tu nombre,',
      'me quedo quieto,',
      'como si moverme',
      'pudiera borrar',
      'lo que estás por decirme.',
    ],
  },

  // 15 — Reservación (parte 1)
  {
    kind: 'poem',
    title: 'Reservación',
    lines: [
      'No tengo tanto tiempo,',
      'pero cuando tengo tiempo te pienso.',
      'Te quiero. Te extraño.',
      '',
      'Te conozco hace poco',
      'pero parece mucho.',
      '¿Qué faltaba aquí,',
      'en ese espacio que no estaba vacío?',
      '',
      'Porque tenía una reservación para vos',
      'desde antes de que llegaras,',
      'desde antes de que me faltaras.',
      'Solo esperaba el momento',
      'en que te conociera',
      'para sentir ese cariño.',
    ],
  },

  // 16 — Reservación (parte 2)
  {
    kind: 'poem',
    lines: [
      'Esa mirada. Ese abrazo.',
      'Es muy extraño.',
      '',
      'Yo soy romántico,',
      'no tan romántico,',
      'pero así sentí',
      'cuando pensé que vos',
      'querías estar aquí.',
      '',
      'Los días son largos',
      'y las noches son cortas.',
      'Quisiera tener tiempo de sobra',
      'para abrazarte.',
    ],
  },

  // 17 — Lo que no dije
  {
    kind: 'poem',
    title: 'Lo que no dije',
    lines: [
      'Hay cosas que no te dije',
      'porque sonaban',
      'más grandes de lo que yo mismo entendía.',
      'Capaz las digo después.',
      'Capaz las estoy diciendo ahora.',
    ],
  },

  // 18 — (sin título)
  {
    kind: 'poem',
    lines: [
      'El viento se lleva las hojas',
      'como si no le costara nada.',
      'Ojalá se lleve también',
      'este miedo de pensarte tanto.',
    ],
  },

  // 19 — Miedo
  {
    kind: 'poem',
    title: 'Miedo',
    lines: [
      'Tengo miedo,',
      'no te voy a decir que no.',
      'Miedo de ir muy rápido,',
      'miedo de equivocarme otra vez.',
      'Pero más miedo me da',
      'no intentarlo.',
    ],
  },

  // 20 — Respiro (Gustavo Adolfo Bécquer) — abre la suite de miradas y ternura
  {
    kind: 'breath',
    author: 'Gustavo Adolfo Bécquer',
    lines: [
      'El alma que hablar puede con los ojos,',
      'también puede besar con la mirada.',
    ],
  },

  // 21 — (sin título)
  {
    kind: 'poem',
    lines: [
      'Pude ver mi reflejo en tus ojos,',
      'solo un segundo',
      'pues no pude sostenerte la mirada.',
    ],
  },

  // 22 — (sin título)
  {
    kind: 'poem',
    lines: ['Tus cachetes:', 'pistas de aterrizaje', 'para mis besos.'],
  },

  // 23 — (sin título)
  {
    kind: 'poem',
    lines: [
      'Tu frente',
      'es el lugar exacto',
      'donde dejo',
      'los besos que no sé',
      'explicar con palabras.',
    ],
  },

  // 24 — (sin título)
  {
    kind: 'poem',
    lines: [
      'Como leve brisa',
      'dejabas caer tus besos sobre mis labios,',
      'y como la tierra mojada',
      'que suelta su olor a primera lluvia,',
      'de mi piel brotaba',
      'algo que olía a ternura.',
    ],
  },

  // 25 — (sin título)
  {
    kind: 'poem',
    lines: [
      'No necesito un plan elaborado:',
      'una tarde sin afán,',
      'la misma cobija,',
      'y vos',
      'contándome cualquier cosa.',
      'Esa ya sería',
      'mi cita perfecta.',
    ],
  },

  // 26 — Tu mano
  {
    kind: 'poem',
    title: 'Tu mano',
    lines: [
      'No hace falta que diga',
      'todo lo que pensé',
      'cuando tomé tu mano.',
      'Alcanza con decir',
      'que no quise soltarla.',
    ],
  },

  // 27 — (sin título)
  {
    kind: 'poem',
    lines: [
      'Si la ternura tuviera olor,',
      'sería el de tu cuello',
      'después de un abrazo largo.',
    ],
  },

  // 28 — Respiro (Amado Nervo) — "temiera irse muy temprano" abre las promesas
  {
    kind: 'breath',
    author: 'Amado Nervo',
    lines: [
      'Me besaba mucho, como si temiera irse muy temprano.',
      'Su cariño era inquieto, nervioso,',
      'yo no comprendía tan febril premura.',
    ],
  },

  // 29 — No te prometo nada
  {
    kind: 'poem',
    title: 'No te prometo nada',
    lines: [
      'No te voy a prometer',
      'que esto va a durar para siempre.',
      'No sé prometer esas cosas',
      'y no quiero mentirte desde el primer mensaje.',
      'Lo único que tengo',
      'es esto: ahora,',
      'y ganas de que haya un después.',
    ],
  },

  // 30 — (sin título)
  {
    kind: 'poem',
    lines: [
      'Las aves parten en invierno',
      'sin pedir permiso al frío.',
      'Yo me quedo,',
      'sin entender bien',
      'por qué,',
      'sin importar el tiempo.',
    ],
  },

  // 31 — (sin título)
  {
    kind: 'poem',
    lines: [
      'El mar no pregunta',
      'hacia dónde va la ola.',
      'Yo tampoco preguntaría',
      'hacia dónde va esto,',
      'si supiera que vos vas conmigo.',
    ],
  },

  // 32 — Antes de España
  {
    kind: 'poem',
    title: 'Antes de España',
    lines: [
      'No quiero pensar en España todavía.',
      'Faltan meses',
      'y yo apenas estoy aprendiendo',
      'cómo se dice tu nombre',
      'sin que me tiemble la voz.',
    ],
  },

  // 33 — Esta noche
  {
    kind: 'poem',
    title: 'Esta noche',
    lines: [
      'Sé que en unos meses',
      'puede haber un océano de por medio.',
      'Pero hoy hay una mesa,',
      'una cena,',
      'una calle de Bogotá',
      'y vos.',
      'Y eso hoy es suficiente.',
    ],
  },

  // 34 — (sin título)
  {
    kind: 'poem',
    lines: [
      'Me gustás',
      'de una forma que no cabe',
      'en una sola palabra,',
      'así que voy a necesitar',
      'escribir cincuenta más.',
    ],
  },

  // 35 — Extrañame (parte 1)  ── comienza la transición nocturna
  {
    kind: 'poem',
    title: 'Extrañame',
    lines: [
      'Tres semanas quisiera llevarte conociendo,',
      'para que pensés cuánto tiempo te he pensado.',
      'Aunque parezca poco.',
      '',
      'Hace una semana que llegué,',
      'hace una semana que te vi,',
      'hace menos de una semana que te abracé.',
    ],
  },

  // 36 — Extrañame (parte 2)
  {
    kind: 'poem',
    lines: [
      'Es difícil pensar.',
      'Quiero pensar en otra cosa',
      'pero no tengo tiempo para no pensarte.',
      'Quiero verte, deseo tus brazos.',
      '',
      'Fueron esos brazos los que me cobijaron,',
      'los que me acercaron el calor.',
      '',
      'Tal vez no había sentido',
      'ese cariño perpetuo:',
      'querido, extrañado,',
      'deseado.',
      '¿Qué faltaba?',
    ],
  },

  // 37 — Extrañame (parte 3)
  {
    kind: 'poem',
    lines: [
      'Del amor entiendo poco.',
      'Una decisión hace parte de quererte.',
      'El cariño es una cosa,',
      'quererte es otra,',
      'tenerte cerca es distinto',
      'a tenerte lejos.',
      '',
      'Espero no serte indiferente.',
    ],
  },

  // 38 — Extrañame (parte 4)
  {
    kind: 'poem',
    lines: [
      'La luz de la luna te sienta bien.',
      'Pero esa noche',
      'no era la luna:',
      'era la luz en tus ojos',
      'cuando me mirabas,',
      'cuando me mirabas toda la noche',
      'sin que yo pudiera sostenerte la mirada.',
      '',
      'Era tan difícil quedarme firme',
      'como tus pensamientos,',
      'como tu deseo.',
      '',
      'Cuánto me intrigás',
      'y esas dudas',
      'no las quiero resolver.',
      '',
      'Solo quiero tu querer,',
      'quiero que vos querás querer.',
      '',
      'Extrañame.',
    ],
  },

  // 39 — Nota final: escrita desde el ahora (ya de noviazgo), responde al
  // "Extrañame." con que terminaba el cuaderno. El pedido fue concedido
  // ("y viniste") y el cierre promete en vez de pedir. Se lee en plena noche.
  {
    kind: 'poem',
    lines: [
      'Te pedí que me extrañaras',
      'y viniste.',
      '',
      'Ahora no sé qué pedirte',
      'que no me hayas dado ya.',
      '',
      'Tres semanas.',
      'Sigo sin encontrar la palabra.',
      'Así que voy a seguir',
      'escribiendo.',
    ],
  },

  { kind: 'closing' },
];

/**
 * Progreso de la transición día → noche (0 = papel, 1 = noche cerrada).
 * Las cuatro partes de "Extrañame", la nota final y el cierre son las últimas
 * seis pantallas; se derivan desde el final de la lista, así el mapa resiste
 * reordenamientos del resto del cuaderno.
 */
export function nightProgressForIndex(index: number): number {
  const last = screens.length - 1;
  switch (index) {
    case last:
      return 1; // closing
    case last - 1:
      return 0.94; // nota final (ya en plena noche)
    case last - 2:
      return 0.8; // Extrañame p4
    case last - 3:
      return 0.6; // Extrañame p3
    case last - 4:
      return 0.38; // Extrañame p2
    case last - 5:
      return 0.18; // Extrañame p1
    default:
      return 0;
  }
}
