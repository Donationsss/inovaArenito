// Inicializa AOS e UI
document.addEventListener('DOMContentLoaded', () => {
  if (window.AOS) AOS.init({ duration: 650, easing: 'ease-out-cubic', once: true });
  renderHistory();
  updateTimerUI();

  // Ligações de UI
  qs('#btn-start')?.addEventListener('click', () => {
    renderCategories();
    goto('screen-categories');
  });
  qs('#btn-skip')?.addEventListener('click', skipQuestion);
  qs('#btn-restart')?.addEventListener('click', () => {
    renderCategories();
    goto('screen-categories');
  });
  qs('#btn-go-home')?.addEventListener('click', () => goto('screen-home'));

  document.addEventListener('click', (e) => {
    const go = e.target.closest('[data-goto]');
    if (go) goto(go.getAttribute('data-goto'));
    const heroCat = e.target.closest('.hero-cat');
    if (heroCat) startQuiz(heroCat.getAttribute('data-id'));
    if (e.target && e.target.id === 'btn-clear-history'){
      localStorage.removeItem(state.historyKey);
      renderHistory();
    }
  });
});

// Sombra dinâmica na navbar ao rolar
const topbar = document.querySelector('.topbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) topbar.classList.add('scrolled');
  else topbar.classList.remove('scrolled');
});

// Categorias
const CATEGORIES = [
  { id: 'general', name: 'Conhecimentos gerais' },
  { id: 'games', name: 'Jogos' },
  { id: 'series', name: 'Séries' },
  { id: 'movies', name: 'Filmes' },
  { id: 'science', name: 'Ciência' },
  { id: 'astronomy', name: 'Astronomia' }
];

// Estado
const state = {
  currentCategory: null,
  questions: [],
  index: 0,
  score: 0,
  answered: false,
  timer: {
    total: 60,
    left: 60,
    interval: null,
    circumference: 2 * Math.PI * 54
  },
  historyKey: 'quiz_history_v1',
  correctCount: 0
};

// Utils
const qs = (s, el=document) => el.querySelector(s);
const qsa = (s, el=document) => [...el.querySelectorAll(s)];

// Timer refs
const timerWrap = () => qs('.timer');
const timerText = () => qs('#timer-text');
const timerProgress = () => qs('.timer-progress');
// Overlays refs
const overlayCorrect = () => qs('#overlay-correct');
const overlayPoints = () => qs('#overlay-points');
const overlayWrong = () => qs('#overlay-wrong');
const overlayWrongBurst = () => qs('.overlay-wrong-burst');

/* Navegação */
function goto(screenId){
  qsa('.screen').forEach(s => s.classList.remove('active'));
  const target = qs('#'+screenId);
  target.classList.add('active');
  const firstCard = target.querySelector('.card');
  if (firstCard){
    firstCard.classList.remove('drop-in');
    void firstCard.offsetWidth;
    firstCard.classList.add('drop-in');
  }
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/* Aleatória */
function shuffle(arr){
  for(let i=arr.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [arr[i],arr[j]]=[arr[j],arr[i]];
  }
  return arr;
}

/* Histórico */
function loadHistory(){
  try{
    const raw = localStorage.getItem(state.historyKey);
    return raw ? JSON.parse(raw) : [];
  }catch{ return []; }
}
function saveHistory(item){
  const list = loadHistory();
  list.unshift(item);
  localStorage.setItem(state.historyKey, JSON.stringify(list.slice(0,10)));
}
function renderHistory(){
  const list = loadHistory();
  const card = qs('#history-card');
  const ul = qs('#history-list');
  const layout = qs('.home-layout');
  if (!ul || !card || !layout) return;
  if (list.length === 0){
    card.hidden = true;
    layout.classList.remove('with-history');
    ul.innerHTML = '';
    return;
  }
  card.hidden = false;
  layout.classList.add('with-history');
  ul.innerHTML = '';
  list.forEach(it => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.innerHTML = `
      <div class="history-left">
        <span class="history-cat">${it.category}</span>
        <span class="history-meta">${it.correct}/${it.total} • ${it.message}</span>
      </div>
      <div class="history-right">${it.score} pts</div>
    `;
    ul.appendChild(li);
  });
}

