// Filtros de categoria e toast
const chips = document.querySelectorAll(".chip");
chips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chips.forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    showToast("Filtrando por: " + chip.textContent.trim());
    // TODO: aplicar filtro real por categoria
  });
});

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.style.display = "block";
  t.classList.remove("animate__fadeOutDown");
  t.classList.add("animate__fadeInUp");
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(() => {
    t.classList.remove("animate__fadeInUp");
    t.classList.add("animate__fadeOutDown");
    setTimeout(() => {
      t.style.display = "none";
    }, 500);
  }, 1800);
}

// Animação: reforçar entrada dos cards quando carregados
document.addEventListener("DOMContentLoaded", () => {
  // Abas Diário/Semanal
  document.addEventListener("click", (e) => {
    if (e.target.matches(".tab")) {
      document.querySelectorAll(".tab").forEach((t) => {
        t.classList.toggle("active", t === e.target);
        t.setAttribute("aria-selected", t === e.target ? "true" : "false");
      });
      const isDaily = e.target.dataset.tab === "daily";
      const pd = document.getElementById("panel-daily");
      const pw = document.getElementById("panel-weekly");
      if (pd && pw) {
        pd.hidden = !isDaily;
        pw.hidden = isDaily;
      }
    }
  });

  // Carrega progresso (se autenticado)
  fetch("backend/routes/progress_get.php", { credentials: "include" })
    .then((r) => {
      if (!r.ok) return;
      return r.json();
    })
    .then((d) => {
      if (!d) return;
      const { daily, weekly } = d;
      const db = document.getElementById("daily-bar");
      if (db) db.style.width = Math.min(100, daily.points || 0) + "%";
      const wb = document.getElementById("weekly-bar");
      if (wb) wb.style.width = Math.min(100, (weekly.points || 0) / 5) + "%";
      const dq = document.getElementById("daily-quizzes");
      if (dq) dq.textContent = "Quizzes: " + (daily.quizzes_played || 0);
      const da = document.getElementById("daily-accuracy");
      if (da)
        da.textContent = "Acertos: " + (daily.accuracy_percent || 0) + "%";
      const dp = document.getElementById("daily-points");
      if (dp) dp.textContent = "Pontos: " + (daily.points || 0);
      const wq = document.getElementById("weekly-quizzes");
      if (wq) wq.textContent = "Quizzes: " + (weekly.quizzes_played || 0);
      const wa = document.getElementById("weekly-accuracy");
      if (wa)
        wa.textContent = "Acertos: " + (weekly.accuracy_percent || 0) + "%";
      const wp = document.getElementById("weekly-points");
      if (wp) wp.textContent = "Pontos: " + (weekly.points || 0);
    });

  // 3 mais jogados
  const grid = document.getElementById("quiz-grid");
  if (grid) {
    fetch("backend/routes/quizzes_get.php?featured=1")
      .then((r) => r.json())
      .then(({ quizzes }) => {
        grid.innerHTML = quizzes
          .slice(0, 3)
          .map(
            (q) => `
        <article class="card">
          <div class="quiz-thumb" style="aspect-ratio:16/9;background:linear-gradient(135deg,#0d1422,#1a2b4f)"></div>
          <div class="quiz-body" style="padding:16px;">
            <h3>${q.title}</h3>
            <div class="quiz-meta" style="display:flex;gap:10px;color:#8d9ab3">
              <span>${q.total_questions} questões</span>
              <span>${q.difficulty}</span>
              <span>⭐ ${q.avg_rating}</span>
            </div>
            <div class="quiz-actions" style="display:flex;gap:12px;margin-top:12px;">
              <a class="btn-cta" href="quiz.html?quiz_id=${q.id}">Jogar</a>
            </div>
          </div>
        </article>`
          )
          .join("");
      });
  }
});
