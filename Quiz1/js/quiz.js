// js/quiz.js

const params = new URLSearchParams(location.search);
const quizId = parseInt(params.get("quiz_id") || "0", 10);

let questions = [];
let qIndex = 0;
let score = 0;
let correct = 0;
let timer = null;
let timeLeft = 60;

async function init() {
  try {
    // Metadados do quiz
    const meta = await fetch(
      "backend/routes/quizzes_get.php?quiz_id=" + quizId
    ).then((r) => r.json());
    const quiz =
      meta && meta.quizzes && meta.quizzes[0] ? meta.quizzes[0] : null;
    if (!quiz) {
      fail("Quiz não encontrado.");
      return;
    }
    setText("#quiz-title", quiz.title);
    setText(
      "#quiz-meta",
      `${quiz.total_questions} questões • ${quiz.time_limit_seconds}s`
    );

    // Perguntas via ChatGPT
    const data = await fetch(
      "backend/routes/chatgpt_questions.php?category=" +
        encodeURIComponent(quiz.category_slug)
    )
      .then((r) => r.json())
      .catch(() => ({ questions: [] }));

    questions = Array.isArray(data.questions) ? data.questions : [];
    if (questions.length < 1) {
      fail("Não foi possível carregar perguntas da IA. Tente novamente.");
      return;
    }
    // Ajuste de segurança: garantir que cada pergunta tenha answers e correctIndex válido
    questions = sanitizeQuestions(questions, quiz.total_questions || 12);

    renderQuestion();
  } catch (e) {
    console.error(e);
    fail("Erro ao iniciar o quiz.");
  }
}

function sanitizeQuestions(list, limit) {
  const sane = [];
  for (const q of list) {
    if (!q || typeof q.text !== "string" || !Array.isArray(q.answers)) continue;
    const answers = q.answers.slice(0, 4);
    while (answers.length < 4) answers.push("Opção");
    let ci = Number.isInteger(q.correctIndex) ? q.correctIndex : 0;
    if (ci < 0 || ci > 3) ci = 0;
    sane.push({ text: q.text, answers, correctIndex: ci });
    if (sane.length >= limit) break;
  }
  // Garante 12
  while (sane.length < limit) {
    sane.push({
      text: `Pergunta ${sane.length + 1}: Qual é a alternativa correta?`,
      answers: ["A) Opção", "B) Opção", "C) Opção", "D) Opção"],
      correctIndex: 0,
    });
  }
  return sane;
}

function renderQuestion() {
  const q = questions[qIndex];
  setText("#q-text", q.text);

  const box = qs("#answers");
  box.innerHTML = "";
  q.answers.forEach((txt, idx) => {
    const b = document.createElement("button");
    b.className = "answer";
    b.type = "button";
    b.textContent = txt;
    b.onclick = () => selectAnswer(idx);
    box.appendChild(b);
  });

  setText("#q-index", (qIndex + 1).toString());
  qid("next-btn").disabled = true;

  startTimer();
}

function startTimer() {
  clearInterval(timer);
  timeLeft = 60;
  updateCircle();
  setText("#time-label", timeLeft);
  timer = setInterval(() => {
    timeLeft--;
    updateCircle();
    setText("#time-label", timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timer);
      lockAnswers(-1); // tempo esgotado
    }
  }, 1000);
}

// Atualiza anel do timer (SVG)
function updateCircle() {
  const len = 276; // ~ 2*pi*44
  const pct = 1 - timeLeft / 60;
  const fg = document.querySelector(".quiz-timer .fg");
  if (fg) fg.style.strokeDashoffset = String(pct * len);
}

function selectAnswer(i) {
  clearInterval(timer);
  lockAnswers(i);
}

function lockAnswers(choice) {
  const q = questions[qIndex];
  const btns = [...document.querySelectorAll(".answer")];

  btns.forEach((b, idx) => {
    b.disabled = true;
    if (idx === q.correctIndex) b.classList.add("correct");
    if (choice >= 0 && idx === choice && idx !== q.correctIndex)
      b.classList.add("wrong");
  });

  let gained = 0;
  if (choice === q.correctIndex) {
    correct++;
    gained = timeLeft > 30 ? 10 : timeLeft > 0 ? 5 : 0;
    toastCorreto(gained);
  } else {
    gained = 0; // errado ou tempo zerado
  }
  score += gained;

  qid("next-btn").disabled = false;
}

function toastCorreto(points) {
  const host = qid("quizArea");
  const t = document.createElement("div");
  t.className = "lottie-right";
  t.innerHTML = `<span>Correto! +${points} pts</span>`;
  host.appendChild(t);
  setTimeout(() => t.remove(), 1100);
}

qid("next-btn").onclick = () => {
  if (qIndex < questions.length - 1) {
    qIndex++;
    renderQuestion();
  } else {
    finish();
  }
};

async function finish() {
  const total = questions.length;
  const max = total * 10;
  const pct = Math.round((correct / total) * 100);
  const msg = performanceMessage(pct);

  // Renderiza resultado
  qid("quizArea").innerHTML = `
    <div class="card" style="padding:18px;">
      <h3>Resultado</h3>
      <p>Acertos: ${correct}/${total}</p>
      <p>Pontuação: ${score} de ${max} (${Math.round((score / max) * 100)}%)</p>
      <p>${msg}</p>
      <div style="display:flex;gap:12px;margin-top:8px;">
        <a class="btn-cta" href="categoria.html">Explorar quizzes</a>
        <a class="btn" href="index.html">Voltar à home</a>
      </div>
    </div>`;

  // Persiste resultado e atualiza progresso
  try {
    await fetch("backend/routes/quiz_submit_result.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        quiz_id: quizId || 1,
        score,
        correct,
        total,
        duration_seconds: total * 60,
      }),
    });
    await fetch("backend/routes/progress_update.php", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        points: score,
        correct,
        total,
      }),
    });
  } catch (e) {
    console.warn("Falha ao registrar progresso/resultado", e);
  }
}

function performanceMessage(pct) {
  if (pct <= 50) return "Ruim! 😢";
  if (pct <= 60) return "Precisa melhorar! 😐";
  if (pct <= 70) return "Bom! 😀";
  if (pct < 100) return "Ótimo! 😁";
  return "Excelente! 🤩";
}

// Utilitários
function qid(id) {
  return document.getElementById(id);
}
function qs(sel) {
  return document.querySelector(sel);
}
function setText(selOrId, txt) {
  const el = selOrId.startsWith("#")
    ? document.querySelector(selOrId)
    : document.getElementById(selOrId);
  if (el) el.textContent = txt;
}

// Inicializa
init();