/* Timer */
function resetTimer(){
  clearInterval(state.timer.interval);
  state.timer.total = 60;
  state.timer.left = 60;
  updateTimerUI();
}
function startTimer(){
  clearInterval(state.timer.interval);
  state.timer.left = state.timer.total;
  updateTimerUI();
  state.timer.interval = setInterval(() => {
    state.timer.left = Math.max(0, state.timer.left - 1);
    updateTimerUI();
    if (state.timer.left <= 0){
      clearInterval(state.timer.interval);
      timeUp();
    }
  }, 1000);
}
function updateTimerUI(){
  const wrap = timerWrap();
  const txt = timerText();
  const prog = timerProgress();
  if (!wrap || !txt || !prog) return;
  txt.textContent = String(state.timer.left);
  const pct = state.timer.left / state.timer.total;
  const offset = state.timer.circumference * (1 - pct);
  prog.style.strokeDasharray = `${state.timer.circumference}`;
  prog.style.strokeDashoffset = `${offset}`;
  wrap.classList.remove('warn','danger');
  if (pct <= 0.33) wrap.classList.add('danger');
  else if (pct <= 0.66) wrap.classList.add('warn');
}

/* Pontuação por tempo */
function pointsByTime(){
  return state.timer.left >= 30 ? 10 : 5;
}

/* Busca perguntas via OpenRouter */
async function fetchQuestionsFromOpenRouter(category){
  const res = await fetch('api-openrouter-quiz.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ category, qty: 10 })
  });
  const data = await res.json();
  if (!data.questions || !Array.isArray(data.questions)) {
    return [
      { question: 'Erro ao gerar perguntas.', options: ['Tente novamente'], correct: 0 }
    ];
  }
  return data.questions;
}

/* Categorias dinâmicas */
function renderCategories(){
  const wrap = qs('.grid--categories');
  if (!wrap) return;
  wrap.innerHTML = '';
  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'category';
    btn.setAttribute('data-id', cat.id);
    btn.setAttribute('aria-label', `Selecionar categoria ${cat.name}`);
    btn.innerHTML = `
      <span class="name">${cat.name}</span>
      <span class="count">?</span>
    `;
    btn.addEventListener('click', () => startQuiz(cat.id));
    wrap.appendChild(btn);
  });
}

/* Início do quiz */
async function startQuiz(categoryId){
  clearInterval(state.timer.interval);
  state.currentCategory = categoryId;
  state.score = 0;
  state.index = 0;
  state.correctCount = 0;
  qs('#score').textContent = '0';
  qs('#quiz-category-label').textContent = CATEGORIES.find(c => c.id === categoryId)?.name || categoryId;
  qs('#progress-total').textContent = '10';

  try {
    state.questions = await fetchQuestionsFromOpenRouter(categoryId);
  } catch {
    state.questions = [{ question: 'Erro ao gerar perguntas.', options: ['Tente novamente'], correct: 0 }];
  }

  goto('screen-quiz');
  loadQuestion();
}

/* Carrega questão */
function loadQuestion(){
  state.answered = false;
  resetTimer();
  startTimer();

  const q = state.questions[state.index];
  if (!q || !q.question || !q.options) {
    qs('#question-text').textContent = 'Erro ao carregar a pergunta.';
    qs('.answers').innerHTML = '';
    return;
  }

  qs('#progress-current').textContent = String(state.index + 1);
  qs('#question-text').textContent = q.question;

  const answersEl = qs('.answers');
  answersEl.innerHTML = '';
  q.options.forEach((text, i) => {
    const li = document.createElement('li');
    li.className = 'answer';
    li.setAttribute('role', 'option');
    li.setAttribute('tabindex', '0');
    li.setAttribute('aria-selected', 'false');
    li.textContent = text;

    const choose = () => handleAnswer(i);
    li.addEventListener('click', choose);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        choose();
      }
    });

    answersEl.appendChild(li);
  });

  qs('#feedback').textContent = '';
  // Removido o botão Próxima - controle automático após overlay
}

