<?php
// backend/lib/auth.php
require_once __DIR__ . '/../config/db.php';

function user_by_username_or_email(PDO $pdo, $usernameOrEmail) {
  $stmt = $pdo->prepare("SELECT * FROM users WHERE username = :u OR email = :u LIMIT 1");
  $stmt->execute([':u' => $usernameOrEmail]);
  return $stmt->fetch();
}

function create_user(PDO $pdo, $full_name, $username, $email, $password) {
  // Argon2id se disponível, senão PASSWORD_DEFAULT (bcrypt)
  $algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
  $hash = password_hash($password, $algo);
  $stmt = $pdo->prepare("INSERT INTO users (full_name, username, email, password_hash) VALUES (?,?,?,?)");
  $stmt->execute([$full_name, $username, $email, $hash]);
  return (int)$pdo->lastInsertId();
}

function verify_password_needs_rehash($hash) {
  $algo = defined('PASSWORD_ARGON2ID') ? PASSWORD_ARGON2ID : PASSWORD_DEFAULT;
  return password_needs_rehash($hash, $algo);
}

function set_remember_token(PDO $pdo, $user_id, $token) {
  $stmt = $pdo->prepare("UPDATE users SET remember_token=? WHERE id=?");
  $stmt->execute([$token, $user_id]);
}

function create_reset_code(PDO $pdo, $user_id) {
  $code = str_pad((string)random_int(0, 99999999), 8, '0', STR_PAD_LEFT); // 8 dígitos
  $expires = (new DateTime('+15 minutes'))->format('Y-m-d H:i:s');
  $stmt = $pdo->prepare("INSERT INTO password_resets (user_id, code, expires_at) VALUES (?,?,?)");
  $stmt->execute([$user_id, $code, $expires]);
  return $code;
}

function consume_reset_code(PDO $pdo, $user_id, $code) {
  $stmt = $pdo->prepare("SELECT * FROM password_resets WHERE user_id=? AND code=? AND used=0 LIMIT 1");
  $stmt->execute([$user_id, $code]);
  $row = $stmt->fetch();
  if (!$row) return false;
  if (new DateTime() > new DateTime($row['expires_at'])) return false;

  $upd = $pdo->prepare("UPDATE password_resets SET used=1 WHERE id=?");
  $upd->execute([$row['id']]);
  return true;
}
