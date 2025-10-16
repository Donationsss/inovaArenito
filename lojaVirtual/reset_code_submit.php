<?php
require_once "db.php";

$email = trim($_POST['email'] ?? '');
$code = trim($_POST['code'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || !preg_match('/^\d{6}$/', $code)) {
    header("Location: reset_code.php?email=" . urlencode($email) . "&err=invalid");
    exit;
}

$stmt = $pdo->prepare("SELECT id, reset_expires FROM usuarios WHERE email = ? AND reset_code = ?");
$stmt->execute([$email, $code]);
$user = $stmt->fetch();

if (!$user) {
    header("Location: reset_code.php?email=" . urlencode($email) . "&err=invalid");
    exit;
}

$now = new DateTime();
$exp = new DateTime($user['reset_expires']);
if ($exp < $now) {
    header("Location: reset_code.php?email=" . urlencode($email) . "&err=invalid");
    exit;
}

session_start();
$_SESSION['reset_email'] = $email;
$_SESSION['reset_code_ok'] = true;

header("Location: reset_password.php?ok=1");
exit;
