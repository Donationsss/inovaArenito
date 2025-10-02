<?php /* register.php */ ?>
<!doctype html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Criar conta — QuizNova</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>

<body>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-header">
        <h1>Criar conta</h1>
      </div>

      <form id="form-register" class="auth-form" novalidate aria-describedby="register-errors">
        <div class="field">
          <label for="full_name">Nome completo</label>
          <input id="full_name" name="full_name" type="text" autocomplete="name" required>
        </div>

        <div class="field">
          <label for="username">Nome de usuário</label>
          <input id="username" name="username" type="text" autocomplete="username" minlength="3" required>
        </div>

        <div class="field">
          <label for="email">E-mail</label>
          <input id="email" name="email" type="email" autocomplete="email" required>
        </div>

        <div class="field">
          <label for="password">Senha</label>
          <input id="password" name="password" type="password" autocomplete="new-password" minlength="8" required>
        </div>

        <div class="field">
          <label for="confirm_password">Confirmar senha</label>
          <input id="confirm_password" name="confirm_password" type="password" autocomplete="new-password" minlength="8" required>
        </div>

        <div id="register-errors" class="form-error" aria-live="polite"></div>

        <button class="btn btn-primary" type="submit">Cadastrar</button>

        <p class="form-alt">
          Já tem conta?
          <a class="link" href="login.php">Entrar</a>
        </p>
      </form>
    </section>
  </main>

  <script>
    const API = (p) => 'backend/routes/' + p;
    const form = document.getElementById('form-register');
    const err = document.getElementById('register-errors');

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = '';
      const fd = new FormData(form);
      const pass = fd.get('password');
      const conf = fd.get('confirm_password');
      if (pass !== conf) {
        err.textContent = 'As senhas não coincidem.';
        return;
      }
      if (String(pass).length < 8) {
        err.textContent = 'Senha deve ter pelo menos 8 caracteres.';
        return;
      }
      try {
        const r = await fetch(API('auth_register.php'), {
          method: 'POST',
          body: fd,
          credentials: 'include'
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) {
          err.textContent = d.error || 'Falha ao cadastrar';
          return;
        }
        location.href = 'login.php';
      } catch (ex) {
        err.textContent = 'Erro de conexão';
      }
    });
  </script>
</body>

</html>