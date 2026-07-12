/* ================================================================
   CONFIGURACIÓN — EDITA SOLO ESTA SECCIÓN
   ================================================================ */
const CONFIG = {

  // Nombre que aparece en la pantalla de bienvenida
  girlfriendName: "Moshito",

  // Fecha que ella tiene que ADIVINAR en la pantalla final (fecha del estreno).
  // Formato obligatorio: "AAAA-MM-DD"
  defaultDate: "2026-07-29",

  // --------------------------------------------------------------
  // PREGUNTAS (10). Cada pregunta necesita:
  //  - text: el enunciado
  //  - image: ruta de la foto (colócala dentro de la carpeta /imgs)
  //  - options: exactamente 5 opciones (texto)
  //  - correct: índice (0 a 4) de la opción correcta dentro de "options"
  // --------------------------------------------------------------
  questions: [
    {
      text: "¿En qué película aparece por primera vez el Spider-Man de Tom Holland?",
      image: "imgs/q1.webp",
      options: ["Spider-Man: Homecoming", "Captain America: Civil War", "Avengers: Infinity War", "Spider-Man: Far From Home", "The Amazing Spider-Man"],
      correct: 1
    },
    {
      text: "dale dale pechocha ¿Quién es el villano principal de Spider-Man: Homecoming?",
      image: "imgs/q2.jpg",
      options: ["Doctor Octopus", "Green Goblin", "El Buitre (Vulture)", "Mysterio", "Venom"],
      correct: 2
    },
    {
      text: "ahora este :D ¿A qué mentor pierde Peter al final de Avengers: Endgame?",
      image: "imgs/q3.png",
      options: ["Tony Stark", "Nick Fury", "Happy Hogan", "Tía May", "Ned Leeds"],
      correct: 0
    },
    {
      text: "sencillo amor tu puedes ¿Quién es el villano (o falso héroe) de Spider-Man: Far From Home?",
      image: "imgs/q4.png",
      options: ["Mysterio", "El Buitre", "Doctor Octopus", "Sandman", "Electro"],
      correct: 0
    },
    {
      text: ":D bonita ¿Qué hace Mysterio al final de Far From Home que le cambia la vida a Peter?",
      image: "imgs/q5.jpg",
      options: ["Le roba el traje", "Revela al mundo que Spider-Man es Peter Parker", "Se une a los Vengadores", "Destruye Nueva York", "Le quita los poderes"],
      correct: 1
    },
    {
      text: "¿A qué hechicero le pide ayuda Peter en Spider-Man: No Way Home?¿Meriln? tu que crees mi reina",
      image: "imgs/q6.png",
      options: ["Wong", "Doctor Strange", "Scarlet Witch", "Loki", "Merlin"],
      correct: 1
    },
    {
      text: "Uy ¿Qué sale mal con el hechizo y provoca que lleguen villanos de otros universos?",
      image: "imgs/q7.png",
      options: ["Un hechizo de invisibilidad", "Un hechizo para que todos olviden que Peter es Spider-Man", "Un hechizo de teletransportación", "Un hechizo del tiempo", "Un hechizo de curación"],
      correct: 1
    },
    {
      text: "¿Qué otros Spider-Man llegan a ayudar a Tom Holland en No Way Home? son <=1 hermosa, te ayudo :) ",
      image: "imgs/q8.jpg",
      options: ["Solo Tobey Maguire", "Solo Andrew Garfield", "Tobey Maguire y Andrew Garfield", "Miles Morales", "Spider-Gwen"],
      correct: 2
    },
    {
      text: "¿Qué sacrifica Peter al final de No Way Home para proteger a todos? que penaaaaaa",
      image: "imgs/q9.jpg",
      options: ["Sus poderes", "Que todo el mundo lo olvide, incluida MJ y Ned", "El traje de Iron Spider", "A Happy Hogan", "El departamento de la tía May"],
      correct: 1
    },
    {
      text: "¿Cómo se llama la nueva película que vamos a ir a ver juntos? adivine adivine",
      image: "imgs/q10.jpg",
      options: ["Spider-Man: Un Nuevo Día", "Spider-Man: No Way Home 2", "Spider-Man: Beyond", "Spider-Man: Homecoming 2", "Venom 3"],
      correct: 0
    }
  ],

  // Frases que se muestran al acertar (se elige una al azar)
  correctPhrases: [
    "¡Pudisteeeee, moshitooooo! 🕸️",
    "¡Correctooooo! My love hermosa🕷️",
    "¡Exacto mi vidaaaa! Sabía que eras inteligentisima hermosa 💛",
    "¡Sisisisisi! tu puedes mi vidaaaa daleee 🕸️"
  ],

  // Frases que se muestran al fallar
  wrongPhrases: [
    "Te equivocaste, hermosa, pero puedes seguir tranquila🕸️",
    "Mi vidaaa, esa no era... pero tranquila, tu puedes 🕷️",
    "Casito pechocha un poco mas a la izquierda :D",
    "Pechoca casi amor, piensa mi vida tu puedes hermosa 🕸️"
  ],

  // Frases que se muestran cuando falla la fecha final (puede seguir intentando)
  wrongDatePhrases: [
    "Esa no era mi vida, intenta de nuevo hermosa 🕸️",
    "Casi pechocha, prueba otra fecha :D",
    "Mmm esa no es amor, tu puedes hermosa 🕷️",
    "Nop mi reina, dale otra vez que tu sabes 🕸️"
  ]
};

