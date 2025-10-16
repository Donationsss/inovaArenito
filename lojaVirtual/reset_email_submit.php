<?php
require_once "db.php";

$email = trim($_POST['email'] ?? '');
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header("Location: reset_email.php?err=notfound");
    exit;
}
$stmt = $pdo->prepare("SELECT id, username FROM usuarios WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();
if (!$user) {
    header("Location: reset_email.php?err=notfound");
    exit;
}

$code = str_pad((string)random_int(0, 999999), 6, '0', STR_PAD_LEFT);
$expires = (new DateTime('+15 minutes'))->format('Y-m-d H:i:s');

$up = $pdo->prepare("UPDATE usuarios SET reset_code = ?, reset_expires = ? WHERE id = ?");
$up->execute([$code, $expires, $user['id']]);

header("Location: reset_code.php?email=" . urlencode($email) . "&devcode=" . urlencode($code) . "&gen=1");
exit;
