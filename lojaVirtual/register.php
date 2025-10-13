<?php
session_start();
$error = $_GET['error'] ?? '';
?>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <title>Cadastro | TechStore</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/login.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="logo"><i class="fas fa-store"></i> TechStore</div>
            <h2>Criar Conta</h2>
            <?php if($error): ?>
                <div class="alert-error"><?= htmlspecialchars($error) ?></div>
            <?php endif; ?>
            <form method="POST" action="register_submit.php">
                <label>Nome de usuário</label>
                <input type="text" name="username" required>

                <label>Senha</label>
                <input type="password" name="password" required>
                <div class="entry-button">
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>

                <div class="auth-footer">
                    Já tem conta? <a href="login.php">Entrar</a>
                </div>
            </form>
        </div>
    </div>
</body>
</html>
