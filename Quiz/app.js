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
  qs('#btn-next')?.addEventListener('click', nextQuestion);
  qs('#btn-skip')?.addEventListener('click', skipQuestion);
  qs('#btn-restart')?.addEventListener('click', () => {
    renderCategories();
    goto('screen-categories');
  });
  qs('#btn-go-home')?.addEventListener('click', () => goto('screen-home'));

  // Delegação de cliques
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

// Dados do Quiz por categoria
const CATEGORIES = [
  { id: 'general', name: 'Conhecimentos gerais' },
  { id: 'games', name: 'Jogos' },
  { id: 'series', name: 'Séries' },
  { id: 'movies', name: 'Filmes' },
  { id: 'science', name: 'Ciência' },
  { id: 'astronomy', name: 'Astronomia' }
];

// Banco de perguntas
const QUESTION_BANK = {
  general: [
    { q: 'Qual é a capital da França?', a: ['Paris','Lyon','Marselha','Nice'], c: 0 },
    { q: 'Quantos continentes existem na Terra?', a: ['5','6','7','4'], c: 2 },
    { q: 'Quem escreveu “Dom Quixote”?', a: ['Cervantes','Camões','Shakespeare','Dante'], c: 0 },
    { q: 'Qual é o maior oceano?', a: ['Atlântico','Índico','Ártico','Pacífico'], c: 3 },
    { q: 'Quantos graus tem um ângulo reto?', a: ['45','60','90','120'], c: 2 },
    { q: 'Que país sediou a Copa de 2014?', a: ['Brasil','Rússia','Alemanha','África do Sul'], c: 0 },
    { q: 'Símbolo químico do ouro:', a: ['Ag','Au','Gd','Go'], c: 1 },
    { q: 'Planeta conhecido como “planeta vermelho”:', a: ['Vênus','Marte','Júpiter','Mercúrio'], c: 1 },
    { q: 'Ano da queda do Muro de Berlim:', a: ['1987','1988','1989','1990'], c: 2 },
    { q: 'Idioma mais falado do mundo:', a: ['Inglês','Espanhol','Chinês mandarim','Hindi'], c: 2 },
  ],
  games: [
    { q: 'Franquia com Master Chief:', a: ['Doom','Halo','Gears','Crysis'], c: 1 },
    { q: 'Criador de Mario:', a: ['Miyamoto','Kojima','Igarashi','Sakurai'], c: 0 },
    { q: 'Companhia de “The Witcher 3”:', a: ['Bethesda','CD Projekt','Ubisoft','Bioware'], c: 1 },
    { q: 'Console lançado em 2006 pela Nintendo:', a: ['GameCube','Wii','Wii U','Switch'], c: 1 },
    { q: 'GTA da cidade “Vice City”:', a: ['GTA III','GTA VC','GTA SA','GTA IV'], c: 1 },
    { q: 'Jogo com Hyrule:', a: ['Dark Souls','Zelda','Skyrim','Dragon Age'], c: 1 },
    { q: 'Estúdio de “Overwatch”:', a: ['EA','Blizzard','Riot','Valve'], c: 1 },
    { q: 'Criadora do PlayStation:', a: ['Sony','Microsoft','Nintendo','Sega'], c: 0 },
    { q: 'Série “Souls” iniciou em:', a: ['Demon’s Souls','Dark Souls','Bloodborne','Sekiro'], c: 0 },
    { q: 'Engine Unity é sobretudo:', a: ['3D/2D','Som','Rede','Banco de dados'], c: 0 },
  ],
  series: [
    { q: 'Cidade de “Friends”:', a: ['Los Angeles','Nova York','Chicago','Miami'], c: 1 },
    { q: '“Heisenberg” pertence a:', a: ['Breaking Bad','Narcos','Dexter','The Wire'], c: 0 },
    { q: '“Winter is coming” é de:', a: ['Vikings','GOT','The Witcher','LOTR'], c: 1 },
    { q: '“The Office” versão original é de:', a: ['EUA','UK','Canadá','Austrália'], c: 1 },
    { q: '“Stranger Things” ocorre em:', a: ['Hawkins','Hill Valley','Springfield','Smallville'], c: 0 },
    { q: '“La Casa de Papel” país:', a: ['Espanha','México','Brasil','Argentina'], c: 0 },
    { q: '“Sherlock” estrela:', a: ['H. Cavill','B. Cumberbatch','D. Lewis','T. Hardy'], c: 1 },
    { q: '“Dark” é de:', a: ['Áustria','Suíça','Alemanha','Dinamarca'], c: 2 },
    { q: '“The Mandalorian” é do universo:', a: ['Star Wars','Star Trek','Dune','Halo'], c: 0 },
    { q: '“The Crown” foca na família:', a: ['Windsor','Bourbon','Romanov','Habsburgo'], c: 0 },
  ],
  movies: [
    { q: 'Diretor de “Inception”:', a: ['Nolan','Villeneuve','Fincher','Scott'], c: 0 },
    { q: 'Oscar “Parasite” ganhou Melhor Filme em:', a: ['2017','2018','2019','2020'], c: 3 },
    { q: '“The Godfather” é de:', a: ['Scorsese','Coppola','De Palma','Kubrick'], c: 1 },
    { q: '“Forrest Gump” protagonista:', a: ['Tom Hanks','Brad Pitt','DiCaprio','Cruise'], c: 0 },
    { q: '“Titanic” diretor:', a: ['Cameron','Zemeckis','Bay','Ridley'], c: 0 },
    { q: '“Interstellar” compositor:', a: ['Zimmer','Williams','Elfman','Shore'], c: 0 },
    { q: '“The Matrix” diretores:', a: ['Coen','Wachowski','Russo','Scott'], c: 1 },
    { q: '“Mad Max: Fury Road” diretor:', a: ['Miller','Mendes','Reeves','Villeneuve'], c: 0 },
    { q: '“Spirited Away” diretor:', a: ['Takahata','Hosoda','Shinkai','Miyazaki'], c: 3 },
    { q: '“Jaws” diretor:', a: ['Spielberg','Lucas','Coppola','Scott'], c: 0 },
  ],
  science: [
    { q: 'Unidade SI de força:', a: ['Newton','Joule','Pascal','Watt'], c: 0 },
    { q: 'Base do DNA:', a: ['Adenina','Insulina','Queratina','Colina'], c: 0 },
    { q: 'Velocidade da luz aprox.:', a: ['3e6 m/s','3e8 m/s','3e10 m/s','3e12 m/s'], c: 1 },
    { q: 'Elemento mais abundante no universo visível:', a: ['Hélio','Hidrogênio','Oxigênio','Carbono'], c: 1 },
    { q: 'Planck está associado a:', a: ['Relatividade','Quântica','Termodinâmica','Eletromagnetismo'], c: 1 },
    { q: 'pH neutro a 25°C:', a: ['5','6','7','8'], c: 2 },
    { q: 'SI de energia:', a: ['Joule','Watt','Newton','Kelvin'], c: 0 },
    { q: 'Organela de ATP:', a: ['Núcleo','Ribossomo','Mitocôndria','Lisossomo'], c: 2 },
    { q: 'Ligação mais forte típica:', a: ['Covalente','Iônica','Hidrogênio','Van der Waals'], c: 0 },
    { q: 'Número de estados da matéria clássicos:', a: ['3','4','5','2'], c: 1 },
  ],
  astronomy: [
    { q: 'Estrela mais próxima da Terra:', a: ['Sirius','Sol','Proxima Centauri','Betelgeuse'], c: 1 },
    { q: 'Satélites naturais da Terra:', a: ['1','2','3','4'], c: 0 },
    { q: 'Planeta com anéis mais visíveis:', a: ['Júpiter','Saturno','Urano','Netuno'], c: 1 },
    { q: 'Galáxia da Via Láctea é uma:', a: ['Espiral','Elíptica','Irregular','Anã'], c: 0 },
    { q: 'Lua “Titã” orbita:', a: ['Júpiter','Saturno','Urano','Netuno'], c: 1 },
    { q: 'Cometa famoso de 76 anos:', a: ['Halley','Encke','Hale-Bopp','Shoemaker-Levy'], c: 0 },
    { q: 'Objeto além de Netuno:', a: ['Cinturão de Kuiper','Cinturão de Asteroides','Nuvem de Oort','Cinturão de Van Allen'], c: 0 },
    { q: 'Planeta-anão reclassificado em 2006:', a: ['Ceres','Eris','Plutão','Haumea'], c: 2 },
    { q: 'Telescópio espacial de 2021:', a: ['Hubble','Spitzer','Chandra','James Webb'], c: 3 },
    { q: 'Marte tem quantas luas?', a: ['1','2','3','4'], c: 1 },
  ],
};

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
// Overlay refs
const overlay = () => qs('#overlay-correct');
const overlayPoints = () => qs('#overlay-points');

