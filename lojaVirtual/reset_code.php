<?php
session_start();
$email = $_GET['email'] ?? '';
$devcode = $_GET['devcode'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-BR">

<head>
    <meta charset="UTF-8">
    <title>Recuperar Senha - Código</title>
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
            <h2>Digite o Código</h2>

            <?php if ($devcode): ?>
                <div style="background:rgba(37, 99, 235, .1);border:1px solid rgba(37,99,235,.35);padding: .75rem 1rem;border-radius:10px;margin-bottom:1rem;">
                    <strong>Código gerado (dev): </strong>
                    <span style="font-size:1.15rem;letter-spacing:2px; font-weight:700; color:var(--accent-blue);"><?= htmlspecialchars($devcode) ?></span>
                </div>
            <?php endif; ?>

            <p style="color:var(--text-secondary);margin-top:.25rem;font-size:.95rem;">
                Verifique o código e insira abaixo (expira em 15 minutos).
            </p>
            <form method="POST" action="reset_code_submit.php">
                <input type="hidden" name="email" value="<?= htmlspecialchars($email) ?>">
                <label>Código</label>
                <input type="text" name="code" pattern="\d{6}" maxlength="6" placeholder="000000" required>
                <button type="submit" class="btn btn-primary">Verificar</button>

                <div class="auth-footer">
                    Precisa gerar novamente?
                    <a href="reset_email.php" class="btn btn-secondary">Gerar novo código</a>
                </div>
            </form>
        </div>
    </div>

    <script src="js/toast.js"></script>
    <script>
        (function() {
            const p = new URLSearchParams(location.search);
            if (p.get('gen') === '1') {
                showToast('Código gerado com sucesso.', 'success', 3000);
                p.delete('gen');
            }
            if (p.get('err') === 'invalid') {
                showToast('Código inválido ou expirado.', 'error', 3000);
                p.delete('err');
            }
            if (p.get('ok') === '1') {
                showToast('Código verificado.', 'success', 3000);
                p.delete('ok');
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