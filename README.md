# Misión Spider-Man 🕸️ — Quiz para invitar a mi enamorada

Una mini web de una sola sesión: 10 preguntas sobre Spider-Man con fotos de
recuerdo, y al acertarlas todas se desbloquea una invitación (con fecha
"secreta" que ella tiene que adivinar) para ir a ver la película juntos.

Hecho en **HTML + CSS + JavaScript puro** (sin frameworks ni build). Ver
[¿Por qué no Angular?](#por-qué-no-angular) más abajo.

## Estructura

```
spiderman-quiz/
├── index.html          ← estructura de las 5 pantallas
├── style.css           ← todo el diseño y las animaciones
├── script.js           ← CONFIG (edítalo tú) + lógica del quiz
├── leeOlvidaso.txt      ← notas/recordatorios rápidos del proyecto
├── README.md            ← este archivo
└── imgs/
    ├── favicon.png       ← ícono de la pestaña del navegador
    ├── meta.jpeg          ← imagen de vista previa al compartir el link (WhatsApp, etc.)
    ├── Portadafinal.png    ← imagen que se revela al acertar la fecha final
    └── q1.webp … q10.jpg    ← las 10 fotos de las preguntas (formato libre, ver abajo)
```

> ⚠️ Las fotos de las preguntas **no** tienen que ser todas `.jpg`. Cada
> pregunta apunta a un archivo específico en `CONFIG.questions` dentro de
> `script.js` (por ejemplo `q1.webp`, `q3.png`, `q5.jpg`...), así que respeta
> el nombre **y** la extensión que ya está puesta ahí, o cámbiala en ambos
> lados si usas otra.

## Cómo probarlo

1. Verifica que las 10 fotos existan en `imgs/` con el nombre y la extensión
   que pide cada pregunta en `script.js` (`q1.webp`, `q2.jpg`, `q3.png`, etc.).
2. Abre `index.html` haciendo doble clic — funciona sin servidor. Si prefieres
   recarga automática, en VS Code instala la extensión "Live Server" y dale
   clic derecho → **Open with Live Server**.

## Qué editar (todo está en `script.js`)

No hace falta tocar `index.html` ni `style.css` para personalizar el
contenido. Todo vive arriba de todo, dentro del objeto `CONFIG`:

| Campo | Qué hace |
|---|---|
| `girlfriendName` | Nombre que aparece en la bienvenida. |
| `defaultDate` | La fecha que ella debe **adivinar** en la pantalla final (no viene precargada). Formato `"AAAA-MM-DD"`, ej. `"2026-07-29"`. |
| `questions` | Arreglo de 10 preguntas. Cada una tiene `text` (enunciado), `image` (ruta en `imgs/`), `options` (5 alternativas) y `correct` (índice 0-4 de la respuesta correcta). |
| `correctPhrases` / `wrongPhrases` | Mensajes que aparecen al acertar o fallar una pregunta (se elige uno al azar). |
| `wrongDatePhrases` | Mensajes que aparecen si falla al adivinar la fecha final. |

El único sitio del HTML donde hay una referencia a esto es el selector de
fecha final, que también apunta a `CONFIG.defaultDate` — no necesitas
editarlo ahí, solo en `script.js`.

## Cómo funciona la lógica del quiz

- 10 preguntas, 5 opciones cada una, con foto de recuerdo por pregunta.
- Si aciertas: la pregunta queda "dominada" y no vuelve a aparecer.
- Si fallas: la pregunta queda pendiente para repasar (no se cuenta como
  acierto), pero puedes seguir con el resto sin que se reinicie el quiz.
- Al terminar la ronda se muestran los resultados: cuántas acertaste y
  cuántas fallaste, con conteo animado.
- Si quedó alguna fallada, aparece un botón para **repetir solo esas**. El
  ciclo se repite hasta que las aciertes todas.
- Al no quedar ninguna pendiente se desbloquea el botón final con el mensaje
  "PUDISTEEEEE, MOSHITOOOOO" y aparece el selector de fecha: si acierta la
  fecha en `CONFIG.defaultDate`, se rasga la telaraña y se revela
  `imgs/Portadafinal.png` con chispas doradas y el texto "Pues iremos
  hermosa". Si falla, puede seguir intentando sin límite.

## Vista previa al compartir el link (WhatsApp, Telegram, etc.)

El `<head>` de `index.html` ya trae las etiquetas `og:title`, `og:description`
y `og:image` apuntando a `imgs/meta.jpeg`. Mientras el proyecto esté solo en
tu computadora, esas apps **no podrán mostrar la imagen** porque no es
pública. Una vez publicado (ver siguiente sección), reemplaza `og:image` y
`og:url` en `index.html` por las URLs completas (`https://...`) reales de tu
imagen y tu página ya subidas.

## Publicarla para que ella la abra desde su celular

La forma más simple y gratuita:

1. Sube la carpeta a GitHub.
2. Actívale **GitHub Pages** (Settings → Pages → selecciona la rama).
3. Te da un link tipo `https://tu-usuario.github.io/spiderman-quiz/` que
   puedes enviarle por WhatsApp.

También puedes arrastrar la carpeta a [Netlify Drop](https://app.netlify.com/drop)
sin necesidad de cuenta de GitHub, y te da un link al instante.

## ¿Por qué no Angular?

Para una página de una sola sesión, pensada para abrir en el celular de tu
enamorada con un diseño muy cuidado (animaciones, transiciones, tipografía a
medida), **HTML + CSS + JS puro te da control total sobre el diseño con cero
configuración**: no necesitas Node, Angular CLI, build ni servidor — abres el
archivo y funciona. Angular está pensado para aplicaciones grandes con muchos
componentes y lógica de negocio; aquí sería instalar un framework entero para
5 pantallas. Si en algún momento quieres migrarlo a React o Angular (por
ejemplo para desplegarlo con rutas o reusar componentes), la lógica de
`script.js` se traduce casi 1 a 1 a un estado de componente.
