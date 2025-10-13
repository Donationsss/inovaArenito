<?php
session_start();
require_once "db.php"; // faça uma conexão PDO em db.php

$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$remember = isset($_POST['remember']);

// Consulta usuário
$stmt = $pdo->prepare("SELECT id, username, password, is_admin FROM usuarios WHERE username = ?");
$stmt->execute([$username]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['usuario_id'] = $user['id'];
    $_SESSION['usuario_nome'] = $user['username'];
    $_SESSION['is_admin'] = (bool)$user['is_admin'];

    if ($remember) {
        setcookie("usuario_id", $user['id'], time()+60*60*24*30, "/");
    }
    if ($user['is_admin']) {
        header("Location: dashboard.html");
    } else {
        header("Location: index.html");
    }
    exit;
} else {
    header("Location: login.php?error=Nome de usuário ou senha inválidos");
    exit;
}
