// Filtros de categoria e toast
const chips = document.querySelectorAll('.chip');
chips.forEach(chip=>{
  chip.addEventListener('click', ()=>{
    chips.forEach(c=>c.classList.remove('active'));
    chip.classList.add('active');
    showToast('Filtrando por: ' + chip.textContent.trim());
    // TODO: aplicar filtro real por categoria
  });
});

function showToast(msg){
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.style.display = 'block';
  t.classList.remove('animate__fadeOutDown');
  t.classList.add('animate__fadeInUp');
  clearTimeout(window.__toastTimer);
  window.__toastTimer = setTimeout(()=>{
    t.classList.remove('animate__fadeInUp');
    t.classList.add('animate__fadeOutDown');
    setTimeout(()=>{ t.style.display='none'; }, 500);
  }, 1800);
}

// Animação: reforçar entrada dos cards quando carregados
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.quiz-card').forEach((el, i)=>{
    el.style.setProperty('--animate-duration', '600ms');
    el.classList.add('animate__animated','animate__fadeInUp');
    el.style.animationDelay = (i * 60)+'ms';
  });
});

// Em js/app.js após DOMContentLoaded
async function loadProgress(){
  try{
    const res = await fetch('./backend/routes/progress_get.php', { credentials:'include' });
    if(!res.ok) return;
    const { daily, weekly } = await res.json();
    // Diário
    document.getElementById('daily-quizzes').textContent = `Quizzes: ${daily.quizzes_played||0}`;
    document.getElementById('daily-accuracy').textContent = `Acertos: ${(daily.accuracy_percent||0)}%`;
    document.getElementById('daily-points').textContent = `Pontos: ${daily.points||0}`;
    document.getElementById('daily-bar').style.width = Math.min(100, (daily.points||0)) + '%';
    // Semanal
    document.getElementById('weekly-quizzes').textContent = `Quizzes: ${weekly.quizzes_played||0}`;
    document.getElementById('weekly-accuracy').textContent = `Acertos: ${(weekly.accuracy_percent||0)}%`;
    document.getElementById('weekly-points').textContent = `Pontos: ${weekly.points||0}`;
    document.getElementById('weekly-bar').style.width = Math.min(100, (weekly.points||0)/5) + '%';
  }catch(e){}
}
document.addEventListener('DOMContentLoaded', loadProgress);

// Alternância tabs
document.addEventListener('click', (e)=>{
  if(e.target.matches('.tab')){
    document.querySelectorAll('.tab').forEach(t=>{
      t.classList.toggle('active', t===e.target);
      t.setAttribute('aria-selected', t===e.target ? 'true' : 'false');
    });
    const isDaily = e.target.dataset.tab === 'daily';
    document.getElementById('panel-daily').hidden = !isDaily;
    document.getElementById('panel-weekly').hidden = isDaily ? true : false;
  }
});

// Em js/app.js
async function loadFeatured(){
  try{
    const res = await fetch('./backend/routes/quizzes_get.php?featured=1');
    if(!res.ok) return;
    const { quizzes } = await res.json();
    const grid = document.getElementById('quiz-grid');
    grid.innerHTML = '';
    quizzes.slice(0,3).forEach(q=>{
      const el = document.createElement('article');
      el.className = 'quiz-card';
      el.innerHTML = `
        <div class="quiz-thumb"></div>
        <div class="quiz-body">
          <h3 class="quiz-title">${q.title}</h3>
          <div class="quiz-meta">
            <span>${q.total_questions} questões</span>
            <span>${q.difficulty}</span>
            <span>⭐ ${q.avg_rating}</span>
          </div>
          <div class="quiz-actions">
            <a class="btn btn-primary" href="./quiz.html?quiz_id=${q.id}">Jogar</a>
            <button class="btn btn-ghost">Detalhes</button>
          </div>
        </div>`;
      grid.appendChild(el);
    });
  }catch(e){}
}
document.addEventListener('DOMContentLoaded', loadFeatured);
