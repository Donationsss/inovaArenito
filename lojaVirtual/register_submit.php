<?php
require_once "db.php";

$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';

if (strlen($username) < 3 || strlen($password) < 4) {
    header("Location: register.php?error=Nome e/ou senha muito curtos.");
    exit;
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: register.php?error=E-mail inválido.");
    exit;
}
if ($password !== $confirm) {
    header("Location: register.php?error=As senhas não conferem.");
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE username = ? OR email = ?");
$stmt->execute([$username, $email]);
if ($stmt->fetch()) {
    header("Location: register.php?error=Usuário ou e-mail já cadastrado.");
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO usuarios (username, email, password, is_admin) VALUES (?, ?, ?, 0)");
$stmt->execute([$username, $email, $hash]);

header("Location: login.php?registered=success");
exit;
