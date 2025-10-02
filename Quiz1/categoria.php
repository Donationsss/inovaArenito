<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Catálogo — QuizNova</title>
    <link rel="stylesheet" href="css/styles.css" />
  </head>
  <body>
    <header class="navbar">
      <div class="logo"><a href="index.html">QuizNova</a></div>
      <nav>
        <a href="categoria.html" class="active">Quizzes</a>
        <a href="login.html" class="btn">Entrar</a>
        <a href="register.html" class="btn-cta">Criar conta</a>
      </nav>
    </header>

    <main class="category-main container">
      <aside class="sidebar card">
        <h3>Categorias</h3>
        <nav id="cat-list"></nav>
        <button
          id="clear-filter"
          class="btn"
          style="margin-top: 12px; width: 100%"
        >
          Mostrar todas
        </button>
      </aside>
      <section class="category-content">
        <div class="category-toolbar">
          <h2 id="cat-title">Todas</h2>
        </div>
        <div class="grid" id="all-quizzes"></div>
      </section>
    </main>

    <script src="js/catalog.js"></script>
  </body>
</html>