/* Tempo esgotado */
function timeUp(){
  if (state.answered) return;
  state.answered = true;
  const q = state.questions[state.index];
  const items = qsa('.answer', qs('.answers'));
  items.forEach((el, idx) => {
    el.style.pointerEvents = 'none';
    if (idx === q.correct) el.classList.add('correct');
  });
  qs('#feedback').textContent = `Tempo esgotado. Resposta: "${q.options[q.correct]}".`;
  // Auto avança após 2s para a próxima pergunta
  setTimeout(nextQuestion, 2000);
}

/* Overlay correto */
function showCorrectOverlay(points){
  const el = overlayCorrect();
  if (!el) return;
  overlayPoints().textContent = `+${points} pontos`;
  el.classList.add('active');
  // Auto avança após 2s
  setTimeout(() => {
    el.classList.remove('active');
    nextQuestion();
  }, 2000);
}

/* Overlay errado */
function showWrongOverlay(){
  const el = overlayWrong();
  if (!el) return;
  el.classList.add('active');
  // Auto avança após 2s
  setTimeout(() => el.classList.remove('active'), 2000);
}

/* Resposta */
function handleAnswer(i){
  if (state.answered) return;
  state.answered = true;
  clearInterval(state.timer.interval);

  const q = state.questions[state.index];
  const items = qsa('.answer', qs('.answers'));

  items.forEach((el, idx) => {
    el.setAttribute('aria-selected', String(idx === i));
    el.classList.remove('correct', 'wrong');
    if (idx === q.correct) el.classList.add('correct');
    if (idx === i && idx !== q.correct) el.classList.add('wrong');
    el.style.pointerEvents = 'none';
  });

  const feedback = qs('#feedback');
  if (i === q.correct) {
    state.correctCount += 1;
    const gained = pointsByTime();
    state.score += gained;
    qs('#score').textContent = String(state.score);
    feedback.textContent = 'Correto! 🎉';
    showCorrectOverlay(gained);
  } else {
    feedback.textContent = `Errado! Resposta certa: "${q.options[q.correct]}".`;
    showWrongOverlay();
    setTimeout(nextQuestion, 2000);
  }
}

/* Próxima pergunta ou resultado */
function nextQuestion(){
  if (state.index < state.questions.length - 1){
    state.index++;
    loadQuestion();
  } else {
    showResult();
  }
}

function skipQuestion(){
  if (state.answered) { nextQuestion(); return; }
  state.answered = true;
  clearInterval(state.timer.interval);
  const q = state.questions[state.index];
  const items = qsa('.answer', qs('.answers'));
  items.forEach((el, idx) => {
    el.style.pointerEvents = 'none';
    if (idx === q.correct) el.classList.add('correct');
  });
  qs('#feedback').textContent = `Pulada. Resposta: "${q.options[q.correct]}".`;
  // Auto avança após 2s
  setTimeout(nextQuestion, 2000);
}

/* Mensagem final */
function getResultMessage(ratio){
  return ratio === 1 ? 'Perfeito! Incrível!' :
         ratio >= .8 ? 'Excelente desempenho!' :
         ratio >= .6 ? 'Bom resultado! Continue praticando.' :
         ratio >= .4 ? 'Você está no caminho. Tente novamente!' :
                       'Que tal mais uma rodada? Você consegue!';
}

/* Resultado final + histórico */
function showResult(){
  clearInterval(state.timer.interval);
  const total = state.questions.length;
  const correct = state.correctCount;
  const ratio = total ? (correct / total) : 0;

  qs('#final-score').textContent = String(state.score);
  const msg = getResultMessage(ratio);
  qs('#result-message').textContent = msg;

  const categoryName = CATEGORIES.find(c => c.id === state.currentCategory)?.name || 'Categoria';
  saveHistory({ category: categoryName, correct, total, message: msg, score: state.score });

  goto('screen-result');
  renderHistory();
}
