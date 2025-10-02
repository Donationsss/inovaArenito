<?php /* forgot.php */ ?>
<!doctype html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Esqueci a senha — QuizNova</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>

<body>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-header">
        <h1>Esqueci a senha</h1>
        <p class="muted">Informe o e-mail para receber o código</p>
      </div>

      <form id="form-forgot" class="auth-form" novalidate aria-describedby="forgot-errors">
        <div class="field">
          <label for="email">E-mail da conta</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>

        <div id="forgot-errors" class="form-error" aria-live="polite"></div>

        <button class="btn btn-primary" type="submit">Enviar código</button>

        <p class="form-alt">
          Já tem o código?
          <a class="link" href="reset.php">Redefinir senha</a>
        </p>
      </form>
    </section>
  </main>

  <script>
    const API = (p) => 'backend/routes/' + p;
    const form = document.getElementById('form-forgot');
    const err = document.getElementById('forgot-errors');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = '';
      const fd = new FormData(form);
      try {
        const r = await fetch(API('auth_forgot.php'), {
          method: 'POST',
          body: fd
        });
        if (!r.ok) {
          err.textContent = 'Falha ao enviar código.';
          return;
        }
        // guarda email no sessionStorage para pré-preencher no reset
        sessionStorage.setItem('recover_email', fd.get('email'));
        location.href = 'reset.php';
      } catch (ex) {
        err.textContent = 'Erro de conexão';
      }
    });
  </script>
</body>

</html>