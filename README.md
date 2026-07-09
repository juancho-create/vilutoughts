# Para Violeta del Mar 🌸

Un cuaderno digital de poemas, navegable página por página como un libro.
Pensado para abrirse de noche en el teléfono: cálido, sencillo y sincero, como
una carta hecha a mano. Los poemas mandan; los efectos nunca compiten con ellos.

## ✨ La experiencia

- **Portada** con violetas y helechos dibujados en SVG y un monograma que se
  dibuja solo al entrar.
- **39 poemas** y **2 respiros literarios** (Bécquer y Amado Nervo), en orden.
- Transición **"pasar hoja"** con Framer Motion, respetando la dirección del gesto.
- Las últimas pantallas ("Extrañame") **oscurecen** el papel de día a noche.
- **Cierre** con el monograma respirando sobre azul noche.
- **Música ambiental** opcional (Ólafur Arnalds): "Particles" acompaña la
  lectura y se funde en "Epilogue" a medida que el papel oscurece, en la misma
  curva que la transición visual.
- Respeta `prefers-reduced-motion` y está optimizado para móvil (Chrome Android).

## 🧭 Navegación

- **Avanzar**: swipe hacia arriba, tap en la mitad inferior, `↓` o `Espacio`.
- **Retroceder**: swipe hacia abajo, tap en la mitad superior, `↑`.

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite 7** — build y dev server
- **Framer Motion** — transiciones
- CSS con variables (sin librería de UI pesada)
- **Web Audio API** — crossfade entre las dos pistas de música ambiental
- Fuentes: **Cormorant Garamond** (títulos, italic) + **EB Garamond** (cuerpo)

## 🛠️ Correr en local

```bash
npm install      # instala dependencias
npm run dev      # servidor de desarrollo → http://localhost:3000
npm run build    # build de producción (tsc + vite) → dist/
npm run preview  # previsualiza el build
```

## 🌐 Desplegar en Vercel

El proyecto está listo para Vercel (ver `vercel.json`):

- **Framework preset**: Vite (o "Other").
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Install command**: `npm install --legacy-peer-deps`

Con la CLI:

```bash
npm i -g vercel
vercel        # despliegue de preview
vercel --prod # despliegue de producción
```

Luego se comparte el link resultante. Los metadatos Open Graph hacen que se vea
bien al compartir por WhatsApp.

### 📊 Analíticas (quién entra, desde qué dispositivo, cuánto tiempo)

El proyecto incluye **Vercel Web Analytics** (`@vercel/analytics`). Tras el
primer deploy con este cambio:

1. En el dashboard de Vercel, abrí el proyecto → pestaña **Analytics** → click
   en **Enable** (una sola vez; el plan Hobby incluye una cuota mensual de
   eventos gratis).
2. Ahí vas a ver **visitantes, páginas vistas, país, sistema operativo,
   navegador y tipo de dispositivo** (móvil / escritorio / tablet) de forma
   nativa, sin nada más que configurar.
3. **Cuánto tiempo** no es un dato que Vercel muestre de fábrica, así que se
   agregó un evento personalizado: al salir de la página se envía
   `time_on_book` con la duración agrupada en rangos (0–30s, 30–60s, 1–3 min,
   3–5 min, 5–10 min, 10+ min). También se envía `reached_closing` la primera
   vez que se llega a la última pantalla, para saber si la lectura se
   completó. Ambos se ven en Analytics → **Events**.

## 📁 Estructura

```
src/
  data/poems.ts        → todos los poemas, como una lista tipada de pantallas
  components/          → Cover, Poem, Breath, Closing, NavArrow,
                         PageIndicator, AudioToggle, FloralArt (SVG)
  hooks/
    usePageNav.ts        → navegación (swipe / tap / teclado + dirección)
    useAmbientAudio.ts   → crossfade Particles ↔ Epilogue con Web Audio API
    useVisitTracking.ts  → evento de duración y de lectura completa (Analytics)
  styles/              → global.css (tokens, reset) + components.css
  App.tsx              → escenario, transición y transición día → noche
public/
  audio/               → particles.mp3, epilogue.mp3 (Ólafur Arnalds)
```

Para reordenar o añadir un poema, basta con editar el array `screens` en
`src/data/poems.ts`.

---

Hecho con cariño en Bogotá.
