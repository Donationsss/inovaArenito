<?php
session_start();
$isLogged = isset($_SESSION['usuario_id']);
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Entrar | TechStore</title>
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
            <h2>Entrar</h2>
            <form method="POST" action="auth.php">
                <label>Nome de usuário</label>
                <input type="text" name="username" required autocomplete="username">

                <label>Senha</label>
                <input type="password" name="password" required autocomplete="current-password">

                <div class="auth-options">
                    <label><input type="checkbox" name="remember"> Lembre de mim</label>
                    <a href="reset_email.php" class="auth-link">Esqueceu a senha?</a>
                </div>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <button type="submit" class="btn btn-primary">Entrar</button>
                </div>

                <div class="auth-footer">
                    Não tem uma conta?
                    <a href="register.php" class="btn btn-secondary">Cadastre-se</a>
                </div>
            </form>
        </div>
    </div>

    <script src="js/toast.js"></script>
    <script>
        (function() {
            const params = new URLSearchParams(window.location.search);
            if (params.get('logout') === 'success') {
                showToast('Logout realizado com sucesso.', 'success', 3000);
                params.delete('logout');
            }
            if (params.get('registered') === 'success') {
                showToast('Conta criada com sucesso! Faça login para continuar.', 'success', 3000);
                params.delete('registered');
            }
            if (params.get('reset') === 'success') {
                showToast('Senha alterada com sucesso! Faça login para continuar.', 'success', 3000);
                params.delete('reset');
            }
            showToastFromQuery();
            const url = new URL(window.location.href);
            url.search = params.toString();
            window.history.replaceState({}, '', url);
        })();
        window.addEventListener('load', function() {
            document.documentElement.classList.remove('preload');
            document.documentElement.style.backgroundColor = '';
        });
    </script>
</body>

</html>