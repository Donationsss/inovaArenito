<?php /* login.php */ ?>
<!DOCTYPE html>
<html lang="pt-br">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Entrar — QuizNova</title>
  <link rel="stylesheet" href="./css/styles.css" />
</head>

<body>
  <main class="auth-page">
    <section class="auth-card">
      <div class="auth-header">
        <h1>Entrar</h1>
      </div>

      <form
        id="form-login"
        class="auth-form"
        novalidate
        aria-describedby="login-errors">
        <div class="field">
          <label for="username">Nome de usuário</label>
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required />
        </div>

        <div class="field">
          <label for="password">Senha</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required />
        </div>

        <div class="form-row">
          <label class="check">
            <input type="checkbox" name="remember" /> Lembrar de mim
          </label>
          <a class="link" href="forgot.php">Esqueceu a senha?</a>
        </div>

        <div id="login-errors" class="form-error" aria-live="polite"></div>

        <button class="btn btn-primary" type="submit">Entrar</button>

        <p class="form-alt">
          Não tem uma conta?
          <a class="link" href="register.php">Cadastre-se</a>
        </p>
      </form>
    </section>
  </main>

  <script>
    const API = (p) => "backend/routes/" + p;
    const form = document.getElementById("form-login");
    const err = document.getElementById("login-errors");

    form?.addEventListener("submit", async (e) => {
      e.preventDefault();
      err.textContent = "";
      const fd = new FormData(form);
      try {
        const r = await fetch(API("auth_login.php"), {
          method: "POST",
          body: fd,
          credentials: "include",
        });
        const d = await r.json().catch(() => ({}));
        if (!r.ok) {
          err.textContent = d.error || "Falha na autenticação";
          return;
        }
        location.href = "index.php";
      } catch (ex) {
        err.textContent = "Erro de conexão";
      }
    });
  </script>
</body>

</html>