<?php
session_start();
$ok = isset($_SESSION['reset_code_ok'], $_SESSION['reset_email']) && $_SESSION['reset_code_ok'] === true;
if (!$ok) {
    header("Location: reset_email.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Recuperar Senha - Nova Senha</title>
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
    <link rel="stylesheet" href="css/style.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="logo"><i class="fas fa-store"></i> TechStore</div>
            <h2>Definir Nova Senha</h2>
            <form method="POST" action="reset_password_submit.php" id="resetForm">
                <label>Nova Senha</label>
                <input type="password" name="password" id="password" required>

                <label>Confirmar Nova Senha</label>
                <input type="password" name="confirm_password" id="confirm_password" required>

                <button type="submit" class="btn btn-primary">Salvar</button>

                <div class="auth-footer">
                    Lembrou a senha?
                    <a href="login.php" class="btn btn-secondary">Entrar</a>
                </div>
            </form>
        </div>
    </div>

    <script src="js/toast.js"></script>
    <script>
        document.getElementById('resetForm').addEventListener('submit', (e) => {
            const p = document.getElementById('password').value.trim();
            const c = document.getElementById('confirm_password').value.trim();
            if (p !== c) {
                e.preventDefault();
                showToast('As senhas não conferem.', 'error', 3000);
            }
        });
        (function() {
            const p = new URLSearchParams(location.search);
            if (p.get('ok') === '1') {
                showToast('Código verificado.', 'success', 3000);
                p.delete('ok');
            }
            if (p.get('err') === 'mismatch') {
                showToast('As senhas não conferem.', 'error', 3000);
                p.delete('err');
            }
            if (p.get('err') === 'generic') {
                showToast('Erro ao atualizar senha.', 'error', 3000);
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