<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Quiz — QuizNova</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <header class="navbar">
      <div class="logo"><a href="index.html">QuizNova</a></div>
      <nav>
        <a href="categoria.html">Quizzes</a>
        <a href="login.html" class="btn">Entrar</a>
      </nav>
    </header>

    <main class="quiz-main container">
      <div class="quiz-play-card card" id="quizArea">
        <div class="quiz-header">
          <div>
            <h2 id="quiz-title">Carregando...</h2>
            <small id="quiz-meta">12 questões • 60s</small>
          </div>
          <div class="quiz-timer">
            <svg viewBox="0 0 100 100" width="64" height="64">
              <circle class="bg" cx="50" cy="50" r="44"></circle>
              <circle
                class="fg"
                cx="50"
                cy="50"
                r="44"
                stroke-dasharray="276"
                stroke-dashoffset="0"
              ></circle>
            </svg>
            <span class="label" id="time-label">60</span>
          </div>
        </div>
        <div class="quiz-question-box">
          <div id="q-text"></div>
          <div class="answers" id="answers"></div>
        </div>
        <div class="quiz-controls">
          <div class="muted"><span id="q-index">1</span>/12</div>
          <button class="btn-cta" id="next-btn" disabled>Próxima</button>
        </div>
      </div>
    </main>

    <script src="js/quiz.js"></script>
  </body>
</html>
