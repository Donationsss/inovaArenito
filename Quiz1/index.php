<?php /* index.php restaurado */ ?>
<!doctype html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>QuizNova — Aprenda jogando</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/styles.css" />
</head>

<body>
  <header class="navbar navbar--original">
    <div class="navbar__inner container">
      <div class="navbar__brand">
        <a class="navbar__logo" href="index.php">QuizNova</a>
      </div>
      <nav class="navbar__links">
        <a class="nav-link" href="categoria.html">Quizzes</a>
        <a class="btn btn-cta btn-cta--glow" href="login.php">Entrar</a>
      </nav>
    </div>
  </header>

  <main class="container">
    <!-- HERO original (texto à esquerda e card à direita) -->
    <section class="hero hero--original">
      <div class="hero__left">
        <h1 class="big-title">Aprenda jogando com quizzes dinâmicos</h1>
        <p class="subtitle">
          Partidas ao vivo, rankings, conquistas e relatórios visuais em uma experiência fluida no modo escuro.
        </p>
        <div class="hero-cta">
          <a class="btn-cta btn-cta--glow" href="login.php">Entrar</a>
          <a class="btn btn-ghost" href="categoria.html">Quizzes</a>
        </div>
      </div>

      <aside class="hero-card card card--seamless">
        <div class="tabs" role="tablist" aria-label="Progresso">
          <button class="tab active" role="tab" aria-selected="true" data-tab="daily">Diário</button>
          <button class="tab" role="tab" aria-selected="false" data-tab="weekly">Semanal</button>
        </div>
        <div id="panel-daily" role="tabpanel">
          <div class="progress"><span id="daily-bar"></span></div>
          <ul class="stats">
            <li id="daily-quizzes">Quizzes: 0</li>
            <li id="daily-accuracy">Acertos: 0%</li>
            <li id="daily-points">Pontos: 0</li>
          </ul>
        </div>
        <div id="panel-weekly" role="tabpanel" hidden>
          <div class="progress"><span id="weekly-bar"></span></div>
          <ul class="stats">
            <li id="weekly-quizzes">Quizzes: 0</li>
            <li id="weekly-accuracy">Acertos: 0%</li>
            <li id="weekly-points">Pontos: 0</li>
          </ul>
        </div>
      </aside>
    </section>

    <!-- Mais jogados (cards como no original, sem quebra de background) -->
    <section class="home-section">
      <h2 class="section-title">Mais jogados do momento</h2>
      <p class="muted">Os três quizzes abaixo são os mais jogados — ótima porta de entrada.</p>
      <div class="cards-row" id="quiz-grid"></div>
    </section>
  </main>

  <script src="js/app.js"></script>
</body>

</html>