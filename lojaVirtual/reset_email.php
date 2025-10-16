<?php
session_start();
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Recuperar Senha - E-mail</title>
    <script>
        (function() {
            try {
                var t = localStorage.getItem('theme') || 'light';
                var doc = document.documentElement;
                doc.setAttribute('data-theme', t);
                doc.classList.add('preload');
                var bg = t === 'dark' ? '#0f172a' : '#f8f9fa';
                doc.style.backgroundColor = bg;
            } catch (e) {}
        })();
    </script>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="logo"><i class="fas fa-store"></i> TechStore</div>
            <h2>Recuperar Senha</h2>
            <p style="color:var(--text-secondary);margin-top:.25rem;font-size:.95rem;">
                Informe o e-mail cadastrado para gerar um código de verificação.
            </p>
            <form method="POST" action="reset_email_submit.php">
                <label>E-mail</label>
                <input type="email" name="email" required>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <button type="submit" class="btn btn-primary">Enviar código</button>
                </div>

                <div class="auth-footer">
                    Lembrou a senha?
                    <a href="login.php" class="btn btn-secondary">Entrar</a>
                </div>
            </form>
        </div>
    </div>

    <script src="js/toast.js"></script>
    <script>
        (function() {
            const p = new URLSearchParams(location.search);
            if (p.get('err') === 'notfound') {
                showToast('E-mail não encontrado.', 'error', 3000);
                p.delete('err');
            }
            showToastFromQuery();
            const url = new URL(location.href);
            url.search = p.toString();
            history.replaceState({}, '', url);
        })();
        window.addEventListener('load', function() {
            document.documentElement.classList.remove('preload');
            document.documentElement.style.backgroundColor = '';
        });
    </script>
</body>

</html>