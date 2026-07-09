# Para Violeta del Mar 🌸

Un cuaderno digital de poemas, navegable página por página como un libro.
Pensado para abrirse de noche en el teléfono: cálido, sencillo y sincero, como
una carta hecha a mano. Los poemas mandan; los efectos nunca compiten con ellos.

## ✨ La experiencia

- **Portada** con violetas y helechos dibujados en SVG y un monograma que se
  dibuja solo al entrar.
- **Contador** de días (con la hora real de Bogotá) desde el 20 de junio de 2025.
- **38 poemas** y **2 respiros literarios** (Bécquer y Amado Nervo), en orden.
- Transición **"pasar hoja"** con Framer Motion, respetando la dirección del gesto.
- Las últimas pantallas ("Extrañame") **oscurecen** el papel de día a noche.
- **Cierre** con el monograma respirando sobre azul noche.
- **Audio ambiental** opcional (pad casi imperceptible con Web Audio API).
- Respeta `prefers-reduced-motion` y está optimizado para móvil (Chrome Android).

## 🧭 Navegación

- **Avanzar**: swipe hacia arriba, tap en la mitad inferior, `↓` o `Espacio`.
- **Retroceder**: swipe hacia abajo, tap en la mitad superior, `↑`.

## 🚀 Tecnologías

- **React 19** + **TypeScript**
- **Vite 7** — build y dev server
- **Framer Motion** — transiciones
- CSS con variables (sin librería de UI pesada)
- **Web Audio API** — audio ambiental
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

## 📁 Estructura

```
src/
  data/poems.ts        → todos los poemas, como una lista tipada de pantallas
  components/          → Cover, Counter, Poem, Breath, Closing, NavArrow,
                         PageIndicator, AudioToggle, FloralArt (SVG)
  hooks/
    usePageNav.ts      → navegación (swipe / tap / teclado + dirección)
    useAmbientAudio.ts → pad ambiental con Web Audio API
  styles/              → global.css (tokens, reset) + components.css
  App.tsx              → escenario, transición y transición día → noche
```

Para reordenar o añadir un poema, basta con editar el array `screens` en
`src/data/poems.ts`.

---

Hecho con cariño en Bogotá.
