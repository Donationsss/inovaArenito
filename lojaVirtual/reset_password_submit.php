<?php
require_once "db.php";
session_start();

if (!isset($_SESSION['reset_code_ok'], $_SESSION['reset_email']) || $_SESSION['reset_code_ok'] !== true) {
    header("Location: reset_email.php");
    exit;
}

$email = $_SESSION['reset_email'];
$password = $_POST['password'] ?? '';
$confirm = $_POST['confirm_password'] ?? '';

if ($password !== $confirm) {
    header("Location: reset_password.php?err=mismatch");
    exit;
}

try {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    $stmt = $pdo->prepare("UPDATE usuarios SET password = ?, reset_code = NULL, reset_expires = NULL WHERE email = ?");
    $stmt->execute([$hash, $email]);

    unset($_SESSION['reset_code_ok'], $_SESSION['reset_email']);

    header("Location: login.php?reset=success");
    exit;
} catch (Throwable $e) {
    header("Location: reset_password.php?err=generic");
    exit;
}
