// js/catalog.js
async function loadCategories(){
  const res = await fetch('./backend/routes/categories_get.php');
  if(!res.ok) return [];
  const { categories } = await res.json();
  return categories;
}

async function loadQuizzes(categoryId){
  const url = new URL('./backend/routes/quizzes_get.php', location.href);
  if(categoryId) url.searchParams.set('category', categoryId);
  const res = await fetch(url);
  if(!res.ok) return [];
  const { quizzes } = await res.json();
  return quizzes;
}

function renderCats(cats){
  const nav = document.getElementById('cat-list');
  nav.innerHTML = '';
  cats.forEach(c=>{
    const btn = document.createElement('button');
    btn.className = 'chip';
    btn.textContent = c.name;
    btn.dataset.id = c.id;
    nav.appendChild(btn);
  });
}

function renderQuizzes(quizzes){
  const grid = document.getElementById('all-quizzes');
  grid.innerHTML = '';
  quizzes.forEach(q=>{
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
        </div>
      </div>`;
    grid.appendChild(el);
  });
}

document.addEventListener('click', async (e)=>{
  if(e.target.matches('#cat-list .chip')){
    document.querySelectorAll('#cat-list .chip').forEach(b=>b.classList.remove('active'));
    e.target.classList.add('active');
    const id = e.target.dataset.id;
    const qs = await loadQuizzes(id);
    renderQuizzes(qs);
  }
  if(e.target.matches('#clear-filter')){
    document.querySelectorAll('#cat-list .chip').forEach(b=>b.classList.remove('active'));
    const qs = await loadQuizzes(null);
    renderQuizzes(qs);
  }
});

(async function init(){
  const cats = await loadCategories();
  renderCats(cats);
  const qs = await loadQuizzes(null);
  renderQuizzes(qs);
})();
