<?php
session_start();
if (isset($_SESSION['usuario_id'])) {
    // Já autenticado
    header("Location: dashboard.html");
    exit;
}
$error = $_GET['error'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1.0">
    <title>Entrar | TechStore</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/login.css"> <!-- Adicione um css/login.css simples -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="logo"><i class="fas fa-store"></i> TechStore</div>
            <h2>Entrar</h2>
            <?php if($error): ?>
                <div class="alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            <form method="POST" action="auth.php">
                <label>Nome de usuário</label>
                <input type="text" name="username" required autocomplete="username">

                <label>Senha</label>
                <input type="password" name="password" required autocomplete="current-password">

                <div class="auth-options">
                    <label><input type="checkbox" name="remember"> Lembre de mim</label>
                    <a href="reset.php" class="auth-link">Esqueceu a senha?</a>
                </div>

                <button type="submit" class="btn btn-primary">Entrar</button>

                <div class="auth-footer">
                    Não tem uma conta? <a href="register.php">Cadastre-se</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
