<?php /* reset.php */ ?>
<!doctype html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Redefinir senha — QuizNova</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>

<body>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-header">
        <h1>Redefinir senha</h1>
        <p class="muted">Use o código enviado por e-mail</p>
      </div>

      <form id="form-reset" class="auth-form" novalidate aria-describedby="reset-errors">
        <div class="field">
          <label for="email">E-mail</label>
          <input id="email" name="email" type="email" required autocomplete="email">
        </div>

        <div class="field">
          <label for="code">Código</label>
          <input id="code" name="code" type="text" minlength="6" maxlength="8" required>
        </div>

        <div class="field">
          <label for="new_password">Nova senha</label>
          <input id="new_password" name="new_password" type="password" minlength="8" required autocomplete="new-password">
        </div>

        <div class="field">
          <label for="confirm_password">Confirmar nova senha</label>
          <input id="confirm_password" name="confirm_password" type="password" minlength="8" required autocomplete="new-password">
        </div>

        <div id="reset-errors" class="form-error" aria-live="polite"></div>

        <button class="btn btn-primary" type="submit">Salvar nova senha</button>

        <p class="form-alt">
          Lembrou a senha?
          <a class="link" href="login.php">Entrar</a>
        </p>
      </form>
    </section>
  </main>

  <script>
    const API = (p) => 'backend/routes/' + p;
    const form = document.getElementById('form-reset');
    const err = document.getElementById('reset-errors');

    // Pré-preenche e-mail se veio do fluxo "Esqueci a senha"
    const mem = sessionStorage.getItem('recover_email');
    if (mem) {
      const el = document.getElementById('email');
      if (el) el.value = mem;
    }

    form?.addEventListener('submit', async (e) => {
      e.preventDefault();
      err.textContent = '';
      const fd = new FormData(form);
      if (fd.get('new_password') !== fd.get('confirm_password')) {
        err.textContent = 'As senhas não coincidem.';
        return;
      }
      if (String(fd.get('new_password')).length < 8) {
        err.textContent = 'A nova senha deve ter pelo menos 8 caracteres.';
        return;
      }
      try {
        const r = await fetch(API('auth_reset.php'), {
          method: 'POST',
          body: fd
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) {
          err.textContent = d.error || 'Falha ao redefinir senha';
          return;
        }
        sessionStorage.removeItem('recover_email');
        location.href = 'login.php';
      } catch (ex) {
        err.textContent = 'Erro de conexão';
      }
    });
  </script>
</body>

</html>