# Misión Spider-Man 🕸️ — Quiz para invitar a tu enamorada

Hecho en **HTML + CSS + JavaScript puro** (sin frameworks). Ver la sección
"¿Por qué no Angular?" abajo para el motivo.

## Estructura

```
spiderman-quiz/
├── index.html     ← estructura de las 5 pantallas
├── style.css      ← todo el diseño y animaciones
├── script.js      ← CONFIG (edítalo) + lógica del quiz
└── imgs/          ← pon aquí tus 10 fotos (q1.jpg ... q10.jpg)
```

## Cómo probarlo
1. Coloca tus fotos dentro de `imgs/` con los nombres que pide `imgs/LEEME.txt`.
2. Abre `index.html` haciendo doble clic (funciona sin servidor), o si prefieres,
   en VS Code instala la extensión "Live Server" y dale clic derecho → "Open with Live Server".

## Qué edita cada cosa

Todo lo que necesitas cambiar está en **`script.js`**, arriba del todo, dentro del objeto `CONFIG`:

- `girlfriendName` → el nombre que aparece en la bienvenida.
- `defaultDate` → **la fecha que ya viene marcada en el selector de fecha final**.
  Formato `"AAAA-MM-DD"`, por ejemplo `"2026-07-29"` (fecha de estreno).
- `questions` → arreglo de 10 preguntas. Cada una tiene:
  - `text`: la pregunta.
  - `image`: ruta de la foto (`imgs/q1.jpg`, etc.).
  - `options`: 5 opciones de respuesta.
  - `correct`: el índice (0 a 4) de cuál opción es la correcta.
- `correctPhrases` / `wrongPhrases`: los mensajes que aparecen al acertar o fallar
  (se elige uno al azar cada vez).

No hace falta tocar `index.html` ni `style.css` para personalizar el contenido — con
editar `script.js` alcanza. El único lugar del HTML donde hay una nota es el selector
de fecha final, que también apunta a `CONFIG.defaultDate`.

## Cómo funciona la lógica del quiz

- 10 preguntas, 5 opciones cada una.
- Si aciertas: se cuenta como correcta y no vuelve a aparecer.
- Si fallas: la pregunta se salta (no se cuenta como acierto) y queda pendiente.
- Al terminar las 10, se muestran los resultados: cuántas acertaste y cuántas fallaste.
- Si fallaste alguna, aparece un botón para **repetir solo esas**. Si las aciertas
  esta vez, pasas; si sigues fallando alguna, se repite el ciclo solo con esas.
- Cuando ya no queda ninguna pendiente, se desbloquea el botón final con el
  mensaje "PUDISTEEEEE, MOSHITOOOOO" y el selector de fecha para ver la película.

## ¿Por qué no Angular?

Para una página de una sola sesión, pensada para abrir en el celular de tu enamorada
con un diseño muy cuidado (animaciones, transiciones, tipografía a medida), **HTML +
CSS + JS puro te da más control sobre el diseño con cero configuración**: no necesitas
Node, ni Angular CLI, ni build, ni servidor — abres el archivo y funciona. Angular está
pensado para aplicaciones grandes con muchos componentes y lógica de negocio; aquí
sería instalar un framework entero para 5 pantallas. Si en algún momento quieres
llevarlo a React o Angular (por ejemplo para desplegarlo con rutas, o reusar
componentes), la lógica en `script.js` se traduce casi 1 a 1 a un estado de componente.

## Publicarla para que ella la abra desde su celular

La forma más simple y gratuita:
1. Sube la carpeta a GitHub.
2. Actívale **GitHub Pages** (Settings → Pages → selecciona la rama).
3. Te da un link tipo `https://tu-usuario.github.io/spiderman-quiz/` que puedes
   enviarle por WhatsApp.

También puedes arrastrar la carpeta a [Netlify Drop](https://app.netlify.com/drop)
sin necesidad de cuenta de GitHub, y te da un link al instante.
