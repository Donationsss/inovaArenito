<?php
require_once "db.php";

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';

if (strlen($username) < 3 || strlen($password) < 4) {
    header("Location: register.php?error=Nome e/ou senha muito curtos.");
    exit;
}
$stmt = $pdo->prepare("SELECT id FROM usuarios WHERE username = ?");
$stmt->execute([$username]);
if ($stmt->fetch()) {
    header("Location: register.php?error=Usuário já cadastrado.");
    exit;
}

$hash = password_hash($password, PASSWORD_DEFAULT);
$stmt = $pdo->prepare("INSERT INTO usuarios (username, password, is_admin) VALUES (?, ?, 0)");
$stmt->execute([$username, $hash]);
header("Location: login.php?success=Conta criada, entre com seus dados!");
exit;