/* ================================================================
   NO EDITAR DEBAJO DE ESTA LÍNEA (lógica de la aplicación)
   ================================================================ */

const state = {
  pending: new Set(CONFIG.questions.map((_, i) => i)),
  mastered: new Set(),
  queue: [],
  roundIndex: 0,
  streak: 0,
  transitioning: false
};

const el = (id) => document.getElementById(id);

/* ================================================================
   TRANSICIONES ENTRE PANTALLAS (swing lateral / disolución)
   ================================================================ */
function showScreen(id, exitEffect = 'swing') {
  const current = document.querySelector('.screen.active');
  const target = el(id);

  // Sin pantalla previa (primera carga) o transición ya en curso: entra directo
  if (!current || current === target || state.transitioning) {
    activateScreen(target);
    return;
  }

  state.transitioning = true;
  const currentCard = current.querySelector('.card');
  const exitClass = exitEffect === 'dissolve' ? 'exit-dissolve' : 'exit-swing';

  currentCard.classList.add(exitClass);
  currentCard.addEventListener('animationend', function onEnd() {
    currentCard.removeEventListener('animationend', onEnd);
    currentCard.classList.remove(exitClass);
    current.classList.remove('active');
    activateScreen(target);
    state.transitioning = false;
  }, { once: true });
}

