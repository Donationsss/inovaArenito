// js/quiz.js
const API = (p)=>`./backend/routes/${p}`;
const urlParams = new URLSearchParams(location.search);
const quizId = Number(urlParams.get('quiz_id')) || 0;

const TOTAL_Q = 12;
const TIME_PER_Q = 60;
const MAX_POINTS = 10;

let questions = [];
let qIndex = 0;
let score = 0;
let correctCount = 0;
let timerInt = null;
let timeLeft = TIME_PER_Q;

// Mock temporário de perguntas; depois integrar com IA
function mockQuestions(){
  // Substituir por chamada ao endpoint de IA: fetch('./backend/routes/ai_questions.php?category=...')
  const opts = ['A','B','C','D'];
  const arr = [];
  for(let i=0;i<TOTAL_Q;i++){
    const correct = Math.floor(Math.random()*4);
    arr.push({
      text: `Pergunta ${i+1}: Lorem ipsum dolor sit amet?`,
      answers: opts.map((o,idx)=>`${o}) Opção ${idx+1}`),
      correctIndex: correct
    });
  }
  return arr;
}

function renderQuestion(){
  const q = questions[qIndex];
  document.getElementById('q-text').textContent = q.text;
  const answers = document.getElementById('answers');
  answers.innerHTML = '';
  q.answers.forEach((txt, idx)=>{
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'answer';
    btn.textContent = txt;
    btn.dataset.idx = idx;
    btn.addEventListener('click', ()=> selectAnswer(idx));
    answers.appendChild(btn);
  });
  document.getElementById('q-index').textContent = (qIndex+1);
  document.getElementById('next-btn').disabled = true;
  startTimer();
}

function startTimer(){
  clearInterval(timerInt);
  timeLeft = TIME_PER_Q;
  updateCircle();
  document.getElementById('time-label').textContent = timeLeft;
  timerInt = setInterval(()=>{
    timeLeft--;
    updateCircle();
    document.getElementById('time-label').textContent = timeLeft;
    if(timeLeft <= 0){
      clearInterval(timerInt);
      lockAnswers(-1); // tempo esgotado
    }
  }, 1000);
}

// SVG circle length ~ 2*pi*r = 2*3.14*44 ~= 276
function updateCircle(){
  const len = 276;
  const fg = document.querySelector('.timer .fg');
  const pct = 1 - (timeLeft/TIME_PER_Q);
  fg.style.strokeDasharray = `${len}`;
  fg.style.strokeDashoffset = String(pct*len);
}

function selectAnswer(choice){
  clearInterval(timerInt);
  lockAnswers(choice);
}

function lockAnswers(choice){
  const q = questions[qIndex];
  const answers = document.querySelectorAll('.answer');
  answers.forEach((el, idx)=>{
    el.disabled = true;
    if(idx === q.correctIndex) el.classList.add('correct');
    if(choice >= 0 && idx === choice && idx !== q.correctIndex) el.classList.add('wrong');
  });

  // Pontuação: <=30s = 10; >30s e <=60s = 5; expirado ou erro = 0
  let gained = 0;
  const answered = choice >= 0;
  if(answered && choice === q.correctIndex){
    if(timeLeft > 30) gained = MAX_POINTS;
    else if(timeLeft > 0) gained = Math.floor(MAX_POINTS/2);
    correctCount++;
  } else {
    gained = 0;
  }
  score += gained;
  document.getElementById('score-live').textContent = `Score: ${score} ${gained>0?`(+${gained})`:''}`;
  document.getElementById('next-btn').disabled = false;
}

document.getElementById('next-btn').addEventListener('click', ()=>{
  if(qIndex < TOTAL_Q - 1){
    qIndex++;
    renderQuestion();
  } else {
    finishQuiz();
  }
});

function performanceMessage(pct){
  if(pct <= 50) return 'Ruim! 😢';
  if(pct <= 60) return 'Precisa melhorar! 😐';
  if(pct <= 70) return 'Bom! 😀';
  if(pct < 100) return 'Ótimo! 😁';
  return 'Excelente! 🤩';
}

async function finishQuiz(){
  // Exibir resultado
  const pct = Math.round((correctCount/TOTAL_Q)*100);
  const maxScore = TOTAL_Q*MAX_POINTS; // 120
  const resultHtml = `
    <div class="card" style="margin-top:16px;">
      <h3>Resultado</h3>
      <p>Acertos: ${correctCount}/${TOTAL_Q}</p>
      <p>Mensagem: ${performanceMessage(pct)}</p>
      <p>Pontuação: ${score} de ${maxScore} (${Math.round((score/maxScore)*100)}%)</p>
      <div style="display:flex; gap:12px; margin-top:8px;">
        <a class="btn btn-primary" href="./categoria.html">Explorar quizzes</a>
        <a class="btn btn-ghost" href="./index.html">Voltar à home</a>
      </div>
    </div>`;
  document.querySelector('.question-card').outerHTML = resultHtml;
  document.getElementById('next-btn').remove();

  // Submeter resultado e atualizar progresso
  try{
    await fetch(API('quiz_submit_result.php'), {
      method:'POST',
      credentials:'include',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        quiz_id: quizId || 1,
        score,
        correct: correctCount,
        total: TOTAL_Q,
        duration_seconds: TOTAL_Q*TIME_PER_Q - 0 // simplificado
      })
    });
    await fetch(API('progress_update.php'), {
      method:'POST',
      credentials:'include',
      headers:{ 'Content-Type':'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        points: score,
        correct: correctCount,
        total: TOTAL_Q
      })
    });
  }catch(e){}
}

(async function init(){
  // Carregar metadados do quiz
  try{
    const metaRes = await fetch(`./backend/routes/quizzes_get.php`);
    if(metaRes.ok){
      const { quizzes } = await metaRes.json();
      const found = quizzes.find(q=> q.id === quizId) || quizzes[0];
      if(found){
        document.getElementById('quiz-title').textContent = found.title;
        document.getElementById('quiz-meta').textContent = `${found.total_questions} questões • ${found.time_limit_seconds}s cada`;
      }
    }
  }catch(e){}
  questions = mockQuestions();
  renderQuestion();
})();