// Navegação
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

// Aleatorização
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

/* Pontuação por tempo: >= 30s => 10; < 30s => 5 */
function pointsByTime(){
  return state.timer.left >= 30 ? 10 : 5;
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
      <span class="count">${QUESTION_BANK[cat.id].length} perguntas</span>
    `;
    btn.addEventListener('click', () => startQuiz(cat.id));
    wrap.appendChild(btn);
  });
}

/* Início do quiz */
function startQuiz(categoryId){
  clearInterval(state.timer.interval);
  state.currentCategory = categoryId;
  state.questions = shuffle([...QUESTION_BANK[categoryId]]);
  state.index = 0;
  state.score = 0;
  state.correctCount = 0;
  qs('#score').textContent = '0';
  qs('#quiz-category-label').textContent = CATEGORIES.find(c=>c.id===categoryId).name;
  qs('#progress-total').textContent = state.questions.length;
  goto('screen-quiz');
  loadQuestion();
}

/* Carrega questão */
function loadQuestion(){
  state.answered = false;
  resetTimer();
  startTimer();

  const q = state.questions[state.index];
  qs('#progress-current').textContent = String(state.index+1);
  qs('#question-text').textContent = q.q;

  const answersEl = qs('.answers');
  answersEl.innerHTML = '';
  q.a.forEach((text, i) => {
    const li = document.createElement('li');
    li.className = 'answer';
    li.setAttribute('role','option');
    li.setAttribute('tabindex','0');
    li.setAttribute('aria-selected','false');
    li.textContent = text;

    const choose = () => handleAnswer(i);
    li.addEventListener('click', choose);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); choose(); }
    });

    answersEl.appendChild(li);
  });

  qs('#feedback').textContent = '';
  qs('#btn-next').disabled = true;
}

/* Tempo esgotado */
function timeUp(){
  if (state.answered) return;
  state.answered = true;
  const q = state.questions[state.index];
  const items = qsa('.answer', qs('.answers'));
  items.forEach((el, idx) => {
    el.style.pointerEvents = 'none';
    if (idx === q.c) el.classList.add('correct');
  });
  qs('#feedback').textContent = `Tempo esgotado. Resposta: "${q.a[q.c]}".`;
  qs('#btn-next').disabled = false;
}

/* Overlay de acerto por 2s */
function showCorrectOverlay(points){
  const el = overlay();
  if (!el) return;
  overlayPoints().textContent = `+${points} pontos`;
  el.classList.add('active');
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
    el.setAttribute('aria-selected', String(idx===i));
    el.classList.remove('correct','wrong');
    if (idx === q.c) el.classList.add('correct');
    if (idx === i && idx !== q.c) el.classList.add('wrong');
    el.style.pointerEvents = 'none';
  });

  const feedback = qs('#feedback');
  if (i === q.c) {
    state.correctCount += 1;
    const gained = pointsByTime();
    state.score += gained;
    qs('#score').textContent = String(state.score);
    feedback.textContent = 'Correto! 🎉';
    showCorrectOverlay(gained);
  } else {
    feedback.textContent = `Incorreto. Resposta certa: "${q.a[q.c]}".`;
  }

  qs('#btn-next').disabled = false;
}

/* Próxima ou resultado */
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
    if (idx === q.c) el.classList.add('correct');
  });
  qs('#feedback').textContent = `Pulada. Resposta: "${q.a[q.c]}".`;
  qs('#btn-next').disabled = false;
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

  const categoryName = CATEGORIES.find(c=>c.id===state.currentCategory)?.name || 'Categoria';
  saveHistory({ category: categoryName, correct, total, message: msg, score: state.score });

  goto('screen-result');
  renderHistory();
}