function activateScreen(target) {
  target.classList.add('active');
  const card = target.querySelector('.card');
  card.classList.remove('entrance');
  void card.offsetWidth; // fuerza reflow
  card.classList.add('entrance');

  if (target.id === 'screen-final') {
    playWebBurst();
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/* ================================================================
   EFECTO "DISPARO DE TELARAÑA" AL PRESIONAR UN BOTÓN
   ================================================================ */
function webShotTransition(triggerEl, onDone) {
  const rect = triggerEl.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  const fx = document.createElement('div');
  fx.className = 'web-shot-fx';
  fx.style.left = `${originX}px`;
  fx.style.top = `${originY}px`;

  [-42, -22, -4].forEach(angle => {
    const line = document.createElement('span');
    line.className = 'web-shot-line';
    line.style.transform = `rotate(${angle}deg)`;
    fx.appendChild(line);
  });

  document.body.appendChild(fx);
  setTimeout(() => {
    fx.remove();
    onDone();
  }, 420);
}

/* ---------- Pantallas iniciales ---------- */
// Nota: si borraste el <span id="gf-name-1"> del HTML porque escribiste el
// mensaje de bienvenida directo, esto simplemente no hace nada (ya no truena).
const gfNameEl = el('gf-name-1');
if (gfNameEl) {
  gfNameEl.textContent = CONFIG.girlfriendName;
}

el('btn-start-1').addEventListener('click', (e) => {
  webShotTransition(e.currentTarget, () => showScreen('screen-message'));
});

el('btn-start-quiz').addEventListener('click', () => {
  startRound(shuffle(Array.from(state.pending)));
  showScreen('screen-question');
});

/* ---------- Motor de preguntas ---------- */
function startRound(idsQueue) {
  state.queue = idsQueue;
  state.roundIndex = 0;
  state.streak = 0;
  hideStreakBadge();
  renderQuestion();
}

function updateProgress(fractionDone) {
  const pct = `${fractionDone * 100}%`;
  el('progress-fill').style.width = pct;
  el('progress-spider').style.left = pct;
}

function renderQuestion() {
  const id = state.queue[state.roundIndex];
  const q = CONFIG.questions[id];

  el('q-counter').textContent = `Pregunta ${state.roundIndex + 1} / ${state.queue.length}`;
  updateProgress(state.roundIndex / state.queue.length);

  el('q-photo').src = q.image;
  el('q-photo').alt = `Recuerdo pregunta ${state.roundIndex + 1}`;
  el('q-text').textContent = q.text;

  const wrap = el('options-wrap');
  wrap.innerHTML = '';
  q.options.forEach((optText, idx) => {
    const b = document.createElement('button');
    b.className = 'option-btn';
    b.type = 'button';
    b.textContent = optText;
    b.addEventListener('click', () => handleAnswer(idx, id, b));
    wrap.appendChild(b);
  });

  el('feedback').hidden = true;
}

function handleAnswer(selectedIdx, questionId, buttonEl) {
  const q = CONFIG.questions[questionId];
  const buttons = el('options-wrap').querySelectorAll('.option-btn');
  buttons.forEach(b => b.disabled = true);

  const isCorrect = selectedIdx === q.correct;

  if (isCorrect) {
    buttonEl.classList.add('correct', 'correct-burst');
    state.mastered.add(questionId);
    state.pending.delete(questionId);

    state.streak += 1;
    if (state.streak >= 2) {
      showStreakBadge(state.streak);
    }
  } else {
    buttonEl.classList.add('wrong');
    buttons[q.correct].classList.add('correct');

    state.streak = 0;
    hideStreakBadge();
  }

  const feedback = el('feedback');
  const feedbackText = el('feedback-text');
  feedbackText.textContent = isCorrect ? pickRandom(CONFIG.correctPhrases) : pickRandom(CONFIG.wrongPhrases);
  feedbackText.className = 'feedback-text ' + (isCorrect ? 'is-correct' : 'is-wrong');
  feedback.hidden = false;

  updateProgress((state.roundIndex + 1) / state.queue.length);
}

function showStreakBadge(count) {
  const badge = el('streak-badge');
  el('streak-count').textContent = count;
  badge.hidden = false;
  badge.classList.remove('bounce');
  void badge.offsetWidth; // fuerza reflow para poder repetir el rebote
  badge.classList.add('bounce');
}

function hideStreakBadge() {
  const badge = el('streak-badge');
  badge.hidden = true;
  badge.classList.remove('bounce');
}

el('btn-next').addEventListener('click', () => {
  state.roundIndex++;
  if (state.roundIndex < state.queue.length) {
    renderQuestion();
  } else {
    finishRound();
  }
});

/* ================================================================
   RESULTADOS (contador animado + confetti si acierta todo)
   ================================================================ */
function animateCount(targetEl, endValue, duration = 800) {
  const startTime = performance.now();
  function tick(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
    targetEl.textContent = Math.round(endValue * eased);
    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      targetEl.textContent = endValue;
    }
  }
  requestAnimationFrame(tick);
}

function finishRound() {
  animateCount(el('score-correct'), state.mastered.size);
  animateCount(el('score-wrong'), state.pending.size);

  const msg = el('results-message');
  const retryBtn = el('btn-retry-wrong');
  const finalBtn = el('btn-final');
  const confetti = el('confetti-wrap');

  if (state.pending.size === 0) {
    msg.textContent = "¡Las acertaste todas amooooooooor, sabia que podias mi vidaaaaaaaaa! 🕸️💛";
    retryBtn.hidden = true;
    finalBtn.hidden = false;
    confetti.hidden = false;
  } else {
    msg.textContent = `Acertaste ${state.mastered.size} de ${CONFIG.questions.length}. Vamos a repasar solo las ${state.pending.size} que fallaste mi vida, tu puedes hermosa 🕷️`;
    retryBtn.hidden = false;
    finalBtn.hidden = true;
    confetti.hidden = true;
  }

  showScreen('screen-results');
}

el('btn-retry-wrong').addEventListener('click', () => {
  startRound(shuffle(Array.from(state.pending)));
  showScreen('screen-question');
});

el('btn-final').addEventListener('click', () => {
  // Transición especial "disolución" hacia la pantalla del regalo
  showScreen('screen-final', 'dissolve');
});

/* ================================================================
   ESTALLIDO DORADO DE LA PANTALLA FINAL (reutilizable)
   ================================================================ */
function playWebBurst() {
  const burst = document.querySelector('.final-card .web-burst');
  if (!burst) return;
  burst.classList.remove('burst-play');
  void burst.offsetWidth; // fuerza reflow para poder repetir la animación
  burst.classList.add('burst-play');
}

/* ================================================================
   PANTALLA FINAL: ADIVINA LA FECHA
   ================================================================ */
const dateInput = el('date-picker');
// No se precarga la fecha correcta: ella tiene que adivinarla.
dateInput.min = new Date().toISOString().split('T')[0];

el('btn-confirm-date').addEventListener('click', () => {
  const value = dateInput.value;
  if (!value) {
    return;
  }

  const confirmEl = el('date-confirm');

  if (value === CONFIG.defaultDate) {
    // ¡Acertó! Vibración cortita en celulares que lo soporten.
    if (navigator.vibrate) {
      navigator.vibrate([40, 60, 40]);
    }
    // Ocultamos el selector y mostramos la imagen sorpresa.
    confirmEl.hidden = true;
    revealFinalImage();
  } else {
    // No acertó, puede seguir intentando cuantas veces quiera.
    confirmEl.textContent = pickRandom(CONFIG.wrongDatePhrases);
    confirmEl.className = 'date-confirm is-wrong';
    confirmEl.hidden = false;
  }
});

function revealFinalImage() {
  el('date-picker-wrap').hidden = true;

  // 1) Rasga la telaraña para "abrir" la revelación
  const tear = el('web-tear');
  tear.hidden = false;
  void tear.offsetWidth; // fuerza reflow
  tear.classList.add('active');

  // 2) La imagen aparece por debajo, con su propia transición
  const reveal = el('reveal-wrap');
  reveal.hidden = false;
  void reveal.offsetWidth; // fuerza reflow
  requestAnimationFrame(() => reveal.classList.add('show'));

  // 3) Vuelve a disparar el estallido dorado justo en este momento
  playWebBurst();

  // 4) Retira los jirones de telaraña una vez cumplida la animación
  setTimeout(() => {
    tear.classList.remove('active');
    tear.hidden = true;
  }, 750);

  // 5) Chispas doradas cayendo suavemente sobre la imagen ya revelada
  setTimeout(() => {
    el('reveal-sparkles').hidden = false;
  }, 500);
}